// @ts-nocheck
// Byte mode QR encoder, error correction level M, versions 1 to 10. Printed
// labels have to work in a cellar with no internet, so no CDN and no runtime
// dependency. scripts/verify_qr.mjs checks the matrices against the reference
// implementation in python-qrcode.
const QR_EC_LEVEL_BITS = 0b00;
const QR_CAPACITY = [14, 26, 42, 62, 84, 106, 122, 152, 180, 213];
const QR_BLOCKS = [
  [10, [[1, 16]]],
  [16, [[1, 28]]],
  [26, [[1, 44]]],
  [18, [[2, 32]]],
  [24, [[2, 43]]],
  [16, [[4, 27]]],
  [18, [[4, 31]]],
  [22, [[2, 38], [2, 39]]],
  [22, [[3, 36], [2, 37]]],
  [26, [[4, 43], [1, 44]]],
];
const QR_ALIGNMENT = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];

const QR_EXP = new Array(512);
const QR_LOG = new Array(256);
for (let i = 0, value = 1; i < 255; i += 1) {
  QR_EXP[i] = value;
  QR_LOG[value] = i;
  value <<= 1;
  if (value & 0x100) value ^= 0x11d;
}
for (let i = 255; i < 512; i += 1) QR_EXP[i] = QR_EXP[i - 255];

function qrMultiply(a, b) {
  return a && b ? QR_EXP[QR_LOG[a] + QR_LOG[b]] : 0;
}

function qrGenerator(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i += 1) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j += 1) {
      next[j] ^= poly[j];
      next[j + 1] ^= qrMultiply(poly[j], QR_EXP[i]);
    }
    poly = next;
  }
  return poly;
}

function qrRemainder(data, degree) {
  const generator = qrGenerator(degree);
  const buffer = [...data, ...new Array(degree).fill(0)];
  for (let i = 0; i < data.length; i += 1) {
    const factor = buffer[i];
    if (!factor) continue;
    for (let j = 0; j < generator.length; j += 1) buffer[i + j] ^= qrMultiply(generator[j], factor);
  }
  return buffer.slice(data.length);
}

// BCH remainders for the format and version areas.
function qrBch(value, generator, bits) {
  let result = value << (bits - 1);
  const top = 1 << (bits + generator.toString(2).length - 2);
  for (let probe = top; probe >= 1 << (bits - 1); probe >>= 1) {
    if (result & probe) result ^= generator * (probe / (1 << (generator.toString(2).length - 1)));
  }
  return result;
}

function qrFormatBits(mask) {
  const data = (QR_EC_LEVEL_BITS << 3) | mask;
  let remainder = data << 10;
  for (let i = 4; i >= 0; i -= 1) {
    if (remainder & (1 << (i + 10))) remainder ^= 0x537 << i;
  }
  return ((data << 10) | remainder) ^ 0x5412;
}

function qrVersionBits(version) {
  let remainder = version << 12;
  for (let i = 5; i >= 0; i -= 1) {
    if (remainder & (1 << (i + 12))) remainder ^= 0x1f25 << i;
  }
  return (version << 12) | remainder;
}

