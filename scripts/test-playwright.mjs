import { chromium } from "playwright";

async function runTests() {
  console.log("Launching browser...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  const errors = [];

  // Desktop Test (1440x900)
  console.log("Testing Desktop 1440x900...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  
  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("Console error on desktop:", msg.text());
      errors.push(`Desktop error: ${msg.text()}`);
    }
  });

  desktopPage.on("response", (res) => {
    if (res.status() >= 400) {
      console.error(`HTTP ${res.status()} on ${res.url()}`);
      errors.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });

  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1000);

  const desktopScrollWidth = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
  const desktopClientWidth = await desktopPage.evaluate(() => document.documentElement.clientWidth);
  console.log(`Desktop Viewport: clientWidth=${desktopClientWidth}, scrollWidth=${desktopScrollWidth}`);
  if (desktopScrollWidth > desktopClientWidth) {
    console.error(`Desktop horizontal overflow! ${desktopScrollWidth} > ${desktopClientWidth}`);
    errors.push("Desktop horizontal overflow");
  } else {
    console.log("✓ Zero horizontal overflow on Desktop (1440px).");
  }

  await desktopPage.screenshot({ path: "public/screenshot-desktop.png", fullPage: false });
  console.log("Saved public/screenshot-desktop.png");

  // Mobile Test (390x844)
  console.log("Testing Mobile 390x844...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("Console error on mobile:", msg.text());
      errors.push(`Mobile error: ${msg.text()}`);
    }
  });

  mobilePage.on("response", (res) => {
    if (res.status() >= 400) {
      console.error(`HTTP ${res.status()} on ${res.url()}`);
      errors.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const mobileClientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile Viewport: clientWidth=${mobileClientWidth}, scrollWidth=${mobileScrollWidth}`);
  if (mobileScrollWidth > mobileClientWidth) {
    console.error(`Mobile horizontal overflow! ${mobileScrollWidth} > ${mobileClientWidth}`);
    errors.push("Mobile horizontal overflow");
  } else {
    console.log("✓ Zero horizontal overflow on Mobile (390px).");
  }

  await mobilePage.screenshot({ path: "public/screenshot-mobile.png", fullPage: false });
  console.log("Saved public/screenshot-mobile.png");

  await browser.close();

  if (errors.length > 0) {
    console.error(`Test finished with ${errors.length} errors/failed requests.`);
    process.exit(1);
  } else {
    console.log("✓ All quality checks passed with 0 console errors and 0 failed requests!");
  }
}

runTests().catch((err) => {
  console.error("Error during test run:", err);
  process.exit(1);
});
