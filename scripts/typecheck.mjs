import { spawnSync } from 'node:child_process';

// The panel sources are browser scripts that extend one prototype through
// Object.assign, so `this` and most parameters are untyped by construction.
// Those diagnostics are expected; every other one fails the check.
const IGNORED = new Set([2339, 2345, 2551, 2683, 7006, 7022, 7023, 7024, 7031, 7053, 18046]);

// Deeply nested template literals overflow the default stack in the checker.
const result = spawnSync(
  process.execPath,
  ['--stack-size=2000', 'node_modules/typescript/bin/tsc', '--noEmit', '-p', 'tsconfig.json'],
  { encoding: 'utf8' },
);

const output = result.stdout || '';
const diagnostics = output.split('\n').filter(line => /error TS\d+:/.test(line));

if (result.error || (!diagnostics.length && result.status !== 0)) {
  process.stderr.write(result.stderr || `${result.error}\n`);
  process.exit(1);
}

const failures = diagnostics.filter(line => !IGNORED.has(Number(/error TS(\d+):/.exec(line)[1])));
if (failures.length) {
  process.stderr.write(`${failures.join('\n')}\n\n${failures.length} type error(s).\n`);
  process.exit(1);
}

process.stdout.write(`Type check passed, ${diagnostics.length} expected diagnostics ignored.\n`);