function qrEncodeBytes(bytes, version) {
  const [ecPerBlock, groups] = QR_BLOCKS[version - 1];
  const countBits = version >= 10 ? 16 : 8;
  const bits = [];
  const push = (value, length) => {
    for (let i = length - 1; i >= 0; i -= 1) bits.push((value >> i) & 1);
  };
  push(0b0100, 4);
  push(bytes.length, countBits);
  for (const byte of bytes) push(byte, 8);

  const dataCodewords = groups.reduce((total, [count, size]) => total + count * size, 0);
  const capacityBits = dataCodewords * 8;
  push(0, Math.min(4, capacityBits - bits.length));
  while (bits.length % 8) bits.push(0);

  const codewords = [];
  for (let i = 0; i < bits.length; i += 8) {
    codewords.push(bits.slice(i, i + 8).reduce((value, bit) => (value << 1) | bit, 0));
  }
  for (let i = 0; codewords.length < dataCodewords; i += 1) codewords.push(i % 2 ? 0x11 : 0xec);

  const blocks = [];
  let offset = 0;
  for (const [count, size] of groups) {
    for (let i = 0; i < count; i += 1) {
      const data = codewords.slice(offset, offset + size);
      offset += size;
      blocks.push({ data, ec: qrRemainder(data, ecPerBlock) });
    }
  }

  const result = [];
  const longest = Math.max(...blocks.map(block => block.data.length));
  for (let i = 0; i < longest; i += 1) {
    for (const block of blocks) if (i < block.data.length) result.push(block.data[i]);
  }
  for (let i = 0; i < ecPerBlock; i += 1) {
    for (const block of blocks) result.push(block.ec[i]);
  }
  return result;
}

function qrPenalty(matrix) {
  const size = matrix.length;
  let score = 0;
  const run = line => {
    let total = 0;
    let length = 1;
    for (let i = 1; i < size; i += 1) {
      if (line[i] === line[i - 1]) {
        length += 1;
      } else {
        if (length >= 5) total += length - 2;
        length = 1;
      }
    }
    return total + (length >= 5 ? length - 2 : 0);
  };
  for (let i = 0; i < size; i += 1) {
    score += run(matrix[i]);
    score += run(matrix.map(row => row[i]));
  }
  for (let y = 0; y < size - 1; y += 1) {
    for (let x = 0; x < size - 1; x += 1) {
      const cell = matrix[y][x];
      if (cell === matrix[y][x + 1] && cell === matrix[y + 1][x] && cell === matrix[y + 1][x + 1]) score += 3;
    }
  }
  const pattern = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const reversed = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  const matches = line => {
    let total = 0;
    for (let i = 0; i + 11 <= size; i += 1) {
      const slice = line.slice(i, i + 11);
      if (slice.every((cell, index) => cell === pattern[index])) total += 40;
      if (slice.every((cell, index) => cell === reversed[index])) total += 40;
    }
    return total;
  };
  for (let i = 0; i < size; i += 1) {
    score += matches(matrix[i]);
    score += matches(matrix.map(row => row[i]));
  }
  const dark = matrix.flat().reduce((total, cell) => total + cell, 0);
  score += Math.floor(Math.abs((dark * 100) / (size * size) - 50) / 5) * 10;
  return score;
}

