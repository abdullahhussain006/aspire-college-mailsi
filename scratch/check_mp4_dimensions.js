const fs = require('fs');
const path = require('path');

const dir = 'D:/aspire-college-mailsi/videos';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

function getDimensions(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(1024 * 1024);
  const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
  fs.closeSync(fd);

  for (let i = 0; i < bytesRead - 100; i++) {
    if (buffer.toString('ascii', i, i + 4) === 'tkhd') {
      const version = buffer.readUInt8(i + 4);
      let widthOffset = (version === 1) ? i + 88 : i + 76;
      let heightOffset = (version === 1) ? i + 92 : i + 80;
      
      const width = buffer.readUInt16BE(widthOffset);
      const height = buffer.readUInt16BE(heightOffset);
      if (width > 0 && height > 0) {
        return { width, height };
      }
    }
  }
  return null;
}

files.forEach(f => {
  const dims = getDimensions(path.join(dir, f));
  console.log(f, dims ? `${dims.width}x${dims.height}` : 'unknown dims');
});
