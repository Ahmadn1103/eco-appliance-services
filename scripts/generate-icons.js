const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const logoPath = path.join(__dirname, '../public/logo.jpeg');
  
  // 1. Crop truck graphic cleanly with 10px safe margin around it:
  // Truck is located at: left: 210, top: 24, width: 390, height: 290
  const truck = await sharp(logoPath)
    .extract({ left: 208, top: 24, width: 390, height: 290 })
    .toBuffer();

  // 2. Create crisp white squircle icon (512x512)
  // Background with smooth rounded corners (rx: 112)
  const bgSvg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="112" fill="#ffffff"/>
    </svg>
  `);

  // Target truck width and height inside 512x512:
  // 390x290 scaled to width 400 => height = 400 * (290/390) = 297
  const truckW = 410;
  const truckH = Math.round(truckW * (290 / 390)); // ~305

  const resizedTruck = await sharp(truck)
    .resize(truckW, truckH, {
      fit: 'fill',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .toBuffer();

  const leftOffset = Math.round((512 - truckW) / 2); // (512 - 410) / 2 = 51
  const topOffset = Math.round((512 - truckH) / 2);  // (512 - 305) / 2 = 103

  const final512 = await sharp(bgSvg)
    .composite([
      { input: resizedTruck, top: topOffset, left: leftOffset }
    ])
    .png()
    .toBuffer();

  // Save 512x512 Master icon
  await sharp(final512).toFile(path.join(__dirname, '../public/icon-512.png'));

  // Save 192x192 (Android / PWA)
  await sharp(final512).resize(192, 192).toFile(path.join(__dirname, '../public/icon-192.png'));

  // Save 180x180 (Apple touch icon for iPhone / iPad)
  await sharp(final512).resize(180, 180).toFile(path.join(__dirname, '../app/apple-icon.png'));
  await sharp(final512).resize(180, 180).toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // Save 48x48 and 32x32 (Modern browser tabs & PC desktop)
  await sharp(final512).resize(48, 48).toFile(path.join(__dirname, '../app/icon.png'));
  await sharp(final512).resize(32, 32).toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(final512).resize(16, 16).toFile(path.join(__dirname, '../public/favicon-16x16.png'));

  // Save favicon.ico (Next.js automatically serves app/favicon.ico and public/favicon.ico)
  await sharp(final512).resize(32, 32).toFile(path.join(__dirname, '../app/favicon.ico'));
  await sharp(final512).resize(32, 32).toFile(path.join(__dirname, '../public/favicon.ico'));

  console.log('Successfully generated all clean favicons and icons!');
}

generate().catch(console.error);