function qrMaskBit(mask, x, y) {
  switch (mask) {
    case 0: return (x + y) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (x + y) % 3 === 0;
    case 4: return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
    case 5: return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6: return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default: return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function qrBuild(codewords, version, mask) {
  const size = version * 4 + 17;
  const matrix = Array.from({ length: size }, () => new Array(size).fill(0));
  const reserved = Array.from({ length: size }, () => new Array(size).fill(false));

  const finder = (originX, originY) => {
    for (let y = -1; y <= 7; y += 1) {
      for (let x = -1; x <= 7; x += 1) {
        const px = originX + x;
        const py = originY + y;
        if (px < 0 || py < 0 || px >= size || py >= size) continue;
        const inside = x >= 0 && x <= 6 && y >= 0 && y <= 6;
        const edge = inside && (x === 0 || x === 6 || y === 0 || y === 6);
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        matrix[py][px] = edge || core ? 1 : 0;
        reserved[py][px] = true;
      }
    }
  };
  finder(0, 0);
  finder(size - 7, 0);
  finder(0, size - 7);

  for (let i = 8; i < size - 8; i += 1) {
    const bit = i % 2 === 0 ? 1 : 0;
    matrix[6][i] = bit;
    matrix[i][6] = bit;
    reserved[6][i] = true;
    reserved[i][6] = true;
  }

  const alignment = QR_ALIGNMENT[version - 1];
  const last = alignment[alignment.length - 1];
  for (const centerY of alignment) {
    for (const centerX of alignment) {
      // The three corners are taken by the finder patterns.
      if (centerX === 6 && centerY === 6) continue;
      if (centerX === 6 && centerY === last) continue;
      if (centerX === last && centerY === 6) continue;
      for (let y = -2; y <= 2; y += 1) {
        for (let x = -2; x <= 2; x += 1) {
          matrix[centerY + y][centerX + x] = Math.max(Math.abs(x), Math.abs(y)) !== 1 ? 1 : 0;
          reserved[centerY + y][centerX + x] = true;
        }
      }
    }
  }

  matrix[size - 8][8] = 1;
  reserved[size - 8][8] = true;
  for (let i = 0; i <= 8; i += 1) {
    if (i !== 6) { reserved[8][i] = true; reserved[i][8] = true; }
  }
  for (let i = 0; i < 8; i += 1) {
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }
  if (version >= 7) {
    for (let i = 0; i < 18; i += 1) {
      reserved[Math.floor(i / 3)][size - 11 + (i % 3)] = true;
      reserved[size - 11 + (i % 3)][Math.floor(i / 3)] = true;
    }
  }

  const bits = [];
  for (const codeword of codewords) {
    for (let i = 7; i >= 0; i -= 1) bits.push((codeword >> i) & 1);
  }
  let index = 0;
  let upward = true;
  for (let right = size - 1; right > 0; right -= 2) {
    if (right === 6) right = 5;
    for (let step = 0; step < size; step += 1) {
      const y = upward ? size - 1 - step : step;
      for (const x of [right, right - 1]) {
        if (reserved[y][x]) continue;
        const bit = index < bits.length ? bits[index] : 0;
        index += 1;
        matrix[y][x] = qrMaskBit(mask, x, y) ? bit ^ 1 : bit;
      }
    }
    upward = !upward;
  }

  const format = qrFormatBits(mask);
  for (let i = 0; i < 15; i += 1) {
    const bit = (format >> i) & 1;
    if (i < 6) matrix[i][8] = bit;
    else if (i === 6) matrix[7][8] = bit;
    else if (i === 7) matrix[8][8] = bit;
    else if (i === 8) matrix[8][7] = bit;
    else matrix[8][14 - i] = bit;

    if (i < 8) matrix[8][size - 1 - i] = bit;
    else matrix[size - 15 + i][8] = bit;
  }

  if (version >= 7) {
    const info = qrVersionBits(version);
    for (let i = 0; i < 18; i += 1) {
      const bit = (info >> i) & 1;
      matrix[Math.floor(i / 3)][size - 11 + (i % 3)] = bit;
      matrix[size - 11 + (i % 3)][Math.floor(i / 3)] = bit;
    }
  }
  return matrix;
}

function qrMatrix(text) {
  const bytes = [...new TextEncoder().encode(String(text))];
  const version = QR_CAPACITY.findIndex(capacity => bytes.length <= capacity) + 1;
  if (!version) throw new Error("qr: text too long");
  const codewords = qrEncodeBytes(bytes, version);
  let best = null;
  for (let mask = 0; mask < 8; mask += 1) {
    const matrix = qrBuild(codewords, version, mask);
    const penalty = qrPenalty(matrix);
    if (!best || penalty < best.penalty) best = { matrix, penalty };
  }
  return best.matrix;
}

function qrSvg(text, { size = 128, label = "" } = {}) {
  const matrix = qrMatrix(text);
  const quiet = 4;
  const span = matrix.length + quiet * 2;
  const path = [];
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix.length; x += 1) {
      if (matrix[y][x]) path.push(`M${x + quiet} ${y + quiet}h1v1h-1z`);
    }
  }
  return `<svg class="qr" viewBox="0 0 ${span} ${span}" width="${size}" height="${size}" role="img" aria-label="${label}" shape-rendering="crispEdges"><rect width="${span}" height="${span}" fill="#fff"></rect><path d="${path.join("")}" fill="#000"></path></svg>`;
}
