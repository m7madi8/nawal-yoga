const fs = require("fs");
const src = fs.readFileSync("c:/Users/eslam/Desktop/projects/nowal aom/js/i18n.js", "utf8");

function extract(block) {
  const keys = {};
  const re = /^\s+(events_sh_[a-z0-9_]+):\s*'((?:\\'|[^'])*)'/gm;
  let m;
  while ((m = re.exec(block))) {
    keys[m[1]] = m[2].replace(/\\'/g, "'");
  }
  return keys;
}

function getKey(block, key) {
  const m = block.match(new RegExp(key + ":\\s*'((?:\\\\'|[^'])*)'"));
  return m ? m[1].replace(/\\'/g, "'") : "";
}

const enStart = src.indexOf("  en: {");
const arStart = src.indexOf("  ar: {");
if (enStart < 0 || arStart < 0) throw new Error("blocks not found");
const enBlock = src.slice(enStart, arStart);
const arBlock = src.slice(arStart);
const en = extract(enBlock);
const ar = extract(arBlock);
en.events_card_tag = getKey(enBlock, "events_card_tag");
ar.events_card_tag = getKey(arBlock, "events_card_tag");

function toTs(obj) {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, "$1:");
}

const out = `export const soundHealingCopy = ${toTs({ en, ar })} as const;\n`;
fs.writeFileSync(
  "c:/Users/eslam/Desktop/projects/nowal aom -upgrade/web/src/lib/i18n/sound-healing-copy.ts",
  out,
);
console.log("en", Object.keys(en).length, en.events_sh_greeting);
console.log("ar", Object.keys(ar).length, ar.events_sh_greeting);
