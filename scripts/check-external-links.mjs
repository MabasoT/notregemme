/**
 * Fails when any JSX element with target="_blank" lacks
 * rel="noopener noreferrer" (tabnapping). JSX spreads attributes over
 * several lines, so each element's opening tag is parsed as a whole.
 *
 * Usage: node scripts/check-external-links.mjs app components lib
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/** Collects every .tsx file under the given directories. */
function tsxFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return tsxFiles(path);
    return path.endsWith(".tsx") ? [path] : [];
  });
}

/** Returns the opening tag that contains `index`, braces-aware. */
function openingTag(source, index) {
  const start = source.lastIndexOf("<", index);
  let depth = 0;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (ch === ">" && depth === 0) return source.slice(start, i + 1);
  }
  return source.slice(start);
}

const offenders = [];
for (const file of process.argv.slice(2).flatMap(tsxFiles)) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/target="_blank"/g)) {
    if (!/rel="noopener noreferrer"/.test(openingTag(source, match.index))) {
      const line = source.slice(0, match.index).split("\n").length;
      offenders.push(`${file}:${line}`);
    }
  }
}

if (offenders.length > 0) {
  console.error(offenders.join("\n"));
  process.exit(1);
}
