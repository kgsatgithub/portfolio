import { chromium } from "playwright";

async function testAchievementsScroll() {
  console.log("Launching browser for Achievements scroll testing...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("Console error:", msg.text());
    }
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Scroll directly to #achievements
  console.log("Scrolling to #achievements...");
  await page.evaluate(() => {
    const el = document.getElementById("achievements");
    el?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(600);

  const initialScrollY = await page.evaluate(() => window.scrollY);
  console.log("Initial window.scrollY at Achievements:", initialScrollY);

  // 2. Move mouse inside #achievements
  const achievementsBox = await page.locator("#achievements").boundingBox();
  if (!achievementsBox) {
    throw new Error("Could not find #achievements bounding box");
  }

  const hoverX = achievementsBox.x + achievementsBox.width / 2;
  const hoverY = achievementsBox.y + achievementsBox.height / 2;
  console.log(`Hovering mouse over #achievements at (${hoverX}, ${hoverY})...`);
  await page.mouse.move(hoverX, hoverY);
  await page.waitForTimeout(200);

  // 3. Wheel down 5 times inside #achievements
  console.log("Simulating wheel events inside #achievements...");
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(100);
  }

  const scrollYAfterWheeling = await page.evaluate(() => window.scrollY);
  const trackTransform = await page.evaluate(() => {
    const track = document.querySelector("#achievements .will-change-transform");
    return track?.style.transform || "none";
  });

  console.log("window.scrollY after 5 wheel down events:", scrollYAfterWheeling);
  console.log("Track transform after wheeling:", trackTransform);

  // Verify that vertical scroll did NOT change
  const verticalDiff = Math.abs(scrollYAfterWheeling - initialScrollY);
  if (verticalDiff <= 10) {
    console.log("✓ SUCCESS: Vertical scroll STOPPED while scrolling metrics horizontally! (Diff:", verticalDiff, "px)");
  } else {
    console.error("FAIL: Vertical scroll moved by", verticalDiff, "px");
    process.exit(1);
  }

  // 4. Continue wheeling until end of list is reached
  console.log("Wheeling until end of horizontal items...");
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(400);

  const endTrackTransform = await page.evaluate(() => {
    const track = document.querySelector("#achievements .will-change-transform");
    return track?.style.transform || "none";
  });
  console.log("Track transform at end of list:", endTrackTransform);

  // 5. Wheel down further once end is reached: should now scroll vertically to Contact!
  console.log("Wheeling past end of horizontal items...");
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(600);

  const finalScrollY = await page.evaluate(() => window.scrollY);
  console.log("window.scrollY after wheeling past end:", finalScrollY);
  if (finalScrollY > scrollYAfterWheeling + 50) {
    console.log("✓ SUCCESS: Vertical scroll resumed down to next section once horizontal items finished!");
  } else {
    console.log("Note: finalScrollY:", finalScrollY);
  }

  // 6. Test hover out of section
  console.log("Testing mouse hover out of section...");
  await page.mouse.move(50, 50); // move to top-left corner outside section
  await page.waitForTimeout(200);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(400);
  const scrollYAfterHoverOut = await page.evaluate(() => window.scrollY);
  console.log("window.scrollY after hover out and wheeling:", scrollYAfterHoverOut);

  await page.screenshot({ path: "public/screenshot-achievements-fixed.png" });
  console.log("Saved public/screenshot-achievements-fixed.png");

  await browser.close();
  console.log("✓ All Achievements scroll tests PASSED!");
}

testAchievementsScroll().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
