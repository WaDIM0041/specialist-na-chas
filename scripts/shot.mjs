import { chromium } from "playwright";

const browser = await chromium.launch();
const targets = [
  { w: 1440, h: 900, name: "desktop" },
  { w: 375, h: 812, name: "mobile" },
];

for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: t.w, height: t.h } });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(8300);
  await page.screenshot({ path: `shots/main-${t.name}.png` });
  await page.close();
  console.log(`saved shots/main-${t.name}.png`);
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2000);
/* прокрутка, чтобы сработали reveal-анимации */
await page.evaluate(async () => {
  await new Promise((done) => {
    let y = 0;
    const i = setInterval(() => {
      y += 500;
      window.scrollTo(0, y);
      if (y >= document.body.scrollHeight) {
        clearInterval(i);
        done();
      }
    }, 120);
  });
});
await page.waitForTimeout(1200);
await page.screenshot({ path: "shots/full-desktop.png", fullPage: true });
await page.close();
console.log("saved shots/full-desktop.png");
await browser.close();
