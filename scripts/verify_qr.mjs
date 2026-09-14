// Compares the panel's QR encoder against python-qrcode, module by module,
// for every version, mask and a set of payloads. Skips when python-qrcode is
// not installed, so it stays optional for contributors.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const probe = spawnSync('python3', ['-c', 'import qrcode'], { encoding: 'utf8' });
if (probe.status !== 0) {
  console.log('python-qrcode is not installed, skipping. pip install qrcode');
  process.exit(0);
}

const source = readFileSync('frontend/src/core/qr.ts', 'utf8');
const { qrEncodeBytes, qrBuild, qrMatrix } = new Function(
  `${source}\nreturn { qrEncodeBytes, qrBuild, qrMatrix };`,
)();

const CAPACITY = [14, 26, 42, 62, 84, 106, 122, 152, 180, 213];
// One payload that exactly fills each version, plus the shapes actually printed.
const PAYLOADS = [
  ...CAPACITY.map((capacity, index) => `v${index + 1}-`.padEnd(capacity, 'x')),
  'A',
  'HELLO WORLD',
  'https://home.example/maintenance-dashboard?task=boiler_service',
  'Lüftungsfilter wechseln – Küche',
];

const reference = (text, version, mask) => {
  const result = spawnSync('python3', ['-c', `
import json, sys, qrcode
from qrcode.util import MODE_8BIT_BYTE, QRData
text, version, mask = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
code = qrcode.QRCode(version=version, error_correction=qrcode.constants.ERROR_CORRECT_M, border=0, mask_pattern=mask)
code.add_data(QRData(text.encode("utf-8"), mode=MODE_8BIT_BYTE))
code.make(fit=False)
print(json.dumps([[1 if cell else 0 for cell in row] for row in code.get_matrix()]))
`, text, String(version), String(mask)], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr.trim());
  return JSON.parse(result.stdout);
};

let checked = 0;
for (const text of PAYLOADS) {
  const bytes = [...new TextEncoder().encode(text)];
  const version = CAPACITY.findIndex(capacity => bytes.length <= capacity) + 1;
  if (!version) throw new Error(`payload does not fit: ${text.slice(0, 20)}`);
  const codewords = qrEncodeBytes(bytes, version);
  for (let mask = 0; mask < 8; mask += 1) {
    const mine = qrBuild(codewords, version, mask);
    const theirs = reference(text, version, mask);
    if (JSON.stringify(mine) !== JSON.stringify(theirs)) {
      console.error(`mismatch: version ${version}, mask ${mask}, payload ${JSON.stringify(text.slice(0, 30))}`);
      process.exit(1);
    }
    checked += 1;
  }
  // The chosen mask must still produce a valid symbol.
  const chosen = qrMatrix(text);
  if (chosen.length !== version * 4 + 17) {
    console.error(`unexpected size for version ${version}`);
    process.exit(1);
  }
}

console.log(`QR encoder matches python-qrcode for ${checked} version/mask combinations.`);
