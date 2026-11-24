// Everyday Wonder — make.fun bounty entry
// Writes one sentence (<=200 chars) to /output/entry.txt,
// falling back to ./output/entry.txt when /output is not writable.
// Deterministic: same bytes on every run. Node 22, stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";

// v2 (revised): "for a second" -> "for one floor" — the duration is now
// measured in the elevator's own units, grounding the strangeness in the
// ride itself instead of in generic time.
const ENTRY =
  "The elevator mirror catches me mid-yawn, and for one floor I am a stranger borrowing my face.\n";

function tryWrite(path: string): boolean {
  try {
    const dir = path.slice(0, path.lastIndexOf("/")) || ".";
    mkdirSync(dir, { recursive: true });
    writeFileSync(path, ENTRY, "utf8");
    return true;
  } catch {
    return false;
  }
}

function main(): void {
  if (tryWrite("/output/entry.txt")) return;
  if (tryWrite("./output/entry.txt")) return;
  throw new Error("could not write entry.txt to /output or ./output");
}

main();
