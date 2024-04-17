import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import getURL from 'requrl';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import findIndex from '@dword-design/functions/dist/find-index.js';
import omit from '@dword-design/functions/dist/omit.js';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode$1(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode$1(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getMethod(event, defaultMethod = "GET") {
  return (event.node.req.method || defaultMethod).toUpperCase();
}
function isMethod(event, expected, allowHead) {
  if (allowHead && event.method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
const getHeaders = getRequestHeaders;
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send$1(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send$1(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
const appendHeader = appendResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send$1(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send$1(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send$1(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send$1(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send$1(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {
    "buildId": "3e66eebb-fa92-49de-b9c6-2bbb01e4014d"
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "vueEmail": {
      "baseUrl": "https://be-crafty.com",
      "playground": false,
      "autoImport": true,
      "useNuxtTailwind": true,
      "tailwind": {
        "theme": {
          "screens": {
            "sm": "640px",
            "md": "768px",
            "lg": "1024px",
            "xl": "1150px",
            "2xl": "1250px"
          },
          "aspectRatio": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "14": "14",
            "15": "15",
            "16": "16"
          },
          "typography": {
            "DEFAULT": {
              "css": [
                {
                  "color": "var(--tw-prose-body)",
                  "maxWidth": "65ch",
                  "p": {},
                  "[class~=\"lead\"]": {
                    "color": "var(--tw-prose-lead)"
                  },
                  "a": {
                    "color": "var(--tw-prose-links)",
                    "textDecoration": "underline",
                    "fontWeight": "500"
                  },
                  "strong": {
                    "color": "var(--tw-prose-bold)",
                    "fontWeight": "600"
                  },
                  "a strong": {
                    "color": "inherit"
                  },
                  "blockquote strong": {
                    "color": "inherit"
                  },
                  "thead th strong": {
                    "color": "inherit"
                  },
                  "ol": {
                    "listStyleType": "decimal"
                  },
                  "ol[type=\"A\"]": {
                    "listStyleType": "upper-alpha"
                  },
                  "ol[type=\"a\"]": {
                    "listStyleType": "lower-alpha"
                  },
                  "ol[type=\"A\" s]": {
                    "listStyleType": "upper-alpha"
                  },
                  "ol[type=\"a\" s]": {
                    "listStyleType": "lower-alpha"
                  },
                  "ol[type=\"I\"]": {
                    "listStyleType": "upper-roman"
                  },
                  "ol[type=\"i\"]": {
                    "listStyleType": "lower-roman"
                  },
                  "ol[type=\"I\" s]": {
                    "listStyleType": "upper-roman"
                  },
                  "ol[type=\"i\" s]": {
                    "listStyleType": "lower-roman"
                  },
                  "ol[type=\"1\"]": {
                    "listStyleType": "decimal"
                  },
                  "ul": {
                    "listStyleType": "disc"
                  },
                  "ol > li::marker": {
                    "fontWeight": "400",
                    "color": "var(--tw-prose-counters)"
                  },
                  "ul > li::marker": {
                    "color": "var(--tw-prose-bullets)"
                  },
                  "dt": {
                    "color": "var(--tw-prose-headings)",
                    "fontWeight": "600"
                  },
                  "hr": {
                    "borderColor": "var(--tw-prose-hr)",
                    "borderTopWidth": 1
                  },
                  "blockquote": {
                    "fontWeight": "500",
                    "fontStyle": "italic",
                    "color": "var(--tw-prose-quotes)",
                    "borderLeftWidth": "0.25rem",
                    "borderLeftColor": "var(--tw-prose-quote-borders)",
                    "quotes": "\"\\201C\"\"\\201D\"\"\\2018\"\"\\2019\""
                  },
                  "blockquote p:first-of-type::before": {
                    "content": "open-quote"
                  },
                  "blockquote p:last-of-type::after": {
                    "content": "close-quote"
                  },
                  "h1": {
                    "color": "var(--tw-prose-headings)",
                    "fontWeight": "800"
                  },
                  "h1 strong": {
                    "fontWeight": "900",
                    "color": "inherit"
                  },
                  "h2": {
                    "color": "var(--tw-prose-headings)",
                    "fontWeight": "700"
                  },
                  "h2 strong": {
                    "fontWeight": "800",
                    "color": "inherit"
                  },
                  "h3": {
                    "color": "var(--tw-prose-headings)",
                    "fontWeight": "600"
                  },
                  "h3 strong": {
                    "fontWeight": "700",
                    "color": "inherit"
                  },
                  "h4": {
                    "color": "var(--tw-prose-headings)",
                    "fontWeight": "600"
                  },
                  "h4 strong": {
                    "fontWeight": "700",
                    "color": "inherit"
                  },
                  "img": {},
                  "picture": {
                    "display": "block"
                  },
                  "kbd": {
                    "fontWeight": "500",
                    "fontFamily": "inherit",
                    "color": "var(--tw-prose-kbd)",
                    "boxShadow": "0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%)"
                  },
                  "code": {
                    "color": "var(--tw-prose-code)",
                    "fontWeight": "600"
                  },
                  "code::before": {
                    "content": "\"`\""
                  },
                  "code::after": {
                    "content": "\"`\""
                  },
                  "a code": {
                    "color": "inherit"
                  },
                  "h1 code": {
                    "color": "inherit"
                  },
                  "h2 code": {
                    "color": "inherit"
                  },
                  "h3 code": {
                    "color": "inherit"
                  },
                  "h4 code": {
                    "color": "inherit"
                  },
                  "blockquote code": {
                    "color": "inherit"
                  },
                  "thead th code": {
                    "color": "inherit"
                  },
                  "pre": {
                    "color": "var(--tw-prose-pre-code)",
                    "backgroundColor": "var(--tw-prose-pre-bg)",
                    "overflowX": "auto",
                    "fontWeight": "400"
                  },
                  "pre code": {
                    "backgroundColor": "transparent",
                    "borderWidth": "0",
                    "borderRadius": "0",
                    "padding": "0",
                    "fontWeight": "inherit",
                    "color": "inherit",
                    "fontSize": "inherit",
                    "fontFamily": "inherit",
                    "lineHeight": "inherit"
                  },
                  "pre code::before": {
                    "content": "none"
                  },
                  "pre code::after": {
                    "content": "none"
                  },
                  "table": {
                    "width": "100%",
                    "tableLayout": "auto",
                    "textAlign": "left",
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "thead": {
                    "borderBottomWidth": "1px",
                    "borderBottomColor": "var(--tw-prose-th-borders)"
                  },
                  "thead th": {
                    "color": "var(--tw-prose-headings)",
                    "fontWeight": "600",
                    "verticalAlign": "bottom"
                  },
                  "tbody tr": {
                    "borderBottomWidth": "1px",
                    "borderBottomColor": "var(--tw-prose-td-borders)"
                  },
                  "tbody tr:last-child": {
                    "borderBottomWidth": "0"
                  },
                  "tbody td": {
                    "verticalAlign": "baseline"
                  },
                  "tfoot": {
                    "borderTopWidth": "1px",
                    "borderTopColor": "var(--tw-prose-th-borders)"
                  },
                  "tfoot td": {
                    "verticalAlign": "top"
                  },
                  "figure > *": {},
                  "figcaption": {
                    "color": "var(--tw-prose-captions)"
                  }
                },
                {
                  "--tw-prose-body": "#374151",
                  "--tw-prose-headings": "#111827",
                  "--tw-prose-lead": "#4b5563",
                  "--tw-prose-links": "#111827",
                  "--tw-prose-bold": "#111827",
                  "--tw-prose-counters": "#6b7280",
                  "--tw-prose-bullets": "#d1d5db",
                  "--tw-prose-hr": "#e5e7eb",
                  "--tw-prose-quotes": "#111827",
                  "--tw-prose-quote-borders": "#e5e7eb",
                  "--tw-prose-captions": "#6b7280",
                  "--tw-prose-kbd": "#111827",
                  "--tw-prose-kbd-shadows": "17 24 39",
                  "--tw-prose-code": "#111827",
                  "--tw-prose-pre-code": "#e5e7eb",
                  "--tw-prose-pre-bg": "#1f2937",
                  "--tw-prose-th-borders": "#d1d5db",
                  "--tw-prose-td-borders": "#e5e7eb",
                  "--tw-prose-invert-body": "#d1d5db",
                  "--tw-prose-invert-headings": "#fff",
                  "--tw-prose-invert-lead": "#9ca3af",
                  "--tw-prose-invert-links": "#fff",
                  "--tw-prose-invert-bold": "#fff",
                  "--tw-prose-invert-counters": "#9ca3af",
                  "--tw-prose-invert-bullets": "#4b5563",
                  "--tw-prose-invert-hr": "#374151",
                  "--tw-prose-invert-quotes": "#f3f4f6",
                  "--tw-prose-invert-quote-borders": "#374151",
                  "--tw-prose-invert-captions": "#9ca3af",
                  "--tw-prose-invert-kbd": "#fff",
                  "--tw-prose-invert-kbd-shadows": "255 255 255",
                  "--tw-prose-invert-code": "#fff",
                  "--tw-prose-invert-pre-code": "#d1d5db",
                  "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                  "--tw-prose-invert-th-borders": "#4b5563",
                  "--tw-prose-invert-td-borders": "#374151"
                },
                {
                  "fontSize": "1rem",
                  "lineHeight": "1.75",
                  "p": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em"
                  },
                  "[class~=\"lead\"]": {
                    "fontSize": "1.25em",
                    "lineHeight": "1.6",
                    "marginTop": "1.2em",
                    "marginBottom": "1.2em"
                  },
                  "blockquote": {
                    "marginTop": "1.6em",
                    "marginBottom": "1.6em",
                    "paddingLeft": "1em"
                  },
                  "h1": {
                    "fontSize": "2.25em",
                    "marginTop": "0",
                    "marginBottom": "0.8888889em",
                    "lineHeight": "1.1111111"
                  },
                  "h2": {
                    "fontSize": "1.5em",
                    "marginTop": "2em",
                    "marginBottom": "1em",
                    "lineHeight": "1.3333333"
                  },
                  "h3": {
                    "fontSize": "1.25em",
                    "marginTop": "1.6em",
                    "marginBottom": "0.6em",
                    "lineHeight": "1.6"
                  },
                  "h4": {
                    "marginTop": "1.5em",
                    "marginBottom": "0.5em",
                    "lineHeight": "1.5"
                  },
                  "img": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture > img": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "video": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "kbd": {
                    "fontSize": "0.875em",
                    "borderRadius": "0.3125rem",
                    "paddingTop": "0.1875em",
                    "paddingRight": "0.375em",
                    "paddingBottom": "0.1875em",
                    "paddingLeft": "0.375em"
                  },
                  "code": {
                    "fontSize": "0.875em"
                  },
                  "h2 code": {
                    "fontSize": "0.875em"
                  },
                  "h3 code": {
                    "fontSize": "0.9em"
                  },
                  "pre": {
                    "fontSize": "0.875em",
                    "lineHeight": "1.7142857",
                    "marginTop": "1.7142857em",
                    "marginBottom": "1.7142857em",
                    "borderRadius": "0.375rem",
                    "paddingTop": "0.8571429em",
                    "paddingRight": "1.1428571em",
                    "paddingBottom": "0.8571429em",
                    "paddingLeft": "1.1428571em"
                  },
                  "ol": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em",
                    "paddingLeft": "1.625em"
                  },
                  "ul": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em",
                    "paddingLeft": "1.625em"
                  },
                  "li": {
                    "marginTop": "0.5em",
                    "marginBottom": "0.5em"
                  },
                  "ol > li": {
                    "paddingLeft": "0.375em"
                  },
                  "ul > li": {
                    "paddingLeft": "0.375em"
                  },
                  "> ul > li p": {
                    "marginTop": "0.75em",
                    "marginBottom": "0.75em"
                  },
                  "> ul > li > *:first-child": {
                    "marginTop": "1.25em"
                  },
                  "> ul > li > *:last-child": {
                    "marginBottom": "1.25em"
                  },
                  "> ol > li > *:first-child": {
                    "marginTop": "1.25em"
                  },
                  "> ol > li > *:last-child": {
                    "marginBottom": "1.25em"
                  },
                  "ul ul, ul ol, ol ul, ol ol": {
                    "marginTop": "0.75em",
                    "marginBottom": "0.75em"
                  },
                  "dl": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em"
                  },
                  "dt": {
                    "marginTop": "1.25em"
                  },
                  "dd": {
                    "marginTop": "0.5em",
                    "paddingLeft": "1.625em"
                  },
                  "hr": {
                    "marginTop": "3em",
                    "marginBottom": "3em"
                  },
                  "hr + *": {
                    "marginTop": "0"
                  },
                  "h2 + *": {
                    "marginTop": "0"
                  },
                  "h3 + *": {
                    "marginTop": "0"
                  },
                  "h4 + *": {
                    "marginTop": "0"
                  },
                  "table": {
                    "fontSize": "0.875em",
                    "lineHeight": "1.7142857"
                  },
                  "thead th": {
                    "paddingRight": "0.5714286em",
                    "paddingBottom": "0.5714286em",
                    "paddingLeft": "0.5714286em"
                  },
                  "thead th:first-child": {
                    "paddingLeft": "0"
                  },
                  "thead th:last-child": {
                    "paddingRight": "0"
                  },
                  "tbody td, tfoot td": {
                    "paddingTop": "0.5714286em",
                    "paddingRight": "0.5714286em",
                    "paddingBottom": "0.5714286em",
                    "paddingLeft": "0.5714286em"
                  },
                  "tbody td:first-child, tfoot td:first-child": {
                    "paddingLeft": "0"
                  },
                  "tbody td:last-child, tfoot td:last-child": {
                    "paddingRight": "0"
                  },
                  "figure": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "figure > *": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "figcaption": {
                    "fontSize": "0.875em",
                    "lineHeight": "1.4285714",
                    "marginTop": "0.8571429em"
                  }
                },
                {
                  "> :first-child": {
                    "marginTop": "0"
                  },
                  "> :last-child": {
                    "marginBottom": "0"
                  }
                }
              ]
            },
            "sm": {
              "css": [
                {
                  "fontSize": "0.875rem",
                  "lineHeight": "1.7142857",
                  "p": {
                    "marginTop": "1.1428571em",
                    "marginBottom": "1.1428571em"
                  },
                  "[class~=\"lead\"]": {
                    "fontSize": "1.2857143em",
                    "lineHeight": "1.5555556",
                    "marginTop": "0.8888889em",
                    "marginBottom": "0.8888889em"
                  },
                  "blockquote": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em",
                    "paddingLeft": "1.1111111em"
                  },
                  "h1": {
                    "fontSize": "2.1428571em",
                    "marginTop": "0",
                    "marginBottom": "0.8em",
                    "lineHeight": "1.2"
                  },
                  "h2": {
                    "fontSize": "1.4285714em",
                    "marginTop": "1.6em",
                    "marginBottom": "0.8em",
                    "lineHeight": "1.4"
                  },
                  "h3": {
                    "fontSize": "1.2857143em",
                    "marginTop": "1.5555556em",
                    "marginBottom": "0.4444444em",
                    "lineHeight": "1.5555556"
                  },
                  "h4": {
                    "marginTop": "1.4285714em",
                    "marginBottom": "0.5714286em",
                    "lineHeight": "1.4285714"
                  },
                  "img": {
                    "marginTop": "1.7142857em",
                    "marginBottom": "1.7142857em"
                  },
                  "picture": {
                    "marginTop": "1.7142857em",
                    "marginBottom": "1.7142857em"
                  },
                  "picture > img": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "video": {
                    "marginTop": "1.7142857em",
                    "marginBottom": "1.7142857em"
                  },
                  "kbd": {
                    "fontSize": "0.8571429em",
                    "borderRadius": "0.3125rem",
                    "paddingTop": "0.1428571em",
                    "paddingRight": "0.3571429em",
                    "paddingBottom": "0.1428571em",
                    "paddingLeft": "0.3571429em"
                  },
                  "code": {
                    "fontSize": "0.8571429em"
                  },
                  "h2 code": {
                    "fontSize": "0.9em"
                  },
                  "h3 code": {
                    "fontSize": "0.8888889em"
                  },
                  "pre": {
                    "fontSize": "0.8571429em",
                    "lineHeight": "1.6666667",
                    "marginTop": "1.6666667em",
                    "marginBottom": "1.6666667em",
                    "borderRadius": "0.25rem",
                    "paddingTop": "0.6666667em",
                    "paddingRight": "1em",
                    "paddingBottom": "0.6666667em",
                    "paddingLeft": "1em"
                  },
                  "ol": {
                    "marginTop": "1.1428571em",
                    "marginBottom": "1.1428571em",
                    "paddingLeft": "1.5714286em"
                  },
                  "ul": {
                    "marginTop": "1.1428571em",
                    "marginBottom": "1.1428571em",
                    "paddingLeft": "1.5714286em"
                  },
                  "li": {
                    "marginTop": "0.2857143em",
                    "marginBottom": "0.2857143em"
                  },
                  "ol > li": {
                    "paddingLeft": "0.4285714em"
                  },
                  "ul > li": {
                    "paddingLeft": "0.4285714em"
                  },
                  "> ul > li p": {
                    "marginTop": "0.5714286em",
                    "marginBottom": "0.5714286em"
                  },
                  "> ul > li > *:first-child": {
                    "marginTop": "1.1428571em"
                  },
                  "> ul > li > *:last-child": {
                    "marginBottom": "1.1428571em"
                  },
                  "> ol > li > *:first-child": {
                    "marginTop": "1.1428571em"
                  },
                  "> ol > li > *:last-child": {
                    "marginBottom": "1.1428571em"
                  },
                  "ul ul, ul ol, ol ul, ol ol": {
                    "marginTop": "0.5714286em",
                    "marginBottom": "0.5714286em"
                  },
                  "dl": {
                    "marginTop": "1.1428571em",
                    "marginBottom": "1.1428571em"
                  },
                  "dt": {
                    "marginTop": "1.1428571em"
                  },
                  "dd": {
                    "marginTop": "0.2857143em",
                    "paddingLeft": "1.5714286em"
                  },
                  "hr": {
                    "marginTop": "2.8571429em",
                    "marginBottom": "2.8571429em"
                  },
                  "hr + *": {
                    "marginTop": "0"
                  },
                  "h2 + *": {
                    "marginTop": "0"
                  },
                  "h3 + *": {
                    "marginTop": "0"
                  },
                  "h4 + *": {
                    "marginTop": "0"
                  },
                  "table": {
                    "fontSize": "0.8571429em",
                    "lineHeight": "1.5"
                  },
                  "thead th": {
                    "paddingRight": "1em",
                    "paddingBottom": "0.6666667em",
                    "paddingLeft": "1em"
                  },
                  "thead th:first-child": {
                    "paddingLeft": "0"
                  },
                  "thead th:last-child": {
                    "paddingRight": "0"
                  },
                  "tbody td, tfoot td": {
                    "paddingTop": "0.6666667em",
                    "paddingRight": "1em",
                    "paddingBottom": "0.6666667em",
                    "paddingLeft": "1em"
                  },
                  "tbody td:first-child, tfoot td:first-child": {
                    "paddingLeft": "0"
                  },
                  "tbody td:last-child, tfoot td:last-child": {
                    "paddingRight": "0"
                  },
                  "figure": {
                    "marginTop": "1.7142857em",
                    "marginBottom": "1.7142857em"
                  },
                  "figure > *": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "figcaption": {
                    "fontSize": "0.8571429em",
                    "lineHeight": "1.3333333",
                    "marginTop": "0.6666667em"
                  }
                },
                {
                  "> :first-child": {
                    "marginTop": "0"
                  },
                  "> :last-child": {
                    "marginBottom": "0"
                  }
                }
              ]
            },
            "base": {
              "css": [
                {
                  "fontSize": "1rem",
                  "lineHeight": "1.75",
                  "p": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em"
                  },
                  "[class~=\"lead\"]": {
                    "fontSize": "1.25em",
                    "lineHeight": "1.6",
                    "marginTop": "1.2em",
                    "marginBottom": "1.2em"
                  },
                  "blockquote": {
                    "marginTop": "1.6em",
                    "marginBottom": "1.6em",
                    "paddingLeft": "1em"
                  },
                  "h1": {
                    "fontSize": "2.25em",
                    "marginTop": "0",
                    "marginBottom": "0.8888889em",
                    "lineHeight": "1.1111111"
                  },
                  "h2": {
                    "fontSize": "1.5em",
                    "marginTop": "2em",
                    "marginBottom": "1em",
                    "lineHeight": "1.3333333"
                  },
                  "h3": {
                    "fontSize": "1.25em",
                    "marginTop": "1.6em",
                    "marginBottom": "0.6em",
                    "lineHeight": "1.6"
                  },
                  "h4": {
                    "marginTop": "1.5em",
                    "marginBottom": "0.5em",
                    "lineHeight": "1.5"
                  },
                  "img": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture > img": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "video": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "kbd": {
                    "fontSize": "0.875em",
                    "borderRadius": "0.3125rem",
                    "paddingTop": "0.1875em",
                    "paddingRight": "0.375em",
                    "paddingBottom": "0.1875em",
                    "paddingLeft": "0.375em"
                  },
                  "code": {
                    "fontSize": "0.875em"
                  },
                  "h2 code": {
                    "fontSize": "0.875em"
                  },
                  "h3 code": {
                    "fontSize": "0.9em"
                  },
                  "pre": {
                    "fontSize": "0.875em",
                    "lineHeight": "1.7142857",
                    "marginTop": "1.7142857em",
                    "marginBottom": "1.7142857em",
                    "borderRadius": "0.375rem",
                    "paddingTop": "0.8571429em",
                    "paddingRight": "1.1428571em",
                    "paddingBottom": "0.8571429em",
                    "paddingLeft": "1.1428571em"
                  },
                  "ol": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em",
                    "paddingLeft": "1.625em"
                  },
                  "ul": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em",
                    "paddingLeft": "1.625em"
                  },
                  "li": {
                    "marginTop": "0.5em",
                    "marginBottom": "0.5em"
                  },
                  "ol > li": {
                    "paddingLeft": "0.375em"
                  },
                  "ul > li": {
                    "paddingLeft": "0.375em"
                  },
                  "> ul > li p": {
                    "marginTop": "0.75em",
                    "marginBottom": "0.75em"
                  },
                  "> ul > li > *:first-child": {
                    "marginTop": "1.25em"
                  },
                  "> ul > li > *:last-child": {
                    "marginBottom": "1.25em"
                  },
                  "> ol > li > *:first-child": {
                    "marginTop": "1.25em"
                  },
                  "> ol > li > *:last-child": {
                    "marginBottom": "1.25em"
                  },
                  "ul ul, ul ol, ol ul, ol ol": {
                    "marginTop": "0.75em",
                    "marginBottom": "0.75em"
                  },
                  "dl": {
                    "marginTop": "1.25em",
                    "marginBottom": "1.25em"
                  },
                  "dt": {
                    "marginTop": "1.25em"
                  },
                  "dd": {
                    "marginTop": "0.5em",
                    "paddingLeft": "1.625em"
                  },
                  "hr": {
                    "marginTop": "3em",
                    "marginBottom": "3em"
                  },
                  "hr + *": {
                    "marginTop": "0"
                  },
                  "h2 + *": {
                    "marginTop": "0"
                  },
                  "h3 + *": {
                    "marginTop": "0"
                  },
                  "h4 + *": {
                    "marginTop": "0"
                  },
                  "table": {
                    "fontSize": "0.875em",
                    "lineHeight": "1.7142857"
                  },
                  "thead th": {
                    "paddingRight": "0.5714286em",
                    "paddingBottom": "0.5714286em",
                    "paddingLeft": "0.5714286em"
                  },
                  "thead th:first-child": {
                    "paddingLeft": "0"
                  },
                  "thead th:last-child": {
                    "paddingRight": "0"
                  },
                  "tbody td, tfoot td": {
                    "paddingTop": "0.5714286em",
                    "paddingRight": "0.5714286em",
                    "paddingBottom": "0.5714286em",
                    "paddingLeft": "0.5714286em"
                  },
                  "tbody td:first-child, tfoot td:first-child": {
                    "paddingLeft": "0"
                  },
                  "tbody td:last-child, tfoot td:last-child": {
                    "paddingRight": "0"
                  },
                  "figure": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "figure > *": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "figcaption": {
                    "fontSize": "0.875em",
                    "lineHeight": "1.4285714",
                    "marginTop": "0.8571429em"
                  }
                },
                {
                  "> :first-child": {
                    "marginTop": "0"
                  },
                  "> :last-child": {
                    "marginBottom": "0"
                  }
                }
              ]
            },
            "lg": {
              "css": [
                {
                  "fontSize": "1.125rem",
                  "lineHeight": "1.7777778",
                  "p": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em"
                  },
                  "[class~=\"lead\"]": {
                    "fontSize": "1.2222222em",
                    "lineHeight": "1.4545455",
                    "marginTop": "1.0909091em",
                    "marginBottom": "1.0909091em"
                  },
                  "blockquote": {
                    "marginTop": "1.6666667em",
                    "marginBottom": "1.6666667em",
                    "paddingLeft": "1em"
                  },
                  "h1": {
                    "fontSize": "2.6666667em",
                    "marginTop": "0",
                    "marginBottom": "0.8333333em",
                    "lineHeight": "1"
                  },
                  "h2": {
                    "fontSize": "1.6666667em",
                    "marginTop": "1.8666667em",
                    "marginBottom": "1.0666667em",
                    "lineHeight": "1.3333333"
                  },
                  "h3": {
                    "fontSize": "1.3333333em",
                    "marginTop": "1.6666667em",
                    "marginBottom": "0.6666667em",
                    "lineHeight": "1.5"
                  },
                  "h4": {
                    "marginTop": "1.7777778em",
                    "marginBottom": "0.4444444em",
                    "lineHeight": "1.5555556"
                  },
                  "img": {
                    "marginTop": "1.7777778em",
                    "marginBottom": "1.7777778em"
                  },
                  "picture": {
                    "marginTop": "1.7777778em",
                    "marginBottom": "1.7777778em"
                  },
                  "picture > img": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "video": {
                    "marginTop": "1.7777778em",
                    "marginBottom": "1.7777778em"
                  },
                  "kbd": {
                    "fontSize": "0.8888889em",
                    "borderRadius": "0.3125rem",
                    "paddingTop": "0.2222222em",
                    "paddingRight": "0.4444444em",
                    "paddingBottom": "0.2222222em",
                    "paddingLeft": "0.4444444em"
                  },
                  "code": {
                    "fontSize": "0.8888889em"
                  },
                  "h2 code": {
                    "fontSize": "0.8666667em"
                  },
                  "h3 code": {
                    "fontSize": "0.875em"
                  },
                  "pre": {
                    "fontSize": "0.8888889em",
                    "lineHeight": "1.75",
                    "marginTop": "2em",
                    "marginBottom": "2em",
                    "borderRadius": "0.375rem",
                    "paddingTop": "1em",
                    "paddingRight": "1.5em",
                    "paddingBottom": "1em",
                    "paddingLeft": "1.5em"
                  },
                  "ol": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em",
                    "paddingLeft": "1.5555556em"
                  },
                  "ul": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em",
                    "paddingLeft": "1.5555556em"
                  },
                  "li": {
                    "marginTop": "0.6666667em",
                    "marginBottom": "0.6666667em"
                  },
                  "ol > li": {
                    "paddingLeft": "0.4444444em"
                  },
                  "ul > li": {
                    "paddingLeft": "0.4444444em"
                  },
                  "> ul > li p": {
                    "marginTop": "0.8888889em",
                    "marginBottom": "0.8888889em"
                  },
                  "> ul > li > *:first-child": {
                    "marginTop": "1.3333333em"
                  },
                  "> ul > li > *:last-child": {
                    "marginBottom": "1.3333333em"
                  },
                  "> ol > li > *:first-child": {
                    "marginTop": "1.3333333em"
                  },
                  "> ol > li > *:last-child": {
                    "marginBottom": "1.3333333em"
                  },
                  "ul ul, ul ol, ol ul, ol ol": {
                    "marginTop": "0.8888889em",
                    "marginBottom": "0.8888889em"
                  },
                  "dl": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em"
                  },
                  "dt": {
                    "marginTop": "1.3333333em"
                  },
                  "dd": {
                    "marginTop": "0.6666667em",
                    "paddingLeft": "1.5555556em"
                  },
                  "hr": {
                    "marginTop": "3.1111111em",
                    "marginBottom": "3.1111111em"
                  },
                  "hr + *": {
                    "marginTop": "0"
                  },
                  "h2 + *": {
                    "marginTop": "0"
                  },
                  "h3 + *": {
                    "marginTop": "0"
                  },
                  "h4 + *": {
                    "marginTop": "0"
                  },
                  "table": {
                    "fontSize": "0.8888889em",
                    "lineHeight": "1.5"
                  },
                  "thead th": {
                    "paddingRight": "0.75em",
                    "paddingBottom": "0.75em",
                    "paddingLeft": "0.75em"
                  },
                  "thead th:first-child": {
                    "paddingLeft": "0"
                  },
                  "thead th:last-child": {
                    "paddingRight": "0"
                  },
                  "tbody td, tfoot td": {
                    "paddingTop": "0.75em",
                    "paddingRight": "0.75em",
                    "paddingBottom": "0.75em",
                    "paddingLeft": "0.75em"
                  },
                  "tbody td:first-child, tfoot td:first-child": {
                    "paddingLeft": "0"
                  },
                  "tbody td:last-child, tfoot td:last-child": {
                    "paddingRight": "0"
                  },
                  "figure": {
                    "marginTop": "1.7777778em",
                    "marginBottom": "1.7777778em"
                  },
                  "figure > *": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "figcaption": {
                    "fontSize": "0.8888889em",
                    "lineHeight": "1.5",
                    "marginTop": "1em"
                  }
                },
                {
                  "> :first-child": {
                    "marginTop": "0"
                  },
                  "> :last-child": {
                    "marginBottom": "0"
                  }
                }
              ]
            },
            "xl": {
              "css": [
                {
                  "fontSize": "1.25rem",
                  "lineHeight": "1.8",
                  "p": {
                    "marginTop": "1.2em",
                    "marginBottom": "1.2em"
                  },
                  "[class~=\"lead\"]": {
                    "fontSize": "1.2em",
                    "lineHeight": "1.5",
                    "marginTop": "1em",
                    "marginBottom": "1em"
                  },
                  "blockquote": {
                    "marginTop": "1.6em",
                    "marginBottom": "1.6em",
                    "paddingLeft": "1.0666667em"
                  },
                  "h1": {
                    "fontSize": "2.8em",
                    "marginTop": "0",
                    "marginBottom": "0.8571429em",
                    "lineHeight": "1"
                  },
                  "h2": {
                    "fontSize": "1.8em",
                    "marginTop": "1.5555556em",
                    "marginBottom": "0.8888889em",
                    "lineHeight": "1.1111111"
                  },
                  "h3": {
                    "fontSize": "1.5em",
                    "marginTop": "1.6em",
                    "marginBottom": "0.6666667em",
                    "lineHeight": "1.3333333"
                  },
                  "h4": {
                    "marginTop": "1.8em",
                    "marginBottom": "0.6em",
                    "lineHeight": "1.6"
                  },
                  "img": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture > img": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "video": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "kbd": {
                    "fontSize": "0.9em",
                    "borderRadius": "0.3125rem",
                    "paddingTop": "0.25em",
                    "paddingRight": "0.4em",
                    "paddingBottom": "0.25em",
                    "paddingLeft": "0.4em"
                  },
                  "code": {
                    "fontSize": "0.9em"
                  },
                  "h2 code": {
                    "fontSize": "0.8611111em"
                  },
                  "h3 code": {
                    "fontSize": "0.9em"
                  },
                  "pre": {
                    "fontSize": "0.9em",
                    "lineHeight": "1.7777778",
                    "marginTop": "2em",
                    "marginBottom": "2em",
                    "borderRadius": "0.5rem",
                    "paddingTop": "1.1111111em",
                    "paddingRight": "1.3333333em",
                    "paddingBottom": "1.1111111em",
                    "paddingLeft": "1.3333333em"
                  },
                  "ol": {
                    "marginTop": "1.2em",
                    "marginBottom": "1.2em",
                    "paddingLeft": "1.6em"
                  },
                  "ul": {
                    "marginTop": "1.2em",
                    "marginBottom": "1.2em",
                    "paddingLeft": "1.6em"
                  },
                  "li": {
                    "marginTop": "0.6em",
                    "marginBottom": "0.6em"
                  },
                  "ol > li": {
                    "paddingLeft": "0.4em"
                  },
                  "ul > li": {
                    "paddingLeft": "0.4em"
                  },
                  "> ul > li p": {
                    "marginTop": "0.8em",
                    "marginBottom": "0.8em"
                  },
                  "> ul > li > *:first-child": {
                    "marginTop": "1.2em"
                  },
                  "> ul > li > *:last-child": {
                    "marginBottom": "1.2em"
                  },
                  "> ol > li > *:first-child": {
                    "marginTop": "1.2em"
                  },
                  "> ol > li > *:last-child": {
                    "marginBottom": "1.2em"
                  },
                  "ul ul, ul ol, ol ul, ol ol": {
                    "marginTop": "0.8em",
                    "marginBottom": "0.8em"
                  },
                  "dl": {
                    "marginTop": "1.2em",
                    "marginBottom": "1.2em"
                  },
                  "dt": {
                    "marginTop": "1.2em"
                  },
                  "dd": {
                    "marginTop": "0.6em",
                    "paddingLeft": "1.6em"
                  },
                  "hr": {
                    "marginTop": "2.8em",
                    "marginBottom": "2.8em"
                  },
                  "hr + *": {
                    "marginTop": "0"
                  },
                  "h2 + *": {
                    "marginTop": "0"
                  },
                  "h3 + *": {
                    "marginTop": "0"
                  },
                  "h4 + *": {
                    "marginTop": "0"
                  },
                  "table": {
                    "fontSize": "0.9em",
                    "lineHeight": "1.5555556"
                  },
                  "thead th": {
                    "paddingRight": "0.6666667em",
                    "paddingBottom": "0.8888889em",
                    "paddingLeft": "0.6666667em"
                  },
                  "thead th:first-child": {
                    "paddingLeft": "0"
                  },
                  "thead th:last-child": {
                    "paddingRight": "0"
                  },
                  "tbody td, tfoot td": {
                    "paddingTop": "0.8888889em",
                    "paddingRight": "0.6666667em",
                    "paddingBottom": "0.8888889em",
                    "paddingLeft": "0.6666667em"
                  },
                  "tbody td:first-child, tfoot td:first-child": {
                    "paddingLeft": "0"
                  },
                  "tbody td:last-child, tfoot td:last-child": {
                    "paddingRight": "0"
                  },
                  "figure": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "figure > *": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "figcaption": {
                    "fontSize": "0.9em",
                    "lineHeight": "1.5555556",
                    "marginTop": "1em"
                  }
                },
                {
                  "> :first-child": {
                    "marginTop": "0"
                  },
                  "> :last-child": {
                    "marginBottom": "0"
                  }
                }
              ]
            },
            "2xl": {
              "css": [
                {
                  "fontSize": "1.5rem",
                  "lineHeight": "1.6666667",
                  "p": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em"
                  },
                  "[class~=\"lead\"]": {
                    "fontSize": "1.25em",
                    "lineHeight": "1.4666667",
                    "marginTop": "1.0666667em",
                    "marginBottom": "1.0666667em"
                  },
                  "blockquote": {
                    "marginTop": "1.7777778em",
                    "marginBottom": "1.7777778em",
                    "paddingLeft": "1.1111111em"
                  },
                  "h1": {
                    "fontSize": "2.6666667em",
                    "marginTop": "0",
                    "marginBottom": "0.875em",
                    "lineHeight": "1"
                  },
                  "h2": {
                    "fontSize": "2em",
                    "marginTop": "1.5em",
                    "marginBottom": "0.8333333em",
                    "lineHeight": "1.0833333"
                  },
                  "h3": {
                    "fontSize": "1.5em",
                    "marginTop": "1.5555556em",
                    "marginBottom": "0.6666667em",
                    "lineHeight": "1.2222222"
                  },
                  "h4": {
                    "marginTop": "1.6666667em",
                    "marginBottom": "0.6666667em",
                    "lineHeight": "1.5"
                  },
                  "img": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "picture > img": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "video": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "kbd": {
                    "fontSize": "0.8333333em",
                    "borderRadius": "0.375rem",
                    "paddingTop": "0.25em",
                    "paddingRight": "0.3333333em",
                    "paddingBottom": "0.25em",
                    "paddingLeft": "0.3333333em"
                  },
                  "code": {
                    "fontSize": "0.8333333em"
                  },
                  "h2 code": {
                    "fontSize": "0.875em"
                  },
                  "h3 code": {
                    "fontSize": "0.8888889em"
                  },
                  "pre": {
                    "fontSize": "0.8333333em",
                    "lineHeight": "1.8",
                    "marginTop": "2em",
                    "marginBottom": "2em",
                    "borderRadius": "0.5rem",
                    "paddingTop": "1.2em",
                    "paddingRight": "1.6em",
                    "paddingBottom": "1.2em",
                    "paddingLeft": "1.6em"
                  },
                  "ol": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em",
                    "paddingLeft": "1.5833333em"
                  },
                  "ul": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em",
                    "paddingLeft": "1.5833333em"
                  },
                  "li": {
                    "marginTop": "0.5em",
                    "marginBottom": "0.5em"
                  },
                  "ol > li": {
                    "paddingLeft": "0.4166667em"
                  },
                  "ul > li": {
                    "paddingLeft": "0.4166667em"
                  },
                  "> ul > li p": {
                    "marginTop": "0.8333333em",
                    "marginBottom": "0.8333333em"
                  },
                  "> ul > li > *:first-child": {
                    "marginTop": "1.3333333em"
                  },
                  "> ul > li > *:last-child": {
                    "marginBottom": "1.3333333em"
                  },
                  "> ol > li > *:first-child": {
                    "marginTop": "1.3333333em"
                  },
                  "> ol > li > *:last-child": {
                    "marginBottom": "1.3333333em"
                  },
                  "ul ul, ul ol, ol ul, ol ol": {
                    "marginTop": "0.6666667em",
                    "marginBottom": "0.6666667em"
                  },
                  "dl": {
                    "marginTop": "1.3333333em",
                    "marginBottom": "1.3333333em"
                  },
                  "dt": {
                    "marginTop": "1.3333333em"
                  },
                  "dd": {
                    "marginTop": "0.5em",
                    "paddingLeft": "1.5833333em"
                  },
                  "hr": {
                    "marginTop": "3em",
                    "marginBottom": "3em"
                  },
                  "hr + *": {
                    "marginTop": "0"
                  },
                  "h2 + *": {
                    "marginTop": "0"
                  },
                  "h3 + *": {
                    "marginTop": "0"
                  },
                  "h4 + *": {
                    "marginTop": "0"
                  },
                  "table": {
                    "fontSize": "0.8333333em",
                    "lineHeight": "1.4"
                  },
                  "thead th": {
                    "paddingRight": "0.6em",
                    "paddingBottom": "0.8em",
                    "paddingLeft": "0.6em"
                  },
                  "thead th:first-child": {
                    "paddingLeft": "0"
                  },
                  "thead th:last-child": {
                    "paddingRight": "0"
                  },
                  "tbody td, tfoot td": {
                    "paddingTop": "0.8em",
                    "paddingRight": "0.6em",
                    "paddingBottom": "0.8em",
                    "paddingLeft": "0.6em"
                  },
                  "tbody td:first-child, tfoot td:first-child": {
                    "paddingLeft": "0"
                  },
                  "tbody td:last-child, tfoot td:last-child": {
                    "paddingRight": "0"
                  },
                  "figure": {
                    "marginTop": "2em",
                    "marginBottom": "2em"
                  },
                  "figure > *": {
                    "marginTop": "0",
                    "marginBottom": "0"
                  },
                  "figcaption": {
                    "fontSize": "0.8333333em",
                    "lineHeight": "1.6",
                    "marginTop": "1em"
                  }
                },
                {
                  "> :first-child": {
                    "marginTop": "0"
                  },
                  "> :last-child": {
                    "marginBottom": "0"
                  }
                }
              ]
            },
            "slate": {
              "css": {
                "--tw-prose-body": "#334155",
                "--tw-prose-headings": "#0f172a",
                "--tw-prose-lead": "#475569",
                "--tw-prose-links": "#0f172a",
                "--tw-prose-bold": "#0f172a",
                "--tw-prose-counters": "#64748b",
                "--tw-prose-bullets": "#cbd5e1",
                "--tw-prose-hr": "#e2e8f0",
                "--tw-prose-quotes": "#0f172a",
                "--tw-prose-quote-borders": "#e2e8f0",
                "--tw-prose-captions": "#64748b",
                "--tw-prose-kbd": "#0f172a",
                "--tw-prose-kbd-shadows": "15 23 42",
                "--tw-prose-code": "#0f172a",
                "--tw-prose-pre-code": "#e2e8f0",
                "--tw-prose-pre-bg": "#1e293b",
                "--tw-prose-th-borders": "#cbd5e1",
                "--tw-prose-td-borders": "#e2e8f0",
                "--tw-prose-invert-body": "#cbd5e1",
                "--tw-prose-invert-headings": "#fff",
                "--tw-prose-invert-lead": "#94a3b8",
                "--tw-prose-invert-links": "#fff",
                "--tw-prose-invert-bold": "#fff",
                "--tw-prose-invert-counters": "#94a3b8",
                "--tw-prose-invert-bullets": "#475569",
                "--tw-prose-invert-hr": "#334155",
                "--tw-prose-invert-quotes": "#f1f5f9",
                "--tw-prose-invert-quote-borders": "#334155",
                "--tw-prose-invert-captions": "#94a3b8",
                "--tw-prose-invert-kbd": "#fff",
                "--tw-prose-invert-kbd-shadows": "255 255 255",
                "--tw-prose-invert-code": "#fff",
                "--tw-prose-invert-pre-code": "#cbd5e1",
                "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                "--tw-prose-invert-th-borders": "#475569",
                "--tw-prose-invert-td-borders": "#334155"
              }
            },
            "gray": {
              "css": {
                "--tw-prose-body": "#374151",
                "--tw-prose-headings": "#111827",
                "--tw-prose-lead": "#4b5563",
                "--tw-prose-links": "#111827",
                "--tw-prose-bold": "#111827",
                "--tw-prose-counters": "#6b7280",
                "--tw-prose-bullets": "#d1d5db",
                "--tw-prose-hr": "#e5e7eb",
                "--tw-prose-quotes": "#111827",
                "--tw-prose-quote-borders": "#e5e7eb",
                "--tw-prose-captions": "#6b7280",
                "--tw-prose-kbd": "#111827",
                "--tw-prose-kbd-shadows": "17 24 39",
                "--tw-prose-code": "#111827",
                "--tw-prose-pre-code": "#e5e7eb",
                "--tw-prose-pre-bg": "#1f2937",
                "--tw-prose-th-borders": "#d1d5db",
                "--tw-prose-td-borders": "#e5e7eb",
                "--tw-prose-invert-body": "#d1d5db",
                "--tw-prose-invert-headings": "#fff",
                "--tw-prose-invert-lead": "#9ca3af",
                "--tw-prose-invert-links": "#fff",
                "--tw-prose-invert-bold": "#fff",
                "--tw-prose-invert-counters": "#9ca3af",
                "--tw-prose-invert-bullets": "#4b5563",
                "--tw-prose-invert-hr": "#374151",
                "--tw-prose-invert-quotes": "#f3f4f6",
                "--tw-prose-invert-quote-borders": "#374151",
                "--tw-prose-invert-captions": "#9ca3af",
                "--tw-prose-invert-kbd": "#fff",
                "--tw-prose-invert-kbd-shadows": "255 255 255",
                "--tw-prose-invert-code": "#fff",
                "--tw-prose-invert-pre-code": "#d1d5db",
                "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                "--tw-prose-invert-th-borders": "#4b5563",
                "--tw-prose-invert-td-borders": "#374151"
              }
            },
            "zinc": {
              "css": {
                "--tw-prose-body": "#3f3f46",
                "--tw-prose-headings": "#18181b",
                "--tw-prose-lead": "#52525b",
                "--tw-prose-links": "#18181b",
                "--tw-prose-bold": "#18181b",
                "--tw-prose-counters": "#71717a",
                "--tw-prose-bullets": "#d4d4d8",
                "--tw-prose-hr": "#e4e4e7",
                "--tw-prose-quotes": "#18181b",
                "--tw-prose-quote-borders": "#e4e4e7",
                "--tw-prose-captions": "#71717a",
                "--tw-prose-kbd": "#18181b",
                "--tw-prose-kbd-shadows": "24 24 27",
                "--tw-prose-code": "#18181b",
                "--tw-prose-pre-code": "#e4e4e7",
                "--tw-prose-pre-bg": "#27272a",
                "--tw-prose-th-borders": "#d4d4d8",
                "--tw-prose-td-borders": "#e4e4e7",
                "--tw-prose-invert-body": "#d4d4d8",
                "--tw-prose-invert-headings": "#fff",
                "--tw-prose-invert-lead": "#a1a1aa",
                "--tw-prose-invert-links": "#fff",
                "--tw-prose-invert-bold": "#fff",
                "--tw-prose-invert-counters": "#a1a1aa",
                "--tw-prose-invert-bullets": "#52525b",
                "--tw-prose-invert-hr": "#3f3f46",
                "--tw-prose-invert-quotes": "#f4f4f5",
                "--tw-prose-invert-quote-borders": "#3f3f46",
                "--tw-prose-invert-captions": "#a1a1aa",
                "--tw-prose-invert-kbd": "#fff",
                "--tw-prose-invert-kbd-shadows": "255 255 255",
                "--tw-prose-invert-code": "#fff",
                "--tw-prose-invert-pre-code": "#d4d4d8",
                "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                "--tw-prose-invert-th-borders": "#52525b",
                "--tw-prose-invert-td-borders": "#3f3f46"
              }
            },
            "neutral": {
              "css": {
                "--tw-prose-body": "#404040",
                "--tw-prose-headings": "#171717",
                "--tw-prose-lead": "#525252",
                "--tw-prose-links": "#171717",
                "--tw-prose-bold": "#171717",
                "--tw-prose-counters": "#737373",
                "--tw-prose-bullets": "#d4d4d4",
                "--tw-prose-hr": "#e5e5e5",
                "--tw-prose-quotes": "#171717",
                "--tw-prose-quote-borders": "#e5e5e5",
                "--tw-prose-captions": "#737373",
                "--tw-prose-kbd": "#171717",
                "--tw-prose-kbd-shadows": "23 23 23",
                "--tw-prose-code": "#171717",
                "--tw-prose-pre-code": "#e5e5e5",
                "--tw-prose-pre-bg": "#262626",
                "--tw-prose-th-borders": "#d4d4d4",
                "--tw-prose-td-borders": "#e5e5e5",
                "--tw-prose-invert-body": "#d4d4d4",
                "--tw-prose-invert-headings": "#fff",
                "--tw-prose-invert-lead": "#a3a3a3",
                "--tw-prose-invert-links": "#fff",
                "--tw-prose-invert-bold": "#fff",
                "--tw-prose-invert-counters": "#a3a3a3",
                "--tw-prose-invert-bullets": "#525252",
                "--tw-prose-invert-hr": "#404040",
                "--tw-prose-invert-quotes": "#f5f5f5",
                "--tw-prose-invert-quote-borders": "#404040",
                "--tw-prose-invert-captions": "#a3a3a3",
                "--tw-prose-invert-kbd": "#fff",
                "--tw-prose-invert-kbd-shadows": "255 255 255",
                "--tw-prose-invert-code": "#fff",
                "--tw-prose-invert-pre-code": "#d4d4d4",
                "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                "--tw-prose-invert-th-borders": "#525252",
                "--tw-prose-invert-td-borders": "#404040"
              }
            },
            "stone": {
              "css": {
                "--tw-prose-body": "#44403c",
                "--tw-prose-headings": "#1c1917",
                "--tw-prose-lead": "#57534e",
                "--tw-prose-links": "#1c1917",
                "--tw-prose-bold": "#1c1917",
                "--tw-prose-counters": "#78716c",
                "--tw-prose-bullets": "#d6d3d1",
                "--tw-prose-hr": "#e7e5e4",
                "--tw-prose-quotes": "#1c1917",
                "--tw-prose-quote-borders": "#e7e5e4",
                "--tw-prose-captions": "#78716c",
                "--tw-prose-kbd": "#1c1917",
                "--tw-prose-kbd-shadows": "28 25 23",
                "--tw-prose-code": "#1c1917",
                "--tw-prose-pre-code": "#e7e5e4",
                "--tw-prose-pre-bg": "#292524",
                "--tw-prose-th-borders": "#d6d3d1",
                "--tw-prose-td-borders": "#e7e5e4",
                "--tw-prose-invert-body": "#d6d3d1",
                "--tw-prose-invert-headings": "#fff",
                "--tw-prose-invert-lead": "#a8a29e",
                "--tw-prose-invert-links": "#fff",
                "--tw-prose-invert-bold": "#fff",
                "--tw-prose-invert-counters": "#a8a29e",
                "--tw-prose-invert-bullets": "#57534e",
                "--tw-prose-invert-hr": "#44403c",
                "--tw-prose-invert-quotes": "#f5f5f4",
                "--tw-prose-invert-quote-borders": "#44403c",
                "--tw-prose-invert-captions": "#a8a29e",
                "--tw-prose-invert-kbd": "#fff",
                "--tw-prose-invert-kbd-shadows": "255 255 255",
                "--tw-prose-invert-code": "#fff",
                "--tw-prose-invert-pre-code": "#d6d3d1",
                "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                "--tw-prose-invert-th-borders": "#57534e",
                "--tw-prose-invert-td-borders": "#44403c"
              }
            },
            "red": {
              "css": {
                "--tw-prose-links": "#dc2626",
                "--tw-prose-invert-links": "#ef4444"
              }
            },
            "orange": {
              "css": {
                "--tw-prose-links": "#ea580c",
                "--tw-prose-invert-links": "#f97316"
              }
            },
            "amber": {
              "css": {
                "--tw-prose-links": "#d97706",
                "--tw-prose-invert-links": "#f59e0b"
              }
            },
            "yellow": {
              "css": {
                "--tw-prose-links": "#ca8a04",
                "--tw-prose-invert-links": "#eab308"
              }
            },
            "lime": {
              "css": {
                "--tw-prose-links": "#65a30d",
                "--tw-prose-invert-links": "#84cc16"
              }
            },
            "green": {
              "css": {
                "--tw-prose-links": "#16a34a",
                "--tw-prose-invert-links": "#22c55e"
              }
            },
            "emerald": {
              "css": {
                "--tw-prose-links": "#059669",
                "--tw-prose-invert-links": "#10b981"
              }
            },
            "teal": {
              "css": {
                "--tw-prose-links": "#0d9488",
                "--tw-prose-invert-links": "#14b8a6"
              }
            },
            "cyan": {
              "css": {
                "--tw-prose-links": "#0891b2",
                "--tw-prose-invert-links": "#06b6d4"
              }
            },
            "sky": {
              "css": {
                "--tw-prose-links": "#0284c7",
                "--tw-prose-invert-links": "#0ea5e9"
              }
            },
            "blue": {
              "css": {
                "--tw-prose-links": "#2563eb",
                "--tw-prose-invert-links": "#3b82f6"
              }
            },
            "indigo": {
              "css": {
                "--tw-prose-links": "#4f46e5",
                "--tw-prose-invert-links": "#6366f1"
              }
            },
            "violet": {
              "css": {
                "--tw-prose-links": "#7c3aed",
                "--tw-prose-invert-links": "#8b5cf6"
              }
            },
            "purple": {
              "css": {
                "--tw-prose-links": "#9333ea",
                "--tw-prose-invert-links": "#a855f7"
              }
            },
            "fuchsia": {
              "css": {
                "--tw-prose-links": "#c026d3",
                "--tw-prose-invert-links": "#d946ef"
              }
            },
            "pink": {
              "css": {
                "--tw-prose-links": "#db2777",
                "--tw-prose-invert-links": "#ec4899"
              }
            },
            "rose": {
              "css": {
                "--tw-prose-links": "#e11d48",
                "--tw-prose-invert-links": "#f43f5e"
              }
            },
            "invert": {
              "css": {
                "--tw-prose-body": "var(--tw-prose-invert-body)",
                "--tw-prose-headings": "var(--tw-prose-invert-headings)",
                "--tw-prose-lead": "var(--tw-prose-invert-lead)",
                "--tw-prose-links": "var(--tw-prose-invert-links)",
                "--tw-prose-bold": "var(--tw-prose-invert-bold)",
                "--tw-prose-counters": "var(--tw-prose-invert-counters)",
                "--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
                "--tw-prose-hr": "var(--tw-prose-invert-hr)",
                "--tw-prose-quotes": "var(--tw-prose-invert-quotes)",
                "--tw-prose-quote-borders": "var(--tw-prose-invert-quote-borders)",
                "--tw-prose-captions": "var(--tw-prose-invert-captions)",
                "--tw-prose-kbd": "var(--tw-prose-invert-kbd)",
                "--tw-prose-kbd-shadows": "var(--tw-prose-invert-kbd-shadows)",
                "--tw-prose-code": "var(--tw-prose-invert-code)",
                "--tw-prose-pre-code": "var(--tw-prose-invert-pre-code)",
                "--tw-prose-pre-bg": "var(--tw-prose-invert-pre-bg)",
                "--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
                "--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)"
              }
            }
          },
          "containers": {
            "xs": "20rem",
            "sm": "24rem",
            "md": "28rem",
            "lg": "32rem",
            "xl": "36rem",
            "2xl": "42rem",
            "3xl": "48rem",
            "4xl": "56rem",
            "5xl": "64rem",
            "6xl": "72rem",
            "7xl": "80rem"
          },
          "accentColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            },
            "auto": "auto"
          },
          "animation": {
            "none": "none",
            "spin": "spin 1s linear infinite",
            "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
            "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            "bounce": "bounce 1s infinite"
          },
          "aria": {
            "busy": "busy=\"true\"",
            "checked": "checked=\"true\"",
            "disabled": "disabled=\"true\"",
            "expanded": "expanded=\"true\"",
            "hidden": "hidden=\"true\"",
            "pressed": "pressed=\"true\"",
            "readonly": "readonly=\"true\"",
            "required": "required=\"true\"",
            "selected": "selected=\"true\""
          },
          "backdropBlur": {
            "0": "0",
            "none": "0",
            "sm": "4px",
            "DEFAULT": "8px",
            "md": "12px",
            "lg": "16px",
            "xl": "24px",
            "2xl": "40px",
            "3xl": "64px"
          },
          "backdropBrightness": {
            "0": "0",
            "50": ".5",
            "75": ".75",
            "90": ".9",
            "95": ".95",
            "100": "1",
            "105": "1.05",
            "110": "1.1",
            "125": "1.25",
            "150": "1.5",
            "200": "2"
          },
          "backdropContrast": {
            "0": "0",
            "50": ".5",
            "75": ".75",
            "100": "1",
            "125": "1.25",
            "150": "1.5",
            "200": "2"
          },
          "backdropGrayscale": {
            "0": "0",
            "DEFAULT": "100%"
          },
          "backdropHueRotate": {
            "0": "0deg",
            "15": "15deg",
            "30": "30deg",
            "60": "60deg",
            "90": "90deg",
            "180": "180deg"
          },
          "backdropInvert": {
            "0": "0",
            "DEFAULT": "100%"
          },
          "backdropOpacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          "backdropSaturate": {
            "0": "0",
            "50": ".5",
            "100": "1",
            "150": "1.5",
            "200": "2"
          },
          "backdropSepia": {
            "0": "0",
            "DEFAULT": "100%"
          },
          "backgroundColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "backgroundImage": {
            "none": "none",
            "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
            "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
            "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
            "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
            "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
            "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
            "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
            "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))"
          },
          "backgroundOpacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          "backgroundPosition": {
            "bottom": "bottom",
            "center": "center",
            "left": "left",
            "left-bottom": "left bottom",
            "left-top": "left top",
            "right": "right",
            "right-bottom": "right bottom",
            "right-top": "right top",
            "top": "top"
          },
          "backgroundSize": {
            "auto": "auto",
            "cover": "cover",
            "contain": "contain"
          },
          "blur": {
            "0": "0",
            "none": "0",
            "sm": "4px",
            "DEFAULT": "8px",
            "md": "12px",
            "lg": "16px",
            "xl": "24px",
            "2xl": "40px",
            "3xl": "64px"
          },
          "borderColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            },
            "DEFAULT": "rgb(var(--color-gray-200) / <alpha-value>)"
          },
          "borderOpacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          "borderRadius": {
            "none": "0px",
            "sm": "0.125rem",
            "DEFAULT": "0.25rem",
            "md": "0.375rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "2xl": "1rem",
            "3xl": "1.5rem",
            "full": "9999px"
          },
          "borderSpacing": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "borderWidth": {
            "0": "0px",
            "2": "2px",
            "4": "4px",
            "8": "8px",
            "DEFAULT": "1px"
          },
          "boxShadow": {
            "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
            "none": "none"
          },
          "boxShadowColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "brightness": {
            "0": "0",
            "50": ".5",
            "75": ".75",
            "90": ".9",
            "95": ".95",
            "100": "1",
            "105": "1.05",
            "110": "1.1",
            "125": "1.25",
            "150": "1.5",
            "200": "2"
          },
          "caretColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "colors": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "columns": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "auto": "auto",
            "3xs": "16rem",
            "2xs": "18rem",
            "xs": "20rem",
            "sm": "24rem",
            "md": "28rem",
            "lg": "32rem",
            "xl": "36rem",
            "2xl": "42rem",
            "3xl": "48rem",
            "4xl": "56rem",
            "5xl": "64rem",
            "6xl": "72rem",
            "7xl": "80rem"
          },
          "container": {},
          "content": {
            "none": "none"
          },
          "contrast": {
            "0": "0",
            "50": ".5",
            "75": ".75",
            "100": "1",
            "125": "1.25",
            "150": "1.5",
            "200": "2"
          },
          "cursor": {
            "auto": "auto",
            "default": "default",
            "pointer": "pointer",
            "wait": "wait",
            "text": "text",
            "move": "move",
            "help": "help",
            "not-allowed": "not-allowed",
            "none": "none",
            "context-menu": "context-menu",
            "progress": "progress",
            "cell": "cell",
            "crosshair": "crosshair",
            "vertical-text": "vertical-text",
            "alias": "alias",
            "copy": "copy",
            "no-drop": "no-drop",
            "grab": "grab",
            "grabbing": "grabbing",
            "all-scroll": "all-scroll",
            "col-resize": "col-resize",
            "row-resize": "row-resize",
            "n-resize": "n-resize",
            "e-resize": "e-resize",
            "s-resize": "s-resize",
            "w-resize": "w-resize",
            "ne-resize": "ne-resize",
            "nw-resize": "nw-resize",
            "se-resize": "se-resize",
            "sw-resize": "sw-resize",
            "ew-resize": "ew-resize",
            "ns-resize": "ns-resize",
            "nesw-resize": "nesw-resize",
            "nwse-resize": "nwse-resize",
            "zoom-in": "zoom-in",
            "zoom-out": "zoom-out"
          },
          "divideColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            },
            "DEFAULT": "rgb(var(--color-gray-200) / <alpha-value>)"
          },
          "divideOpacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          "divideWidth": {
            "0": "0px",
            "2": "2px",
            "4": "4px",
            "8": "8px",
            "DEFAULT": "1px"
          },
          "dropShadow": {
            "sm": "0 1px 1px rgb(0 0 0 / 0.05)",
            "DEFAULT": [
              "0 1px 2px rgb(0 0 0 / 0.1)",
              "0 1px 1px rgb(0 0 0 / 0.06)"
            ],
            "md": [
              "0 4px 3px rgb(0 0 0 / 0.07)",
              "0 2px 2px rgb(0 0 0 / 0.06)"
            ],
            "lg": [
              "0 10px 8px rgb(0 0 0 / 0.04)",
              "0 4px 3px rgb(0 0 0 / 0.1)"
            ],
            "xl": [
              "0 20px 13px rgb(0 0 0 / 0.03)",
              "0 8px 5px rgb(0 0 0 / 0.08)"
            ],
            "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
            "none": "0 0 #0000"
          },
          "fill": {
            "none": "none",
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "flex": {
            "1": "1 1 0%",
            "auto": "1 1 auto",
            "initial": "0 1 auto",
            "none": "none"
          },
          "flexBasis": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "auto": "auto",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "1/12": "8.333333%",
            "2/12": "16.666667%",
            "3/12": "25%",
            "4/12": "33.333333%",
            "5/12": "41.666667%",
            "6/12": "50%",
            "7/12": "58.333333%",
            "8/12": "66.666667%",
            "9/12": "75%",
            "10/12": "83.333333%",
            "11/12": "91.666667%",
            "full": "100%"
          },
          "flexGrow": {
            "0": "0",
            "DEFAULT": "1"
          },
          "flexShrink": {
            "0": "0",
            "DEFAULT": "1"
          },
          "fontFamily": {
            "sans": [
              "ui-sans-serif",
              "system-ui",
              "sans-serif",
              "\"Apple Color Emoji\"",
              "\"Segoe UI Emoji\"",
              "\"Segoe UI Symbol\"",
              "\"Noto Color Emoji\""
            ],
            "serif": [
              "ui-serif",
              "Georgia",
              "Cambria",
              "\"Times New Roman\"",
              "Times",
              "serif"
            ],
            "mono": [
              "ui-monospace",
              "SFMono-Regular",
              "Menlo",
              "Monaco",
              "Consolas",
              "\"Liberation Mono\"",
              "\"Courier New\"",
              "monospace"
            ]
          },
          "fontSize": {
            "xs": [
              "0.75rem",
              {
                "lineHeight": "1rem"
              }
            ],
            "sm": [
              "0.875rem",
              {
                "lineHeight": "1.25rem"
              }
            ],
            "base": [
              "1rem",
              {
                "lineHeight": "1.5rem"
              }
            ],
            "lg": [
              "1.125rem",
              {
                "lineHeight": "1.75rem"
              }
            ],
            "xl": [
              "1.25rem",
              {
                "lineHeight": "1.75rem"
              }
            ],
            "2xl": [
              "1.5rem",
              {
                "lineHeight": "2rem"
              }
            ],
            "3xl": [
              "1.875rem",
              {
                "lineHeight": "2.25rem"
              }
            ],
            "4xl": [
              "2.25rem",
              {
                "lineHeight": "2.5rem"
              }
            ],
            "5xl": [
              "3rem",
              {
                "lineHeight": "1"
              }
            ],
            "6xl": [
              "3.75rem",
              {
                "lineHeight": "1"
              }
            ],
            "7xl": [
              "4.5rem",
              {
                "lineHeight": "1"
              }
            ],
            "8xl": [
              "6rem",
              {
                "lineHeight": "1"
              }
            ],
            "9xl": [
              "8rem",
              {
                "lineHeight": "1"
              }
            ]
          },
          "fontWeight": {
            "thin": "100",
            "extralight": "200",
            "light": "300",
            "normal": "400",
            "medium": "500",
            "semibold": "600",
            "bold": "700",
            "extrabold": "800",
            "black": "900"
          },
          "gap": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "gradientColorStops": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "gradientColorStopPositions": {
            "0%": "0%",
            "5%": "5%",
            "10%": "10%",
            "15%": "15%",
            "20%": "20%",
            "25%": "25%",
            "30%": "30%",
            "35%": "35%",
            "40%": "40%",
            "45%": "45%",
            "50%": "50%",
            "55%": "55%",
            "60%": "60%",
            "65%": "65%",
            "70%": "70%",
            "75%": "75%",
            "80%": "80%",
            "85%": "85%",
            "90%": "90%",
            "95%": "95%",
            "100%": "100%"
          },
          "grayscale": {
            "0": "0",
            "DEFAULT": "100%"
          },
          "gridAutoColumns": {
            "auto": "auto",
            "min": "min-content",
            "max": "max-content",
            "fr": "minmax(0, 1fr)"
          },
          "gridAutoRows": {
            "auto": "auto",
            "min": "min-content",
            "max": "max-content",
            "fr": "minmax(0, 1fr)"
          },
          "gridColumn": {
            "auto": "auto",
            "span-1": "span 1 / span 1",
            "span-2": "span 2 / span 2",
            "span-3": "span 3 / span 3",
            "span-4": "span 4 / span 4",
            "span-5": "span 5 / span 5",
            "span-6": "span 6 / span 6",
            "span-7": "span 7 / span 7",
            "span-8": "span 8 / span 8",
            "span-9": "span 9 / span 9",
            "span-10": "span 10 / span 10",
            "span-11": "span 11 / span 11",
            "span-12": "span 12 / span 12",
            "span-full": "1 / -1"
          },
          "gridColumnEnd": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "auto": "auto"
          },
          "gridColumnStart": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "auto": "auto"
          },
          "gridRow": {
            "auto": "auto",
            "span-1": "span 1 / span 1",
            "span-2": "span 2 / span 2",
            "span-3": "span 3 / span 3",
            "span-4": "span 4 / span 4",
            "span-5": "span 5 / span 5",
            "span-6": "span 6 / span 6",
            "span-7": "span 7 / span 7",
            "span-8": "span 8 / span 8",
            "span-9": "span 9 / span 9",
            "span-10": "span 10 / span 10",
            "span-11": "span 11 / span 11",
            "span-12": "span 12 / span 12",
            "span-full": "1 / -1"
          },
          "gridRowEnd": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "auto": "auto"
          },
          "gridRowStart": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "13": "13",
            "auto": "auto"
          },
          "gridTemplateColumns": {
            "1": "repeat(1, minmax(0, 1fr))",
            "2": "repeat(2, minmax(0, 1fr))",
            "3": "repeat(3, minmax(0, 1fr))",
            "4": "repeat(4, minmax(0, 1fr))",
            "5": "repeat(5, minmax(0, 1fr))",
            "6": "repeat(6, minmax(0, 1fr))",
            "7": "repeat(7, minmax(0, 1fr))",
            "8": "repeat(8, minmax(0, 1fr))",
            "9": "repeat(9, minmax(0, 1fr))",
            "10": "repeat(10, minmax(0, 1fr))",
            "11": "repeat(11, minmax(0, 1fr))",
            "12": "repeat(12, minmax(0, 1fr))",
            "none": "none",
            "subgrid": "subgrid"
          },
          "gridTemplateRows": {
            "1": "repeat(1, minmax(0, 1fr))",
            "2": "repeat(2, minmax(0, 1fr))",
            "3": "repeat(3, minmax(0, 1fr))",
            "4": "repeat(4, minmax(0, 1fr))",
            "5": "repeat(5, minmax(0, 1fr))",
            "6": "repeat(6, minmax(0, 1fr))",
            "7": "repeat(7, minmax(0, 1fr))",
            "8": "repeat(8, minmax(0, 1fr))",
            "9": "repeat(9, minmax(0, 1fr))",
            "10": "repeat(10, minmax(0, 1fr))",
            "11": "repeat(11, minmax(0, 1fr))",
            "12": "repeat(12, minmax(0, 1fr))",
            "none": "none",
            "subgrid": "subgrid"
          },
          "height": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "auto": "auto",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "full": "100%",
            "screen": "100vh",
            "svh": "100svh",
            "lvh": "100lvh",
            "dvh": "100dvh",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
          },
          "hueRotate": {
            "0": "0deg",
            "15": "15deg",
            "30": "30deg",
            "60": "60deg",
            "90": "90deg",
            "180": "180deg"
          },
          "inset": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "auto": "auto",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "full": "100%"
          },
          "invert": {
            "0": "0",
            "DEFAULT": "100%"
          },
          "keyframes": {
            "spin": {
              "to": {
                "transform": "rotate(360deg)"
              }
            },
            "ping": {
              "75%, 100%": {
                "transform": "scale(2)",
                "opacity": "0"
              }
            },
            "pulse": {
              "50%": {
                "opacity": ".5"
              }
            },
            "bounce": {
              "0%, 100%": {
                "transform": "translateY(-25%)",
                "animationTimingFunction": "cubic-bezier(0.8,0,1,1)"
              },
              "50%": {
                "transform": "none",
                "animationTimingFunction": "cubic-bezier(0,0,0.2,1)"
              }
            }
          },
          "letterSpacing": {
            "tighter": "-0.05em",
            "tight": "-0.025em",
            "normal": "0em",
            "wide": "0.025em",
            "wider": "0.05em",
            "widest": "0.1em"
          },
          "lineHeight": {
            "3": ".75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "none": "1",
            "tight": "1.25",
            "snug": "1.375",
            "normal": "1.5",
            "relaxed": "1.625",
            "loose": "2"
          },
          "listStyleType": {
            "none": "none",
            "disc": "disc",
            "decimal": "decimal"
          },
          "listStyleImage": {
            "none": "none"
          },
          "margin": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "auto": "auto",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "lineClamp": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6"
          },
          "maxHeight": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "none": "none",
            "full": "100%",
            "screen": "100vh",
            "svh": "100svh",
            "lvh": "100lvh",
            "dvh": "100dvh",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
          },
          "maxWidth": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "none": "none",
            "xs": "20rem",
            "sm": "24rem",
            "md": "28rem",
            "lg": "32rem",
            "xl": "36rem",
            "2xl": "42rem",
            "3xl": "48rem",
            "4xl": "56rem",
            "5xl": "64rem",
            "6xl": "72rem",
            "7xl": "80rem",
            "full": "100%",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content",
            "prose": "65ch",
            "screen-sm": "640px",
            "screen-md": "768px",
            "screen-lg": "1024px",
            "screen-xl": "1150px",
            "screen-2xl": "1250px"
          },
          "minHeight": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "full": "100%",
            "screen": "100vh",
            "svh": "100svh",
            "lvh": "100lvh",
            "dvh": "100dvh",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
          },
          "minWidth": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "full": "100%",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
          },
          "objectPosition": {
            "bottom": "bottom",
            "center": "center",
            "left": "left",
            "left-bottom": "left bottom",
            "left-top": "left top",
            "right": "right",
            "right-bottom": "right bottom",
            "right-top": "right top",
            "top": "top"
          },
          "opacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          "order": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "first": "-9999",
            "last": "9999",
            "none": "0"
          },
          "outlineColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "outlineOffset": {
            "0": "0px",
            "1": "1px",
            "2": "2px",
            "4": "4px",
            "8": "8px"
          },
          "outlineWidth": {
            "0": "0px",
            "1": "1px",
            "2": "2px",
            "4": "4px",
            "8": "8px"
          },
          "padding": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "placeholderColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "placeholderOpacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          "ringColor": {
            "DEFAULT": "#3b82f6",
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "ringOffsetColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "ringOffsetWidth": {
            "0": "0px",
            "1": "1px",
            "2": "2px",
            "4": "4px",
            "8": "8px"
          },
          "ringOpacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1",
            "DEFAULT": "0.5"
          },
          "ringWidth": {
            "0": "0px",
            "1": "1px",
            "2": "2px",
            "4": "4px",
            "8": "8px",
            "DEFAULT": "3px"
          },
          "rotate": {
            "0": "0deg",
            "1": "1deg",
            "2": "2deg",
            "3": "3deg",
            "6": "6deg",
            "12": "12deg",
            "45": "45deg",
            "90": "90deg",
            "180": "180deg"
          },
          "saturate": {
            "0": "0",
            "50": ".5",
            "100": "1",
            "150": "1.5",
            "200": "2"
          },
          "scale": {
            "0": "0",
            "50": ".5",
            "75": ".75",
            "90": ".9",
            "95": ".95",
            "100": "1",
            "105": "1.05",
            "110": "1.1",
            "125": "1.25",
            "150": "1.5"
          },
          "scrollMargin": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "scrollPadding": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "sepia": {
            "0": "0",
            "DEFAULT": "100%"
          },
          "skew": {
            "0": "0deg",
            "1": "1deg",
            "2": "2deg",
            "3": "3deg",
            "6": "6deg",
            "12": "12deg"
          },
          "space": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "spacing": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "stroke": {
            "none": "none",
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "strokeWidth": {
            "0": "0",
            "1": "1",
            "2": "2"
          },
          "supports": {},
          "data": {},
          "textColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "textDecorationColor": {
            "inherit": "inherit",
            "current": "currentColor",
            "transparent": "transparent",
            "black": "#000",
            "white": "#fff",
            "slate": {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              "950": "#020617"
            },
            "gray": {
              "50": "rgb(var(--color-gray-50) / <alpha-value>)",
              "100": "rgb(var(--color-gray-100) / <alpha-value>)",
              "200": "rgb(var(--color-gray-200) / <alpha-value>)",
              "300": "rgb(var(--color-gray-300) / <alpha-value>)",
              "400": "rgb(var(--color-gray-400) / <alpha-value>)",
              "500": "rgb(var(--color-gray-500) / <alpha-value>)",
              "600": "rgb(var(--color-gray-600) / <alpha-value>)",
              "700": "rgb(var(--color-gray-700) / <alpha-value>)",
              "800": "rgb(var(--color-gray-800) / <alpha-value>)",
              "900": "rgb(var(--color-gray-900) / <alpha-value>)",
              "950": "rgb(var(--color-gray-950) / <alpha-value>)"
            },
            "zinc": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "950": "#09090b"
            },
            "neutral": "hsl(var(--n) / <alpha-value>)",
            "stone": {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09"
            },
            "red": {
              "50": "#fef2f2",
              "100": "#fee2e2",
              "200": "#fecaca",
              "300": "#fca5a5",
              "400": "#f87171",
              "500": "#ef4444",
              "600": "#dc2626",
              "700": "#b91c1c",
              "800": "#991b1b",
              "900": "#7f1d1d",
              "950": "#450a0a"
            },
            "orange": {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              "950": "#431407"
            },
            "amber": {
              "50": "#fffbeb",
              "100": "#fef3c7",
              "200": "#fde68a",
              "300": "#fcd34d",
              "400": "#fbbf24",
              "500": "#f59e0b",
              "600": "#d97706",
              "700": "#b45309",
              "800": "#92400e",
              "900": "#78350f",
              "950": "#451a03"
            },
            "yellow": {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006"
            },
            "lime": {
              "50": "#f7fee7",
              "100": "#ecfccb",
              "200": "#d9f99d",
              "300": "#bef264",
              "400": "#a3e635",
              "500": "#84cc16",
              "600": "#65a30d",
              "700": "#4d7c0f",
              "800": "#3f6212",
              "900": "#365314",
              "950": "#1a2e05"
            },
            "green": {
              "50": "#f0fdf4",
              "100": "#dcfce7",
              "200": "#bbf7d0",
              "300": "#86efac",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803d",
              "800": "#166534",
              "900": "#14532d",
              "950": "#052e16"
            },
            "emerald": {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              "950": "#022c22"
            },
            "teal": {
              "50": "#f0fdfa",
              "100": "#ccfbf1",
              "200": "#99f6e4",
              "300": "#5eead4",
              "400": "#2dd4bf",
              "500": "#14b8a6",
              "600": "#0d9488",
              "700": "#0f766e",
              "800": "#115e59",
              "900": "#134e4a",
              "950": "#042f2e"
            },
            "cyan": {
              "50": "#ecfeff",
              "100": "#cffafe",
              "200": "#a5f3fc",
              "300": "#67e8f9",
              "400": "#22d3ee",
              "500": "#06b6d4",
              "600": "#0891b2",
              "700": "#0e7490",
              "800": "#155e75",
              "900": "#164e63",
              "950": "#083344"
            },
            "sky": {
              "50": "#f0f9ff",
              "100": "#e0f2fe",
              "200": "#bae6fd",
              "300": "#7dd3fc",
              "400": "#38bdf8",
              "500": "#0ea5e9",
              "600": "#0284c7",
              "700": "#0369a1",
              "800": "#075985",
              "900": "#0c4a6e",
              "950": "#082f49"
            },
            "blue": {
              "50": "#eff6ff",
              "100": "#dbeafe",
              "200": "#bfdbfe",
              "300": "#93c5fd",
              "400": "#60a5fa",
              "500": "#3b82f6",
              "600": "#2563eb",
              "700": "#1d4ed8",
              "800": "#1e40af",
              "900": "#1e3a8a",
              "950": "#172554"
            },
            "indigo": {
              "50": "#eef2ff",
              "100": "#e0e7ff",
              "200": "#c7d2fe",
              "300": "#a5b4fc",
              "400": "#818cf8",
              "500": "#6366f1",
              "600": "#4f46e5",
              "700": "#4338ca",
              "800": "#3730a3",
              "900": "#312e81",
              "950": "#1e1b4b"
            },
            "violet": {
              "50": "#f5f3ff",
              "100": "#ede9fe",
              "200": "#ddd6fe",
              "300": "#c4b5fd",
              "400": "#a78bfa",
              "500": "#8b5cf6",
              "600": "#7c3aed",
              "700": "#6d28d9",
              "800": "#5b21b6",
              "900": "#4c1d95",
              "950": "#2e1065"
            },
            "purple": {
              "50": "#faf5ff",
              "100": "#f3e8ff",
              "200": "#e9d5ff",
              "300": "#d8b4fe",
              "400": "#c084fc",
              "500": "#a855f7",
              "600": "#9333ea",
              "700": "#7e22ce",
              "800": "#6b21a8",
              "900": "#581c87",
              "950": "#3b0764"
            },
            "fuchsia": {
              "50": "#fdf4ff",
              "100": "#fae8ff",
              "200": "#f5d0fe",
              "300": "#f0abfc",
              "400": "#e879f9",
              "500": "#d946ef",
              "600": "#c026d3",
              "700": "#a21caf",
              "800": "#86198f",
              "900": "#701a75",
              "950": "#4a044e"
            },
            "pink": {
              "50": "#fdf2f8",
              "100": "#fce7f3",
              "200": "#fbcfe8",
              "300": "#f9a8d4",
              "400": "#f472b6",
              "500": "#ec4899",
              "600": "#db2777",
              "700": "#be185d",
              "800": "#9d174d",
              "900": "#831843",
              "950": "#500724"
            },
            "rose": {
              "50": "#fff1f2",
              "100": "#ffe4e6",
              "200": "#fecdd3",
              "300": "#fda4af",
              "400": "#fb7185",
              "500": "#f43f5e",
              "600": "#e11d48",
              "700": "#be123c",
              "800": "#9f1239",
              "900": "#881337",
              "950": "#4c0519"
            },
            "primary": {
              "50": "rgb(var(--color-primary-50) / <alpha-value>)",
              "100": "rgb(var(--color-primary-100) / <alpha-value>)",
              "200": "rgb(var(--color-primary-200) / <alpha-value>)",
              "300": "rgb(var(--color-primary-300) / <alpha-value>)",
              "400": "rgb(var(--color-primary-400) / <alpha-value>)",
              "500": "rgb(var(--color-primary-500) / <alpha-value>)",
              "600": "rgb(var(--color-primary-600) / <alpha-value>)",
              "700": "rgb(var(--color-primary-700) / <alpha-value>)",
              "800": "rgb(var(--color-primary-800) / <alpha-value>)",
              "900": "rgb(var(--color-primary-900) / <alpha-value>)",
              "950": "rgb(var(--color-primary-950) / <alpha-value>)",
              "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
            },
            "primary-focus": "hsl(var(--pf) / <alpha-value>)",
            "primary-content": "hsl(var(--pc) / <alpha-value>)",
            "secondary": "hsl(var(--s) / <alpha-value>)",
            "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
            "secondary-content": "hsl(var(--sc) / <alpha-value>)",
            "accent": "hsl(var(--a) / <alpha-value>)",
            "accent-focus": "hsl(var(--af) / <alpha-value>)",
            "accent-content": "hsl(var(--ac) / <alpha-value>)",
            "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
            "neutral-content": "hsl(var(--nc) / <alpha-value>)",
            "base-100": "hsl(var(--b1) / <alpha-value>)",
            "base-200": "hsl(var(--b2) / <alpha-value>)",
            "base-300": "hsl(var(--b3) / <alpha-value>)",
            "base-content": "hsl(var(--bc) / <alpha-value>)",
            "info": "hsl(var(--in) / <alpha-value>)",
            "info-content": "hsl(var(--inc) / <alpha-value>)",
            "success": "hsl(var(--su) / <alpha-value>)",
            "success-content": "hsl(var(--suc) / <alpha-value>)",
            "warning": "hsl(var(--wa) / <alpha-value>)",
            "warning-content": "hsl(var(--wac) / <alpha-value>)",
            "error": "hsl(var(--er) / <alpha-value>)",
            "error-content": "hsl(var(--erc) / <alpha-value>)",
            "neutral-50": "#fafafa",
            "neutral-100": "#f5f5f5",
            "neutral-200": "#e5e5e5",
            "neutral-300": "#d4d4d4",
            "neutral-400": "#a3a3a3",
            "neutral-500": "#737373",
            "neutral-600": "#525252",
            "neutral-700": "#404040",
            "neutral-800": "#262626",
            "neutral-900": "#171717",
            "neutral-950": "#0a0a0a",
            "cool": {
              "50": "#f9fafb",
              "100": "#f3f4f6",
              "200": "#e5e7eb",
              "300": "#d1d5db",
              "400": "#9ca3af",
              "500": "#6b7280",
              "600": "#4b5563",
              "700": "#374151",
              "800": "#1f2937",
              "900": "#111827",
              "950": "#030712"
            }
          },
          "textDecorationThickness": {
            "0": "0px",
            "1": "1px",
            "2": "2px",
            "4": "4px",
            "8": "8px",
            "auto": "auto",
            "from-font": "from-font"
          },
          "textIndent": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem"
          },
          "textOpacity": {
            "0": "0",
            "5": "0.05",
            "10": "0.1",
            "15": "0.15",
            "20": "0.2",
            "25": "0.25",
            "30": "0.3",
            "35": "0.35",
            "40": "0.4",
            "45": "0.45",
            "50": "0.5",
            "55": "0.55",
            "60": "0.6",
            "65": "0.65",
            "70": "0.7",
            "75": "0.75",
            "80": "0.8",
            "85": "0.85",
            "90": "0.9",
            "95": "0.95",
            "100": "1"
          },
          "textUnderlineOffset": {
            "0": "0px",
            "1": "1px",
            "2": "2px",
            "4": "4px",
            "8": "8px",
            "auto": "auto"
          },
          "transformOrigin": {
            "center": "center",
            "top": "top",
            "top-right": "top right",
            "right": "right",
            "bottom-right": "bottom right",
            "bottom": "bottom",
            "bottom-left": "bottom left",
            "left": "left",
            "top-left": "top left"
          },
          "transitionDelay": {
            "0": "0s",
            "75": "75ms",
            "100": "100ms",
            "150": "150ms",
            "200": "200ms",
            "300": "300ms",
            "500": "500ms",
            "700": "700ms",
            "1000": "1000ms"
          },
          "transitionDuration": {
            "0": "0s",
            "75": "75ms",
            "100": "100ms",
            "150": "150ms",
            "200": "200ms",
            "300": "300ms",
            "500": "500ms",
            "700": "700ms",
            "1000": "1000ms",
            "DEFAULT": "150ms"
          },
          "transitionProperty": {
            "none": "none",
            "all": "all",
            "DEFAULT": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
            "colors": "color, background-color, border-color, text-decoration-color, fill, stroke",
            "opacity": "opacity",
            "shadow": "box-shadow",
            "transform": "transform"
          },
          "transitionTimingFunction": {
            "DEFAULT": "cubic-bezier(0.4, 0, 0.2, 1)",
            "linear": "linear",
            "in": "cubic-bezier(0.4, 0, 1, 1)",
            "out": "cubic-bezier(0, 0, 0.2, 1)",
            "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
          },
          "translate": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "full": "100%"
          },
          "size": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "auto": "auto",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "1/12": "8.333333%",
            "2/12": "16.666667%",
            "3/12": "25%",
            "4/12": "33.333333%",
            "5/12": "41.666667%",
            "6/12": "50%",
            "7/12": "58.333333%",
            "8/12": "66.666667%",
            "9/12": "75%",
            "10/12": "83.333333%",
            "11/12": "91.666667%",
            "full": "100%",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
          },
          "width": {
            "0": "0px",
            "1": "0.25rem",
            "2": "0.5rem",
            "3": "0.75rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
            "11": "2.75rem",
            "12": "3rem",
            "14": "3.5rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "28": "7rem",
            "32": "8rem",
            "36": "9rem",
            "40": "10rem",
            "44": "11rem",
            "48": "12rem",
            "52": "13rem",
            "56": "14rem",
            "60": "15rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            "auto": "auto",
            "px": "1px",
            "0.5": "0.125rem",
            "1.5": "0.375rem",
            "2.5": "0.625rem",
            "3.5": "0.875rem",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            "1/5": "20%",
            "2/5": "40%",
            "3/5": "60%",
            "4/5": "80%",
            "1/6": "16.666667%",
            "2/6": "33.333333%",
            "3/6": "50%",
            "4/6": "66.666667%",
            "5/6": "83.333333%",
            "1/12": "8.333333%",
            "2/12": "16.666667%",
            "3/12": "25%",
            "4/12": "33.333333%",
            "5/12": "41.666667%",
            "6/12": "50%",
            "7/12": "58.333333%",
            "8/12": "66.666667%",
            "9/12": "75%",
            "10/12": "83.333333%",
            "11/12": "91.666667%",
            "full": "100%",
            "screen": "100vw",
            "svw": "100svw",
            "lvw": "100lvw",
            "dvw": "100dvw",
            "min": "min-content",
            "max": "max-content",
            "fit": "fit-content"
          },
          "willChange": {
            "auto": "auto",
            "scroll": "scroll-position",
            "contents": "contents",
            "transform": "transform"
          },
          "zIndex": {
            "0": "0",
            "10": "10",
            "20": "20",
            "30": "30",
            "40": "40",
            "50": "50",
            "auto": "auto"
          }
        },
        "corePlugins": [
          "preflight",
          "container",
          "accessibility",
          "pointerEvents",
          "visibility",
          "position",
          "inset",
          "isolation",
          "zIndex",
          "order",
          "gridColumn",
          "gridColumnStart",
          "gridColumnEnd",
          "gridRow",
          "gridRowStart",
          "gridRowEnd",
          "float",
          "clear",
          "margin",
          "boxSizing",
          "lineClamp",
          "display",
          "aspectRatio",
          "size",
          "height",
          "maxHeight",
          "minHeight",
          "width",
          "minWidth",
          "maxWidth",
          "flex",
          "flexShrink",
          "flexGrow",
          "flexBasis",
          "tableLayout",
          "captionSide",
          "borderCollapse",
          "borderSpacing",
          "transformOrigin",
          "translate",
          "rotate",
          "skew",
          "scale",
          "transform",
          "animation",
          "cursor",
          "touchAction",
          "userSelect",
          "resize",
          "scrollSnapType",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollMargin",
          "scrollPadding",
          "listStylePosition",
          "listStyleType",
          "listStyleImage",
          "appearance",
          "columns",
          "breakBefore",
          "breakInside",
          "breakAfter",
          "gridAutoColumns",
          "gridAutoFlow",
          "gridAutoRows",
          "gridTemplateColumns",
          "gridTemplateRows",
          "flexDirection",
          "flexWrap",
          "placeContent",
          "placeItems",
          "alignContent",
          "alignItems",
          "justifyContent",
          "justifyItems",
          "gap",
          "space",
          "divideWidth",
          "divideStyle",
          "divideColor",
          "divideOpacity",
          "placeSelf",
          "alignSelf",
          "justifySelf",
          "overflow",
          "overscrollBehavior",
          "scrollBehavior",
          "textOverflow",
          "hyphens",
          "whitespace",
          "textWrap",
          "wordBreak",
          "borderRadius",
          "borderWidth",
          "borderStyle",
          "borderColor",
          "borderOpacity",
          "backgroundColor",
          "backgroundOpacity",
          "backgroundImage",
          "gradientColorStops",
          "boxDecorationBreak",
          "backgroundSize",
          "backgroundAttachment",
          "backgroundClip",
          "backgroundPosition",
          "backgroundRepeat",
          "backgroundOrigin",
          "fill",
          "stroke",
          "strokeWidth",
          "objectFit",
          "objectPosition",
          "padding",
          "textAlign",
          "textIndent",
          "verticalAlign",
          "fontFamily",
          "fontSize",
          "fontWeight",
          "textTransform",
          "fontStyle",
          "fontVariantNumeric",
          "lineHeight",
          "letterSpacing",
          "textColor",
          "textOpacity",
          "textDecoration",
          "textDecorationColor",
          "textDecorationStyle",
          "textDecorationThickness",
          "textUnderlineOffset",
          "fontSmoothing",
          "placeholderColor",
          "placeholderOpacity",
          "caretColor",
          "accentColor",
          "opacity",
          "backgroundBlendMode",
          "mixBlendMode",
          "boxShadow",
          "boxShadowColor",
          "outlineStyle",
          "outlineWidth",
          "outlineOffset",
          "outlineColor",
          "ringWidth",
          "ringColor",
          "ringOpacity",
          "ringOffsetWidth",
          "ringOffsetColor",
          "blur",
          "brightness",
          "contrast",
          "dropShadow",
          "grayscale",
          "hueRotate",
          "invert",
          "saturate",
          "sepia",
          "filter",
          "backdropBlur",
          "backdropBrightness",
          "backdropContrast",
          "backdropGrayscale",
          "backdropHueRotate",
          "backdropInvert",
          "backdropOpacity",
          "backdropSaturate",
          "backdropSepia",
          "backdropFilter",
          "transitionProperty",
          "transitionDelay",
          "transitionDuration",
          "transitionTimingFunction",
          "willChange",
          "content",
          "forcedColorAdjust"
        ],
        "plugins": [
          {
            "config": {
              "theme": {
                "extend": {
                  "colors": {
                    "transparent": "transparent",
                    "current": "currentColor",
                    "primary": "hsl(var(--p) / <alpha-value>)",
                    "primary-focus": "hsl(var(--pf) / <alpha-value>)",
                    "primary-content": "hsl(var(--pc) / <alpha-value>)",
                    "secondary": "hsl(var(--s) / <alpha-value>)",
                    "secondary-focus": "hsl(var(--sf) / <alpha-value>)",
                    "secondary-content": "hsl(var(--sc) / <alpha-value>)",
                    "accent": "hsl(var(--a) / <alpha-value>)",
                    "accent-focus": "hsl(var(--af) / <alpha-value>)",
                    "accent-content": "hsl(var(--ac) / <alpha-value>)",
                    "neutral": "hsl(var(--n) / <alpha-value>)",
                    "neutral-focus": "hsl(var(--nf) / <alpha-value>)",
                    "neutral-content": "hsl(var(--nc) / <alpha-value>)",
                    "base-100": "hsl(var(--b1) / <alpha-value>)",
                    "base-200": "hsl(var(--b2) / <alpha-value>)",
                    "base-300": "hsl(var(--b3) / <alpha-value>)",
                    "base-content": "hsl(var(--bc) / <alpha-value>)",
                    "info": "hsl(var(--in) / <alpha-value>)",
                    "info-content": "hsl(var(--inc) / <alpha-value>)",
                    "success": "hsl(var(--su) / <alpha-value>)",
                    "success-content": "hsl(var(--suc) / <alpha-value>)",
                    "warning": "hsl(var(--wa) / <alpha-value>)",
                    "warning-content": "hsl(var(--wac) / <alpha-value>)",
                    "error": "hsl(var(--er) / <alpha-value>)",
                    "error-content": "hsl(var(--erc) / <alpha-value>)",
                    "neutral-50": "#fafafa",
                    "neutral-100": "#f5f5f5",
                    "neutral-200": "#e5e5e5",
                    "neutral-300": "#d4d4d4",
                    "neutral-400": "#a3a3a3",
                    "neutral-500": "#737373",
                    "neutral-600": "#525252",
                    "neutral-700": "#404040",
                    "neutral-800": "#262626",
                    "neutral-900": "#171717",
                    "neutral-950": "#0a0a0a"
                  }
                }
              }
            }
          },
          {
            "__options": {
              "strategy": "class"
            },
            "config": {}
          },
          {
            "config": {
              "theme": {
                "aspectRatio": {
                  "1": "1",
                  "2": "2",
                  "3": "3",
                  "4": "4",
                  "5": "5",
                  "6": "6",
                  "7": "7",
                  "8": "8",
                  "9": "9",
                  "10": "10",
                  "11": "11",
                  "12": "12",
                  "13": "13",
                  "14": "14",
                  "15": "15",
                  "16": "16"
                }
              },
              "variants": {
                "aspectRatio": [
                  "responsive"
                ]
              }
            }
          },
          null,
          {
            "config": {
              "theme": {
                "containers": {
                  "xs": "20rem",
                  "sm": "24rem",
                  "md": "28rem",
                  "lg": "32rem",
                  "xl": "36rem",
                  "2xl": "42rem",
                  "3xl": "48rem",
                  "4xl": "56rem",
                  "5xl": "64rem",
                  "6xl": "72rem",
                  "7xl": "80rem"
                }
              }
            }
          },
          null,
          {
            "config": ""
          }
        ],
        "content": {
          "relative": false,
          "files": [
            "C:/Projekty/portfolio/components/**/*.{vue,js,jsx,mjs,ts,tsx,vue}",
            "C:/Projekty/portfolio/components/global/**/*.{vue,js,jsx,mjs,ts,tsx,vue}",
            "C:/Projekty/portfolio/components/**/*.{vue,js,jsx,mjs,ts,tsx,vue}",
            "C:/Projekty/portfolio/layouts/**/*.{vue,js,jsx,mjs,ts,tsx,vue}",
            "C:/Projekty/portfolio/pages/**/*.{vue,js,jsx,mjs,ts,tsx,vue}",
            "C:/Projekty/portfolio/plugins/**/*.{js,ts,mjs}",
            "C:/Projekty/portfolio/composables/**/*.{js,ts,mjs}",
            "C:/Projekty/portfolio/utils/**/*.{js,ts,mjs}",
            "C:/Projekty/portfolio/{A,a}pp.{vue,js,jsx,mjs,ts,tsx,vue}",
            "C:/Projekty/portfolio/{E,e}rror.{vue,js,jsx,mjs,ts,tsx,vue}",
            "C:/Projekty/portfolio/app.config.{js,ts,mjs}",
            "C:/Projekty/portfolio/node_modules/@nuxt/ui/dist/runtime/components/**/*.{vue,mjs,ts}",
            "C:/Projekty/portfolio/node_modules/@nuxt/ui/dist/runtime/ui.config/**/*.{mjs,js,ts}",
            "./components/**/*.{vue,js,ts}",
            "./layouts/**/*.vue",
            "./pages/**/*.vue",
            "./assets/scss/**/*.scss",
            "./composables/**/*.{js,ts}",
            "./plugins/**/*.{js,ts}",
            "./utils/**/*.{js,ts}",
            "./App.{js,ts,vue}",
            "./app.{js,ts,vue}",
            "./Error.{js,ts,vue}",
            "./error.{js,ts,vue}",
            "./app.config.{js,ts}"
          ],
          "extract": {},
          "transform": {}
        },
        "darkMode": "class",
        "container": {
          "padding": {
            "DEFAULT": "1rem",
            "sm": "2rem",
            "lg": "4rem",
            "xl": "5rem",
            "2xl": "7rem"
          }
        },
        "daisyui": {
          "themes": [
            "light"
          ],
          "darkTheme": false
        },
        "safelist": [
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "hover",
              "disabled"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "hover"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark",
              "dark:disabled"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "disabled",
              "dark:hover"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "hover"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark:hover"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark",
              "dark:hover",
              "dark:disabled"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark",
              "dark:disabled"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark:hover",
              "disabled"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "hover"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark",
              "dark:focus"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark",
              "dark:focus"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark:focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "focus-visible"
            ]
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          {
            "pattern": {},
            "variants": [
              "dark"
            ]
          },
          {
            "pattern": {}
          },
          "bg-gray-500",
          "dark:bg-gray-400",
          "text-gray-500",
          "dark:text-gray-400"
        ],
        "variants": {
          "aspectRatio": [
            "responsive"
          ]
        },
        "presets": [],
        "prefix": "",
        "important": false,
        "separator": ":",
        "blocklist": []
      },
      "emailsDir": "C:\\Projekty\\portfolio\\emails"
    },
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "",
      "defaultDirection": "ltr",
      "strategy": "prefix_except_default",
      "lazy": false,
      "rootRedirect": "",
      "routesNameSeparator": "___",
      "defaultLocaleRouteNameSuffix": "default",
      "skipSettingLocaleOnNavigate": false,
      "differentDomains": false,
      "trailingSlash": false,
      "configLocales": [],
      "locales": {},
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_redirected",
        "cookieSecure": false,
        "fallbackLocale": "",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "switchLocalePathLinkSSR": false
      }
    },
    "auth": {
      "computed": {
        "origin": "http://localhost:3000",
        "pathname": "/user/auth",
        "fullBaseUrl": "http://localhost:3000/user/auth"
      },
      "isEnabled": true,
      "session": {
        "enableRefreshPeriodically": false,
        "enableRefreshOnWindowFocus": true
      },
      "globalAppMiddleware": {
        "isEnabled": false,
        "allow404WithoutAuth": true,
        "addDefaultCallbackUrl": true
      },
      "baseURL": "http://localhost:3000/user/auth",
      "provider": {
        "type": "authjs",
        "trustHost": false,
        "defaultProvider": "",
        "addDefaultCallbackUrl": true
      }
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {
  ["emails:Contact.vue"]: {
    import: () => import('./raw/Contact.mjs').then(r => r.default || r),
    meta: {"type":"text/plain; charset=utf-8","etag":"\"3de-CC96UH7UDCxLE6hIVsDeLfaKsi4\"","mtime":"2024-04-14T10:35:10.466Z"}
  }
};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Projekty\\portfolio\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const ERROR_MESSAGES = {
  NO_SECRET: "AUTH_NO_SECRET: No `secret` - this is an error in production, see https://sidebase.io/nuxt-auth/resources/errors. You can ignore this during development",
  NO_ORIGIN: "AUTH_NO_ORIGIN: No `origin` - this is an error in production, see https://sidebase.io/nuxt-auth/resources/errors. You can ignore this during development"
};

const isProduction = "production" === "production";
const useTypedBackendConfig = (runtimeConfig, _type) => {
  return runtimeConfig.public.auth.provider;
};

const getServerOrigin = (event) => {
  const envOrigin = process.env.AUTH_ORIGIN;
  if (envOrigin) {
    return envOrigin;
  }
  const runtimeConfigOrigin = useRuntimeConfig().public.auth.computed.origin;
  if (runtimeConfigOrigin) {
    return runtimeConfigOrigin;
  }
  if (event && !isProduction) {
    return getURL(event.node.req, false);
  }
  throw new Error(ERROR_MESSAGES.NO_ORIGIN);
};
const getRequestURLFromRequest = (event, { trustHost }) => {
  if (trustHost) {
    const forwardedValue = getURL(event.node.req);
    if (forwardedValue) {
      return Array.isArray(forwardedValue) ? forwardedValue[0] : forwardedValue;
    }
  }
  let origin;
  try {
    origin = getServerOrigin(event);
  } catch (error) {
    return void 0;
  }
  return joinURL(origin, useRuntimeConfig().public.auth.computed.pathname);
};

function defineNitroPlugin(def) {
  return def;
}
const _Hd4ZAR2pZ2 = defineNitroPlugin(() => {
  try {
    getServerOrigin();
  } catch (error) {
    {
      throw error;
    }
  }
});

const script = "\"use strict\";(()=>{const a=window,e=document.documentElement,m=[\"dark\",\"light\"],c=window&&window.localStorage&&window.localStorage.getItem&&window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let n=c===\"system\"?d():c;const l=e.getAttribute(\"data-color-mode-forced\");l&&(n=l),i(n),a[\"__NUXT_COLOR_MODE__\"]={preference:c,value:n,getColorScheme:d,addColorScheme:i,removeColorScheme:f};function i(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.add(t):e.className+=\" \"+t,s&&e.setAttribute(\"data-\"+s,o)}function f(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp(t,\"g\"),\"\"),s&&e.removeAttribute(\"data-\"+s)}function r(o){return a.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function d(){if(a.matchMedia&&r(\"\").media!==\"not all\"){for(const o of m)if(r(\":\"+o).matches)return o}return\"light\"}})();\n";

const _426PqiQYwp = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _Hd4ZAR2pZ2,
_426PqiQYwp
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send$1(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send$1(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send$1(event, html);
});

const assets = {
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"3bbb-E1M2PiGtLYWHhSdZ1OrnEsrtvyY\"",
    "mtime": "2024-02-05T19:30:48.000Z",
    "size": 15291,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-384x384.png": {
    "type": "image/png",
    "etag": "\"a294-AVkbP1Wde8tG3NfI+rIfYYZjyDA\"",
    "mtime": "2024-02-05T19:30:49.000Z",
    "size": 41620,
    "path": "../public/android-chrome-384x384.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"36c9-wjOwF/7t9mv1d8s0RhSu8Ulpr1Y\"",
    "mtime": "2024-02-05T19:30:49.000Z",
    "size": 14025,
    "path": "../public/apple-touch-icon.png"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"507-KmAktIISB00ppkWndbtzw5WAeKo\"",
    "mtime": "2024-02-05T19:30:49.000Z",
    "size": 1287,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"8ca-Aulsc+99xlHes7kGhRyB+oIuWx8\"",
    "mtime": "2024-02-05T19:30:49.000Z",
    "size": 2250,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-Xth7YmV/r5bpb1O9eFJQl6Vx9OI\"",
    "mtime": "2024-02-05T19:30:50.000Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/google92bde798388081b3.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"35-AcT/nW0HCfkeLgAk+FjeiJcTuPc\"",
    "mtime": "2024-04-17T15:21:00.259Z",
    "size": 53,
    "path": "../public/google92bde798388081b3.html"
  },
  "/mstile-150x150.png": {
    "type": "image/png",
    "etag": "\"2716-B8vb7HZud6IA1XEKomlb7VM6yzg\"",
    "mtime": "2024-02-05T19:30:50.000Z",
    "size": 10006,
    "path": "../public/mstile-150x150.png"
  },
  "/safari-pinned-tab.svg": {
    "type": "image/svg+xml",
    "etag": "\"6b8-qRCPdnj2K8VcpOCbAOWdvxqmykE\"",
    "mtime": "2024-02-05T19:30:50.000Z",
    "size": 1720,
    "path": "../public/safari-pinned-tab.svg"
  },
  "/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"1aa-4XI92YE7Ty3y2pH4NP9kRXhknME\"",
    "mtime": "2024-02-05T19:30:50.000Z",
    "size": 426,
    "path": "../public/site.webmanifest"
  },
  "/_nuxt/818qbDdQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"184-E0WucDFHCbPvCCMcrd+OWg8GYDU\"",
    "mtime": "2024-04-17T15:21:34.977Z",
    "size": 388,
    "path": "../public/_nuxt/818qbDdQ.js"
  },
  "/_nuxt/Bcw-ZHf8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"848-3odJ3ynrhlrJwdrHmjftyAZJ1PE\"",
    "mtime": "2024-04-17T15:21:34.977Z",
    "size": 2120,
    "path": "../public/_nuxt/Bcw-ZHf8.js"
  },
  "/_nuxt/ByMuWOqQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13d-Ms9KLLeJGA7COv2CTR8GdKM8jqA\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 317,
    "path": "../public/_nuxt/ByMuWOqQ.js"
  },
  "/_nuxt/Bzyxap5m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b0-uCBHG2Me5sM1ltqhfN3b+R///Kk\"",
    "mtime": "2024-04-17T15:21:34.977Z",
    "size": 1968,
    "path": "../public/_nuxt/Bzyxap5m.js"
  },
  "/_nuxt/C3C-sYUN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"438-AnMZ2ouIZenVUnH25BGGeiNs0LE\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 1080,
    "path": "../public/_nuxt/C3C-sYUN.js"
  },
  "/_nuxt/C5lYLNdn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70f-gD/Srz/7LZs0gDWG0kin2ACC49w\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 1807,
    "path": "../public/_nuxt/C5lYLNdn.js"
  },
  "/_nuxt/CAbBbLHK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"229-MrY9uSFO7yCsP3UEyEv9cJpy1HY\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 553,
    "path": "../public/_nuxt/CAbBbLHK.js"
  },
  "/_nuxt/CE9D287P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10e0-n6nFid24qXG9Du3BnN/mcH3gW2U\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 4320,
    "path": "../public/_nuxt/CE9D287P.js"
  },
  "/_nuxt/CfegeiiL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5af-u3QPrgBGkbgIFlDqqfn9XGqANCM\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 1455,
    "path": "../public/_nuxt/CfegeiiL.js"
  },
  "/_nuxt/CGdCimj4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10bf-PViTQbdj1lpclWwiDlAtiBUSsq0\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 4287,
    "path": "../public/_nuxt/CGdCimj4.js"
  },
  "/_nuxt/CKsvohW6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1da-hbczBIJUgBqo0oluk0mjXTjXcYY\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 474,
    "path": "../public/_nuxt/CKsvohW6.js"
  },
  "/_nuxt/CprJJDPc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ee9-GTV22vtvZoBI06I+cKejedv4Wv0\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 3817,
    "path": "../public/_nuxt/CprJJDPc.js"
  },
  "/_nuxt/CQ7C6HAE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ad-fTttIK4X+wjoWMO8G7wkIH34u40\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 941,
    "path": "../public/_nuxt/CQ7C6HAE.js"
  },
  "/_nuxt/CrNhYyO4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1de-3LRuimTnY9pdXuLdj8OFEfpxTjY\"",
    "mtime": "2024-04-17T15:21:34.980Z",
    "size": 478,
    "path": "../public/_nuxt/CrNhYyO4.js"
  },
  "/_nuxt/CRQFsZON.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"445-TJ2RgCPw6ifhLeL4SKY771eL2D8\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 1093,
    "path": "../public/_nuxt/CRQFsZON.js"
  },
  "/_nuxt/CsGiIBGr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"402-enrVP7n74TFPcTop7qwdDMiQiZ0\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 1026,
    "path": "../public/_nuxt/CsGiIBGr.js"
  },
  "/_nuxt/CWA4otTf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"231-49om+74fSvO3zSl0HmIxtD39dXg\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 561,
    "path": "../public/_nuxt/CWA4otTf.js"
  },
  "/_nuxt/Cwcmqgll.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60a-NSUUFejvTw3F2M4eOhAeGghGWAw\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 1546,
    "path": "../public/_nuxt/Cwcmqgll.js"
  },
  "/_nuxt/D0ZKz1Ir.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35e0-N76bXUibODsjfaqxTYiUeR7CNww\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 13792,
    "path": "../public/_nuxt/D0ZKz1Ir.js"
  },
  "/_nuxt/D5-Tpeuj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1ea-tlMHEGH3bI4a/WkYl2xg47XNFfc\"",
    "mtime": "2024-04-17T15:21:34.984Z",
    "size": 53738,
    "path": "../public/_nuxt/D5-Tpeuj.js"
  },
  "/_nuxt/DAiwLJ34.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"274-x5DoUe5ubVPlJiclIflr4ka0+/w\"",
    "mtime": "2024-04-17T15:21:34.977Z",
    "size": 628,
    "path": "../public/_nuxt/DAiwLJ34.js"
  },
  "/_nuxt/DAUHblLc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7e4-5k0LBYaRw1n4rh6yJznmSXgx9MQ\"",
    "mtime": "2024-04-17T15:21:34.981Z",
    "size": 2020,
    "path": "../public/_nuxt/DAUHblLc.js"
  },
  "/_nuxt/DCq_G5Ku.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d8-580QjKqLEqNr4gA7Bnn+xXwVjqE\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 216,
    "path": "../public/_nuxt/DCq_G5Ku.js"
  },
  "/_nuxt/DD-qERra.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"76b-15wiLxORKK7RvF6OA2n4W5g14P4\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 1899,
    "path": "../public/_nuxt/DD-qERra.js"
  },
  "/_nuxt/DEGCknGW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a85-GJUrSoe8WrmQSu7+Pzq8iuCSrW0\"",
    "mtime": "2024-04-17T15:21:34.978Z",
    "size": 6789,
    "path": "../public/_nuxt/DEGCknGW.js"
  },
  "/_nuxt/demand.BKpqPjby.jpg": {
    "type": "image/jpeg",
    "etag": "\"8dff-ONHrmO+8f67khnldUDJ7VlQ8xLk\"",
    "mtime": "2024-04-17T15:21:34.968Z",
    "size": 36351,
    "path": "../public/_nuxt/demand.BKpqPjby.jpg"
  },
  "/_nuxt/DfRvaoFt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"467-kE29pZ0QUE/qZkr/BiwB7MtzeEM\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 1127,
    "path": "../public/_nuxt/DfRvaoFt.js"
  },
  "/_nuxt/DiOopdJ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8dd-WQMtXCu2h2QIrIaKWy/T6gHc/mI\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 2269,
    "path": "../public/_nuxt/DiOopdJ7.js"
  },
  "/_nuxt/DlAUqK2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2024-04-17T15:21:34.977Z",
    "size": 91,
    "path": "../public/_nuxt/DlAUqK2U.js"
  },
  "/_nuxt/DMH9Lfz-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c0-jF4SLmSw/RyIScCDpzQveZ70wBU\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 448,
    "path": "../public/_nuxt/DMH9Lfz-.js"
  },
  "/_nuxt/DmJGNsxO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1244-femg+bwRh0n8b5uNMjpvRhLxQ4g\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 4676,
    "path": "../public/_nuxt/DmJGNsxO.js"
  },
  "/_nuxt/doger-desktop.n8T5WlF3.jpg": {
    "type": "image/jpeg",
    "etag": "\"105ca-GDigjkMzEJO3g9FuCZXoDZvn/ug\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 67018,
    "path": "../public/_nuxt/doger-desktop.n8T5WlF3.jpg"
  },
  "/_nuxt/DTM-Y36v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e99c-ro5zIlH3RlQG17Ao2Hb1fyVKkcI\"",
    "mtime": "2024-04-17T15:21:34.988Z",
    "size": 321948,
    "path": "../public/_nuxt/DTM-Y36v.js"
  },
  "/_nuxt/DveV8FND.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"558c-KJD6v8LfgzKoFMx/1QTCWHzY1Qw\"",
    "mtime": "2024-04-17T15:21:34.984Z",
    "size": 21900,
    "path": "../public/_nuxt/DveV8FND.js"
  },
  "/_nuxt/entry.CEtkZypT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"78-ZF8fIVbUtIt5mrETfIzWbk5WGv4\"",
    "mtime": "2024-04-17T15:21:34.966Z",
    "size": 120,
    "path": "../public/_nuxt/entry.CEtkZypT.css"
  },
  "/_nuxt/error-404.BOwFbGAB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e68-hlsnPvOJNEEWVEjbQnHBf9EhOdM\"",
    "mtime": "2024-04-17T15:21:34.964Z",
    "size": 3688,
    "path": "../public/_nuxt/error-404.BOwFbGAB.css"
  },
  "/_nuxt/error-500.CzZUE1u9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-QP983DB9m1oiDr87r1V1AYEhrfo\"",
    "mtime": "2024-04-17T15:21:34.971Z",
    "size": 2016,
    "path": "../public/_nuxt/error-500.CzZUE1u9.css"
  },
  "/_nuxt/Geist-Black.7GzfRRSj.ttf": {
    "type": "font/ttf",
    "etag": "\"1a620-XQ8N5g2pPNSkWlaEpSGNCExGpVE\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 108064,
    "path": "../public/_nuxt/Geist-Black.7GzfRRSj.ttf"
  },
  "/_nuxt/Geist-Bold.BU7AlFNh.ttf": {
    "type": "font/ttf",
    "etag": "\"19fa4-Q5bdYoO64usp7P1cAqMynjnZNQE\"",
    "mtime": "2024-04-17T15:21:34.968Z",
    "size": 106404,
    "path": "../public/_nuxt/Geist-Bold.BU7AlFNh.ttf"
  },
  "/_nuxt/Geist-Medium.ecljcr0e.ttf": {
    "type": "font/ttf",
    "etag": "\"19e28-LJtCSuTqgOkVBU8WQXihsRFvJ68\"",
    "mtime": "2024-04-17T15:21:34.968Z",
    "size": 106024,
    "path": "../public/_nuxt/Geist-Medium.ecljcr0e.ttf"
  },
  "/_nuxt/Geist-Regular.BI1mUWmY.ttf": {
    "type": "font/ttf",
    "etag": "\"194d4-cDKeD/kkiz+Sv4TXqo0jX46h1cs\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 103636,
    "path": "../public/_nuxt/Geist-Regular.BI1mUWmY.ttf"
  },
  "/_nuxt/Geist-Thin.DA2yV90d.ttf": {
    "type": "font/ttf",
    "etag": "\"18b28-Hx8ex2QxYll3MKxRcIyvAi60h2o\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 101160,
    "path": "../public/_nuxt/Geist-Thin.DA2yV90d.ttf"
  },
  "/_nuxt/Geist-UltraBlack.0ORgJWAC.ttf": {
    "type": "font/ttf",
    "etag": "\"1a834-vhmYrlG9mU5dHszY5DH1gCYyxRM\"",
    "mtime": "2024-04-17T15:21:34.967Z",
    "size": 108596,
    "path": "../public/_nuxt/Geist-UltraBlack.0ORgJWAC.ttf"
  },
  "/_nuxt/HN3RX62z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ef-+tSDFLZpcphAlXomNMIqvIeSU6U\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 495,
    "path": "../public/_nuxt/HN3RX62z.js"
  },
  "/_nuxt/hR8vZf6G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9c6-1aHmAgTbg9XTtWLfQ7V5UQtB/KA\"",
    "mtime": "2024-04-17T15:21:34.977Z",
    "size": 2502,
    "path": "../public/_nuxt/hR8vZf6G.js"
  },
  "/_nuxt/Icon.Dan13sfw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-GIhgs9GKs+oRSbAELPylJNjc8co\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 67,
    "path": "../public/_nuxt/Icon.Dan13sfw.css"
  },
  "/_nuxt/IconCSS.Z2BAHt_z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-h9Iv/oJ6/LJjNheNG92kJMblk/8\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 258,
    "path": "../public/_nuxt/IconCSS.Z2BAHt_z.css"
  },
  "/_nuxt/index.BFdqpf8E.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"118-HnVeUP+nXgNadAUcFKWKmEJDLEw\"",
    "mtime": "2024-04-17T15:21:34.974Z",
    "size": 280,
    "path": "../public/_nuxt/index.BFdqpf8E.css"
  },
  "/_nuxt/index.Bt54SfJW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11f1-xYZvJYztzRkdRhq4bqdotTmsoEg\"",
    "mtime": "2024-04-17T15:21:34.976Z",
    "size": 4593,
    "path": "../public/_nuxt/index.Bt54SfJW.css"
  },
  "/_nuxt/mobile.9S7sboHz.jpg": {
    "type": "image/jpeg",
    "etag": "\"108c7-fcwQ2IgL4vfxn1oLN5AX98xouZM\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 67783,
    "path": "../public/_nuxt/mobile.9S7sboHz.jpg"
  },
  "/_nuxt/offer-bg.D1R1ypFJ.jpg": {
    "type": "image/jpeg",
    "etag": "\"8f4f-nCB8Ei033h72jm4+eTbXZM9o5dc\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 36687,
    "path": "../public/_nuxt/offer-bg.D1R1ypFJ.jpg"
  },
  "/_nuxt/render.CMSQvD-3.png": {
    "type": "image/png",
    "etag": "\"3556-BAWIJQn3LoLUfedc0kXVw+6CyF4\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 13654,
    "path": "../public/_nuxt/render.CMSQvD-3.png"
  },
  "/_nuxt/seo.C5UdN5is.jpg": {
    "type": "image/jpeg",
    "etag": "\"b387-czcITHIAuuHssl7kPNiNS9Wv4zU\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 45959,
    "path": "../public/_nuxt/seo.C5UdN5is.jpg"
  },
  "/_nuxt/web1.is4B6yJx.jpg": {
    "type": "image/jpeg",
    "etag": "\"5239-Zw4XFo4CAAAFv3KOhHH0Lkxi36Y\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 21049,
    "path": "../public/_nuxt/web1.is4B6yJx.jpg"
  },
  "/_nuxt/web2.BEJrxnQ6.jpg": {
    "type": "image/jpeg",
    "etag": "\"4acd-JRes856JvGC5Ng0GN6PEbyW5xgw\"",
    "mtime": "2024-04-17T15:21:34.970Z",
    "size": 19149,
    "path": "../public/_nuxt/web2.BEJrxnQ6.jpg"
  },
  "/_nuxt/web3.BhDaOr3Q.jpg": {
    "type": "image/jpeg",
    "etag": "\"61d9-PTmfm9hUd3yzwEkkrdTNiy1PVIY\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 25049,
    "path": "../public/_nuxt/web3.BhDaOr3Q.jpg"
  },
  "/_nuxt/web4.CavjSrKO.jpg": {
    "type": "image/jpeg",
    "etag": "\"8822-LLTOh/ET8dJRspzO4eGXq6DVzLg\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 34850,
    "path": "../public/_nuxt/web4.CavjSrKO.jpg"
  },
  "/_nuxt/web5.QJI0NCjy.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c16-C/doRB1M6zvtHrL8lRVsq53krCs\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 27670,
    "path": "../public/_nuxt/web5.QJI0NCjy.jpg"
  },
  "/_nuxt/web6.CzfZhqk_.jpg": {
    "type": "image/jpeg",
    "etag": "\"4998-N4z4Tp/3uvHRLen0UtmDBTOcJ2k\"",
    "mtime": "2024-04-17T15:21:34.969Z",
    "size": 18840,
    "path": "../public/_nuxt/web6.CzfZhqk_.jpg"
  },
  "/_nuxt/wlGFE8qv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a8-ayllOqPXXGCS50rGXgR1zgGbUfY\"",
    "mtime": "2024-04-17T15:21:34.982Z",
    "size": 936,
    "path": "../public/_nuxt/wlGFE8qv.js"
  },
  "/_nuxt/_7yNtkc3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37e-jzcQxL+2NVSa+vhSUFMAznLiop8\"",
    "mtime": "2024-04-17T15:21:34.983Z",
    "size": 894,
    "path": "../public/_nuxt/_7yNtkc3.js"
  },
  "/_nuxt/_slug_.b9kwlKzL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"580-AEy+8Vq9PsyPluYfMUrx9N9pq6M\"",
    "mtime": "2024-04-17T15:21:34.973Z",
    "size": 1408,
    "path": "../public/_nuxt/_slug_.b9kwlKzL.css"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-YhjoS93EKe4yyeW22nhb0VlVjrI\"",
    "mtime": "2024-04-17T15:21:55.632Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/3e66eebb-fa92-49de-b9c6-2bbb01e4014d.json": {
    "type": "application/json",
    "etag": "\"8b-gZzq+TFjzMzqqze5eHmDi8IxcYY\"",
    "mtime": "2024-04-17T15:21:55.633Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/3e66eebb-fa92-49de-b9c6-2bbb01e4014d.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const options = {
  "message": [
    {
      "to": "lukasz.fujarski@gmail.com"
    }
  ],
  "smtp": {
    "host": "smtp.mailgun.org",
    "port": 587,
    "auth": {
      "user": "postmaster@sandbox3d5f52a7c94d4b3c83ade5b6124bba07.mailgun.org",
      "pass": "6f1459e3d58612c6f4d9140b41a2cae1-4b670513-4b614ea2"
    }
  }
};

