import { chromium } from "playwright";

async function captureSections() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const sections = ["about", "skills", "work", "certifications", "experience", "achievements", "contact"];

  for (const s of sections) {
    const el = await page.$(`#${s}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await el.screenshot({ path: `public/section-${s}.png` });
      console.log(`Saved public/section-${s}.png`);
    }
  }

  await browser.close();
}

captureSections().catch(console.error);
