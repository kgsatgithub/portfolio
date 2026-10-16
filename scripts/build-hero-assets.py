import os
import sys
import subprocess
import numpy as np

def find_ffmpeg():
    # Check custom tools dir first, then system path
    tools_ffmpeg = r"C:\tools\ffmpeg\bin\ffmpeg.exe"
    if os.path.exists(tools_ffmpeg):
        return tools_ffmpeg
    return "ffmpeg"

def find_ffprobe():
    tools_ffprobe = r"C:\tools\ffmpeg\bin\ffprobe.exe"
    if os.path.exists(tools_ffprobe):
        return tools_ffprobe
    return "ffprobe"

def run_cmd(cmd):
    print("Running:", " ".join(cmd) if isinstance(cmd, list) else cmd)
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print("Error output:", res.stderr)
        raise RuntimeError(f"Command failed with exit code {res.returncode}")
    return res

def build_hero_assets(
    input_video="intro.mp4",
    output_dir="public/hero",
    public_dir="public",
    crop_x=352,
    crop_y=0,
    crop_w=576,
    crop_h=720,
    target_w=768,
    target_h=960,
    duration=10.0,
    fade_duration=0.5
):
    ffmpeg = find_ffmpeg()
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)

    tmp_dir = "scripts/tmp"
    os.makedirs(tmp_dir, exist_ok=True)

    print(f"[1/5] Extracting audio from {input_video} for sample-accurate numpy cross-fade...")
    raw_audio_path = os.path.join(tmp_dir, "audio_orig.raw")
    # Extract first 10 seconds of audio as 48kHz 32-bit float stereo
    sample_rate = 48000
    channels = 2
    cmd_audio = [
        ffmpeg, "-y", "-ss", "0", "-t", str(duration),
        "-i", input_video,
        "-vn", "-f", "f32le", "-ar", str(sample_rate), "-ac", str(channels),
        raw_audio_path
    ]
    run_cmd(cmd_audio)

    # Read raw audio into numpy
    raw_bytes = open(raw_audio_path, "rb").read()
    audio_data = np.frombuffer(raw_bytes, dtype=np.float32).reshape(-1, channels)
    n_samples = audio_data.shape[0]
    fade_samples = int(fade_duration * sample_rate)

    print(f"Total audio samples: {n_samples}, fade samples: {fade_samples}")

    # Seamless loop cross-fade:
    # Segment 1: from fade_samples to n_samples (length: n_samples - fade_samples)
    # Segment 2: from 0 to fade_samples (length: fade_samples)
    # The last fade_samples of Segment 1 crossfades into Segment 2
    seg1 = audio_data[fade_samples:n_samples].copy()
    seg2 = audio_data[0:fade_samples].copy()

    # Equal power or linear cross-fade
    fade_out = np.linspace(1.0, 0.0, fade_samples)[:, None]
    fade_in = np.linspace(0.0, 1.0, fade_samples)[:, None]
    blended = seg1[-fade_samples:] * fade_out + seg2 * fade_in

    seamless_audio = np.vstack([seg1[:-fade_samples], blended])
    seamless_audio_path = os.path.join(tmp_dir, "audio_seamless.wav")

    # Write seamless audio to 16-bit PCM wav
    int16_audio = np.clip(seamless_audio * 32767.0, -32768, 32767).astype(np.int16)
    import wave
    with wave.open(seamless_audio_path, "wb") as wav_file:
        wav_file.setnchannels(channels)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(int16_audio.tobytes())

    print(f"[2/5] Creating seamless video loop with ffmpeg xfade & background whitening...")
    # Video cross-fade filter:
    # [0:v]trim=0.5:10,setpts=PTS-STARTPTS[v1] -> duration 9.5
    # [0:v]trim=0:0.5,setpts=PTS-STARTPTS[v2]   -> duration 0.5
    # [v1][v2]xfade=transition=fade:duration=0.5:offset=9.0[v]
    # Then crop, scale, and colorlevels whitening:
    filter_complex = (
        f"[0:v]trim={fade_duration}:{duration},setpts=PTS-STARTPTS[v1];"
        f"[0:v]trim=0:{fade_duration},setpts=PTS-STARTPTS[v2];"
        f"[v1][v2]xfade=transition=fade:duration={fade_duration}:offset={duration - 2 * fade_duration}[vx];"
        f"[vx]crop={crop_w}:{crop_h}:{crop_x}:{crop_y},"
        f"scale={target_w}:{target_h},"
        f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98[vout]"
    )

    seamless_mp4 = os.path.join(output_dir, "hero.mp4")
    seamless_webm = os.path.join(output_dir, "hero.webm")

    print("[3/5] Exporting hero.mp4 (H.264 + AAC 96k + faststart)...")
    cmd_mp4 = [
        ffmpeg, "-y",
        "-i", input_video,
        "-i", seamless_audio_path,
        "-filter_complex", filter_complex,
        "-map", "[vout]", "-map", "1:a",
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        seamless_mp4
    ]
    run_cmd(cmd_mp4)

    print("[4/5] Exporting hero.webm (VP9 + Opus 80k)...")
    cmd_webm = [
        ffmpeg, "-y",
        "-i", input_video,
        "-i", seamless_audio_path,
        "-filter_complex", filter_complex,
        "-map", "[vout]", "-map", "1:a",
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-pix_fmt", "yuv420p",
        "-c:a", "libopus", "-b:a", "80k",
        seamless_webm
    ]
    run_cmd(cmd_webm)

    print("[5/5] Generating portrait-bust.webp and og.jpg...")
    # Portrait bust: clear frame around 2.0s, cropped head-to-shirt 480x600
    portrait_webp = os.path.join(public_dir, "portrait-bust.webp")
    # From 1280x720 source: head is around x=625, y=45. Bust crop: w=420, h=525, x=415, y=35 -> scale to 480x600
    bust_filter = (
        f"crop=420:525:415:35,"
        f"scale=480:600,"
        f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
    )
    cmd_bust = [
        ffmpeg, "-y", "-ss", "00:00:02",
        "-i", input_video,
        "-vf", bust_filter,
        "-vframes", "1",
        portrait_webp
    ]
    run_cmd(cmd_bust)

    # OpenGraph image 1200x630:
    og_jpg = os.path.join(public_dir, "og.jpg")
    # We can create a rich 1200x630 graphic with ffmpeg using the bust and typography/solid paper background
    og_filter = (
        f"crop=420:525:415:35,scale=440:550,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98[bust];"
        f"color=c=0xf4f2ee:s=1200x630[bg];"
        f"[bg][bust]overlay=700:40[out]"
    )
    cmd_og = [
        ffmpeg, "-y", "-ss", "00:00:02",
        "-i", input_video,
        "-filter_complex", og_filter,
        "-map", "[out]",
        "-vframes", "1",
        og_jpg
    ]
    run_cmd(cmd_og)

    # Clean up temp files
    try:
        os.remove(raw_audio_path)
        os.remove(seamless_audio_path)
        os.rmdir(tmp_dir)
    except Exception as e:
        pass

    print("Hero assets pipeline finished successfully!")
    print(f"Created: {seamless_mp4}")
    print(f"Created: {seamless_webm}")
    print(f"Created: {portrait_webp}")
    print(f"Created: {og_jpg}")

if __name__ == "__main__":
    build_hero_assets()