const send = (async (body, options, transport) => {
  body = {
    config: 0,
    ...body
  };
  if (typeof body.config === 'string') {
    const configIndex = findIndex(_ => _.name === body.config)(options.message);
    if (configIndex === -1) {
      throw new Error(`Message config with name '${body.config}' not found.`);
    }
    body.config = configIndex;
  } else if (!options.message[body.config]) {
    throw new Error(`Message config not found at index ${body.config}.`);
  }
  await transport.sendMail({
    ...omit(['config', 'to', 'cc', 'bcc'])(body),
    ...omit(['name'])(options.message[body.config])
  });
});

const transport = nodemailer.createTransport(options.smtp);
const _um63CR = defineEventHandler(async event => {
  try {
    await send(await readBody(event), options, transport);
  } catch (error) {
    throw createError$1({
      statusCode: 500,
      statusMessage: error.message
    });
  }
  return '';
});

const _lazy_nxrOAg = () => import('./routes/api/article.mjs');
const _lazy_EOzZG1 = () => import('./routes/api/articles/_id_.mjs');
const _lazy_XLuisZ = () => import('./routes/api/articles/_slug_.get.mjs');
const _lazy_s05Apl = () => import('./routes/api/index.mjs');
const _lazy_K6X0SQ = () => import('./routes/api/contact.get.mjs');
const _lazy_vA5qDf = () => import('./routes/api/topics/_id_.get.mjs');
const _lazy_CNqtvd = () => import('./routes/api/index.get.mjs');
const _lazy_RjjxF4 = () => import('./routes/api/index.post.mjs');
const _lazy_ttsuRa = () => import('./routes/api/user.mjs');
const _lazy_Lt8z38 = () => import('./routes/user/auth/_..._.mjs');
const _lazy_wrh7Bb = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/article', handler: _lazy_nxrOAg, lazy: true, middleware: false, method: undefined },
  { route: '/api/articles/:id', handler: _lazy_EOzZG1, lazy: true, middleware: false, method: undefined },
  { route: '/api/articles/:slug', handler: _lazy_XLuisZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/articles', handler: _lazy_s05Apl, lazy: true, middleware: false, method: undefined },
  { route: '/api/contact', handler: _lazy_K6X0SQ, lazy: true, middleware: false, method: "get" },
  { route: '/api/topics/:id', handler: _lazy_vA5qDf, lazy: true, middleware: false, method: "get" },
  { route: '/api/topics', handler: _lazy_CNqtvd, lazy: true, middleware: false, method: "get" },
  { route: '/api/topics', handler: _lazy_RjjxF4, lazy: true, middleware: false, method: "post" },
  { route: '/api/user', handler: _lazy_ttsuRa, lazy: true, middleware: false, method: undefined },
  { route: '/user/auth/**', handler: _lazy_Lt8z38, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_wrh7Bb, lazy: true, middleware: false, method: undefined },
  { route: '/mail/send', handler: _um63CR, lazy: false, middleware: false, method: "post" },
  { route: '/**', handler: _lazy_wrh7Bb, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, klona as A, sanitizeStatusCode as B, defuFn as C, createHooks as D, ERROR_MESSAGES as E, getRequestHeaders as F, getHeader as G, toRouteMatcher as H, createRouter$1 as I, parse as J, getRequestHeader as K, destr as L, isEqual as M, getCookie as N, deleteCookie as O, hash as P, nodeServer as Q, useStorage as a, defu as b, createError$1 as c, defineEventHandler as d, eventHandler as e, appendHeader as f, getQuery as g, sendRedirect as h, useTypedBackendConfig as i, getRequestURLFromRequest as j, getHeaders as k, getMethod as l, isMethod as m, setResponseHeader as n, send$1 as o, parseCookies as p, getResponseStatus as q, readBody as r, setCookie as s, setResponseStatus as t, useRuntimeConfig as u, useNitroApp as v, setResponseHeaders as w, joinURL as x, getRouteRules as y, getResponseStatusText as z };
//# sourceMappingURL=runtime.mjs.map
