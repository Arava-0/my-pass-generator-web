import { CHARSETS, AMBIGUOUS } from "./charsets.js";

function secureRandomIndex(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  let value;
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);
  return value % max;
}

export function buildCharset(categories, symbolSet, excludeAmbiguous, exclude) {
  let charset = "";
  for (const cat of categories) {
    if (cat === "symbols" && symbolSet) {
      charset += symbolSet;
    } else {
      charset += CHARSETS[cat];
    }
  }

  if (excludeAmbiguous) {
    charset = charset.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
  }
  if (exclude) {
    charset = charset.split("").filter((c) => !exclude.includes(c)).join("");
  }

  return [...new Set(charset)].join("");
}

function getCategoryChars(cat, symbolSet, excludeAmbiguous, exclude) {
  let chars = cat === "symbols" && symbolSet ? symbolSet : CHARSETS[cat];
  if (excludeAmbiguous) {
    chars = chars.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
  }
  if (exclude) {
    chars = chars.split("").filter((c) => !exclude.includes(c)).join("");
  }
  return chars;
}

function formatPassword(password, config) {
  if (!config.blockSize) return password;
  const blocks = [];
  for (let i = 0; i < password.length; i += config.blockSize) {
    blocks.push(password.slice(i, i + config.blockSize));
  }
  return blocks.join(config.blockSeparator);
}

export function generate(config, charset) {
  const { length, categories, symbolSet, excludeAmbiguous, exclude, requireEach } = config;

  if (!requireEach || length < categories.length) {
    return formatPassword(
      Array.from({ length }, () => charset[secureRandomIndex(charset.length)]).join(""),
      config,
    );
  }

  const catChars = categories
    .map((c) => getCategoryChars(c, symbolSet, excludeAmbiguous, exclude))
    .filter((s) => s.length > 0);

  for (;;) {
    const password = Array.from(
      { length },
      () => charset[secureRandomIndex(charset.length)],
    ).join("");

    if (catChars.every((chars) => password.split("").some((c) => chars.includes(c)))) {
      return formatPassword(password, config);
    }
  }
}

export function generatePasswords(config) {
  if (config.categories.length === 0) return [];
  const charset = buildCharset(
    config.categories,
    config.symbolSet,
    config.excludeAmbiguous,
    config.exclude,
  );
  if (charset.length === 0) return [];
  return Array.from({ length: config.count }, () => generate(config, charset));
}
