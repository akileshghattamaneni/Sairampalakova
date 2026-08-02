import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, 'public', 'assets', 'images', 'logo.png');
const publicDir = path.join(__dirname, 'public');

async function main() {
  try {
    console.log('Generating favicons from logo.png...');

    // 1. Generate Apple Touch Icon (180x180, solid cream background)
    await sharp(logoPath)
      .resize(180, 180)
      .flatten({ background: '#FAF3E4' })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✓ Created apple-touch-icon.png (180x180, solid background)');

    // 2. Generate PNG buffers for ICO sizes (16x16, 32x32, 48x48)
    const sizes = [16, 32, 48];
    const pngBuffers = [];

    for (const size of sizes) {
      const buf = await sharp(logoPath)
        .resize(size, size)
        .png()
        .toBuffer();
      pngBuffers.push({ width: size, height: size, data: buf });
      console.log(`✓ Generated ${size}x${size} PNG buffer`);

      // Save standalone files for 16x16 and 32x32 as requested
      if (size === 16 || size === 32) {
        fs.writeFileSync(path.join(publicDir, `favicon-${size}x${size}.png`), buf);
        console.log(`✓ Created favicon-${size}x${size}.png`);
      }
    }

    // 3. Pack PNGs into standard favicon.ico
    const icoBuffer = createIco(pngBuffers);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('✓ Created favicon.ico containing 16x16, 32x32, and 48x48 icons');

    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

/**
 * Packs multiple PNG buffers into a single ICO file buffer.
 */
function createIco(pngBuffers) {
  // 1. Header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Image type (1 = ICO)
  header.writeUInt16LE(pngBuffers.length, 4); // Number of images

  const directories = [];
  const dataBlocks = [];
  let offset = 6 + pngBuffers.length * 16; // Start offset of data blocks

  for (const img of pngBuffers) {
    // 2. Directory Entry (16 bytes per image)
    const dir = Buffer.alloc(16);
    dir.writeUInt8(img.width >= 256 ? 0 : img.width, 0);   // Width
    dir.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    dir.writeUInt8(0, 2);                                  // Color palette (0 = no palette)
    dir.writeUInt8(0, 3);                                  // Reserved
    dir.writeUInt16LE(1, 4);                               // Color planes
    dir.writeUInt16LE(32, 6);                              // Bits per pixel
    dir.writeUInt32LE(img.data.length, 8);                 // Size of image data
    dir.writeUInt32LE(offset, 12);                         // Data offset

    directories.push(dir);
    dataBlocks.push(img.data);
    offset += img.data.length;
  }

  return Buffer.concat([header, ...directories, ...dataBlocks]);
}

main();
