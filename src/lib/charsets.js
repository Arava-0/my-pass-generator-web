export const CHARSETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:',.<>?/`~",
};

export const AMBIGUOUS = "0O1lI|`";
export const UNSAFE_ENV = "$#!`\\\"'{}()[]|;&<>~";

export const DEFAULT_SAFE_CONFIG = {
  length: 44,
  count: 1,
  categories: ["upper", "lower", "digits", "symbols"],
  symbolSet: null,
  excludeAmbiguous: true,
  exclude: UNSAFE_ENV,
  requireEach: true,
  blockSize: 11,
  blockSeparator: "-",
};

export const DEFAULT_RAW_CONFIG = {
  length: 32,
  count: 1,
  categories: ["upper", "lower", "digits", "symbols"],
  symbolSet: null,
  excludeAmbiguous: false,
  exclude: null,
  requireEach: true,
  blockSize: null,
  blockSeparator: "-",
};
