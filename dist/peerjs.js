(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
class $351d3c8bb83bcec5$export$f1c5f4c9cb95390b {
    constructor(){
        this.chunkedMTU = 16300 // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.
        ;
        // Binary stuff
        this._dataCount = 1;
        this.chunk = (blob)=>{
            const chunks = [];
            const size = blob.byteLength;
            const total = Math.ceil(size / this.chunkedMTU);
            let index = 0;
            let start = 0;
            while(start < size){
                const end = Math.min(size, start + this.chunkedMTU);
                const b = blob.slice(start, end);
                const chunk = {
                    __peerData: this._dataCount,
                    n: index,
                    data: b,
                    total: total
                };
                chunks.push(chunk);
                start = end;
                index++;
            }
            this._dataCount++;
            return chunks;
        };
    }
}
function $351d3c8bb83bcec5$export$52c89ebcdc4f53f2(bufs) {
    let size = 0;
    for (const buf of bufs)size += buf.byteLength;
    const result = new Uint8Array(size);
    let offset = 0;
    for (const buf of bufs){
        result.set(buf, offset);
        offset += buf.byteLength;
    }
    return result;
}


class $b09b85ad69e68d49$var$$e8379818650e2442$export$93654d4f2d6cd524 {
    append_buffer(data) {
        this.flush();
        this._parts.push(data);
    }
    append(data) {
        this._pieces.push(data);
    }
    flush() {
        if (this._pieces.length > 0) {
            const buf = new Uint8Array(this._pieces);
            this._parts.push(buf);
            this._pieces = [];
        }
    }
    toArrayBuffer() {
        const buffer = [];
        for (const part of this._parts)buffer.push(part);
        return $b09b85ad69e68d49$var$$e8379818650e2442$var$concatArrayBuffers(buffer).buffer;
    }
    constructor(){
        this.encoder = new TextEncoder();
        this._pieces = [];
        this._parts = [];
    }
}
function $b09b85ad69e68d49$var$$e8379818650e2442$var$concatArrayBuffers(bufs) {
    let size = 0;
    for (const buf of bufs)size += buf.byteLength;
    const result = new Uint8Array(size);
    let offset = 0;
    for (const buf of bufs){
        const view = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
        result.set(view, offset);
        offset += buf.byteLength;
    }
    return result;
}
function $b09b85ad69e68d49$export$417857010dc9287f(data) {
    const unpacker = new $b09b85ad69e68d49$var$$0cfd7828ad59115f$var$Unpacker(data);
    return unpacker.unpack();
}
function $b09b85ad69e68d49$export$2a703dbb0cb35339(data) {
    const packer = new $b09b85ad69e68d49$export$b9ec4b114aa40074();
    const res = packer.pack(data);
    if (res instanceof Promise) return res.then(()=>packer.getBuffer());
    return packer.getBuffer();
}
class $b09b85ad69e68d49$var$$0cfd7828ad59115f$var$Unpacker {
    unpack() {
        const type = this.unpack_uint8();
        if (type < 0x80) return type;
        else if ((type ^ 0xe0) < 0x20) return (type ^ 0xe0) - 0x20;
        let size;
        if ((size = type ^ 0xa0) <= 0x0f) return this.unpack_raw(size);
        else if ((size = type ^ 0xb0) <= 0x0f) return this.unpack_string(size);
        else if ((size = type ^ 0x90) <= 0x0f) return this.unpack_array(size);
        else if ((size = type ^ 0x80) <= 0x0f) return this.unpack_map(size);
        switch(type){
            case 0xc0:
                return null;
            case 0xc1:
                return undefined;
            case 0xc2:
                return false;
            case 0xc3:
                return true;
            case 0xca:
                return this.unpack_float();
            case 0xcb:
                return this.unpack_double();
            case 0xcc:
                return this.unpack_uint8();
            case 0xcd:
                return this.unpack_uint16();
            case 0xce:
                return this.unpack_uint32();
            case 0xcf:
                return this.unpack_uint64();
            case 0xd0:
                return this.unpack_int8();
            case 0xd1:
                return this.unpack_int16();
            case 0xd2:
                return this.unpack_int32();
            case 0xd3:
                return this.unpack_int64();
            case 0xd4:
                return undefined;
            case 0xd5:
                return undefined;
            case 0xd6:
                return undefined;
            case 0xd7:
                return undefined;
            case 0xd8:
                size = this.unpack_uint16();
                return this.unpack_string(size);
            case 0xd9:
                size = this.unpack_uint32();
                return this.unpack_string(size);
            case 0xda:
                size = this.unpack_uint16();
                return this.unpack_raw(size);
            case 0xdb:
                size = this.unpack_uint32();
                return this.unpack_raw(size);
            case 0xdc:
                size = this.unpack_uint16();
                return this.unpack_array(size);
            case 0xdd:
                size = this.unpack_uint32();
                return this.unpack_array(size);
            case 0xde:
                size = this.unpack_uint16();
                return this.unpack_map(size);
            case 0xdf:
                size = this.unpack_uint32();
                return this.unpack_map(size);
        }
    }
    unpack_uint8() {
        const byte = this.dataView[this.index] & 0xff;
        this.index++;
        return byte;
    }
    unpack_uint16() {
        const bytes = this.read(2);
        const uint16 = (bytes[0] & 0xff) * 256 + (bytes[1] & 0xff);
        this.index += 2;
        return uint16;
    }
    unpack_uint32() {
        const bytes = this.read(4);
        const uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
        this.index += 4;
        return uint32;
    }
    unpack_uint64() {
        const bytes = this.read(8);
        const uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
        this.index += 8;
        return uint64;
    }
    unpack_int8() {
        const uint8 = this.unpack_uint8();
        return uint8 < 0x80 ? uint8 : uint8 - 256;
    }
    unpack_int16() {
        const uint16 = this.unpack_uint16();
        return uint16 < 0x8000 ? uint16 : uint16 - 65536;
    }
    unpack_int32() {
        const uint32 = this.unpack_uint32();
        return uint32 < 2 ** 31 ? uint32 : uint32 - 2 ** 32;
    }
    unpack_int64() {
        const uint64 = this.unpack_uint64();
        return uint64 < 2 ** 63 ? uint64 : uint64 - 2 ** 64;
    }
    unpack_raw(size) {
        if (this.length < this.index + size) throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${size} ${this.length}`);
        const buf = this.dataBuffer.slice(this.index, this.index + size);
        this.index += size;
        return buf;
    }
    unpack_string(size) {
        const bytes = this.read(size);
        let i = 0;
        let str = "";
        let c;
        let code;
        while(i < size){
            c = bytes[i];
            // The length of a UTF-8 sequence is specified in the first byte:
            // 0xxxxxxx means length 1,
            // 110xxxxx means length 2,
            // 1110xxxx means length 3,
            // 11110xxx means length 4.
            // 10xxxxxx is for non-initial bytes.
            if (c < 0xa0) {
                // One-byte sequence: bits 0xxxxxxx
                code = c;
                i++;
            } else if ((c ^ 0xc0) < 0x20) {
                // Two-byte sequence: bits 110xxxxx 10xxxxxx
                code = (c & 0x1f) << 6 | bytes[i + 1] & 0x3f;
                i += 2;
            } else if ((c ^ 0xe0) < 0x10) {
                // Three-byte sequence: bits 1110xxxx 10xxxxxx 10xxxxxx
                code = (c & 0x0f) << 12 | (bytes[i + 1] & 0x3f) << 6 | bytes[i + 2] & 0x3f;
                i += 3;
            } else {
                // Four-byte sequence: bits 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
                code = (c & 0x07) << 18 | (bytes[i + 1] & 0x3f) << 12 | (bytes[i + 2] & 0x3f) << 6 | bytes[i + 3] & 0x3f;
                i += 4;
            }
            str += String.fromCodePoint(code);
        }
        this.index += size;
        return str;
    }
    unpack_array(size) {
        const objects = new Array(size);
        for(let i = 0; i < size; i++)objects[i] = this.unpack();
        return objects;
    }
    unpack_map(size) {
        const map = {};
        for(let i = 0; i < size; i++){
            const key = this.unpack();
            map[key] = this.unpack();
        }
        return map;
    }
    unpack_float() {
        const uint32 = this.unpack_uint32();
        const sign = uint32 >> 31;
        const exp = (uint32 >> 23 & 0xff) - 127;
        const fraction = uint32 & 0x7fffff | 0x800000;
        return (sign === 0 ? 1 : -1) * fraction * 2 ** (exp - 23);
    }
    unpack_double() {
        const h32 = this.unpack_uint32();
        const l32 = this.unpack_uint32();
        const sign = h32 >> 31;
        const exp = (h32 >> 20 & 0x7ff) - 1023;
        const hfrac = h32 & 0xfffff | 0x100000;
        const frac = hfrac * 2 ** (exp - 20) + l32 * 2 ** (exp - 52);
        return (sign === 0 ? 1 : -1) * frac;
    }
    read(length) {
        const j = this.index;
        if (j + length <= this.length) return this.dataView.subarray(j, j + length);
        else throw new Error("BinaryPackFailure: read index out of range");
    }
    constructor(data){
        this.index = 0;
        this.dataBuffer = data;
        this.dataView = new Uint8Array(this.dataBuffer);
        this.length = this.dataBuffer.byteLength;
    }
}
class $b09b85ad69e68d49$export$b9ec4b114aa40074 {
    getBuffer() {
        return this._bufferBuilder.toArrayBuffer();
    }
    pack(value) {
        if (typeof value === "string") this.pack_string(value);
        else if (typeof value === "number") {
            if (Math.floor(value) === value) this.pack_integer(value);
            else this.pack_double(value);
        } else if (typeof value === "boolean") {
            if (value === true) this._bufferBuilder.append(0xc3);
            else if (value === false) this._bufferBuilder.append(0xc2);
        } else if (value === undefined) this._bufferBuilder.append(0xc0);
        else if (typeof value === "object") {
            if (value === null) this._bufferBuilder.append(0xc0);
            else {
                const constructor = value.constructor;
                if (value instanceof Array) {
                    const res = this.pack_array(value);
                    if (res instanceof Promise) return res.then(()=>this._bufferBuilder.flush());
                } else if (value instanceof ArrayBuffer) this.pack_bin(new Uint8Array(value));
                else if ("BYTES_PER_ELEMENT" in value) {
                    const v = value;
                    this.pack_bin(new Uint8Array(v.buffer, v.byteOffset, v.byteLength));
                } else if (value instanceof Date) this.pack_string(value.toString());
                else if (value instanceof Blob) return value.arrayBuffer().then((buffer)=>{
                    this.pack_bin(new Uint8Array(buffer));
                    this._bufferBuilder.flush();
                });
                else if (constructor == Object || constructor.toString().startsWith("class")) {
                    const res = this.pack_object(value);
                    if (res instanceof Promise) return res.then(()=>this._bufferBuilder.flush());
                } else throw new Error(`Type "${constructor.toString()}" not yet supported`);
            }
        } else throw new Error(`Type "${typeof value}" not yet supported`);
        this._bufferBuilder.flush();
    }
    pack_bin(blob) {
        const length = blob.length;
        if (length <= 0x0f) this.pack_uint8(0xa0 + length);
        else if (length <= 0xffff) {
            this._bufferBuilder.append(0xda);
            this.pack_uint16(length);
        } else if (length <= 0xffffffff) {
            this._bufferBuilder.append(0xdb);
            this.pack_uint32(length);
        } else throw new Error("Invalid length");
        this._bufferBuilder.append_buffer(blob);
    }
    pack_string(str) {
        const encoded = this._textEncoder.encode(str);
        const length = encoded.length;
        if (length <= 0x0f) this.pack_uint8(0xb0 + length);
        else if (length <= 0xffff) {
            this._bufferBuilder.append(0xd8);
            this.pack_uint16(length);
        } else if (length <= 0xffffffff) {
            this._bufferBuilder.append(0xd9);
            this.pack_uint32(length);
        } else throw new Error("Invalid length");
        this._bufferBuilder.append_buffer(encoded);
    }
    pack_array(ary) {
        const length = ary.length;
        if (length <= 0x0f) this.pack_uint8(0x90 + length);
        else if (length <= 0xffff) {
            this._bufferBuilder.append(0xdc);
            this.pack_uint16(length);
        } else if (length <= 0xffffffff) {
            this._bufferBuilder.append(0xdd);
            this.pack_uint32(length);
        } else throw new Error("Invalid length");
        const packNext = (index)=>{
            if (index < length) {
                const res = this.pack(ary[index]);
                if (res instanceof Promise) return res.then(()=>packNext(index + 1));
                return packNext(index + 1);
            }
        };
        return packNext(0);
    }
    pack_integer(num) {
        if (num >= -32 && num <= 0x7f) this._bufferBuilder.append(num & 0xff);
        else if (num >= 0x00 && num <= 0xff) {
            this._bufferBuilder.append(0xcc);
            this.pack_uint8(num);
        } else if (num >= -128 && num <= 0x7f) {
            this._bufferBuilder.append(0xd0);
            this.pack_int8(num);
        } else if (num >= 0x0000 && num <= 0xffff) {
            this._bufferBuilder.append(0xcd);
            this.pack_uint16(num);
        } else if (num >= -32768 && num <= 0x7fff) {
            this._bufferBuilder.append(0xd1);
            this.pack_int16(num);
        } else if (num >= 0x00000000 && num <= 0xffffffff) {
            this._bufferBuilder.append(0xce);
            this.pack_uint32(num);
        } else if (num >= -2147483648 && num <= 0x7fffffff) {
            this._bufferBuilder.append(0xd2);
            this.pack_int32(num);
        } else if (num >= -9223372036854776000 && num <= 0x7fffffffffffffff) {
            this._bufferBuilder.append(0xd3);
            this.pack_int64(num);
        } else if (num >= 0x0000000000000000 && num <= 0xffffffffffffffff) {
            this._bufferBuilder.append(0xcf);
            this.pack_uint64(num);
        } else throw new Error("Invalid integer");
    }
    pack_double(num) {
        let sign = 0;
        if (num < 0) {
            sign = 1;
            num = -num;
        }
        const exp = Math.floor(Math.log(num) / Math.LN2);
        const frac0 = num / 2 ** exp - 1;
        const frac1 = Math.floor(frac0 * 2 ** 52);
        const b32 = 2 ** 32;
        const h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 0x0fffff;
        const l32 = frac1 % b32;
        this._bufferBuilder.append(0xcb);
        this.pack_int32(h32);
        this.pack_int32(l32);
    }
    pack_object(obj) {
        const keys = Object.keys(obj);
        const length = keys.length;
        if (length <= 0x0f) this.pack_uint8(0x80 + length);
        else if (length <= 0xffff) {
            this._bufferBuilder.append(0xde);
            this.pack_uint16(length);
        } else if (length <= 0xffffffff) {
            this._bufferBuilder.append(0xdf);
            this.pack_uint32(length);
        } else throw new Error("Invalid length");
        const packNext = (index)=>{
            if (index < keys.length) {
                const prop = keys[index];
                // eslint-disable-next-line no-prototype-builtins
                if (obj.hasOwnProperty(prop)) {
                    this.pack(prop);
                    const res = this.pack(obj[prop]);
                    if (res instanceof Promise) return res.then(()=>packNext(index + 1));
                }
                return packNext(index + 1);
            }
        };
        return packNext(0);
    }
    pack_uint8(num) {
        this._bufferBuilder.append(num);
    }
    pack_uint16(num) {
        this._bufferBuilder.append(num >> 8);
        this._bufferBuilder.append(num & 0xff);
    }
    pack_uint32(num) {
        const n = num & 0xffffffff;
        this._bufferBuilder.append((n & 0xff000000) >>> 24);
        this._bufferBuilder.append((n & 0x00ff0000) >>> 16);
        this._bufferBuilder.append((n & 0x0000ff00) >>> 8);
        this._bufferBuilder.append(n & 0x000000ff);
    }
    pack_uint64(num) {
        const high = num / 2 ** 32;
        const low = num % 2 ** 32;
        this._bufferBuilder.append((high & 0xff000000) >>> 24);
        this._bufferBuilder.append((high & 0x00ff0000) >>> 16);
        this._bufferBuilder.append((high & 0x0000ff00) >>> 8);
        this._bufferBuilder.append(high & 0x000000ff);
        this._bufferBuilder.append((low & 0xff000000) >>> 24);
        this._bufferBuilder.append((low & 0x00ff0000) >>> 16);
        this._bufferBuilder.append((low & 0x0000ff00) >>> 8);
        this._bufferBuilder.append(low & 0x000000ff);
    }
    pack_int8(num) {
        this._bufferBuilder.append(num & 0xff);
    }
    pack_int16(num) {
        this._bufferBuilder.append((num & 0xff00) >> 8);
        this._bufferBuilder.append(num & 0xff);
    }
    pack_int32(num) {
        this._bufferBuilder.append(num >>> 24 & 0xff);
        this._bufferBuilder.append((num & 0x00ff0000) >>> 16);
        this._bufferBuilder.append((num & 0x0000ff00) >>> 8);
        this._bufferBuilder.append(num & 0x000000ff);
    }
    pack_int64(num) {
        const high = Math.floor(num / 2 ** 32);
        const low = num % 2 ** 32;
        this._bufferBuilder.append((high & 0xff000000) >>> 24);
        this._bufferBuilder.append((high & 0x00ff0000) >>> 16);
        this._bufferBuilder.append((high & 0x0000ff00) >>> 8);
        this._bufferBuilder.append(high & 0x000000ff);
        this._bufferBuilder.append((low & 0xff000000) >>> 24);
        this._bufferBuilder.append((low & 0x00ff0000) >>> 16);
        this._bufferBuilder.append((low & 0x0000ff00) >>> 8);
        this._bufferBuilder.append(low & 0x000000ff);
    }
    constructor(){
        this._bufferBuilder = new $b09b85ad69e68d49$var$$e8379818650e2442$export$93654d4f2d6cd524();
        this._textEncoder = new TextEncoder();
    }
}


/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ "use strict";
let $2de7f36fd24d65d0$var$logDisabled_ = true;
let $2de7f36fd24d65d0$var$deprecationWarnings_ = true;
function $2de7f36fd24d65d0$export$e3c02be309be1f23(uastring, expr, pos) {
    const match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
}
function $2de7f36fd24d65d0$export$1f48841962b828b1(window1, eventNameToWrap, wrapper) {
    if (!window1.RTCPeerConnection) return;
    const proto = window1.RTCPeerConnection.prototype;
    const nativeAddEventListener = proto.addEventListener;
    proto.addEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap) return nativeAddEventListener.apply(this, arguments);
        const wrappedCallback = (e)=>{
            const modifiedEvent = wrapper(e);
            if (modifiedEvent) {
                if (cb.handleEvent) cb.handleEvent(modifiedEvent);
                else cb(modifiedEvent);
            }
        };
        this._eventMap = this._eventMap || {};
        if (!this._eventMap[eventNameToWrap]) this._eventMap[eventNameToWrap] = new Map();
        this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
        return nativeAddEventListener.apply(this, [
            nativeEventName,
            wrappedCallback
        ]);
    };
    const nativeRemoveEventListener = proto.removeEventListener;
    proto.removeEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) return nativeRemoveEventListener.apply(this, arguments);
        if (!this._eventMap[eventNameToWrap].has(cb)) return nativeRemoveEventListener.apply(this, arguments);
        const unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
        this._eventMap[eventNameToWrap].delete(cb);
        if (this._eventMap[eventNameToWrap].size === 0) delete this._eventMap[eventNameToWrap];
        if (Object.keys(this._eventMap).length === 0) delete this._eventMap;
        return nativeRemoveEventListener.apply(this, [
            nativeEventName,
            unwrappedCb
        ]);
    };
    Object.defineProperty(proto, "on" + eventNameToWrap, {
        get () {
            return this["_on" + eventNameToWrap];
        },
        set (cb) {
            if (this["_on" + eventNameToWrap]) {
                this.removeEventListener(eventNameToWrap, this["_on" + eventNameToWrap]);
                delete this["_on" + eventNameToWrap];
            }
            if (cb) this.addEventListener(eventNameToWrap, this["_on" + eventNameToWrap] = cb);
        },
        enumerable: true,
        configurable: true
    });
}
function $2de7f36fd24d65d0$export$afbfee8cc06fd3e4(bool) {
    if (typeof bool !== "boolean") return new Error("Argument type: " + typeof bool + ". Please use a boolean.");
    $2de7f36fd24d65d0$var$logDisabled_ = bool;
    return bool ? "adapter.js logging disabled" : "adapter.js logging enabled";
}
function $2de7f36fd24d65d0$export$51516be4b019e41e(bool) {
    if (typeof bool !== "boolean") return new Error("Argument type: " + typeof bool + ". Please use a boolean.");
    $2de7f36fd24d65d0$var$deprecationWarnings_ = !bool;
    return "adapter.js deprecation warnings " + (bool ? "disabled" : "enabled");
}
function $2de7f36fd24d65d0$export$bef1f36f5486a6a3() {
    if (typeof window === "object") {
        if ($2de7f36fd24d65d0$var$logDisabled_) return;
        if (typeof console !== "undefined" && typeof console.log === "function") console.log.apply(console, arguments);
    }
}
function $2de7f36fd24d65d0$export$cdd73fc4100a6ef4(oldMethod, newMethod) {
    if (!$2de7f36fd24d65d0$var$deprecationWarnings_) return;
    console.warn(oldMethod + " is deprecated, please use " + newMethod + " instead.");
}
function $2de7f36fd24d65d0$export$2d31490a0c05f094(window1) {
    // Returned result object.
    const result = {
        browser: null,
        version: null
    };
    // Fail early if it's not a browser
    if (typeof window1 === "undefined" || !window1.navigator || !window1.navigator.userAgent) {
        result.browser = "Not a browser.";
        return result;
    }
    const { navigator: navigator } = window1;
    // Prefer navigator.userAgentData.
    if (navigator.userAgentData && navigator.userAgentData.brands) {
        const chromium = navigator.userAgentData.brands.find((brand)=>{
            return brand.brand === "Chromium";
        });
        if (chromium) return {
            browser: "chrome",
            version: parseInt(chromium.version, 10)
        };
    }
    if (navigator.mozGetUserMedia) {
        result.browser = "firefox";
        result.version = $2de7f36fd24d65d0$export$e3c02be309be1f23(navigator.userAgent, /Firefox\/(\d+)\./, 1);
    } else if (navigator.webkitGetUserMedia || window1.isSecureContext === false && window1.webkitRTCPeerConnection) {
        // Chrome, Chromium, Webview, Opera.
        // Version matches Chrome/WebRTC version.
        // Chrome 74 removed webkitGetUserMedia on http as well so we need the
        // more complicated fallback to webkitRTCPeerConnection.
        result.browser = "chrome";
        result.version = $2de7f36fd24d65d0$export$e3c02be309be1f23(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
    } else if (window1.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        result.browser = "safari";
        result.version = $2de7f36fd24d65d0$export$e3c02be309be1f23(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
        result.supportsUnifiedPlan = window1.RTCRtpTransceiver && "currentDirection" in window1.RTCRtpTransceiver.prototype;
    } else {
        result.browser = "Not a supported browser.";
        return result;
    }
    return result;
}
/**
 * Checks if something is an object.
 *
 * @param {*} val The something you want to check.
 * @return true if val is an object, false otherwise.
 */ function $2de7f36fd24d65d0$var$isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
}
function $2de7f36fd24d65d0$export$15384eac40dc88c8(data) {
    if (!$2de7f36fd24d65d0$var$isObject(data)) return data;
    return Object.keys(data).reduce(function(accumulator, key) {
        const isObj = $2de7f36fd24d65d0$var$isObject(data[key]);
        const value = isObj ? $2de7f36fd24d65d0$export$15384eac40dc88c8(data[key]) : data[key];
        const isEmptyObject = isObj && !Object.keys(value).length;
        if (value === undefined || isEmptyObject) return accumulator;
        return Object.assign(accumulator, {
            [key]: value
        });
    }, {});
}
function $2de7f36fd24d65d0$export$571b373e75babb58(stats, base, resultSet) {
    if (!base || resultSet.has(base.id)) return;
    resultSet.set(base.id, base);
    Object.keys(base).forEach((name)=>{
        if (name.endsWith("Id")) $2de7f36fd24d65d0$export$571b373e75babb58(stats, stats.get(base[name]), resultSet);
        else if (name.endsWith("Ids")) base[name].forEach((id)=>{
            $2de7f36fd24d65d0$export$571b373e75babb58(stats, stats.get(id), resultSet);
        });
    });
}
function $2de7f36fd24d65d0$export$93439ffc3f787d51(result, track, outbound) {
    const streamStatsType = outbound ? "outbound-rtp" : "inbound-rtp";
    const filteredResult = new Map();
    if (track === null) return filteredResult;
    const trackStats = [];
    result.forEach((value)=>{
        if (value.type === "track" && value.trackIdentifier === track.id) trackStats.push(value);
    });
    trackStats.forEach((trackStat)=>{
        result.forEach((stats)=>{
            if (stats.type === streamStatsType && stats.trackId === trackStat.id) $2de7f36fd24d65d0$export$571b373e75babb58(result, stats, filteredResult);
        });
    });
    return filteredResult;
}


var $deff6da3d41ce3e3$exports = {};

$parcel$export($deff6da3d41ce3e3$exports, "shimMediaStream", () => $deff6da3d41ce3e3$export$33ee24e7a300bcd1);
$parcel$export($deff6da3d41ce3e3$exports, "shimOnTrack", () => $deff6da3d41ce3e3$export$f358708f68ab068);
$parcel$export($deff6da3d41ce3e3$exports, "shimGetSendersWithDtmf", () => $deff6da3d41ce3e3$export$a41a030a2842f5d6);
$parcel$export($deff6da3d41ce3e3$exports, "shimSenderReceiverGetStats", () => $deff6da3d41ce3e3$export$f2f0f2338114eb4b);
$parcel$export($deff6da3d41ce3e3$exports, "shimAddTrackRemoveTrackWithNative", () => $deff6da3d41ce3e3$export$30e3cdd46f8d5100);
$parcel$export($deff6da3d41ce3e3$exports, "shimAddTrackRemoveTrack", () => $deff6da3d41ce3e3$export$9588259fcf4ebc91);
$parcel$export($deff6da3d41ce3e3$exports, "shimPeerConnection", () => $deff6da3d41ce3e3$export$852a08dda9a55ea7);
$parcel$export($deff6da3d41ce3e3$exports, "fixNegotiationNeeded", () => $deff6da3d41ce3e3$export$341293bbeaae37cb);
$parcel$export($deff6da3d41ce3e3$exports, "shimGetUserMedia", () => $68db44fd6c7d0817$export$1ed4910f4d37dc5e);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 
"use strict";
const $68db44fd6c7d0817$var$logging = $2de7f36fd24d65d0$export$bef1f36f5486a6a3;
function $68db44fd6c7d0817$export$1ed4910f4d37dc5e(window, browserDetails) {
    const navigator = window && window.navigator;
    if (!navigator.mediaDevices) return;
    const constraintsToChrome_ = function(c) {
        if (typeof c !== "object" || c.mandatory || c.optional) return c;
        const cc = {};
        Object.keys(c).forEach((key)=>{
            if (key === "require" || key === "advanced" || key === "mediaSource") return;
            const r = typeof c[key] === "object" ? c[key] : {
                ideal: c[key]
            };
            if (r.exact !== undefined && typeof r.exact === "number") r.min = r.max = r.exact;
            const oldname_ = function(prefix, name) {
                if (prefix) return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                return name === "deviceId" ? "sourceId" : name;
            };
            if (r.ideal !== undefined) {
                cc.optional = cc.optional || [];
                let oc = {};
                if (typeof r.ideal === "number") {
                    oc[oldname_("min", key)] = r.ideal;
                    cc.optional.push(oc);
                    oc = {};
                    oc[oldname_("max", key)] = r.ideal;
                    cc.optional.push(oc);
                } else {
                    oc[oldname_("", key)] = r.ideal;
                    cc.optional.push(oc);
                }
            }
            if (r.exact !== undefined && typeof r.exact !== "number") {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_("", key)] = r.exact;
            } else [
                "min",
                "max"
            ].forEach((mix)=>{
                if (r[mix] !== undefined) {
                    cc.mandatory = cc.mandatory || {};
                    cc.mandatory[oldname_(mix, key)] = r[mix];
                }
            });
        });
        if (c.advanced) cc.optional = (cc.optional || []).concat(c.advanced);
        return cc;
    };
    const shimConstraints_ = function(constraints, func) {
        if (browserDetails.version >= 61) return func(constraints);
        constraints = JSON.parse(JSON.stringify(constraints));
        if (constraints && typeof constraints.audio === "object") {
            const remap = function(obj, a, b) {
                if (a in obj && !(b in obj)) {
                    obj[b] = obj[a];
                    delete obj[a];
                }
            };
            constraints = JSON.parse(JSON.stringify(constraints));
            remap(constraints.audio, "autoGainControl", "googAutoGainControl");
            remap(constraints.audio, "noiseSuppression", "googNoiseSuppression");
            constraints.audio = constraintsToChrome_(constraints.audio);
        }
        if (constraints && typeof constraints.video === "object") {
            // Shim facingMode for mobile & surface pro.
            let face = constraints.video.facingMode;
            face = face && (typeof face === "object" ? face : {
                ideal: face
            });
            const getSupportedFacingModeLies = browserDetails.version < 66;
            if (face && (face.exact === "user" || face.exact === "environment" || face.ideal === "user" || face.ideal === "environment") && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                delete constraints.video.facingMode;
                let matches;
                if (face.exact === "environment" || face.ideal === "environment") matches = [
                    "back",
                    "rear"
                ];
                else if (face.exact === "user" || face.ideal === "user") matches = [
                    "front"
                ];
                if (matches) // Look for matches in label, or use last cam for back (typical).
                return navigator.mediaDevices.enumerateDevices().then((devices)=>{
                    devices = devices.filter((d)=>d.kind === "videoinput");
                    let dev = devices.find((d)=>matches.some((match)=>d.label.toLowerCase().includes(match)));
                    if (!dev && devices.length && matches.includes("back")) dev = devices[devices.length - 1]; // more likely the back cam
                    if (dev) constraints.video.deviceId = face.exact ? {
                        exact: dev.deviceId
                    } : {
                        ideal: dev.deviceId
                    };
                    constraints.video = constraintsToChrome_(constraints.video);
                    $68db44fd6c7d0817$var$logging("chrome: " + JSON.stringify(constraints));
                    return func(constraints);
                });
            }
            constraints.video = constraintsToChrome_(constraints.video);
        }
        $68db44fd6c7d0817$var$logging("chrome: " + JSON.stringify(constraints));
        return func(constraints);
    };
    const shimError_ = function(e) {
        if (browserDetails.version >= 64) return e;
        return {
            name: ({
                PermissionDeniedError: "NotAllowedError",
                PermissionDismissedError: "NotAllowedError",
                InvalidStateError: "NotAllowedError",
                DevicesNotFoundError: "NotFoundError",
                ConstraintNotSatisfiedError: "OverconstrainedError",
                TrackStartError: "NotReadableError",
                MediaDeviceFailedDueToShutdown: "NotAllowedError",
                MediaDeviceKillSwitchOn: "NotAllowedError",
                TabCaptureError: "AbortError",
                ScreenCaptureError: "AbortError",
                DeviceCaptureError: "AbortError"
            })[e.name] || e.name,
            message: e.message,
            constraint: e.constraint || e.constraintName,
            toString () {
                return this.name + (this.message && ": ") + this.message;
            }
        };
    };
    const getUserMedia_ = function(constraints, onSuccess, onError) {
        shimConstraints_(constraints, (c)=>{
            navigator.webkitGetUserMedia(c, onSuccess, (e)=>{
                if (onError) onError(shimError_(e));
            });
        });
    };
    navigator.getUserMedia = getUserMedia_.bind(navigator);
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    if (navigator.mediaDevices.getUserMedia) {
        const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(cs) {
            return shimConstraints_(cs, (c)=>origGetUserMedia(c).then((stream)=>{
                    if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                        stream.getTracks().forEach((track)=>{
                            track.stop();
                        });
                        throw new DOMException("", "NotFoundError");
                    }
                    return stream;
                }, (e)=>Promise.reject(shimError_(e))));
        };
    }
}


"use strict";
function $deff6da3d41ce3e3$export$33ee24e7a300bcd1(window) {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
}
function $deff6da3d41ce3e3$export$f358708f68ab068(window) {
    if (typeof window === "object" && window.RTCPeerConnection && !("ontrack" in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
            get () {
                return this._ontrack;
            },
            set (f) {
                if (this._ontrack) this.removeEventListener("track", this._ontrack);
                this.addEventListener("track", this._ontrack = f);
            },
            enumerable: true,
            configurable: true
        });
        const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            if (!this._ontrackpoly) {
                this._ontrackpoly = (e)=>{
                    // onaddstream does not fire when a track is added to an existing
                    // stream. But stream.onaddtrack is implemented so we use that.
                    e.stream.addEventListener("addtrack", (te)=>{
                        let receiver;
                        if (window.RTCPeerConnection.prototype.getReceivers) receiver = this.getReceivers().find((r)=>r.track && r.track.id === te.track.id);
                        else receiver = {
                            track: te.track
                        };
                        const event = new Event("track");
                        event.track = te.track;
                        event.receiver = receiver;
                        event.transceiver = {
                            receiver: receiver
                        };
                        event.streams = [
                            e.stream
                        ];
                        this.dispatchEvent(event);
                    });
                    e.stream.getTracks().forEach((track)=>{
                        let receiver;
                        if (window.RTCPeerConnection.prototype.getReceivers) receiver = this.getReceivers().find((r)=>r.track && r.track.id === track.id);
                        else receiver = {
                            track: track
                        };
                        const event = new Event("track");
                        event.track = track;
                        event.receiver = receiver;
                        event.transceiver = {
                            receiver: receiver
                        };
                        event.streams = [
                            e.stream
                        ];
                        this.dispatchEvent(event);
                    });
                };
                this.addEventListener("addstream", this._ontrackpoly);
            }
            return origSetRemoteDescription.apply(this, arguments);
        };
    } else // even if RTCRtpTransceiver is in window, it is only used and
    // emitted in unified-plan. Unfortunately this means we need
    // to unconditionally wrap the event.
    $2de7f36fd24d65d0$export$1f48841962b828b1(window, "track", (e)=>{
        if (!e.transceiver) Object.defineProperty(e, "transceiver", {
            value: {
                receiver: e.receiver
            }
        });
        return e;
    });
}
function $deff6da3d41ce3e3$export$a41a030a2842f5d6(window) {
    // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
    if (typeof window === "object" && window.RTCPeerConnection && !("getSenders" in window.RTCPeerConnection.prototype) && "createDTMFSender" in window.RTCPeerConnection.prototype) {
        const shimSenderWithDtmf = function(pc, track) {
            return {
                track: track,
                get dtmf () {
                    if (this._dtmf === undefined) {
                        if (track.kind === "audio") this._dtmf = pc.createDTMFSender(track);
                        else this._dtmf = null;
                    }
                    return this._dtmf;
                },
                _pc: pc
            };
        };
        // augment addTrack when getSenders is not available.
        if (!window.RTCPeerConnection.prototype.getSenders) {
            window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                this._senders = this._senders || [];
                return this._senders.slice(); // return a copy of the internal state.
            };
            const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                let sender = origAddTrack.apply(this, arguments);
                if (!sender) {
                    sender = shimSenderWithDtmf(this, track);
                    this._senders.push(sender);
                }
                return sender;
            };
            const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
            window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                origRemoveTrack.apply(this, arguments);
                const idx = this._senders.indexOf(sender);
                if (idx !== -1) this._senders.splice(idx, 1);
            };
        }
        const origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            this._senders = this._senders || [];
            origAddStream.apply(this, [
                stream
            ]);
            stream.getTracks().forEach((track)=>{
                this._senders.push(shimSenderWithDtmf(this, track));
            });
        };
        const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
            this._senders = this._senders || [];
            origRemoveStream.apply(this, [
                stream
            ]);
            stream.getTracks().forEach((track)=>{
                const sender = this._senders.find((s)=>s.track === track);
                if (sender) this._senders.splice(this._senders.indexOf(sender), 1);
            });
        };
    } else if (typeof window === "object" && window.RTCPeerConnection && "getSenders" in window.RTCPeerConnection.prototype && "createDTMFSender" in window.RTCPeerConnection.prototype && window.RTCRtpSender && !("dtmf" in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            const senders = origGetSenders.apply(this, []);
            senders.forEach((sender)=>sender._pc = this);
            return senders;
        };
        Object.defineProperty(window.RTCRtpSender.prototype, "dtmf", {
            get () {
                if (this._dtmf === undefined) {
                    if (this.track.kind === "audio") this._dtmf = this._pc.createDTMFSender(this.track);
                    else this._dtmf = null;
                }
                return this._dtmf;
            }
        });
    }
}
function $deff6da3d41ce3e3$export$f2f0f2338114eb4b(window) {
    if (!(typeof window === "object" && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) return;
    // shim sender stats.
    if (!("getStats" in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            const senders = origGetSenders.apply(this, []);
            senders.forEach((sender)=>sender._pc = this);
            return senders;
        };
        const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
            const sender = origAddTrack.apply(this, arguments);
            sender._pc = this;
            return sender;
        };
        window.RTCRtpSender.prototype.getStats = function getStats() {
            const sender = this;
            return this._pc.getStats().then((result)=>/* Note: this will include stats of all senders that
         *   send a track with the same id as sender.track as
         *   it is not possible to identify the RTCRtpSender.
         */ $2de7f36fd24d65d0$export$93439ffc3f787d51(result, sender.track, true));
        };
    }
    // shim receiver stats.
    if (!("getStats" in window.RTCRtpReceiver.prototype)) {
        const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
        if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
            const receivers = origGetReceivers.apply(this, []);
            receivers.forEach((receiver)=>receiver._pc = this);
            return receivers;
        };
        $2de7f36fd24d65d0$export$1f48841962b828b1(window, "track", (e)=>{
            e.receiver._pc = e.srcElement;
            return e;
        });
        window.RTCRtpReceiver.prototype.getStats = function getStats() {
            const receiver = this;
            return this._pc.getStats().then((result)=>$2de7f36fd24d65d0$export$93439ffc3f787d51(result, receiver.track, false));
        };
    }
    if (!("getStats" in window.RTCRtpSender.prototype && "getStats" in window.RTCRtpReceiver.prototype)) return;
    // shim RTCPeerConnection.getStats(track).
    const origGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
            const track = arguments[0];
            let sender;
            let receiver;
            let err;
            this.getSenders().forEach((s)=>{
                if (s.track === track) {
                    if (sender) err = true;
                    else sender = s;
                }
            });
            this.getReceivers().forEach((r)=>{
                if (r.track === track) {
                    if (receiver) err = true;
                    else receiver = r;
                }
                return r.track === track;
            });
            if (err || sender && receiver) return Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError"));
            else if (sender) return sender.getStats();
            else if (receiver) return receiver.getStats();
            return Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
        }
        return origGetStats.apply(this, arguments);
    };
}
function $deff6da3d41ce3e3$export$30e3cdd46f8d5100(window) {
    // shim addTrack/removeTrack with native variants in order to make
    // the interactions with legacy getLocalStreams behave as in other browsers.
    // Keeps a mapping stream.id => [stream, rtpsenders...]
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        return Object.keys(this._shimmedLocalStreams).map((streamId)=>this._shimmedLocalStreams[streamId][0]);
    };
    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        if (!stream) return origAddTrack.apply(this, arguments);
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        const sender = origAddTrack.apply(this, arguments);
        if (!this._shimmedLocalStreams[stream.id]) this._shimmedLocalStreams[stream.id] = [
            stream,
            sender
        ];
        else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) this._shimmedLocalStreams[stream.id].push(sender);
        return sender;
    };
    const origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        stream.getTracks().forEach((track)=>{
            const alreadyExists = this.getSenders().find((s)=>s.track === track);
            if (alreadyExists) throw new DOMException("Track already exists.", "InvalidAccessError");
        });
        const existingSenders = this.getSenders();
        origAddStream.apply(this, arguments);
        const newSenders = this.getSenders().filter((newSender)=>existingSenders.indexOf(newSender) === -1);
        this._shimmedLocalStreams[stream.id] = [
            stream
        ].concat(newSenders);
    };
    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        delete this._shimmedLocalStreams[stream.id];
        return origRemoveStream.apply(this, arguments);
    };
    const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        if (sender) Object.keys(this._shimmedLocalStreams).forEach((streamId)=>{
            const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
            if (idx !== -1) this._shimmedLocalStreams[streamId].splice(idx, 1);
            if (this._shimmedLocalStreams[streamId].length === 1) delete this._shimmedLocalStreams[streamId];
        });
        return origRemoveTrack.apply(this, arguments);
    };
}
function $deff6da3d41ce3e3$export$9588259fcf4ebc91(window, browserDetails) {
    if (!window.RTCPeerConnection) return;
    // shim addTrack and removeTrack.
    if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) return $deff6da3d41ce3e3$export$30e3cdd46f8d5100(window);
    // also shim pc.getLocalStreams when addTrack is shimmed
    // to return the original streams.
    const origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        const nativeStreams = origGetLocalStreams.apply(this);
        this._reverseStreams = this._reverseStreams || {};
        return nativeStreams.map((stream)=>this._reverseStreams[stream.id]);
    };
    const origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        stream.getTracks().forEach((track)=>{
            const alreadyExists = this.getSenders().find((s)=>s.track === track);
            if (alreadyExists) throw new DOMException("Track already exists.", "InvalidAccessError");
        });
        // Add identity mapping for consistency with addTrack.
        // Unless this is being used with a stream from addTrack.
        if (!this._reverseStreams[stream.id]) {
            const newStream = new window.MediaStream(stream.getTracks());
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            stream = newStream;
        }
        origAddStream.apply(this, [
            stream
        ]);
    };
    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        origRemoveStream.apply(this, [
            this._streams[stream.id] || stream
        ]);
        delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
        delete this._streams[stream.id];
    };
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        if (this.signalingState === "closed") throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
        const streams = [].slice.call(arguments, 1);
        if (streams.length !== 1 || !streams[0].getTracks().find((t)=>t === track)) // this is not fully correct but all we can manage without
        // [[associated MediaStreams]] internal slot.
        throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
        const alreadyExists = this.getSenders().find((s)=>s.track === track);
        if (alreadyExists) throw new DOMException("Track already exists.", "InvalidAccessError");
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};
        const oldStream = this._streams[stream.id];
        if (oldStream) {
            // this is using odd Chrome behaviour, use with caution:
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
            // Note: we rely on the high-level addTrack/dtmf shim to
            // create the sender with a dtmf sender.
            oldStream.addTrack(track);
            // Trigger ONN async.
            Promise.resolve().then(()=>{
                this.dispatchEvent(new Event("negotiationneeded"));
            });
        } else {
            const newStream = new window.MediaStream([
                track
            ]);
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            this.addStream(newStream);
        }
        return this.getSenders().find((s)=>s.track === track);
    };
    // replace the internal stream id with the external one and
    // vice versa.
    function replaceInternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach((internalId)=>{
            const externalStream = pc._reverseStreams[internalId];
            const internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(internalStream.id, "g"), externalStream.id);
        });
        return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
        });
    }
    function replaceExternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach((internalId)=>{
            const externalStream = pc._reverseStreams[internalId];
            const internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(externalStream.id, "g"), internalStream.id);
        });
        return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
        });
    }
    [
        "createOffer",
        "createAnswer"
    ].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
            [method] () {
                const args = arguments;
                const isLegacyCall = arguments.length && typeof arguments[0] === "function";
                if (isLegacyCall) return nativeMethod.apply(this, [
                    (description)=>{
                        const desc = replaceInternalStreamId(this, description);
                        args[0].apply(null, [
                            desc
                        ]);
                    },
                    (err)=>{
                        if (args[1]) args[1].apply(null, err);
                    },
                    arguments[2]
                ]);
                return nativeMethod.apply(this, arguments).then((description)=>replaceInternalStreamId(this, description));
            }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    const origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
        if (!arguments.length || !arguments[0].type) return origSetLocalDescription.apply(this, arguments);
        arguments[0] = replaceExternalStreamId(this, arguments[0]);
        return origSetLocalDescription.apply(this, arguments);
    };
    // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier
    const origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, "localDescription");
    Object.defineProperty(window.RTCPeerConnection.prototype, "localDescription", {
        get () {
            const description = origLocalDescription.get.apply(this);
            if (description.type === "") return description;
            return replaceInternalStreamId(this, description);
        }
    });
    window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        if (this.signalingState === "closed") throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
        // We can not yet check for sender instanceof RTCRtpSender
        // since we shim RTPSender. So we check if sender._pc is set.
        if (!sender._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
        const isLocal = sender._pc === this;
        if (!isLocal) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
        // Search for the native stream the senders track belongs to.
        this._streams = this._streams || {};
        let stream;
        Object.keys(this._streams).forEach((streamid)=>{
            const hasTrack = this._streams[streamid].getTracks().find((track)=>sender.track === track);
            if (hasTrack) stream = this._streams[streamid];
        });
        if (stream) {
            if (stream.getTracks().length === 1) // if this is the last track of the stream, remove the stream. This
            // takes care of any shimmed _senders.
            this.removeStream(this._reverseStreams[stream.id]);
            else // relying on the same odd chrome behaviour as above.
            stream.removeTrack(sender.track);
            this.dispatchEvent(new Event("negotiationneeded"));
        }
    };
}
function $deff6da3d41ce3e3$export$852a08dda9a55ea7(window, browserDetails) {
    if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) // very basic support for old versions.
    window.RTCPeerConnection = window.webkitRTCPeerConnection;
    if (!window.RTCPeerConnection) return;
    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    if (browserDetails.version < 53) [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate"
    ].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
            [method] () {
                arguments[0] = new (method === "addIceCandidate" ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
            }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
}
function $deff6da3d41ce3e3$export$341293bbeaae37cb(window, browserDetails) {
    $2de7f36fd24d65d0$export$1f48841962b828b1(window, "negotiationneeded", (e)=>{
        const pc = e.target;
        if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === "plan-b") {
            if (pc.signalingState !== "stable") return;
        }
        return e;
    });
}


var $491db345eab2a4d6$exports = {};

$parcel$export($491db345eab2a4d6$exports, "shimOnTrack", () => $491db345eab2a4d6$export$f358708f68ab068);
$parcel$export($491db345eab2a4d6$exports, "shimPeerConnection", () => $491db345eab2a4d6$export$852a08dda9a55ea7);
$parcel$export($491db345eab2a4d6$exports, "shimSenderGetStats", () => $491db345eab2a4d6$export$f0525502095c04ef);
$parcel$export($491db345eab2a4d6$exports, "shimReceiverGetStats", () => $491db345eab2a4d6$export$83d69126527b1171);
$parcel$export($491db345eab2a4d6$exports, "shimRemoveStream", () => $491db345eab2a4d6$export$825e523ef749bd8c);
$parcel$export($491db345eab2a4d6$exports, "shimRTCDataChannel", () => $491db345eab2a4d6$export$ff9cb3bc8990e8f7);
$parcel$export($491db345eab2a4d6$exports, "shimAddTransceiver", () => $491db345eab2a4d6$export$70c77533b6e9908d);
$parcel$export($491db345eab2a4d6$exports, "shimGetParameters", () => $491db345eab2a4d6$export$66238223c298fbaa);
$parcel$export($491db345eab2a4d6$exports, "shimCreateOffer", () => $491db345eab2a4d6$export$51beccf0e777b843);
$parcel$export($491db345eab2a4d6$exports, "shimCreateAnswer", () => $491db345eab2a4d6$export$df0b46e7cef08150);
$parcel$export($491db345eab2a4d6$exports, "shimGetUserMedia", () => $fc10beb308da6097$export$1ed4910f4d37dc5e);
$parcel$export($491db345eab2a4d6$exports, "shimGetDisplayMedia", () => $fe1731ab83c7dbcd$export$97270b87351d9c04);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ 
"use strict";
function $fc10beb308da6097$export$1ed4910f4d37dc5e(window, browserDetails) {
    const navigator = window && window.navigator;
    const MediaStreamTrack = window && window.MediaStreamTrack;
    navigator.getUserMedia = function(constraints, onSuccess, onError) {
        // Replace Firefox 44+'s deprecation warning with unprefixed version.
        $2de7f36fd24d65d0$export$cdd73fc4100a6ef4("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    };
    if (!(browserDetails.version > 55 && "autoGainControl" in navigator.mediaDevices.getSupportedConstraints())) {
        const remap = function(obj, a, b) {
            if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
            }
        };
        const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
            if (typeof c === "object" && typeof c.audio === "object") {
                c = JSON.parse(JSON.stringify(c));
                remap(c.audio, "autoGainControl", "mozAutoGainControl");
                remap(c.audio, "noiseSuppression", "mozNoiseSuppression");
            }
            return nativeGetUserMedia(c);
        };
        if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
            const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
            MediaStreamTrack.prototype.getSettings = function() {
                const obj = nativeGetSettings.apply(this, arguments);
                remap(obj, "mozAutoGainControl", "autoGainControl");
                remap(obj, "mozNoiseSuppression", "noiseSuppression");
                return obj;
            };
        }
        if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
            const nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
            MediaStreamTrack.prototype.applyConstraints = function(c) {
                if (this.kind === "audio" && typeof c === "object") {
                    c = JSON.parse(JSON.stringify(c));
                    remap(c, "autoGainControl", "mozAutoGainControl");
                    remap(c, "noiseSuppression", "mozNoiseSuppression");
                }
                return nativeApplyConstraints.apply(this, [
                    c
                ]);
            };
        }
    }
}


/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ "use strict";
function $fe1731ab83c7dbcd$export$97270b87351d9c04(window, preferredMediaSource) {
    if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) return;
    if (!window.navigator.mediaDevices) return;
    window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
        if (!(constraints && constraints.video)) {
            const err = new DOMException("getDisplayMedia without video constraints is undefined");
            err.name = "NotFoundError";
            // from https://heycam.github.io/webidl/#idl-DOMException-error-names
            err.code = 8;
            return Promise.reject(err);
        }
        if (constraints.video === true) constraints.video = {
            mediaSource: preferredMediaSource
        };
        else constraints.video.mediaSource = preferredMediaSource;
        return window.navigator.mediaDevices.getUserMedia(constraints);
    };
}


"use strict";
function $491db345eab2a4d6$export$f358708f68ab068(window) {
    if (typeof window === "object" && window.RTCTrackEvent && "receiver" in window.RTCTrackEvent.prototype && !("transceiver" in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
        get () {
            return {
                receiver: this.receiver
            };
        }
    });
}
function $491db345eab2a4d6$export$852a08dda9a55ea7(window, browserDetails) {
    if (typeof window !== "object" || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) return; // probably media.peerconnection.enabled=false in about:config
    if (!window.RTCPeerConnection && window.mozRTCPeerConnection) // very basic support for old versions.
    window.RTCPeerConnection = window.mozRTCPeerConnection;
    if (browserDetails.version < 53) // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate"
    ].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {
            [method] () {
                arguments[0] = new (method === "addIceCandidate" ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
            }
        };
        window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
    const modernStatsTypes = {
        inboundrtp: "inbound-rtp",
        outboundrtp: "outbound-rtp",
        candidatepair: "candidate-pair",
        localcandidate: "local-candidate",
        remotecandidate: "remote-candidate"
    };
    const nativeGetStats = window.RTCPeerConnection.prototype.getStats;
    window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;
        return nativeGetStats.apply(this, [
            selector || null
        ]).then((stats)=>{
            if (browserDetails.version < 53 && !onSucc) // Shim only promise getStats with spec-hyphens in type names
            // Leave callback version alone; misc old uses of forEach before Map
            try {
                stats.forEach((stat)=>{
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                });
            } catch (e) {
                if (e.name !== "TypeError") throw e;
                // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                stats.forEach((stat, i)=>{
                    stats.set(i, Object.assign({}, stat, {
                        type: modernStatsTypes[stat.type] || stat.type
                    }));
                });
            }
            return stats;
        }).then(onSucc, onErr);
    };
}
function $491db345eab2a4d6$export$f0525502095c04ef(window) {
    if (!(typeof window === "object" && window.RTCPeerConnection && window.RTCRtpSender)) return;
    if (window.RTCRtpSender && "getStats" in window.RTCRtpSender.prototype) return;
    const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        const senders = origGetSenders.apply(this, []);
        senders.forEach((sender)=>sender._pc = this);
        return senders;
    };
    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) window.RTCPeerConnection.prototype.addTrack = function addTrack() {
        const sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
    };
    window.RTCRtpSender.prototype.getStats = function getStats() {
        return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
    };
}
function $491db345eab2a4d6$export$83d69126527b1171(window) {
    if (!(typeof window === "object" && window.RTCPeerConnection && window.RTCRtpSender)) return;
    if (window.RTCRtpSender && "getStats" in window.RTCRtpReceiver.prototype) return;
    const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        const receivers = origGetReceivers.apply(this, []);
        receivers.forEach((receiver)=>receiver._pc = this);
        return receivers;
    };
    $2de7f36fd24d65d0$export$1f48841962b828b1(window, "track", (e)=>{
        e.receiver._pc = e.srcElement;
        return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function getStats() {
        return this._pc.getStats(this.track);
    };
}
function $491db345eab2a4d6$export$825e523ef749bd8c(window) {
    if (!window.RTCPeerConnection || "removeStream" in window.RTCPeerConnection.prototype) return;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        $2de7f36fd24d65d0$export$cdd73fc4100a6ef4("removeStream", "removeTrack");
        this.getSenders().forEach((sender)=>{
            if (sender.track && stream.getTracks().includes(sender.track)) this.removeTrack(sender);
        });
    };
}
function $491db345eab2a4d6$export$ff9cb3bc8990e8f7(window) {
    // rename DataChannel to RTCDataChannel (native fix in FF60):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
    if (window.DataChannel && !window.RTCDataChannel) window.RTCDataChannel = window.DataChannel;
}
function $491db345eab2a4d6$export$70c77533b6e9908d(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === "object" && window.RTCPeerConnection)) return;
    const origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
    if (origAddTransceiver) window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
        this.setParametersPromises = [];
        // WebIDL input coercion and validation
        let sendEncodings = arguments[1] && arguments[1].sendEncodings;
        if (sendEncodings === undefined) sendEncodings = [];
        sendEncodings = [
            ...sendEncodings
        ];
        const shouldPerformCheck = sendEncodings.length > 0;
        if (shouldPerformCheck) // If sendEncodings params are provided, validate grammar
        sendEncodings.forEach((encodingParam)=>{
            if ("rid" in encodingParam) {
                const ridRegex = /^[a-z0-9]{0,16}$/i;
                if (!ridRegex.test(encodingParam.rid)) throw new TypeError("Invalid RID value provided.");
            }
            if ("scaleResolutionDownBy" in encodingParam) {
                if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) throw new RangeError("scale_resolution_down_by must be >= 1.0");
            }
            if ("maxFramerate" in encodingParam) {
                if (!(parseFloat(encodingParam.maxFramerate) >= 0)) throw new RangeError("max_framerate must be >= 0.0");
            }
        });
        const transceiver = origAddTransceiver.apply(this, arguments);
        if (shouldPerformCheck) {
            // Check if the init options were applied. If not we do this in an
            // asynchronous way and save the promise reference in a global object.
            // This is an ugly hack, but at the same time is way more robust than
            // checking the sender parameters before and after the createOffer
            // Also note that after the createoffer we are not 100% sure that
            // the params were asynchronously applied so we might miss the
            // opportunity to recreate offer.
            const { sender: sender } = transceiver;
            const params = sender.getParameters();
            if (!("encodings" in params) || // Avoid being fooled by patched getParameters() below.
            params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
                params.encodings = sendEncodings;
                sender.sendEncodings = sendEncodings;
                this.setParametersPromises.push(sender.setParameters(params).then(()=>{
                    delete sender.sendEncodings;
                }).catch(()=>{
                    delete sender.sendEncodings;
                }));
            }
        }
        return transceiver;
    };
}
function $491db345eab2a4d6$export$66238223c298fbaa(window) {
    if (!(typeof window === "object" && window.RTCRtpSender)) return;
    const origGetParameters = window.RTCRtpSender.prototype.getParameters;
    if (origGetParameters) window.RTCRtpSender.prototype.getParameters = function getParameters() {
        const params = origGetParameters.apply(this, arguments);
        if (!("encodings" in params)) params.encodings = [].concat(this.sendEncodings || [
            {}
        ]);
        return params;
    };
}
function $491db345eab2a4d6$export$51beccf0e777b843(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === "object" && window.RTCPeerConnection)) return;
    const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer() {
        if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(()=>{
            return origCreateOffer.apply(this, arguments);
        }).finally(()=>{
            this.setParametersPromises = [];
        });
        return origCreateOffer.apply(this, arguments);
    };
}
function $491db345eab2a4d6$export$df0b46e7cef08150(window) {
    // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
    // Firefox ignores the init sendEncodings options passed to addTransceiver
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
    if (!(typeof window === "object" && window.RTCPeerConnection)) return;
    const origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
    window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
        if (this.setParametersPromises && this.setParametersPromises.length) return Promise.all(this.setParametersPromises).then(()=>{
            return origCreateAnswer.apply(this, arguments);
        }).finally(()=>{
            this.setParametersPromises = [];
        });
        return origCreateAnswer.apply(this, arguments);
    };
}


var $78f37525dadb2170$exports = {};

$parcel$export($78f37525dadb2170$exports, "shimLocalStreamsAPI", () => $78f37525dadb2170$export$8df41282f4fdcea2);
$parcel$export($78f37525dadb2170$exports, "shimRemoteStreamsAPI", () => $78f37525dadb2170$export$762aa4cbb4f2f857);
$parcel$export($78f37525dadb2170$exports, "shimCallbacksAPI", () => $78f37525dadb2170$export$da31df245debdd3);
$parcel$export($78f37525dadb2170$exports, "shimGetUserMedia", () => $78f37525dadb2170$export$1ed4910f4d37dc5e);
$parcel$export($78f37525dadb2170$exports, "shimConstraints", () => $78f37525dadb2170$export$494a01ac68ba81ac);
$parcel$export($78f37525dadb2170$exports, "shimRTCIceServerUrls", () => $78f37525dadb2170$export$671a8b47b41b6f41);
$parcel$export($78f37525dadb2170$exports, "shimTrackEventTransceiver", () => $78f37525dadb2170$export$85d53da088cb1b14);
$parcel$export($78f37525dadb2170$exports, "shimCreateOfferLegacy", () => $78f37525dadb2170$export$d444266503fdd2d4);
$parcel$export($78f37525dadb2170$exports, "shimAudioContext", () => $78f37525dadb2170$export$857cd739a7b795d2);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ 
"use strict";
function $78f37525dadb2170$export$8df41282f4fdcea2(window) {
    if (typeof window !== "object" || !window.RTCPeerConnection) return;
    if (!("getLocalStreams" in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
        if (!this._localStreams) this._localStreams = [];
        return this._localStreams;
    };
    if (!("addStream" in window.RTCPeerConnection.prototype)) {
        const _addTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            if (!this._localStreams) this._localStreams = [];
            if (!this._localStreams.includes(stream)) this._localStreams.push(stream);
            // Try to emulate Chrome's behaviour of adding in audio-video order.
            // Safari orders by track id.
            stream.getAudioTracks().forEach((track)=>_addTrack.call(this, track, stream));
            stream.getVideoTracks().forEach((track)=>_addTrack.call(this, track, stream));
        };
        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, ...streams) {
            if (streams) streams.forEach((stream)=>{
                if (!this._localStreams) this._localStreams = [
                    stream
                ];
                else if (!this._localStreams.includes(stream)) this._localStreams.push(stream);
            });
            return _addTrack.apply(this, arguments);
        };
    }
    if (!("removeStream" in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
        if (!this._localStreams) this._localStreams = [];
        const index = this._localStreams.indexOf(stream);
        if (index === -1) return;
        this._localStreams.splice(index, 1);
        const tracks = stream.getTracks();
        this.getSenders().forEach((sender)=>{
            if (tracks.includes(sender.track)) this.removeTrack(sender);
        });
    };
}
function $78f37525dadb2170$export$762aa4cbb4f2f857(window) {
    if (typeof window !== "object" || !window.RTCPeerConnection) return;
    if (!("getRemoteStreams" in window.RTCPeerConnection.prototype)) window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
        return this._remoteStreams ? this._remoteStreams : [];
    };
    if (!("onaddstream" in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, "onaddstream", {
            get () {
                return this._onaddstream;
            },
            set (f) {
                if (this._onaddstream) {
                    this.removeEventListener("addstream", this._onaddstream);
                    this.removeEventListener("track", this._onaddstreampoly);
                }
                this.addEventListener("addstream", this._onaddstream = f);
                this.addEventListener("track", this._onaddstreampoly = (e)=>{
                    e.streams.forEach((stream)=>{
                        if (!this._remoteStreams) this._remoteStreams = [];
                        if (this._remoteStreams.includes(stream)) return;
                        this._remoteStreams.push(stream);
                        const event = new Event("addstream");
                        event.stream = stream;
                        this.dispatchEvent(event);
                    });
                });
            }
        });
        const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            const pc = this;
            if (!this._onaddstreampoly) this.addEventListener("track", this._onaddstreampoly = function(e) {
                e.streams.forEach((stream)=>{
                    if (!pc._remoteStreams) pc._remoteStreams = [];
                    if (pc._remoteStreams.indexOf(stream) >= 0) return;
                    pc._remoteStreams.push(stream);
                    const event = new Event("addstream");
                    event.stream = stream;
                    pc.dispatchEvent(event);
                });
            });
            return origSetRemoteDescription.apply(pc, arguments);
        };
    }
}
function $78f37525dadb2170$export$da31df245debdd3(window) {
    if (typeof window !== "object" || !window.RTCPeerConnection) return;
    const prototype = window.RTCPeerConnection.prototype;
    const origCreateOffer = prototype.createOffer;
    const origCreateAnswer = prototype.createAnswer;
    const setLocalDescription = prototype.setLocalDescription;
    const setRemoteDescription = prototype.setRemoteDescription;
    const addIceCandidate = prototype.addIceCandidate;
    prototype.createOffer = function createOffer(successCallback, failureCallback) {
        const options = arguments.length >= 2 ? arguments[2] : arguments[0];
        const promise = origCreateOffer.apply(this, [
            options
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
        const options = arguments.length >= 2 ? arguments[2] : arguments[0];
        const promise = origCreateAnswer.apply(this, [
            options
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    let withCallback = function(description, successCallback, failureCallback) {
        const promise = setLocalDescription.apply(this, [
            description
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.setLocalDescription = withCallback;
    withCallback = function(description, successCallback, failureCallback) {
        const promise = setRemoteDescription.apply(this, [
            description
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.setRemoteDescription = withCallback;
    withCallback = function(candidate, successCallback, failureCallback) {
        const promise = addIceCandidate.apply(this, [
            candidate
        ]);
        if (!failureCallback) return promise;
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
    };
    prototype.addIceCandidate = withCallback;
}
function $78f37525dadb2170$export$1ed4910f4d37dc5e(window) {
    const navigator = window && window.navigator;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // shim not needed in Safari 12.1
        const mediaDevices = navigator.mediaDevices;
        const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
        navigator.mediaDevices.getUserMedia = (constraints)=>{
            return _getUserMedia($78f37525dadb2170$export$494a01ac68ba81ac(constraints));
        };
    }
    if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) navigator.getUserMedia = (function getUserMedia(constraints, cb, errcb) {
        navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
    }).bind(navigator);
}
function $78f37525dadb2170$export$494a01ac68ba81ac(constraints) {
    if (constraints && constraints.video !== undefined) return Object.assign({}, constraints, {
        video: $2de7f36fd24d65d0$export$15384eac40dc88c8(constraints.video)
    });
    return constraints;
}
function $78f37525dadb2170$export$671a8b47b41b6f41(window) {
    if (!window.RTCPeerConnection) return;
    // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
    const OrigPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
        if (pcConfig && pcConfig.iceServers) {
            const newIceServers = [];
            for(let i = 0; i < pcConfig.iceServers.length; i++){
                let server = pcConfig.iceServers[i];
                if (server.urls === undefined && server.url) {
                    $2de7f36fd24d65d0$export$cdd73fc4100a6ef4("RTCIceServer.url", "RTCIceServer.urls");
                    server = JSON.parse(JSON.stringify(server));
                    server.urls = server.url;
                    delete server.url;
                    newIceServers.push(server);
                } else newIceServers.push(pcConfig.iceServers[i]);
            }
            pcConfig.iceServers = newIceServers;
        }
        return new OrigPeerConnection(pcConfig, pcConstraints);
    };
    window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
    // wrap static methods. Currently just generateCertificate.
    if ("generateCertificate" in OrigPeerConnection) Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
        get () {
            return OrigPeerConnection.generateCertificate;
        }
    });
}
function $78f37525dadb2170$export$85d53da088cb1b14(window) {
    // Add event.transceiver member over deprecated event.receiver
    if (typeof window === "object" && window.RTCTrackEvent && "receiver" in window.RTCTrackEvent.prototype && !("transceiver" in window.RTCTrackEvent.prototype)) Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
        get () {
            return {
                receiver: this.receiver
            };
        }
    });
}
function $78f37525dadb2170$export$d444266503fdd2d4(window) {
    const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
    window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
        if (offerOptions) {
            if (typeof offerOptions.offerToReceiveAudio !== "undefined") // support bit values
            offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
            const audioTransceiver = this.getTransceivers().find((transceiver)=>transceiver.receiver.track.kind === "audio");
            if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                if (audioTransceiver.direction === "sendrecv") {
                    if (audioTransceiver.setDirection) audioTransceiver.setDirection("sendonly");
                    else audioTransceiver.direction = "sendonly";
                } else if (audioTransceiver.direction === "recvonly") {
                    if (audioTransceiver.setDirection) audioTransceiver.setDirection("inactive");
                    else audioTransceiver.direction = "inactive";
                }
            } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) this.addTransceiver("audio", {
                direction: "recvonly"
            });
            if (typeof offerOptions.offerToReceiveVideo !== "undefined") // support bit values
            offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
            const videoTransceiver = this.getTransceivers().find((transceiver)=>transceiver.receiver.track.kind === "video");
            if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                if (videoTransceiver.direction === "sendrecv") {
                    if (videoTransceiver.setDirection) videoTransceiver.setDirection("sendonly");
                    else videoTransceiver.direction = "sendonly";
                } else if (videoTransceiver.direction === "recvonly") {
                    if (videoTransceiver.setDirection) videoTransceiver.setDirection("inactive");
                    else videoTransceiver.direction = "inactive";
                }
            } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) this.addTransceiver("video", {
                direction: "recvonly"
            });
        }
        return origCreateOffer.apply(this, arguments);
    };
}
function $78f37525dadb2170$export$857cd739a7b795d2(window) {
    if (typeof window !== "object" || window.AudioContext) return;
    window.AudioContext = window.webkitAudioContext;
}


var $4c1fa5051c863fbe$exports = {};

$parcel$export($4c1fa5051c863fbe$exports, "shimRTCIceCandidate", () => $4c1fa5051c863fbe$export$cf133661e444ccfe);
$parcel$export($4c1fa5051c863fbe$exports, "shimRTCIceCandidateRelayProtocol", () => $4c1fa5051c863fbe$export$fdafb8d8280e29b5);
$parcel$export($4c1fa5051c863fbe$exports, "shimMaxMessageSize", () => $4c1fa5051c863fbe$export$a99147c78a56edc4);
$parcel$export($4c1fa5051c863fbe$exports, "shimSendThrowTypeError", () => $4c1fa5051c863fbe$export$d461c8d5c5db5da7);
$parcel$export($4c1fa5051c863fbe$exports, "shimConnectionState", () => $4c1fa5051c863fbe$export$63bb816cc75460);
$parcel$export($4c1fa5051c863fbe$exports, "removeExtmapAllowMixed", () => $4c1fa5051c863fbe$export$a57d114344295149);
$parcel$export($4c1fa5051c863fbe$exports, "shimAddIceCandidateNullOrEmpty", () => $4c1fa5051c863fbe$export$51d5e40b48c771c7);
$parcel$export($4c1fa5051c863fbe$exports, "shimParameterlessSetLocalDescription", () => $4c1fa5051c863fbe$export$7170d04e59f9d553);
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */ /* eslint-env node */ var $2d82e9424cc80311$exports = {};
/* eslint-env node */ "use strict";
// SDP helpers.
const $2d82e9424cc80311$var$SDPUtils = {};
// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
$2d82e9424cc80311$var$SDPUtils.generateIdentifier = function() {
    return Math.random().toString(36).substring(2, 12);
};
// The RTCP CNAME used by all peerconnections from the same JS.
$2d82e9424cc80311$var$SDPUtils.localCName = $2d82e9424cc80311$var$SDPUtils.generateIdentifier();
// Splits SDP into lines, dealing with both CRLF and LF.
$2d82e9424cc80311$var$SDPUtils.splitLines = function(blob) {
    return blob.trim().split("\n").map((line)=>line.trim());
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
$2d82e9424cc80311$var$SDPUtils.splitSections = function(blob) {
    const parts = blob.split("\nm=");
    return parts.map((part, index)=>(index > 0 ? "m=" + part : part).trim() + "\r\n");
};
// Returns the session description.
$2d82e9424cc80311$var$SDPUtils.getDescription = function(blob) {
    const sections = $2d82e9424cc80311$var$SDPUtils.splitSections(blob);
    return sections && sections[0];
};
// Returns the individual media sections.
$2d82e9424cc80311$var$SDPUtils.getMediaSections = function(blob) {
    const sections = $2d82e9424cc80311$var$SDPUtils.splitSections(blob);
    sections.shift();
    return sections;
};
// Returns lines that start with a certain prefix.
$2d82e9424cc80311$var$SDPUtils.matchPrefix = function(blob, prefix) {
    return $2d82e9424cc80311$var$SDPUtils.splitLines(blob).filter((line)=>line.indexOf(prefix) === 0);
};
// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
// Input can be prefixed with a=.
$2d82e9424cc80311$var$SDPUtils.parseCandidate = function(line) {
    let parts;
    // Parse both variants.
    if (line.indexOf("a=candidate:") === 0) parts = line.substring(12).split(" ");
    else parts = line.substring(10).split(" ");
    const candidate = {
        foundation: parts[0],
        component: {
            1: "rtp",
            2: "rtcp"
        }[parts[1]] || parts[1],
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4],
        port: parseInt(parts[5], 10),
        // skip parts[6] == 'typ'
        type: parts[7]
    };
    for(let i = 8; i < parts.length; i += 2)switch(parts[i]){
        case "raddr":
            candidate.relatedAddress = parts[i + 1];
            break;
        case "rport":
            candidate.relatedPort = parseInt(parts[i + 1], 10);
            break;
        case "tcptype":
            candidate.tcpType = parts[i + 1];
            break;
        case "ufrag":
            candidate.ufrag = parts[i + 1]; // for backward compatibility.
            candidate.usernameFragment = parts[i + 1];
            break;
        default:
            if (candidate[parts[i]] === undefined) candidate[parts[i]] = parts[i + 1];
            break;
    }
    return candidate;
};
// Translates a candidate object into SDP candidate attribute.
// This does not include the a= prefix!
$2d82e9424cc80311$var$SDPUtils.writeCandidate = function(candidate) {
    const sdp = [];
    sdp.push(candidate.foundation);
    const component = candidate.component;
    if (component === "rtp") sdp.push(1);
    else if (component === "rtcp") sdp.push(2);
    else sdp.push(component);
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.address || candidate.ip);
    sdp.push(candidate.port);
    const type = candidate.type;
    sdp.push("typ");
    sdp.push(type);
    if (type !== "host" && candidate.relatedAddress && candidate.relatedPort) {
        sdp.push("raddr");
        sdp.push(candidate.relatedAddress);
        sdp.push("rport");
        sdp.push(candidate.relatedPort);
    }
    if (candidate.tcpType && candidate.protocol.toLowerCase() === "tcp") {
        sdp.push("tcptype");
        sdp.push(candidate.tcpType);
    }
    if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push("ufrag");
        sdp.push(candidate.usernameFragment || candidate.ufrag);
    }
    return "candidate:" + sdp.join(" ");
};
// Parses an ice-options line, returns an array of option tags.
// Sample input:
// a=ice-options:foo bar
$2d82e9424cc80311$var$SDPUtils.parseIceOptions = function(line) {
    return line.substring(14).split(" ");
};
// Parses a rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
$2d82e9424cc80311$var$SDPUtils.parseRtpMap = function(line) {
    let parts = line.substring(9).split(" ");
    const parsed = {
        payloadType: parseInt(parts.shift(), 10)
    };
    parts = parts[0].split("/");
    parsed.name = parts[0];
    parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
    parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
    // legacy alias, got renamed back to channels in ORTC.
    parsed.numChannels = parsed.channels;
    return parsed;
};
// Generates a rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
$2d82e9424cc80311$var$SDPUtils.writeRtpMap = function(codec) {
    let pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    const channels = codec.channels || codec.numChannels || 1;
    return "a=rtpmap:" + pt + " " + codec.name + "/" + codec.clockRate + (channels !== 1 ? "/" + channels : "") + "\r\n";
};
// Parses a extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
$2d82e9424cc80311$var$SDPUtils.parseExtmap = function(line) {
    const parts = line.substring(9).split(" ");
    return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf("/") > 0 ? parts[0].split("/")[1] : "sendrecv",
        uri: parts[1],
        attributes: parts.slice(2).join(" ")
    };
};
// Generates an extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
$2d82e9424cc80311$var$SDPUtils.writeExtmap = function(headerExtension) {
    return "a=extmap:" + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== "sendrecv" ? "/" + headerExtension.direction : "") + " " + headerExtension.uri + (headerExtension.attributes ? " " + headerExtension.attributes : "") + "\r\n";
};
// Parses a fmtp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
$2d82e9424cc80311$var$SDPUtils.parseFmtp = function(line) {
    const parsed = {};
    let kv;
    const parts = line.substring(line.indexOf(" ") + 1).split(";");
    for(let j = 0; j < parts.length; j++){
        kv = parts[j].trim().split("=");
        parsed[kv[0].trim()] = kv[1];
    }
    return parsed;
};
// Generates a fmtp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
$2d82e9424cc80311$var$SDPUtils.writeFmtp = function(codec) {
    let line = "";
    let pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    if (codec.parameters && Object.keys(codec.parameters).length) {
        const params = [];
        Object.keys(codec.parameters).forEach((param)=>{
            if (codec.parameters[param] !== undefined) params.push(param + "=" + codec.parameters[param]);
            else params.push(param);
        });
        line += "a=fmtp:" + pt + " " + params.join(";") + "\r\n";
    }
    return line;
};
// Parses a rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
$2d82e9424cc80311$var$SDPUtils.parseRtcpFb = function(line) {
    const parts = line.substring(line.indexOf(" ") + 1).split(" ");
    return {
        type: parts.shift(),
        parameter: parts.join(" ")
    };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
$2d82e9424cc80311$var$SDPUtils.writeRtcpFb = function(codec) {
    let lines = "";
    let pt = codec.payloadType;
    if (codec.preferredPayloadType !== undefined) pt = codec.preferredPayloadType;
    if (codec.rtcpFeedback && codec.rtcpFeedback.length) // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach((fb)=>{
        lines += "a=rtcp-fb:" + pt + " " + fb.type + (fb.parameter && fb.parameter.length ? " " + fb.parameter : "") + "\r\n";
    });
    return lines;
};
// Parses a RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
$2d82e9424cc80311$var$SDPUtils.parseSsrcMedia = function(line) {
    const sp = line.indexOf(" ");
    const parts = {
        ssrc: parseInt(line.substring(7, sp), 10)
    };
    const colon = line.indexOf(":", sp);
    if (colon > -1) {
        parts.attribute = line.substring(sp + 1, colon);
        parts.value = line.substring(colon + 1);
    } else parts.attribute = line.substring(sp + 1);
    return parts;
};
// Parse a ssrc-group line (see RFC 5576). Sample input:
// a=ssrc-group:semantics 12 34
$2d82e9424cc80311$var$SDPUtils.parseSsrcGroup = function(line) {
    const parts = line.substring(13).split(" ");
    return {
        semantics: parts.shift(),
        ssrcs: parts.map((ssrc)=>parseInt(ssrc, 10))
    };
};
// Extracts the MID (RFC 5888) from a media section.
// Returns the MID or undefined if no mid line was found.
$2d82e9424cc80311$var$SDPUtils.getMid = function(mediaSection) {
    const mid = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=mid:")[0];
    if (mid) return mid.substring(6);
};
// Parses a fingerprint line for DTLS-SRTP.
$2d82e9424cc80311$var$SDPUtils.parseFingerprint = function(line) {
    const parts = line.substring(14).split(" ");
    return {
        algorithm: parts[0].toLowerCase(),
        value: parts[1].toUpperCase()
    };
};
// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
$2d82e9424cc80311$var$SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
    const lines = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=fingerprint:");
    // Note: a=setup line is ignored since we use the 'auto' role in Edge.
    return {
        role: "auto",
        fingerprints: lines.map($2d82e9424cc80311$var$SDPUtils.parseFingerprint)
    };
};
// Serializes DTLS parameters to SDP.
$2d82e9424cc80311$var$SDPUtils.writeDtlsParameters = function(params, setupType) {
    let sdp = "a=setup:" + setupType + "\r\n";
    params.fingerprints.forEach((fp)=>{
        sdp += "a=fingerprint:" + fp.algorithm + " " + fp.value + "\r\n";
    });
    return sdp;
};
// Parses a=crypto lines into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
$2d82e9424cc80311$var$SDPUtils.parseCryptoLine = function(line) {
    const parts = line.substring(9).split(" ");
    return {
        tag: parseInt(parts[0], 10),
        cryptoSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3)
    };
};
$2d82e9424cc80311$var$SDPUtils.writeCryptoLine = function(parameters) {
    return "a=crypto:" + parameters.tag + " " + parameters.cryptoSuite + " " + (typeof parameters.keyParams === "object" ? $2d82e9424cc80311$var$SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? " " + parameters.sessionParams.join(" ") : "") + "\r\n";
};
// Parses the crypto key parameters into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
$2d82e9424cc80311$var$SDPUtils.parseCryptoKeyParams = function(keyParams) {
    if (keyParams.indexOf("inline:") !== 0) return null;
    const parts = keyParams.substring(7).split("|");
    return {
        keyMethod: "inline",
        keySalt: parts[0],
        lifeTime: parts[1],
        mkiValue: parts[2] ? parts[2].split(":")[0] : undefined,
        mkiLength: parts[2] ? parts[2].split(":")[1] : undefined
    };
};
$2d82e9424cc80311$var$SDPUtils.writeCryptoKeyParams = function(keyParams) {
    return keyParams.keyMethod + ":" + keyParams.keySalt + (keyParams.lifeTime ? "|" + keyParams.lifeTime : "") + (keyParams.mkiValue && keyParams.mkiLength ? "|" + keyParams.mkiValue + ":" + keyParams.mkiLength : "");
};
// Extracts all SDES parameters.
$2d82e9424cc80311$var$SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
    const lines = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=crypto:");
    return lines.map($2d82e9424cc80311$var$SDPUtils.parseCryptoLine);
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
$2d82e9424cc80311$var$SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
    const ufrag = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=ice-ufrag:")[0];
    const pwd = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection + sessionpart, "a=ice-pwd:")[0];
    if (!(ufrag && pwd)) return null;
    return {
        usernameFragment: ufrag.substring(12),
        password: pwd.substring(10)
    };
};
// Serializes ICE parameters to SDP.
$2d82e9424cc80311$var$SDPUtils.writeIceParameters = function(params) {
    let sdp = "a=ice-ufrag:" + params.usernameFragment + "\r\n" + "a=ice-pwd:" + params.password + "\r\n";
    if (params.iceLite) sdp += "a=ice-lite\r\n";
    return sdp;
};
// Parses the SDP media section and returns RTCRtpParameters.
$2d82e9424cc80311$var$SDPUtils.parseRtpParameters = function(mediaSection) {
    const description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
    };
    const lines = $2d82e9424cc80311$var$SDPUtils.splitLines(mediaSection);
    const mline = lines[0].split(" ");
    description.profile = mline[2];
    for(let i = 3; i < mline.length; i++){
        const pt = mline[i];
        const rtpmapline = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=rtpmap:" + pt + " ")[0];
        if (rtpmapline) {
            const codec = $2d82e9424cc80311$var$SDPUtils.parseRtpMap(rtpmapline);
            const fmtps = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=fmtp:" + pt + " ");
            // Only the first a=fmtp:<pt> is considered.
            codec.parameters = fmtps.length ? $2d82e9424cc80311$var$SDPUtils.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-fb:" + pt + " ").map($2d82e9424cc80311$var$SDPUtils.parseRtcpFb);
            description.codecs.push(codec);
            // parse FEC mechanisms from rtpmap lines.
            switch(codec.name.toUpperCase()){
                case "RED":
                case "ULPFEC":
                    description.fecMechanisms.push(codec.name.toUpperCase());
                    break;
                default:
                    break;
            }
        }
    }
    $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=extmap:").forEach((line)=>{
        description.headerExtensions.push($2d82e9424cc80311$var$SDPUtils.parseExtmap(line));
    });
    const wildcardRtcpFb = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-fb:* ").map($2d82e9424cc80311$var$SDPUtils.parseRtcpFb);
    description.codecs.forEach((codec)=>{
        wildcardRtcpFb.forEach((fb)=>{
            const duplicate = codec.rtcpFeedback.find((existingFeedback)=>{
                return existingFeedback.type === fb.type && existingFeedback.parameter === fb.parameter;
            });
            if (!duplicate) codec.rtcpFeedback.push(fb);
        });
    });
    // FIXME: parse rtcp.
    return description;
};
// Generates parts of the SDP media section describing the capabilities /
// parameters.
$2d82e9424cc80311$var$SDPUtils.writeRtpDescription = function(kind, caps) {
    let sdp = "";
    // Build the mline.
    sdp += "m=" + kind + " ";
    sdp += caps.codecs.length > 0 ? "9" : "0"; // reject if no codecs.
    sdp += " " + (caps.profile || "UDP/TLS/RTP/SAVPF") + " ";
    sdp += caps.codecs.map((codec)=>{
        if (codec.preferredPayloadType !== undefined) return codec.preferredPayloadType;
        return codec.payloadType;
    }).join(" ") + "\r\n";
    sdp += "c=IN IP4 0.0.0.0\r\n";
    sdp += "a=rtcp:9 IN IP4 0.0.0.0\r\n";
    // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
    caps.codecs.forEach((codec)=>{
        sdp += $2d82e9424cc80311$var$SDPUtils.writeRtpMap(codec);
        sdp += $2d82e9424cc80311$var$SDPUtils.writeFmtp(codec);
        sdp += $2d82e9424cc80311$var$SDPUtils.writeRtcpFb(codec);
    });
    let maxptime = 0;
    caps.codecs.forEach((codec)=>{
        if (codec.maxptime > maxptime) maxptime = codec.maxptime;
    });
    if (maxptime > 0) sdp += "a=maxptime:" + maxptime + "\r\n";
    if (caps.headerExtensions) caps.headerExtensions.forEach((extension)=>{
        sdp += $2d82e9424cc80311$var$SDPUtils.writeExtmap(extension);
    });
    // FIXME: write fecMechanisms.
    return sdp;
};
// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
$2d82e9424cc80311$var$SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
    const encodingParameters = [];
    const description = $2d82e9424cc80311$var$SDPUtils.parseRtpParameters(mediaSection);
    const hasRed = description.fecMechanisms.indexOf("RED") !== -1;
    const hasUlpfec = description.fecMechanisms.indexOf("ULPFEC") !== -1;
    // filter a=ssrc:... cname:, ignore PlanB-msid
    const ssrcs = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc:").map((line)=>$2d82e9424cc80311$var$SDPUtils.parseSsrcMedia(line)).filter((parts)=>parts.attribute === "cname");
    const primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
    let secondarySsrc;
    const flows = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc-group:FID").map((line)=>{
        const parts = line.substring(17).split(" ");
        return parts.map((part)=>parseInt(part, 10));
    });
    if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) secondarySsrc = flows[0][1];
    description.codecs.forEach((codec)=>{
        if (codec.name.toUpperCase() === "RTX" && codec.parameters.apt) {
            let encParam = {
                ssrc: primarySsrc,
                codecPayloadType: parseInt(codec.parameters.apt, 10)
            };
            if (primarySsrc && secondarySsrc) encParam.rtx = {
                ssrc: secondarySsrc
            };
            encodingParameters.push(encParam);
            if (hasRed) {
                encParam = JSON.parse(JSON.stringify(encParam));
                encParam.fec = {
                    ssrc: primarySsrc,
                    mechanism: hasUlpfec ? "red+ulpfec" : "red"
                };
                encodingParameters.push(encParam);
            }
        }
    });
    if (encodingParameters.length === 0 && primarySsrc) encodingParameters.push({
        ssrc: primarySsrc
    });
    // we support both b=AS and b=TIAS but interpret AS as TIAS.
    let bandwidth = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "b=");
    if (bandwidth.length) {
        if (bandwidth[0].indexOf("b=TIAS:") === 0) bandwidth = parseInt(bandwidth[0].substring(7), 10);
        else if (bandwidth[0].indexOf("b=AS:") === 0) // use formula from JSEP to convert b=AS to TIAS value.
        bandwidth = parseInt(bandwidth[0].substring(5), 10) * 950 - 16000;
        else bandwidth = undefined;
        encodingParameters.forEach((params)=>{
            params.maxBitrate = bandwidth;
        });
    }
    return encodingParameters;
};
// parses http://draft.ortc.org/#rtcrtcpparameters*
$2d82e9424cc80311$var$SDPUtils.parseRtcpParameters = function(mediaSection) {
    const rtcpParameters = {};
    // Gets the first SSRC. Note that with RTX there might be multiple
    // SSRCs.
    const remoteSsrc = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc:").map((line)=>$2d82e9424cc80311$var$SDPUtils.parseSsrcMedia(line)).filter((obj)=>obj.attribute === "cname")[0];
    if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
    }
    // Edge uses the compound attribute instead of reducedSize
    // compound is !reducedSize
    const rsize = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-rsize");
    rtcpParameters.reducedSize = rsize.length > 0;
    rtcpParameters.compound = rsize.length === 0;
    // parses the rtcp-mux attrіbute.
    // Note that Edge does not support unmuxed RTCP.
    const mux = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=rtcp-mux");
    rtcpParameters.mux = mux.length > 0;
    return rtcpParameters;
};
$2d82e9424cc80311$var$SDPUtils.writeRtcpParameters = function(rtcpParameters) {
    let sdp = "";
    if (rtcpParameters.reducedSize) sdp += "a=rtcp-rsize\r\n";
    if (rtcpParameters.mux) sdp += "a=rtcp-mux\r\n";
    if (rtcpParameters.ssrc !== undefined && rtcpParameters.cname) sdp += "a=ssrc:" + rtcpParameters.ssrc + " cname:" + rtcpParameters.cname + "\r\n";
    return sdp;
};
// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
$2d82e9424cc80311$var$SDPUtils.parseMsid = function(mediaSection) {
    let parts;
    const spec = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=msid:");
    if (spec.length === 1) {
        parts = spec[0].substring(7).split(" ");
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
    const planB = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=ssrc:").map((line)=>$2d82e9424cc80311$var$SDPUtils.parseSsrcMedia(line)).filter((msidParts)=>msidParts.attribute === "msid");
    if (planB.length > 0) {
        parts = planB[0].value.split(" ");
        return {
            stream: parts[0],
            track: parts[1]
        };
    }
};
// SCTP
// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
// to draft-ietf-mmusic-sctp-sdp-05
$2d82e9424cc80311$var$SDPUtils.parseSctpDescription = function(mediaSection) {
    const mline = $2d82e9424cc80311$var$SDPUtils.parseMLine(mediaSection);
    const maxSizeLine = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=max-message-size:");
    let maxMessageSize;
    if (maxSizeLine.length > 0) maxMessageSize = parseInt(maxSizeLine[0].substring(19), 10);
    if (isNaN(maxMessageSize)) maxMessageSize = 65536;
    const sctpPort = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=sctp-port:");
    if (sctpPort.length > 0) return {
        port: parseInt(sctpPort[0].substring(12), 10),
        protocol: mline.fmt,
        maxMessageSize: maxMessageSize
    };
    const sctpMapLines = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "a=sctpmap:");
    if (sctpMapLines.length > 0) {
        const parts = sctpMapLines[0].substring(10).split(" ");
        return {
            port: parseInt(parts[0], 10),
            protocol: parts[1],
            maxMessageSize: maxMessageSize
        };
    }
};
// SCTP
// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
// support by now receiving in this format, unless we originally parsed
// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
// protocol of DTLS/SCTP -- without UDP/ or TCP/)
$2d82e9424cc80311$var$SDPUtils.writeSctpDescription = function(media, sctp) {
    let output = [];
    if (media.protocol !== "DTLS/SCTP") output = [
        "m=" + media.kind + " 9 " + media.protocol + " " + sctp.protocol + "\r\n",
        "c=IN IP4 0.0.0.0\r\n",
        "a=sctp-port:" + sctp.port + "\r\n"
    ];
    else output = [
        "m=" + media.kind + " 9 " + media.protocol + " " + sctp.port + "\r\n",
        "c=IN IP4 0.0.0.0\r\n",
        "a=sctpmap:" + sctp.port + " " + sctp.protocol + " 65535\r\n"
    ];
    if (sctp.maxMessageSize !== undefined) output.push("a=max-message-size:" + sctp.maxMessageSize + "\r\n");
    return output.join("");
};
// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
$2d82e9424cc80311$var$SDPUtils.generateSessionId = function() {
    return Math.random().toString().substr(2, 22);
};
// Write boiler plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'
$2d82e9424cc80311$var$SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
    let sessionId;
    const version = sessVer !== undefined ? sessVer : 2;
    if (sessId) sessionId = sessId;
    else sessionId = $2d82e9424cc80311$var$SDPUtils.generateSessionId();
    const user = sessUser || "thisisadapterortc";
    // FIXME: sess-id should be an NTP timestamp.
    return "v=0\r\no=" + user + " " + sessionId + " " + version + " IN IP4 127.0.0.1\r\n" + "s=-\r\n" + "t=0 0\r\n";
};
// Gets the direction from the mediaSection or the sessionpart.
$2d82e9424cc80311$var$SDPUtils.getDirection = function(mediaSection, sessionpart) {
    // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
    const lines = $2d82e9424cc80311$var$SDPUtils.splitLines(mediaSection);
    for(let i = 0; i < lines.length; i++)switch(lines[i]){
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
            return lines[i].substring(2);
        default:
    }
    if (sessionpart) return $2d82e9424cc80311$var$SDPUtils.getDirection(sessionpart);
    return "sendrecv";
};
$2d82e9424cc80311$var$SDPUtils.getKind = function(mediaSection) {
    const lines = $2d82e9424cc80311$var$SDPUtils.splitLines(mediaSection);
    const mline = lines[0].split(" ");
    return mline[0].substring(2);
};
$2d82e9424cc80311$var$SDPUtils.isRejected = function(mediaSection) {
    return mediaSection.split(" ", 2)[1] === "0";
};
$2d82e9424cc80311$var$SDPUtils.parseMLine = function(mediaSection) {
    const lines = $2d82e9424cc80311$var$SDPUtils.splitLines(mediaSection);
    const parts = lines[0].substring(2).split(" ");
    return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(" ")
    };
};
$2d82e9424cc80311$var$SDPUtils.parseOLine = function(mediaSection) {
    const line = $2d82e9424cc80311$var$SDPUtils.matchPrefix(mediaSection, "o=")[0];
    const parts = line.substring(2).split(" ");
    return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
    };
};
// a very naive interpretation of a valid SDP.
$2d82e9424cc80311$var$SDPUtils.isValidSDP = function(blob) {
    if (typeof blob !== "string" || blob.length === 0) return false;
    const lines = $2d82e9424cc80311$var$SDPUtils.splitLines(blob);
    for(let i = 0; i < lines.length; i++){
        if (lines[i].length < 2 || lines[i].charAt(1) !== "=") return false;
    // TODO: check the modifier a bit more.
    }
    return true;
};
$2d82e9424cc80311$exports = $2d82e9424cc80311$var$SDPUtils;



"use strict";
function $4c1fa5051c863fbe$export$cf133661e444ccfe(window) {
    // foundation is arbitrarily chosen as an indicator for full support for
    // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
    if (!window.RTCIceCandidate || window.RTCIceCandidate && "foundation" in window.RTCIceCandidate.prototype) return;
    const NativeRTCIceCandidate = window.RTCIceCandidate;
    window.RTCIceCandidate = function RTCIceCandidate(args) {
        // Remove the a= which shouldn't be part of the candidate string.
        if (typeof args === "object" && args.candidate && args.candidate.indexOf("a=") === 0) {
            args = JSON.parse(JSON.stringify(args));
            args.candidate = args.candidate.substring(2);
        }
        if (args.candidate && args.candidate.length) {
            // Augment the native candidate with the parsed fields.
            const nativeCandidate = new NativeRTCIceCandidate(args);
            const parsedCandidate = (0, (/*@__PURE__*/$parcel$interopDefault($2d82e9424cc80311$exports))).parseCandidate(args.candidate);
            for(const key in parsedCandidate)if (!(key in nativeCandidate)) Object.defineProperty(nativeCandidate, key, {
                value: parsedCandidate[key]
            });
            // Override serializer to not serialize the extra attributes.
            nativeCandidate.toJSON = function toJSON() {
                return {
                    candidate: nativeCandidate.candidate,
                    sdpMid: nativeCandidate.sdpMid,
                    sdpMLineIndex: nativeCandidate.sdpMLineIndex,
                    usernameFragment: nativeCandidate.usernameFragment
                };
            };
            return nativeCandidate;
        }
        return new NativeRTCIceCandidate(args);
    };
    window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;
    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    $2de7f36fd24d65d0$export$1f48841962b828b1(window, "icecandidate", (e)=>{
        if (e.candidate) Object.defineProperty(e, "candidate", {
            value: new window.RTCIceCandidate(e.candidate),
            writable: "false"
        });
        return e;
    });
}
function $4c1fa5051c863fbe$export$fdafb8d8280e29b5(window) {
    if (!window.RTCIceCandidate || window.RTCIceCandidate && "relayProtocol" in window.RTCIceCandidate.prototype) return;
    // Hook up the augmented candidate in onicecandidate and
    // addEventListener('icecandidate', ...)
    $2de7f36fd24d65d0$export$1f48841962b828b1(window, "icecandidate", (e)=>{
        if (e.candidate) {
            const parsedCandidate = (0, (/*@__PURE__*/$parcel$interopDefault($2d82e9424cc80311$exports))).parseCandidate(e.candidate.candidate);
            if (parsedCandidate.type === "relay") // This is a libwebrtc-specific mapping of local type preference
            // to relayProtocol.
            e.candidate.relayProtocol = ({
                0: "tls",
                1: "tcp",
                2: "udp"
            })[parsedCandidate.priority >> 24];
        }
        return e;
    });
}
function $4c1fa5051c863fbe$export$a99147c78a56edc4(window, browserDetails) {
    if (!window.RTCPeerConnection) return;
    if (!("sctp" in window.RTCPeerConnection.prototype)) Object.defineProperty(window.RTCPeerConnection.prototype, "sctp", {
        get () {
            return typeof this._sctp === "undefined" ? null : this._sctp;
        }
    });
    const sctpInDescription = function(description) {
        if (!description || !description.sdp) return false;
        const sections = (0, (/*@__PURE__*/$parcel$interopDefault($2d82e9424cc80311$exports))).splitSections(description.sdp);
        sections.shift();
        return sections.some((mediaSection)=>{
            const mLine = (0, (/*@__PURE__*/$parcel$interopDefault($2d82e9424cc80311$exports))).parseMLine(mediaSection);
            return mLine && mLine.kind === "application" && mLine.protocol.indexOf("SCTP") !== -1;
        });
    };
    const getRemoteFirefoxVersion = function(description) {
        // TODO: Is there a better solution for detecting Firefox?
        const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
        if (match === null || match.length < 2) return -1;
        const version = parseInt(match[1], 10);
        // Test for NaN (yes, this is ugly)
        return version !== version ? -1 : version;
    };
    const getCanSendMaxMessageSize = function(remoteIsFirefox) {
        // Every implementation we know can send at least 64 KiB.
        // Note: Although Chrome is technically able to send up to 256 KiB, the
        //       data does not reach the other peer reliably.
        //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
        let canSendMaxMessageSize = 65536;
        if (browserDetails.browser === "firefox") {
            if (browserDetails.version < 57) {
                if (remoteIsFirefox === -1) // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                // fragmentation.
                canSendMaxMessageSize = 16384;
                else // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                // messages. Thus, supporting ~2 GiB when sending.
                canSendMaxMessageSize = 2147483637;
            } else if (browserDetails.version < 60) // Currently, all FF >= 57 will reset the remote maximum message size
            // to the default value when a data channel is created at a later
            // stage. :(
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
            canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
            else // FF >= 60 supports sending ~2 GiB
            canSendMaxMessageSize = 2147483637;
        }
        return canSendMaxMessageSize;
    };
    const getMaxMessageSize = function(description, remoteIsFirefox) {
        // Note: 65536 bytes is the default value from the SDP spec. Also,
        //       every implementation we know supports receiving 65536 bytes.
        let maxMessageSize = 65536;
        // FF 57 has a slightly incorrect default remote max message size, so
        // we need to adjust it here to avoid a failure when sending.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
        if (browserDetails.browser === "firefox" && browserDetails.version === 57) maxMessageSize = 65535;
        const match = (0, (/*@__PURE__*/$parcel$interopDefault($2d82e9424cc80311$exports))).matchPrefix(description.sdp, "a=max-message-size:");
        if (match.length > 0) maxMessageSize = parseInt(match[0].substring(19), 10);
        else if (browserDetails.browser === "firefox" && remoteIsFirefox !== -1) // If the maximum message size is not present in the remote SDP and
        // both local and remote are Firefox, the remote peer can receive
        // ~2 GiB.
        maxMessageSize = 2147483637;
        return maxMessageSize;
    };
    const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
        this._sctp = null;
        // Chrome decided to not expose .sctp in plan-b mode.
        // As usual, adapter.js has to do an 'ugly worakaround'
        // to cover up the mess.
        if (browserDetails.browser === "chrome" && browserDetails.version >= 76) {
            const { sdpSemantics: sdpSemantics } = this.getConfiguration();
            if (sdpSemantics === "plan-b") Object.defineProperty(this, "sctp", {
                get () {
                    return typeof this._sctp === "undefined" ? null : this._sctp;
                },
                enumerable: true,
                configurable: true
            });
        }
        if (sctpInDescription(arguments[0])) {
            // Check if the remote is FF.
            const isFirefox = getRemoteFirefoxVersion(arguments[0]);
            // Get the maximum message size the local peer is capable of sending
            const canSendMMS = getCanSendMaxMessageSize(isFirefox);
            // Get the maximum message size of the remote peer.
            const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);
            // Determine final maximum message size
            let maxMessageSize;
            if (canSendMMS === 0 && remoteMMS === 0) maxMessageSize = Number.POSITIVE_INFINITY;
            else if (canSendMMS === 0 || remoteMMS === 0) maxMessageSize = Math.max(canSendMMS, remoteMMS);
            else maxMessageSize = Math.min(canSendMMS, remoteMMS);
            // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
            // attribute.
            const sctp = {};
            Object.defineProperty(sctp, "maxMessageSize", {
                get () {
                    return maxMessageSize;
                }
            });
            this._sctp = sctp;
        }
        return origSetRemoteDescription.apply(this, arguments);
    };
}
function $4c1fa5051c863fbe$export$d461c8d5c5db5da7(window) {
    if (!(window.RTCPeerConnection && "createDataChannel" in window.RTCPeerConnection.prototype)) return;
    // Note: Although Firefox >= 57 has a native implementation, the maximum
    //       message size can be reset for all data channels at a later stage.
    //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
    function wrapDcSend(dc, pc) {
        const origDataChannelSend = dc.send;
        dc.send = function send() {
            const data = arguments[0];
            const length = data.length || data.size || data.byteLength;
            if (dc.readyState === "open" && pc.sctp && length > pc.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + pc.sctp.maxMessageSize + " bytes)");
            return origDataChannelSend.apply(dc, arguments);
        };
    }
    const origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
    window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
        const dataChannel = origCreateDataChannel.apply(this, arguments);
        wrapDcSend(dataChannel, this);
        return dataChannel;
    };
    $2de7f36fd24d65d0$export$1f48841962b828b1(window, "datachannel", (e)=>{
        wrapDcSend(e.channel, e.target);
        return e;
    });
}
function $4c1fa5051c863fbe$export$63bb816cc75460(window) {
    if (!window.RTCPeerConnection || "connectionState" in window.RTCPeerConnection.prototype) return;
    const proto = window.RTCPeerConnection.prototype;
    Object.defineProperty(proto, "connectionState", {
        get () {
            return ({
                completed: "connected",
                checking: "connecting"
            })[this.iceConnectionState] || this.iceConnectionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto, "onconnectionstatechange", {
        get () {
            return this._onconnectionstatechange || null;
        },
        set (cb) {
            if (this._onconnectionstatechange) {
                this.removeEventListener("connectionstatechange", this._onconnectionstatechange);
                delete this._onconnectionstatechange;
            }
            if (cb) this.addEventListener("connectionstatechange", this._onconnectionstatechange = cb);
        },
        enumerable: true,
        configurable: true
    });
    [
        "setLocalDescription",
        "setRemoteDescription"
    ].forEach((method)=>{
        const origMethod = proto[method];
        proto[method] = function() {
            if (!this._connectionstatechangepoly) {
                this._connectionstatechangepoly = (e)=>{
                    const pc = e.target;
                    if (pc._lastConnectionState !== pc.connectionState) {
                        pc._lastConnectionState = pc.connectionState;
                        const newEvent = new Event("connectionstatechange", e);
                        pc.dispatchEvent(newEvent);
                    }
                    return e;
                };
                this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly);
            }
            return origMethod.apply(this, arguments);
        };
    });
}
function $4c1fa5051c863fbe$export$a57d114344295149(window, browserDetails) {
    /* remove a=extmap-allow-mixed for webrtc.org < M71 */ if (!window.RTCPeerConnection) return;
    if (browserDetails.browser === "chrome" && browserDetails.version >= 71) return;
    if (browserDetails.browser === "safari" && browserDetails.version >= 605) return;
    const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
        if (desc && desc.sdp && desc.sdp.indexOf("\na=extmap-allow-mixed") !== -1) {
            const sdp = desc.sdp.split("\n").filter((line)=>{
                return line.trim() !== "a=extmap-allow-mixed";
            }).join("\n");
            // Safari enforces read-only-ness of RTCSessionDescription fields.
            if (window.RTCSessionDescription && desc instanceof window.RTCSessionDescription) arguments[0] = new window.RTCSessionDescription({
                type: desc.type,
                sdp: sdp
            });
            else desc.sdp = sdp;
        }
        return nativeSRD.apply(this, arguments);
    };
}
function $4c1fa5051c863fbe$export$51d5e40b48c771c7(window, browserDetails) {
    // Support for addIceCandidate(null or undefined)
    // as well as addIceCandidate({candidate: "", ...})
    // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
    // Note: must be called before other polyfills which change the signature.
    if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) return;
    const nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
    if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) return;
    window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
        if (!arguments[0]) {
            if (arguments[1]) arguments[1].apply(null);
            return Promise.resolve();
        }
        // Firefox 68+ emits and processes {candidate: "", ...}, ignore
        // in older versions.
        // Native support for ignoring exists for Chrome M77+.
        // Safari ignores as well, exact version unknown but works in the same
        // version that also ignores addIceCandidate(null).
        if ((browserDetails.browser === "chrome" && browserDetails.version < 78 || browserDetails.browser === "firefox" && browserDetails.version < 68 || browserDetails.browser === "safari") && arguments[0] && arguments[0].candidate === "") return Promise.resolve();
        return nativeAddIceCandidate.apply(this, arguments);
    };
}
function $4c1fa5051c863fbe$export$7170d04e59f9d553(window, browserDetails) {
    if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) return;
    const nativeSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
    if (!nativeSetLocalDescription || nativeSetLocalDescription.length === 0) return;
    window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
        let desc = arguments[0] || {};
        if (typeof desc !== "object" || desc.type && desc.sdp) return nativeSetLocalDescription.apply(this, arguments);
        // The remaining steps should technically happen when SLD comes off the
        // RTCPeerConnection's operations chain (not ahead of going on it), but
        // this is too difficult to shim. Instead, this shim only covers the
        // common case where the operations chain is empty. This is imperfect, but
        // should cover many cases. Rationale: Even if we can't reduce the glare
        // window to zero on imperfect implementations, there's value in tapping
        // into the perfect negotiation pattern that several browsers support.
        desc = {
            type: desc.type,
            sdp: desc.sdp
        };
        if (!desc.type) switch(this.signalingState){
            case "stable":
            case "have-local-offer":
            case "have-remote-pranswer":
                desc.type = "offer";
                break;
            default:
                desc.type = "answer";
                break;
        }
        if (desc.sdp || desc.type !== "offer" && desc.type !== "answer") return nativeSetLocalDescription.apply(this, [
            desc
        ]);
        const func = desc.type === "offer" ? this.createOffer : this.createAnswer;
        return func.apply(this).then((d)=>nativeSetLocalDescription.apply(this, [
                d
            ]));
    };
}



function $1a50a97a855ee5eb$export$e77bf46c04ac7d12({ window: window } = {}, options = {
    shimChrome: true,
    shimFirefox: true,
    shimSafari: true
}) {
    // Utils.
    const logging = $2de7f36fd24d65d0$export$bef1f36f5486a6a3;
    const browserDetails = $2de7f36fd24d65d0$export$2d31490a0c05f094(window);
    const adapter = {
        browserDetails: browserDetails,
        commonShim: $4c1fa5051c863fbe$exports,
        extractVersion: $2de7f36fd24d65d0$export$e3c02be309be1f23,
        disableLog: $2de7f36fd24d65d0$export$afbfee8cc06fd3e4,
        disableWarnings: $2de7f36fd24d65d0$export$51516be4b019e41e,
        sdp: // Expose sdp as a convenience. For production apps include directly.
        $2d82e9424cc80311$exports
    };
    // Shim browser if found.
    switch(browserDetails.browser){
        case "chrome":
            if (!$deff6da3d41ce3e3$exports || !$deff6da3d41ce3e3$exports.shimPeerConnection || !options.shimChrome) {
                logging("Chrome shim is not included in this adapter release.");
                return adapter;
            }
            if (browserDetails.version === null) {
                logging("Chrome shim can not determine version, not shimming.");
                return adapter;
            }
            logging("adapter.js shimming chrome.");
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = $deff6da3d41ce3e3$exports;
            // Must be called before shimPeerConnection.
            $4c1fa5051c863fbe$export$51d5e40b48c771c7(window, browserDetails);
            $4c1fa5051c863fbe$export$7170d04e59f9d553(window, browserDetails);
            $deff6da3d41ce3e3$exports.shimGetUserMedia(window, browserDetails);
            $deff6da3d41ce3e3$exports.shimMediaStream(window, browserDetails);
            $deff6da3d41ce3e3$exports.shimPeerConnection(window, browserDetails);
            $deff6da3d41ce3e3$exports.shimOnTrack(window, browserDetails);
            $deff6da3d41ce3e3$exports.shimAddTrackRemoveTrack(window, browserDetails);
            $deff6da3d41ce3e3$exports.shimGetSendersWithDtmf(window, browserDetails);
            $deff6da3d41ce3e3$exports.shimSenderReceiverGetStats(window, browserDetails);
            $deff6da3d41ce3e3$exports.fixNegotiationNeeded(window, browserDetails);
            $4c1fa5051c863fbe$export$cf133661e444ccfe(window, browserDetails);
            $4c1fa5051c863fbe$export$fdafb8d8280e29b5(window, browserDetails);
            $4c1fa5051c863fbe$export$63bb816cc75460(window, browserDetails);
            $4c1fa5051c863fbe$export$a99147c78a56edc4(window, browserDetails);
            $4c1fa5051c863fbe$export$d461c8d5c5db5da7(window, browserDetails);
            $4c1fa5051c863fbe$export$a57d114344295149(window, browserDetails);
            break;
        case "firefox":
            if (!$491db345eab2a4d6$exports || !$491db345eab2a4d6$exports.shimPeerConnection || !options.shimFirefox) {
                logging("Firefox shim is not included in this adapter release.");
                return adapter;
            }
            logging("adapter.js shimming firefox.");
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = $491db345eab2a4d6$exports;
            // Must be called before shimPeerConnection.
            $4c1fa5051c863fbe$export$51d5e40b48c771c7(window, browserDetails);
            $4c1fa5051c863fbe$export$7170d04e59f9d553(window, browserDetails);
            $491db345eab2a4d6$exports.shimGetUserMedia(window, browserDetails);
            $491db345eab2a4d6$exports.shimPeerConnection(window, browserDetails);
            $491db345eab2a4d6$exports.shimOnTrack(window, browserDetails);
            $491db345eab2a4d6$exports.shimRemoveStream(window, browserDetails);
            $491db345eab2a4d6$exports.shimSenderGetStats(window, browserDetails);
            $491db345eab2a4d6$exports.shimReceiverGetStats(window, browserDetails);
            $491db345eab2a4d6$exports.shimRTCDataChannel(window, browserDetails);
            $491db345eab2a4d6$exports.shimAddTransceiver(window, browserDetails);
            $491db345eab2a4d6$exports.shimGetParameters(window, browserDetails);
            $491db345eab2a4d6$exports.shimCreateOffer(window, browserDetails);
            $491db345eab2a4d6$exports.shimCreateAnswer(window, browserDetails);
            $4c1fa5051c863fbe$export$cf133661e444ccfe(window, browserDetails);
            $4c1fa5051c863fbe$export$63bb816cc75460(window, browserDetails);
            $4c1fa5051c863fbe$export$a99147c78a56edc4(window, browserDetails);
            $4c1fa5051c863fbe$export$d461c8d5c5db5da7(window, browserDetails);
            break;
        case "safari":
            if (!$78f37525dadb2170$exports || !options.shimSafari) {
                logging("Safari shim is not included in this adapter release.");
                return adapter;
            }
            logging("adapter.js shimming safari.");
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = $78f37525dadb2170$exports;
            // Must be called before shimCallbackAPI.
            $4c1fa5051c863fbe$export$51d5e40b48c771c7(window, browserDetails);
            $4c1fa5051c863fbe$export$7170d04e59f9d553(window, browserDetails);
            $78f37525dadb2170$exports.shimRTCIceServerUrls(window, browserDetails);
            $78f37525dadb2170$exports.shimCreateOfferLegacy(window, browserDetails);
            $78f37525dadb2170$exports.shimCallbacksAPI(window, browserDetails);
            $78f37525dadb2170$exports.shimLocalStreamsAPI(window, browserDetails);
            $78f37525dadb2170$exports.shimRemoteStreamsAPI(window, browserDetails);
            $78f37525dadb2170$exports.shimTrackEventTransceiver(window, browserDetails);
            $78f37525dadb2170$exports.shimGetUserMedia(window, browserDetails);
            $78f37525dadb2170$exports.shimAudioContext(window, browserDetails);
            $4c1fa5051c863fbe$export$cf133661e444ccfe(window, browserDetails);
            $4c1fa5051c863fbe$export$fdafb8d8280e29b5(window, browserDetails);
            $4c1fa5051c863fbe$export$a99147c78a56edc4(window, browserDetails);
            $4c1fa5051c863fbe$export$d461c8d5c5db5da7(window, browserDetails);
            $4c1fa5051c863fbe$export$a57d114344295149(window, browserDetails);
            break;
        default:
            logging("Unsupported browser!");
            break;
    }
    return adapter;
}


"use strict";
const $4aa6f525fc45b98a$var$adapter = (0, $1a50a97a855ee5eb$export$e77bf46c04ac7d12)({
    window: typeof window === "undefined" ? undefined : window
});
var $4aa6f525fc45b98a$export$2e2bcd8739ae039 = $4aa6f525fc45b98a$var$adapter;


const $b3deda87434b1fa7$var$webRTCAdapter = //@ts-ignore
(0, $4aa6f525fc45b98a$export$2e2bcd8739ae039).default || (0, $4aa6f525fc45b98a$export$2e2bcd8739ae039);
const $b3deda87434b1fa7$export$25be9502477c137d = new class {
    isWebRTCSupported() {
        return typeof RTCPeerConnection !== "undefined";
    }
    isBrowserSupported() {
        const browser = this.getBrowser();
        const version = this.getVersion();
        const validBrowser = this.supportedBrowsers.includes(browser);
        if (!validBrowser) return false;
        if (browser === "chrome") return version >= this.minChromeVersion;
        if (browser === "firefox") return version >= this.minFirefoxVersion;
        if (browser === "safari") return !this.isIOS && version >= this.minSafariVersion;
        return false;
    }
    getBrowser() {
        return $b3deda87434b1fa7$var$webRTCAdapter.browserDetails.browser;
    }
    getVersion() {
        return $b3deda87434b1fa7$var$webRTCAdapter.browserDetails.version || 0;
    }
    isUnifiedPlanSupported() {
        const browser = this.getBrowser();
        const version = $b3deda87434b1fa7$var$webRTCAdapter.browserDetails.version || 0;
        if (browser === "chrome" && version < this.minChromeVersion) return false;
        if (browser === "firefox" && version >= this.minFirefoxVersion) return true;
        if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype)) return false;
        let tempPc;
        let supported = false;
        try {
            tempPc = new RTCPeerConnection();
            tempPc.addTransceiver("audio");
            supported = true;
        } catch (e) {} finally{
            if (tempPc) tempPc.close();
        }
        return supported;
    }
    toString() {
        return `Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`;
    }
    constructor(){
        this.isIOS = typeof navigator !== "undefined" ? [
            "iPad",
            "iPhone",
            "iPod"
        ].includes(navigator.platform) : false;
        this.supportedBrowsers = [
            "firefox",
            "chrome",
            "safari"
        ];
        this.minFirefoxVersion = 59;
        this.minChromeVersion = 72;
        this.minSafariVersion = 605;
    }
}();


const $494803cd36977992$export$f35f128fd59ea256 = (id)=>{
    // Allow empty ids
    return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
};


const $f9a92468cab27aaf$export$4e61f672936bec77 = ()=>Math.random().toString(36).slice(2);


const $ee69724ac22b8c12$var$DEFAULT_CONFIG = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: [
                "turn:eu-0.turn.peerjs.com:3478",
                "turn:us-0.turn.peerjs.com:3478"
            ],
            username: "peerjs",
            credential: "peerjsp"
        }
    ],
    sdpSemantics: "unified-plan"
};
class $ee69724ac22b8c12$export$f8f26dd395d7e1bd extends (0, $351d3c8bb83bcec5$export$f1c5f4c9cb95390b) {
    noop() {}
    blobToArrayBuffer(blob, cb) {
        const fr = new FileReader();
        fr.onload = function(evt) {
            if (evt.target) cb(evt.target.result);
        };
        fr.readAsArrayBuffer(blob);
        return fr;
    }
    binaryStringToArrayBuffer(binary) {
        const byteArray = new Uint8Array(binary.length);
        for(let i = 0; i < binary.length; i++)byteArray[i] = binary.charCodeAt(i) & 0xff;
        return byteArray.buffer;
    }
    isSecure() {
        return location.protocol === "https:";
    }
    constructor(...args){
        super(...args);
        this.CLOUD_HOST = "0.peerjs.com";
        this.CLOUD_PORT = 443;
        // Browsers that need chunking:
        this.chunkedBrowsers = {
            Chrome: 1,
            chrome: 1
        };
        // Returns browser-agnostic default config
        this.defaultConfig = $ee69724ac22b8c12$var$DEFAULT_CONFIG;
        this.browser = (0, $b3deda87434b1fa7$export$25be9502477c137d).getBrowser();
        this.browserVersion = (0, $b3deda87434b1fa7$export$25be9502477c137d).getVersion();
        this.pack = $b09b85ad69e68d49$export$2a703dbb0cb35339;
        this.unpack = $b09b85ad69e68d49$export$417857010dc9287f;
        /**
	 * A hash of WebRTC features mapped to booleans that correspond to whether the feature is supported by the current browser.
	 *
	 * :::caution
	 * Only the properties documented here are guaranteed to be present on `util.supports`
	 * :::
	 */ this.supports = function() {
            const supported = {
                browser: (0, $b3deda87434b1fa7$export$25be9502477c137d).isBrowserSupported(),
                webRTC: (0, $b3deda87434b1fa7$export$25be9502477c137d).isWebRTCSupported(),
                audioVideo: false,
                data: false,
                binaryBlob: false,
                reliable: false
            };
            if (!supported.webRTC) return supported;
            let pc;
            try {
                pc = new RTCPeerConnection($ee69724ac22b8c12$var$DEFAULT_CONFIG);
                supported.audioVideo = true;
                let dc;
                try {
                    dc = pc.createDataChannel("_PEERJSTEST", {
                        ordered: true
                    });
                    supported.data = true;
                    supported.reliable = !!dc.ordered;
                    // Binary test
                    try {
                        dc.binaryType = "blob";
                        supported.binaryBlob = !(0, $b3deda87434b1fa7$export$25be9502477c137d).isIOS;
                    } catch (e) {}
                } catch (e) {} finally{
                    if (dc) dc.close();
                }
            } catch (e) {} finally{
                if (pc) pc.close();
            }
            return supported;
        }();
        // Ensure alphanumeric ids
        this.validateId = (0, $494803cd36977992$export$f35f128fd59ea256);
        this.randomToken = (0, $f9a92468cab27aaf$export$4e61f672936bec77);
    }
}
const $ee69724ac22b8c12$export$7debb50ef11d5e0b = new $ee69724ac22b8c12$export$f8f26dd395d7e1bd();



const $5bd1f60cdc4971c6$var$LOG_PREFIX = "PeerJS: ";
var $5bd1f60cdc4971c6$export$243e62d78d3b544d;
(function(LogLevel) {
    /**
	 * Prints no logs.
	 */ LogLevel[LogLevel["Disabled"] = 0] = "Disabled";
    /**
	 * Prints only errors.
	 */ LogLevel[LogLevel["Errors"] = 1] = "Errors";
    /**
	 * Prints errors and warnings.
	 */ LogLevel[LogLevel["Warnings"] = 2] = "Warnings";
    /**
	 * Prints all logs.
	 */ LogLevel[LogLevel["All"] = 3] = "All";
    /**
   * prints data Chunks
   */ LogLevel[LogLevel["DataChunk"] = 4] = "DataChunk";
})($5bd1f60cdc4971c6$export$243e62d78d3b544d || ($5bd1f60cdc4971c6$export$243e62d78d3b544d = {}));
class $5bd1f60cdc4971c6$var$Logger {
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(logLevel) {
        this._logLevel = logLevel;
    }
    chunk(...args) {
        if (this._logLevel >= 4) this._print(4, ...args);
    }
    log(...args) {
        if (this._logLevel >= 3) this._print(3, ...args);
    }
    warn(...args) {
        if (this._logLevel >= 2) this._print(2, ...args);
    }
    error(...args) {
        if (this._logLevel >= 1) this._print(1, ...args);
    }
    setLogFunction(fn) {
        this._print = fn;
    }
    _print(logLevel, ...rest) {
        const copy = [
            $5bd1f60cdc4971c6$var$LOG_PREFIX,
            ...rest
        ];
        for(const i in copy)if (copy[i] instanceof Error) copy[i] = "(" + copy[i].name + ") " + copy[i].message;
        if (logLevel >= 3) console.log(...copy);
        else if (logLevel >= 2) console.warn("WARNING", ...copy);
        else if (logLevel >= 1) console.error("ERROR", ...copy);
    }
    constructor(){
        this._logLevel = 0;
    }
}
var $5bd1f60cdc4971c6$export$2e2bcd8739ae039 = new $5bd1f60cdc4971c6$var$Logger();


var $1dadf489fed5c254$exports = {};
"use strict";
var $1dadf489fed5c254$var$has = Object.prototype.hasOwnProperty, $1dadf489fed5c254$var$prefix = "~";
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */ function $1dadf489fed5c254$var$Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
    $1dadf489fed5c254$var$Events.prototype = Object.create(null);
    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new $1dadf489fed5c254$var$Events().__proto__) $1dadf489fed5c254$var$prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */ function $1dadf489fed5c254$var$EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */ function $1dadf489fed5c254$var$addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") throw new TypeError("The listener must be a function");
    var listener = new $1dadf489fed5c254$var$EE(fn, context || emitter, once), evt = $1dadf489fed5c254$var$prefix ? $1dadf489fed5c254$var$prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [
        emitter._events[evt],
        listener
    ];
    return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */ function $1dadf489fed5c254$var$clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new $1dadf489fed5c254$var$Events();
    else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */ function $1dadf489fed5c254$var$EventEmitter() {
    this._events = new $1dadf489fed5c254$var$Events();
    this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for(name in events = this._events)if ($1dadf489fed5c254$var$has.call(events, name)) names.push($1dadf489fed5c254$var$prefix ? name.slice(1) : name);
    if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
    return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.listeners = function listeners(event) {
    var evt = $1dadf489fed5c254$var$prefix ? $1dadf489fed5c254$var$prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [
        handlers.fn
    ];
    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++)ee[i] = handlers[i].fn;
    return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = $1dadf489fed5c254$var$prefix ? $1dadf489fed5c254$var$prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = $1dadf489fed5c254$var$prefix ? $1dadf489fed5c254$var$prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
        switch(len){
            case 1:
                return listeners.fn.call(listeners.context), true;
            case 2:
                return listeners.fn.call(listeners.context, a1), true;
            case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for(i = 1, args = new Array(len - 1); i < len; i++)args[i - 1] = arguments[i];
        listeners.fn.apply(listeners.context, args);
    } else {
        var length = listeners.length, j;
        for(i = 0; i < length; i++){
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
            switch(len){
                case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;
                case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;
                case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;
                case 4:
                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                    break;
                default:
                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++)args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
            }
        }
    }
    return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.on = function on(event, fn, context) {
    return $1dadf489fed5c254$var$addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.once = function once(event, fn, context) {
    return $1dadf489fed5c254$var$addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = $1dadf489fed5c254$var$prefix ? $1dadf489fed5c254$var$prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
        $1dadf489fed5c254$var$clearEvent(this, evt);
        return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) $1dadf489fed5c254$var$clearEvent(this, evt);
    } else {
        for(var i = 0, events = [], length = listeners.length; i < length; i++)if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else $1dadf489fed5c254$var$clearEvent(this, evt);
    }
    return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ $1dadf489fed5c254$var$EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
        evt = $1dadf489fed5c254$var$prefix ? $1dadf489fed5c254$var$prefix + event : event;
        if (this._events[evt]) $1dadf489fed5c254$var$clearEvent(this, evt);
    } else {
        this._events = new $1dadf489fed5c254$var$Events();
        this._eventsCount = 0;
    }
    return this;
};
//
// Alias methods names because people roll like that.
//
$1dadf489fed5c254$var$EventEmitter.prototype.off = $1dadf489fed5c254$var$EventEmitter.prototype.removeListener;
$1dadf489fed5c254$var$EventEmitter.prototype.addListener = $1dadf489fed5c254$var$EventEmitter.prototype.on;
//
// Expose the prefix.
//
$1dadf489fed5c254$var$EventEmitter.prefixed = $1dadf489fed5c254$var$prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
$1dadf489fed5c254$var$EventEmitter.EventEmitter = $1dadf489fed5c254$var$EventEmitter;
$1dadf489fed5c254$exports = $1dadf489fed5c254$var$EventEmitter;



var $c6218548eff1f889$export$3157d57b4135e3bc;
(function(ConnectionType) {
    ConnectionType["Data"] = "data";
    ConnectionType["Media"] = "media";
})($c6218548eff1f889$export$3157d57b4135e3bc || ($c6218548eff1f889$export$3157d57b4135e3bc = {}));
var $c6218548eff1f889$export$9547aaa2e39030ff;
(function(PeerErrorType) {
    /**
	 * The client's browser does not support some or all WebRTC features that you are trying to use.
	 */ PeerErrorType["BrowserIncompatible"] = "browser-incompatible";
    /**
	 * You've already disconnected this peer from the server and can no longer make any new connections on it.
	 */ PeerErrorType["Disconnected"] = "disconnected";
    /**
	 * The ID passed into the Peer constructor contains illegal characters.
	 */ PeerErrorType["InvalidID"] = "invalid-id";
    /**
	 * The API key passed into the Peer constructor contains illegal characters or is not in the system (cloud server only).
	 */ PeerErrorType["InvalidKey"] = "invalid-key";
    /**
	 * Lost or cannot establish a connection to the signalling server.
	 */ PeerErrorType["Network"] = "network";
    /**
	 * The peer you're trying to connect to does not exist.
	 */ PeerErrorType["PeerUnavailable"] = "peer-unavailable";
    /**
	 * PeerJS is being used securely, but the cloud server does not support SSL. Use a custom PeerServer.
	 */ PeerErrorType["SslUnavailable"] = "ssl-unavailable";
    /**
	 * Unable to reach the server.
	 */ PeerErrorType["ServerError"] = "server-error";
    /**
	 * An error from the underlying socket.
	 */ PeerErrorType["SocketError"] = "socket-error";
    /**
	 * The underlying socket closed unexpectedly.
	 */ PeerErrorType["SocketClosed"] = "socket-closed";
    /**
	 * The ID passed into the Peer constructor is already taken.
	 *
	 * :::caution
	 * This error is not fatal if your peer has open peer-to-peer connections.
	 * This can happen if you attempt to {@apilink Peer.reconnect} a peer that has been disconnected from the server,
	 * but its old ID has now been taken.
	 * :::
	 */ PeerErrorType["UnavailableID"] = "unavailable-id";
    /**
	 * Native WebRTC errors.
	 */ PeerErrorType["WebRTC"] = "webrtc";
})($c6218548eff1f889$export$9547aaa2e39030ff || ($c6218548eff1f889$export$9547aaa2e39030ff = {}));
var $c6218548eff1f889$export$7974935686149686;
(function(BaseConnectionErrorType) {
    BaseConnectionErrorType["NegotiationFailed"] = "negotiation-failed";
    BaseConnectionErrorType["ConnectionClosed"] = "connection-closed";
})($c6218548eff1f889$export$7974935686149686 || ($c6218548eff1f889$export$7974935686149686 = {}));
var $c6218548eff1f889$export$49ae800c114df41d;
(function(DataConnectionErrorType) {
    DataConnectionErrorType["NotOpenYet"] = "not-open-yet";
    DataConnectionErrorType["MessageToBig"] = "message-too-big";
})($c6218548eff1f889$export$49ae800c114df41d || ($c6218548eff1f889$export$49ae800c114df41d = {}));
var $c6218548eff1f889$export$89f507cf986a947;
(function(SerializationType) {
    SerializationType["Binary"] = "binary";
    SerializationType["BinaryUTF8"] = "binary-utf8";
    SerializationType["JSON"] = "json";
    SerializationType["None"] = "raw";
})($c6218548eff1f889$export$89f507cf986a947 || ($c6218548eff1f889$export$89f507cf986a947 = {}));
var $c6218548eff1f889$export$3b5c4a4b6354f023;
(function(SocketEventType) {
    SocketEventType["Message"] = "message";
    SocketEventType["Disconnected"] = "disconnected";
    SocketEventType["Error"] = "error";
    SocketEventType["Close"] = "close";
})($c6218548eff1f889$export$3b5c4a4b6354f023 || ($c6218548eff1f889$export$3b5c4a4b6354f023 = {}));
var $c6218548eff1f889$export$adb4a1754da6f10d;
(function(ServerMessageType) {
    ServerMessageType["Heartbeat"] = "HEARTBEAT";
    ServerMessageType["Candidate"] = "CANDIDATE";
    ServerMessageType["Offer"] = "OFFER";
    ServerMessageType["Answer"] = "ANSWER";
    ServerMessageType["Open"] = "OPEN";
    ServerMessageType["Error"] = "ERROR";
    ServerMessageType["IdTaken"] = "ID-TAKEN";
    ServerMessageType["InvalidKey"] = "INVALID-KEY";
    ServerMessageType["Leave"] = "LEAVE";
    ServerMessageType["Expire"] = "EXPIRE";
})($c6218548eff1f889$export$adb4a1754da6f10d || ($c6218548eff1f889$export$adb4a1754da6f10d = {}));


var $f9c7f0b8b7b4c284$exports = {};
$f9c7f0b8b7b4c284$exports = JSON.parse('{"name":"peerjs","version":"1.5.4","keywords":["peerjs","webrtc","p2p","rtc"],"description":"PeerJS client","homepage":"https://peerjs.com","bugs":{"url":"https://github.com/peers/peerjs/issues"},"repository":{"type":"git","url":"https://github.com/peers/peerjs"},"license":"MIT","contributors":["Michelle Bu <michelle@michellebu.com>","afrokick <devbyru@gmail.com>","ericz <really.ez@gmail.com>","Jairo <kidandcat@gmail.com>","Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>","Jairo Caro-Accino Viciana <jairo@galax.be>","Carlos Caballero <carlos.caballero.gonzalez@gmail.com>","hc <hheennrryy@gmail.com>","Muhammad Asif <capripio@gmail.com>","PrashoonB <prashoonbhattacharjee@gmail.com>","Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>","akotynski <aleksanderkotbury@gmail.com>","lmb <i@lmb.io>","Jairooo <jairocaro@msn.com>","Moritz St\xfcckler <moritz.stueckler@gmail.com>","Simon <crydotsnakegithub@gmail.com>","Denis Lukov <denismassters@gmail.com>","Philipp Hancke <fippo@andyet.net>","Hans Oksendahl <hansoksendahl@gmail.com>","Jess <jessachandler@gmail.com>","khankuan <khankuan@gmail.com>","DUODVK <kurmanov.work@gmail.com>","XiZhao <kwang1imsa@gmail.com>","Matthias Lohr <matthias@lohr.me>","=frank tree <=frnktrb@googlemail.com>","Andre Eckardt <aeckardt@outlook.com>","Chris Cowan <agentme49@gmail.com>","Alex Chuev <alex@chuev.com>","alxnull <alxnull@e.mail.de>","Yemel Jardi <angel.jardi@gmail.com>","Ben Parnell <benjaminparnell.94@gmail.com>","Benny Lichtner <bennlich@gmail.com>","fresheneesz <bitetrudpublic@gmail.com>","bob.barstead@exaptive.com <bob.barstead@exaptive.com>","chandika <chandika@gmail.com>","emersion <contact@emersion.fr>","Christopher Van <cvan@users.noreply.github.com>","eddieherm <edhermoso@gmail.com>","Eduardo Pinho <enet4mikeenet@gmail.com>","Evandro Zanatta <ezanatta@tray.net.br>","Gardner Bickford <gardner@users.noreply.github.com>","Gian Luca <gianluca.cecchi@cynny.com>","PatrickJS <github@gdi2290.com>","jonnyf <github@jonathanfoss.co.uk>","Hizkia Felix <hizkifw@gmail.com>","Hristo Oskov <hristo.oskov@gmail.com>","Isaac Madwed <i.madwed@gmail.com>","Ilya Konanykhin <ilya.konanykhin@gmail.com>","jasonbarry <jasbarry@me.com>","Jonathan Burke <jonathan.burke.1311@googlemail.com>","Josh Hamit <josh.hamit@gmail.com>","Jordan Austin <jrax86@gmail.com>","Joel Wetzell <jwetzell@yahoo.com>","xizhao <kevin.wang@cloudera.com>","Alberto Torres <kungfoobar@gmail.com>","Jonathan Mayol <mayoljonathan@gmail.com>","Jefferson Felix <me@jsfelix.dev>","Rolf Erik Lekang <me@rolflekang.com>","Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>","Pepijn de Vos <pepijndevos@gmail.com>","JooYoung <qkdlql@naver.com>","Tobias Speicher <rootcommander@gmail.com>","Steve Blaurock <sblaurock@gmail.com>","Kyrylo Shegeda <shegeda@ualberta.ca>","Diwank Singh Tomer <singh@diwank.name>","So\u0308ren Balko <Soeren.Balko@gmail.com>","Arpit Solanki <solankiarpit1997@gmail.com>","Yuki Ito <yuki@gnnk.net>","Artur Zayats <zag2art@gmail.com>"],"funding":{"type":"opencollective","url":"https://opencollective.com/peer"},"collective":{"type":"opencollective","url":"https://opencollective.com/peer"},"files":["dist/*"],"sideEffects":["lib/global.ts","lib/supports.ts"],"main":"dist/bundler.cjs","module":"dist/bundler.mjs","browser-minified":"dist/peerjs.min.js","browser-unminified":"dist/peerjs.js","browser-minified-msgpack":"dist/serializer.msgpack.mjs","types":"dist/types.d.ts","engines":{"node":">= 14"},"targets":{"types":{"source":"lib/exports.ts"},"main":{"context":"browser","includeNodeModules":true,"outputFormat":"esmodule","distDir":"./dist","publicUrl":"./","isLibrary":false,"sourceMap":true},"module":{"source":"lib/exports.ts","includeNodeModules":["eventemitter3"],"sourceMap":{"inlineSources":true}},"browser-minified":{"context":"browser","outputFormat":"global","optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts"},"browser-unminified":{"context":"browser","outputFormat":"global","optimize":false,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 80, safari >= 15"},"source":"lib/global.ts","sourceMap":{"inlineSources":true}},"browser-minified-msgpack":{"context":"browser","outputFormat":"esmodule","isLibrary":true,"optimize":true,"engines":{"browsers":"chrome >= 83, edge >= 83, firefox >= 102, safari >= 15"},"source":"lib/dataconnection/StreamConnection/MsgPack.ts"}},"scripts":{"contributors":"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\"chore(contributors): update and sort contributors list\\"","check":"tsc --noEmit && tsc -p e2e/tsconfig.json --noEmit","watch":"parcel watch","watch:dev":"parcel watch lib/global.ts --dist-dir lib  ","build":"rimraf dist && parcel build","dev":"nodemon --watch lib -e ts --exec \\"npm run build \\"","prepublishOnly":"npm run build","test":"jest","test:watch":"jest --watch","coverage":"jest --coverage --collectCoverageFrom=\\"./lib/**\\"","format":"prettier --write .","format:check":"prettier --check .","semantic-release":"semantic-release","e2e":"wdio run e2e/wdio.local.conf.ts","e2e:bstack":"wdio run e2e/wdio.bstack.conf.ts"},"devDependencies":{"@parcel/config-default":"^2.9.3","@parcel/packager-ts":"^2.9.3","@parcel/transformer-typescript-tsc":"^2.9.3","@parcel/transformer-typescript-types":"^2.9.3","@semantic-release/changelog":"^6.0.1","@semantic-release/git":"^10.0.1","@swc/core":"^1.3.27","@swc/jest":"^0.2.24","@types/jasmine":"^4.3.4","@wdio/browserstack-service":"^8.11.2","@wdio/cli":"^8.11.2","@wdio/globals":"^8.11.2","@wdio/jasmine-framework":"^8.11.2","@wdio/local-runner":"^8.11.2","@wdio/spec-reporter":"^8.11.2","@wdio/types":"^8.10.4","http-server":"^14.1.1","jest":"^29.3.1","jest-environment-jsdom":"^29.3.1","mock-socket":"^9.0.0","nodemon":"^3.1.3","parcel":"^2.9.3","prettier":"^3.0.0","rimraf":"^5.0.7","semantic-release":"^23.0.0","ts-node":"^10.9.1","typescript":"^5.0.0","wdio-geckodriver-service":"^5.0.1"},"dependencies":{"@msgpack/msgpack":"^2.8.0","eventemitter3":"^4.0.7","peerjs-js-binarypack":"^2.1.0","socket.io-client":"^4.7.5","webrtc-adapter":"^9.0.0"},"alias":{"process":false,"buffer":false}}');


const $5b570a28c16f4272$export$c169aefb7330cccb = Object.create(null); // no Map = no polyfill
$5b570a28c16f4272$export$c169aefb7330cccb["open"] = "0";
$5b570a28c16f4272$export$c169aefb7330cccb["close"] = "1";
$5b570a28c16f4272$export$c169aefb7330cccb["ping"] = "2";
$5b570a28c16f4272$export$c169aefb7330cccb["pong"] = "3";
$5b570a28c16f4272$export$c169aefb7330cccb["message"] = "4";
$5b570a28c16f4272$export$c169aefb7330cccb["upgrade"] = "5";
$5b570a28c16f4272$export$c169aefb7330cccb["noop"] = "6";
const $5b570a28c16f4272$export$47791e8004edd485 = Object.create(null);
Object.keys($5b570a28c16f4272$export$c169aefb7330cccb).forEach((key)=>{
    $5b570a28c16f4272$export$47791e8004edd485[$5b570a28c16f4272$export$c169aefb7330cccb[key]] = key;
});
const $5b570a28c16f4272$export$c718b5840781f8a7 = {
    type: "error",
    data: "parser error"
};


const $b28dd58408a21f67$var$withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const $b28dd58408a21f67$var$withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const $b28dd58408a21f67$var$isView = (obj)=>{
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const $b28dd58408a21f67$export$57852049361a8e62 = ({ type: type, data: data }, supportsBinary, callback)=>{
    if ($b28dd58408a21f67$var$withNativeBlob && data instanceof Blob) {
        if (supportsBinary) return callback(data);
        else return $b28dd58408a21f67$var$encodeBlobAsBase64(data, callback);
    } else if ($b28dd58408a21f67$var$withNativeArrayBuffer && (data instanceof ArrayBuffer || $b28dd58408a21f67$var$isView(data))) {
        if (supportsBinary) return callback(data);
        else return $b28dd58408a21f67$var$encodeBlobAsBase64(new Blob([
            data
        ]), callback);
    }
    // plain string
    return callback((0, $5b570a28c16f4272$export$c169aefb7330cccb)[type] + (data || ""));
};
const $b28dd58408a21f67$var$encodeBlobAsBase64 = (data, callback)=>{
    const fileReader = new FileReader();
    fileReader.onload = function() {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};
function $b28dd58408a21f67$var$toArray(data) {
    if (data instanceof Uint8Array) return data;
    else if (data instanceof ArrayBuffer) return new Uint8Array(data);
    else return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}
let $b28dd58408a21f67$var$TEXT_ENCODER;
function $b28dd58408a21f67$export$ec0c9b9013ee0ef5(packet, callback) {
    if ($b28dd58408a21f67$var$withNativeBlob && packet.data instanceof Blob) return packet.data.arrayBuffer().then($b28dd58408a21f67$var$toArray).then(callback);
    else if ($b28dd58408a21f67$var$withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || $b28dd58408a21f67$var$isView(packet.data))) return callback($b28dd58408a21f67$var$toArray(packet.data));
    $b28dd58408a21f67$export$57852049361a8e62(packet, false, (encoded)=>{
        if (!$b28dd58408a21f67$var$TEXT_ENCODER) $b28dd58408a21f67$var$TEXT_ENCODER = new TextEncoder();
        callback($b28dd58408a21f67$var$TEXT_ENCODER.encode(encoded));
    });
}



// imported from https://github.com/socketio/base64-arraybuffer
const $0c5f54110b44613b$var$chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// Use a lookup table to find the index.
const $0c5f54110b44613b$var$lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for(let i = 0; i < $0c5f54110b44613b$var$chars.length; i++)$0c5f54110b44613b$var$lookup[$0c5f54110b44613b$var$chars.charCodeAt(i)] = i;
const $0c5f54110b44613b$export$c564cdbbe6da493 = (arraybuffer)=>{
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
    for(i = 0; i < len; i += 3){
        base64 += $0c5f54110b44613b$var$chars[bytes[i] >> 2];
        base64 += $0c5f54110b44613b$var$chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += $0c5f54110b44613b$var$chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += $0c5f54110b44613b$var$chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + "=";
    else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + "==";
    return base64;
};
const $0c5f54110b44613b$export$2f872c0f2117be69 = (base64)=>{
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") bufferLength--;
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for(i = 0; i < len; i += 4){
        encoded1 = $0c5f54110b44613b$var$lookup[base64.charCodeAt(i)];
        encoded2 = $0c5f54110b44613b$var$lookup[base64.charCodeAt(i + 1)];
        encoded3 = $0c5f54110b44613b$var$lookup[base64.charCodeAt(i + 2)];
        encoded4 = $0c5f54110b44613b$var$lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
};


const $7dbfd59f46543045$var$withNativeArrayBuffer = typeof ArrayBuffer === "function";
const $7dbfd59f46543045$export$4647901878f33f31 = (encodedPacket, binaryType)=>{
    if (typeof encodedPacket !== "string") return {
        type: "message",
        data: $7dbfd59f46543045$var$mapBinary(encodedPacket, binaryType)
    };
    const type = encodedPacket.charAt(0);
    if (type === "b") return {
        type: "message",
        data: $7dbfd59f46543045$var$decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
    const packetType = (0, $5b570a28c16f4272$export$47791e8004edd485)[type];
    if (!packetType) return 0, $5b570a28c16f4272$export$c718b5840781f8a7;
    return encodedPacket.length > 1 ? {
        type: (0, $5b570a28c16f4272$export$47791e8004edd485)[type],
        data: encodedPacket.substring(1)
    } : {
        type: (0, $5b570a28c16f4272$export$47791e8004edd485)[type]
    };
};
const $7dbfd59f46543045$var$decodeBase64Packet = (data, binaryType)=>{
    if ($7dbfd59f46543045$var$withNativeArrayBuffer) {
        const decoded = (0, $0c5f54110b44613b$export$2f872c0f2117be69)(data);
        return $7dbfd59f46543045$var$mapBinary(decoded, binaryType);
    } else return {
        base64: true,
        data: data
    }; // fallback for old browsers
};
const $7dbfd59f46543045$var$mapBinary = (data, binaryType)=>{
    switch(binaryType){
        case "blob":
            if (data instanceof Blob) // from WebSocket + binaryType "blob"
            return data;
            else // from HTTP long-polling or WebTransport
            return new Blob([
                data
            ]);
        case "arraybuffer":
        default:
            if (data instanceof ArrayBuffer) // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
            return data;
            else // from WebTransport (Uint8Array)
            return data.buffer;
    }
};



const $87349ec7f07aa269$var$SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const $87349ec7f07aa269$export$144d64fe58dad441 = (packets, callback)=>{
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i)=>{
        // force base64 encoding for binary packets
        (0, $b28dd58408a21f67$export$57852049361a8e62)(packet, false, (encodedPacket)=>{
            encodedPackets[i] = encodedPacket;
            if (++count === length) callback(encodedPackets.join($87349ec7f07aa269$var$SEPARATOR));
        });
    });
};
const $87349ec7f07aa269$export$d10cc2e7f7566a2d = (encodedPayload, binaryType)=>{
    const encodedPackets = encodedPayload.split($87349ec7f07aa269$var$SEPARATOR);
    const packets = [];
    for(let i = 0; i < encodedPackets.length; i++){
        const decodedPacket = (0, $7dbfd59f46543045$export$4647901878f33f31)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") break;
    }
    return packets;
};
function $87349ec7f07aa269$export$a525fb718e9c623a() {
    // @ts-expect-error
    return new TransformStream({
        transform (packet, controller) {
            (0, $b28dd58408a21f67$export$ec0c9b9013ee0ef5)(packet, (encodedPacket)=>{
                const payloadLength = encodedPacket.length;
                let header;
                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
                if (payloadLength < 126) {
                    header = new Uint8Array(1);
                    new DataView(header.buffer).setUint8(0, payloadLength);
                } else if (payloadLength < 65536) {
                    header = new Uint8Array(3);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 126);
                    view.setUint16(1, payloadLength);
                } else {
                    header = new Uint8Array(9);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 127);
                    view.setBigUint64(1, BigInt(payloadLength));
                }
                // first bit indicates whether the payload is plain text (0) or binary (1)
                if (packet.data && typeof packet.data !== "string") header[0] |= 0x80;
                controller.enqueue(header);
                controller.enqueue(encodedPacket);
            });
        }
    });
}
let $87349ec7f07aa269$var$TEXT_DECODER;
function $87349ec7f07aa269$var$totalLength(chunks) {
    return chunks.reduce((acc, chunk)=>acc + chunk.length, 0);
}
function $87349ec7f07aa269$var$concatChunks(chunks, size) {
    if (chunks[0].length === size) return chunks.shift();
    const buffer = new Uint8Array(size);
    let j = 0;
    for(let i = 0; i < size; i++){
        buffer[i] = chunks[0][j++];
        if (j === chunks[0].length) {
            chunks.shift();
            j = 0;
        }
    }
    if (chunks.length && j < chunks[0].length) chunks[0] = chunks[0].slice(j);
    return buffer;
}
function $87349ec7f07aa269$export$552d20aac7500f47(maxPayload, binaryType) {
    if (!$87349ec7f07aa269$var$TEXT_DECODER) $87349ec7f07aa269$var$TEXT_DECODER = new TextDecoder();
    const chunks = [];
    let state = 0 /* READ_HEADER */ ;
    let expectedLength = -1;
    let isBinary = false;
    // @ts-expect-error
    return new TransformStream({
        transform (chunk, controller) {
            chunks.push(chunk);
            while(true){
                if (state === 0 /* READ_HEADER */ ) {
                    if ($87349ec7f07aa269$var$totalLength(chunks) < 1) break;
                    const header = $87349ec7f07aa269$var$concatChunks(chunks, 1);
                    isBinary = (header[0] & 0x80) === 0x80;
                    expectedLength = header[0] & 0x7f;
                    if (expectedLength < 126) state = 3 /* READ_PAYLOAD */ ;
                    else if (expectedLength === 126) state = 1 /* READ_EXTENDED_LENGTH_16 */ ;
                    else state = 2 /* READ_EXTENDED_LENGTH_64 */ ;
                } else if (state === 1 /* READ_EXTENDED_LENGTH_16 */ ) {
                    if ($87349ec7f07aa269$var$totalLength(chunks) < 2) break;
                    const headerArray = $87349ec7f07aa269$var$concatChunks(chunks, 2);
                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
                    state = 3 /* READ_PAYLOAD */ ;
                } else if (state === 2 /* READ_EXTENDED_LENGTH_64 */ ) {
                    if ($87349ec7f07aa269$var$totalLength(chunks) < 8) break;
                    const headerArray = $87349ec7f07aa269$var$concatChunks(chunks, 8);
                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
                    const n = view.getUint32(0);
                    if (n > Math.pow(2, 21) - 1) {
                        // the maximum safe integer in JavaScript is 2^53 - 1
                        controller.enqueue((0, $5b570a28c16f4272$export$c718b5840781f8a7));
                        break;
                    }
                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
                    state = 3 /* READ_PAYLOAD */ ;
                } else {
                    if ($87349ec7f07aa269$var$totalLength(chunks) < expectedLength) break;
                    const data = $87349ec7f07aa269$var$concatChunks(chunks, expectedLength);
                    controller.enqueue((0, $7dbfd59f46543045$export$4647901878f33f31)(isBinary ? data : $87349ec7f07aa269$var$TEXT_DECODER.decode(data), binaryType));
                    state = 0 /* READ_HEADER */ ;
                }
                if (expectedLength === 0 || expectedLength > maxPayload) {
                    controller.enqueue((0, $5b570a28c16f4272$export$c718b5840781f8a7));
                    break;
                }
            }
        }
    });
}
const $87349ec7f07aa269$export$a51d6b395ff4c65a = 4;


/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */ function $58e920d552c288a7$export$4293555f241ae35a(obj) {
    if (obj) return $58e920d552c288a7$var$mixin(obj);
}
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */ function $58e920d552c288a7$var$mixin(obj) {
    for(var key in $58e920d552c288a7$export$4293555f241ae35a.prototype)obj[key] = $58e920d552c288a7$export$4293555f241ae35a.prototype[key];
    return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ $58e920d552c288a7$export$4293555f241ae35a.prototype.on = $58e920d552c288a7$export$4293555f241ae35a.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ $58e920d552c288a7$export$4293555f241ae35a.prototype.once = function(event, fn) {
    function on() {
        this.off(event, on);
        fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ $58e920d552c288a7$export$4293555f241ae35a.prototype.off = $58e920d552c288a7$export$4293555f241ae35a.prototype.removeListener = $58e920d552c288a7$export$4293555f241ae35a.prototype.removeAllListeners = $58e920d552c288a7$export$4293555f241ae35a.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    // all
    if (0 == arguments.length) {
        this._callbacks = {};
        return this;
    }
    // specific event
    var callbacks = this._callbacks["$" + event];
    if (!callbacks) return this;
    // remove all handlers
    if (1 == arguments.length) {
        delete this._callbacks["$" + event];
        return this;
    }
    // remove specific handler
    var cb;
    for(var i = 0; i < callbacks.length; i++){
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) delete this._callbacks["$" + event];
    return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */ $58e920d552c288a7$export$4293555f241ae35a.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    if (callbacks) {
        callbacks = callbacks.slice(0);
        for(var i = 0, len = callbacks.length; i < len; ++i)callbacks[i].apply(this, args);
    }
    return this;
};
// alias used for reserved events (protected method)
$58e920d552c288a7$export$4293555f241ae35a.prototype.emitReserved = $58e920d552c288a7$export$4293555f241ae35a.prototype.emit;
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */ $58e920d552c288a7$export$4293555f241ae35a.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */ $58e920d552c288a7$export$4293555f241ae35a.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
};


const $0d6158f43b617dcd$export$394f9358f6231289 = (()=>{
    if (typeof self !== "undefined") return self;
    else if (typeof window !== "undefined") return window;
    else return Function("return this")();
})();


function $3e8d861dbfe4f59b$export$357523c63a2253b9(obj, ...attr) {
    return attr.reduce((acc, k)=>{
        if (obj.hasOwnProperty(k)) acc[k] = obj[k];
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const $3e8d861dbfe4f59b$var$NATIVE_SET_TIMEOUT = (0, $0d6158f43b617dcd$export$394f9358f6231289).setTimeout;
const $3e8d861dbfe4f59b$var$NATIVE_CLEAR_TIMEOUT = (0, $0d6158f43b617dcd$export$394f9358f6231289).clearTimeout;
function $3e8d861dbfe4f59b$export$2f67576668b97183(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = $3e8d861dbfe4f59b$var$NATIVE_SET_TIMEOUT.bind((0, $0d6158f43b617dcd$export$394f9358f6231289));
        obj.clearTimeoutFn = $3e8d861dbfe4f59b$var$NATIVE_CLEAR_TIMEOUT.bind((0, $0d6158f43b617dcd$export$394f9358f6231289));
    } else {
        obj.setTimeoutFn = (0, $0d6158f43b617dcd$export$394f9358f6231289).setTimeout.bind((0, $0d6158f43b617dcd$export$394f9358f6231289));
        obj.clearTimeoutFn = (0, $0d6158f43b617dcd$export$394f9358f6231289).clearTimeout.bind((0, $0d6158f43b617dcd$export$394f9358f6231289));
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const $3e8d861dbfe4f59b$var$BASE64_OVERHEAD = 1.33;
function $3e8d861dbfe4f59b$export$a48f0734ac7c2329(obj) {
    if (typeof obj === "string") return $3e8d861dbfe4f59b$var$utf8Length(obj);
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * $3e8d861dbfe4f59b$var$BASE64_OVERHEAD);
}
function $3e8d861dbfe4f59b$var$utf8Length(str) {
    let c = 0, length = 0;
    for(let i = 0, l = str.length; i < l; i++){
        c = str.charCodeAt(i);
        if (c < 0x80) length += 1;
        else if (c < 0x800) length += 2;
        else if (c < 0xd800 || c >= 0xe000) length += 3;
        else {
            i++;
            length += 4;
        }
    }
    return length;
}


// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */ function $0c25b487da6a5ae6$export$c564cdbbe6da493(obj) {
    let str = "";
    for(let i in obj)if (obj.hasOwnProperty(i)) {
        if (str.length) str += "&";
        str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
    }
    return str;
}
function $0c25b487da6a5ae6$export$2f872c0f2117be69(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for(let i = 0, l = pairs.length; i < l; i++){
        let pair = pairs[i].split("=");
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}


class $f5677105b9ea786e$export$8e68de6fb26f2236 extends Error {
    constructor(reason, description, context){
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class $f5677105b9ea786e$export$86495b081fef8e52 extends (0, $58e920d552c288a7$export$4293555f241ae35a) {
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */ onError(reason, description, context) {
        super.emitReserved("error", new $f5677105b9ea786e$export$8e68de6fb26f2236(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */ open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */ close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */ send(packets) {
        if (this.readyState === "open") this.write(packets);
    }
    /**
     * Called upon open
     *
     * @protected
     */ onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */ onData(data) {
        const packet = (0, $7dbfd59f46543045$export$4647901878f33f31)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */ onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */ onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */ pause(onPause) {}
    createUri(schema, query = {}) {
        return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
    }
    _hostname() {
        const hostname = this.opts.hostname;
        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
        if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) return ":" + this.opts.port;
        else return "";
    }
    _query(query) {
        const encodedQuery = (0, $0c25b487da6a5ae6$export$c564cdbbe6da493)(query);
        return encodedQuery.length ? "?" + encodedQuery : "";
    }
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */ constructor(opts){
        super();
        this.writable = false;
        (0, $3e8d861dbfe4f59b$export$2f67576668b97183)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
    }
}


// imported from https://github.com/unshiftio/yeast
"use strict";
const $41017d859937c0bf$var$alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), $41017d859937c0bf$var$length = 64, $41017d859937c0bf$var$map = {};
let $41017d859937c0bf$var$seed = 0, $41017d859937c0bf$var$i = 0, $41017d859937c0bf$var$prev;
function $41017d859937c0bf$export$c564cdbbe6da493(num) {
    let encoded = "";
    do {
        encoded = $41017d859937c0bf$var$alphabet[num % $41017d859937c0bf$var$length] + encoded;
        num = Math.floor(num / $41017d859937c0bf$var$length);
    }while (num > 0);
    return encoded;
}
function $41017d859937c0bf$export$2f872c0f2117be69(str) {
    let decoded = 0;
    for($41017d859937c0bf$var$i = 0; $41017d859937c0bf$var$i < str.length; $41017d859937c0bf$var$i++)decoded = decoded * $41017d859937c0bf$var$length + $41017d859937c0bf$var$map[str.charAt($41017d859937c0bf$var$i)];
    return decoded;
}
function $41017d859937c0bf$export$5bb64b92cb4135a() {
    const now = $41017d859937c0bf$export$c564cdbbe6da493(+new Date());
    if (now !== $41017d859937c0bf$var$prev) return $41017d859937c0bf$var$seed = 0, $41017d859937c0bf$var$prev = now;
    return now + "." + $41017d859937c0bf$export$c564cdbbe6da493($41017d859937c0bf$var$seed++);
}
//
// Map each character to its index.
//
for(; $41017d859937c0bf$var$i < $41017d859937c0bf$var$length; $41017d859937c0bf$var$i++)$41017d859937c0bf$var$map[$41017d859937c0bf$var$alphabet[$41017d859937c0bf$var$i]] = $41017d859937c0bf$var$i;



// browser shim for xmlhttprequest module
// imported from https://github.com/component/has-cors
let $30dd3ca8509cf9eb$var$value = false;
try {
    $30dd3ca8509cf9eb$var$value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
// if XMLHttp support is disabled in IE then it will throw
// when trying to create
}
const $30dd3ca8509cf9eb$export$5235bbd4a1ef06e = $30dd3ca8509cf9eb$var$value;



function $ec904170049a225e$export$a2d42eb087c10497(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || (0, $30dd3ca8509cf9eb$export$5235bbd4a1ef06e))) return new XMLHttpRequest();
    } catch (e) {}
    if (!xdomain) try {
        return new (0, $0d6158f43b617dcd$export$394f9358f6231289)[[
            "Active"
        ].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {}
}
function $ec904170049a225e$export$19413efcf2fac759() {}





function $bd208470cbdf0bc8$var$empty() {}
const $bd208470cbdf0bc8$var$hasXHR2 = function() {
    const xhr = new (0, $ec904170049a225e$export$a2d42eb087c10497)({
        xdomain: false
    });
    return null != xhr.responseType;
}();
class $bd208470cbdf0bc8$export$265ee5eefd4c309b extends (0, $f5677105b9ea786e$export$86495b081fef8e52) {
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */ doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */ pause(onPause) {
        this.readyState = "pausing";
        const pause = ()=>{
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                total++;
                this.once("pollComplete", function() {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function() {
                    --total || pause();
                });
            }
        } else pause();
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */ poll() {
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */ onData(data) {
        const callback = (packet)=>{
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") this.onOpen();
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({
                    description: "transport closed by the server"
                });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0, $87349ec7f07aa269$export$d10cc2e7f7566a2d)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) this.poll();
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */ doClose() {
        const close = ()=>{
            this.write([
                {
                    type: "close"
                }
            ]);
        };
        if ("open" === this.readyState) close();
        else // in case we're trying to close while
        // handshaking is in progress (GH-164)
        this.once("open", close);
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */ write(packets) {
        this.writable = false;
        (0, $87349ec7f07aa269$export$144d64fe58dad441)(packets, (data)=>{
            this.doWrite(data, ()=>{
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        const schema = this.opts.secure ? "https" : "http";
        const query = this.query || {};
        // cache busting is forced
        if (false !== this.opts.timestampRequests) query[this.opts.timestampParam] = (0, $41017d859937c0bf$export$5bb64b92cb4135a)();
        if (!this.supportsBinary && !query.sid) query.b64 = 1;
        return this.createUri(schema, query);
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @private
     */ request(opts = {}) {
        Object.assign(opts, {
            xd: this.xd,
            cookieJar: this.cookieJar
        }, this.opts);
        return new $bd208470cbdf0bc8$export$7fa6c5b6f8193917(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */ doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */ doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */ constructor(opts){
        super(opts);
        this.polling = false;
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) port = isSSL ? "443" : "80";
            this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
        }
        /**
         * XHR supports binary
         */ const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = $bd208470cbdf0bc8$var$hasXHR2 && !forceBase64;
        if (this.opts.withCredentials) this.cookieJar = (0, $ec904170049a225e$export$19413efcf2fac759)();
    }
}
class $bd208470cbdf0bc8$export$7fa6c5b6f8193917 extends (0, $58e920d552c288a7$export$4293555f241ae35a) {
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */ create() {
        var _a;
        const opts = (0, $3e8d861dbfe4f59b$export$357523c63a2253b9)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        const xhr = this.xhr = new (0, $ec904170049a225e$export$a2d42eb087c10497)(opts);
        try {
            xhr.open(this.method, this.uri, true);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for(let i in this.opts.extraHeaders)if (this.opts.extraHeaders.hasOwnProperty(i)) xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
            } catch (e) {}
            if ("POST" === this.method) try {
                xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {}
            try {
                xhr.setRequestHeader("Accept", "*/*");
            } catch (e) {}
            (_a = this.opts.cookieJar) === null || _a === void 0 || _a.addCookies(xhr);
            // ie6 check
            if ("withCredentials" in xhr) xhr.withCredentials = this.opts.withCredentials;
            if (this.opts.requestTimeout) xhr.timeout = this.opts.requestTimeout;
            xhr.onreadystatechange = ()=>{
                var _a;
                if (xhr.readyState === 3) (_a = this.opts.cookieJar) === null || _a === void 0 || _a.parseCookies(xhr);
                if (4 !== xhr.readyState) return;
                if (200 === xhr.status || 1223 === xhr.status) this.onLoad();
                else // make sure the `error` event handler that's user-set
                // does not throw in the same tick and gets caught here
                this.setTimeoutFn(()=>{
                    this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                }, 0);
            };
            xhr.send(this.data);
        } catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(()=>{
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = $bd208470cbdf0bc8$export$7fa6c5b6f8193917.requestsCount++;
            $bd208470cbdf0bc8$export$7fa6c5b6f8193917.requests[this.index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */ onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */ cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) return;
        this.xhr.onreadystatechange = $bd208470cbdf0bc8$var$empty;
        if (fromError) try {
            this.xhr.abort();
        } catch (e) {}
        if (typeof document !== "undefined") delete $bd208470cbdf0bc8$export$7fa6c5b6f8193917.requests[this.index];
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */ onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */ abort() {
        this.cleanup();
    }
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */ constructor(uri, opts){
        super();
        (0, $3e8d861dbfe4f59b$export$2f67576668b97183)(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
}
$bd208470cbdf0bc8$export$7fa6c5b6f8193917.requestsCount = 0;
$bd208470cbdf0bc8$export$7fa6c5b6f8193917.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */ if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") // @ts-ignore
    attachEvent("onunload", $bd208470cbdf0bc8$var$unloadHandler);
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in (0, $0d6158f43b617dcd$export$394f9358f6231289) ? "pagehide" : "unload";
        addEventListener(terminationEvent, $bd208470cbdf0bc8$var$unloadHandler, false);
    }
}
function $bd208470cbdf0bc8$var$unloadHandler() {
    for(let i in $bd208470cbdf0bc8$export$7fa6c5b6f8193917.requests)if ($bd208470cbdf0bc8$export$7fa6c5b6f8193917.requests.hasOwnProperty(i)) $bd208470cbdf0bc8$export$7fa6c5b6f8193917.requests[i].abort();
}






const $f71d65a00e29bc63$export$bdd553fddd433dcb = (()=>{
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) return (cb)=>Promise.resolve().then(cb);
    else return (cb, setTimeoutFn)=>setTimeoutFn(cb, 0);
})();
const $f71d65a00e29bc63$export$3909fb301d3dc8c9 = (0, $0d6158f43b617dcd$export$394f9358f6231289).WebSocket || (0, $0d6158f43b617dcd$export$394f9358f6231289).MozWebSocket;
const $f71d65a00e29bc63$export$3407ba5dfb7a683d = true;
const $f71d65a00e29bc63$export$790dcbc41e2d75d5 = "arraybuffer";



var $933e942aa2823728$exports = {};
"use strict";


var $994b4be0f98051e0$require$Buffer = $933e942aa2823728$exports.Buffer;
// detect ReactNative environment
const $994b4be0f98051e0$var$isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class $994b4be0f98051e0$export$911baa0677ac404c extends (0, $f5677105b9ea786e$export$86495b081fef8e52) {
    get name() {
        return "websocket";
    }
    doOpen() {
        if (!this.check()) // let probe timeout
        return;
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = $994b4be0f98051e0$var$isReactNative ? {} : (0, $3e8d861dbfe4f59b$export$357523c63a2253b9)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) opts.headers = this.opts.extraHeaders;
        try {
            this.ws = (0, $f71d65a00e29bc63$export$3407ba5dfb7a683d) && !$994b4be0f98051e0$var$isReactNative ? protocols ? new (0, $f71d65a00e29bc63$export$3909fb301d3dc8c9)(uri, protocols) : new (0, $f71d65a00e29bc63$export$3909fb301d3dc8c9)(uri) : new (0, $f71d65a00e29bc63$export$3909fb301d3dc8c9)(uri, protocols, opts);
        } catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */ addEventListeners() {
        this.ws.onopen = ()=>{
            if (this.opts.autoUnref) this.ws._socket.unref();
            this.onOpen();
        };
        this.ws.onclose = (closeEvent)=>this.onClose({
                description: "websocket connection closed",
                context: closeEvent
            });
        this.ws.onmessage = (ev)=>this.onData(ev.data);
        this.ws.onerror = (e)=>this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for(let i = 0; i < packets.length; i++){
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, $b28dd58408a21f67$export$57852049361a8e62)(packet, this.supportsBinary, (data)=>{
                // always create a new object (GH-437)
                const opts = {};
                if (!(0, $f71d65a00e29bc63$export$3407ba5dfb7a683d)) {
                    if (packet.options) opts.compress = packet.options.compress;
                    if (this.opts.perMessageDeflate) {
                        const len = // @ts-ignore
                        "string" === typeof data ? $994b4be0f98051e0$require$Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) opts.compress = false;
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (0, $f71d65a00e29bc63$export$3407ba5dfb7a683d) // TypeError is thrown when passing the second argument on Safari
                    this.ws.send(data);
                    else this.ws.send(data, opts);
                } catch (e) {}
                if (lastPacket) // fake drain
                // defer to next tick to allow Socket to clear writeBuffer
                (0, $f71d65a00e29bc63$export$bdd553fddd433dcb)(()=>{
                    this.writable = true;
                    this.emitReserved("drain");
                }, this.setTimeoutFn);
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        const schema = this.opts.secure ? "wss" : "ws";
        const query = this.query || {};
        // append timestamp to URI
        if (this.opts.timestampRequests) query[this.opts.timestampParam] = (0, $41017d859937c0bf$export$5bb64b92cb4135a)();
        // communicate binary support capabilities
        if (!this.supportsBinary) query.b64 = 1;
        return this.createUri(schema, query);
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @private
     */ check() {
        return !!(0, $f71d65a00e29bc63$export$3909fb301d3dc8c9);
    }
    /**
     * WebSocket transport constructor.
     *
     * @param {Object} opts - connection options
     * @protected
     */ constructor(opts){
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
}





class $d77e92984b46957d$export$961c930859384407 extends (0, $f5677105b9ea786e$export$86495b081fef8e52) {
    get name() {
        return "webtransport";
    }
    doOpen() {
        // @ts-ignore
        if (typeof WebTransport !== "function") return;
        // @ts-ignore
        this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        this.transport.closed.then(()=>{
            this.onClose();
        }).catch((err)=>{
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this.transport.ready.then(()=>{
            this.transport.createBidirectionalStream().then((stream)=>{
                const decoderStream = (0, $87349ec7f07aa269$export$552d20aac7500f47)(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
                const reader = stream.readable.pipeThrough(decoderStream).getReader();
                const encoderStream = (0, $87349ec7f07aa269$export$a525fb718e9c623a)();
                encoderStream.readable.pipeTo(stream.writable);
                this.writer = encoderStream.writable.getWriter();
                const read = ()=>{
                    reader.read().then(({ done: done, value: value })=>{
                        if (done) return;
                        this.onPacket(value);
                        read();
                    }).catch((err)=>{});
                };
                read();
                const packet = {
                    type: "open"
                };
                if (this.query.sid) packet.data = `{"sid":"${this.query.sid}"}`;
                this.writer.write(packet).then(()=>this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for(let i = 0; i < packets.length; i++){
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            this.writer.write(packet).then(()=>{
                if (lastPacket) (0, $f71d65a00e29bc63$export$bdd553fddd433dcb)(()=>{
                    this.writable = true;
                    this.emitReserved("drain");
                }, this.setTimeoutFn);
            });
        }
    }
    doClose() {
        var _a;
        (_a = this.transport) === null || _a === void 0 || _a.close();
    }
}


const $30146238c02daea3$export$46dec00755c1153b = {
    websocket: (0, $994b4be0f98051e0$export$911baa0677ac404c),
    webtransport: (0, $d77e92984b46957d$export$961c930859384407),
    polling: (0, $bd208470cbdf0bc8$export$265ee5eefd4c309b)
};




// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */ const $cc568b158a41c6a8$var$re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const $cc568b158a41c6a8$var$parts = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
];
function $cc568b158a41c6a8$export$98e6a39c04603d36(str) {
    if (str.length > 2000) throw "URI too long";
    const src = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    let m = $cc568b158a41c6a8$var$re.exec(str || ""), uri = {}, i = 14;
    while(i--)uri[$cc568b158a41c6a8$var$parts[i]] = m[i] || "";
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
        uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
        uri.ipv6uri = true;
    }
    uri.pathNames = $cc568b158a41c6a8$var$pathNames(uri, uri["path"]);
    uri.queryKey = $cc568b158a41c6a8$var$queryKey(uri, uri["query"]);
    return uri;
}
function $cc568b158a41c6a8$var$pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == "/" || path.length === 0) names.splice(0, 1);
    if (path.slice(-1) == "/") names.splice(names.length - 1, 1);
    return names;
}
function $cc568b158a41c6a8$var$queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) data[$1] = $2;
    });
    return data;
}





class $867b20e8b99073f1$export$4798917dbf149b79 extends (0, $58e920d552c288a7$export$4293555f241ae35a) {
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */ createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = (0, $87349ec7f07aa269$export$a51d6b395ff4c65a);
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id) query.sid = this.id;
        const opts = Object.assign({}, this.opts, {
            query: query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        }, this.opts.transportOptions[name]);
        return new (0, $30146238c02daea3$export$46dec00755c1153b)[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */ open() {
        let transport;
        if (this.opts.rememberUpgrade && $867b20e8b99073f1$export$4798917dbf149b79.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) transport = "websocket";
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(()=>{
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        } else transport = this.transports[0];
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        } catch (e) {
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */ setTransport(transport) {
        if (this.transport) this.transport.removeAllListeners();
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason)=>this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */ probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        $867b20e8b99073f1$export$4798917dbf149b79.priorWebsocketSuccess = false;
        const onTransportOpen = ()=>{
            if (failed) return;
            transport.send([
                {
                    type: "ping",
                    data: "probe"
                }
            ]);
            transport.once("packet", (msg)=>{
                if (failed) return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport) return;
                    $867b20e8b99073f1$export$4798917dbf149b79.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(()=>{
                        if (failed) return;
                        if ("closed" === this.readyState) return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([
                            {
                                type: "upgrade"
                            }
                        ]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                } else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed) return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err)=>{
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) freezeTransport();
        }
        // Remove all listeners on the transport and on self
        const cleanup = ()=>{
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        if (this.upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") // favor WebTransport
        this.setTimeoutFn(()=>{
            if (!failed) transport.open();
        }, 200);
        else transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */ onOpen() {
        this.readyState = "open";
        $867b20e8b99073f1$export$4798917dbf149b79.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState && this.opts.upgrade) {
            let i = 0;
            const l = this.upgrades.length;
            for(; i < l; i++)this.probe(this.upgrades[i]);
        }
    }
    /**
     * Handles a packet.
     *
     * @private
     */ onPacket(packet) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            this.resetPingTimeout();
            switch(packet.type){
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */ onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState) return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */ resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(()=>{
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) this.pingTimeoutTimer.unref();
    }
    /**
     * Called on `drain` event
     *
     * @private
     */ onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) this.emitReserved("drain");
        else this.flush();
    }
    /**
     * Flush write buffers.
     *
     * @private
     */ flush() {
        if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */ getWritablePackets() {
        const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) return this.writeBuffer;
        let payloadSize = 1; // first packet type
        for(let i = 0; i < this.writeBuffer.length; i++){
            const data = this.writeBuffer[i].data;
            if (data) payloadSize += (0, $3e8d861dbfe4f59b$export$a48f0734ac7c2329)(data);
            if (i > 0 && payloadSize > this.maxPayload) return this.writeBuffer.slice(0, i);
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} callback function.
     * @return {Socket} for chaining.
     */ write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */ sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) return;
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn) this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */ close() {
        const close = ()=>{
            this.onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = ()=>{
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = ()=>{
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) this.once("drain", ()=>{
                if (this.upgrading) waitForUpgrade();
                else close();
            });
            else if (this.upgrading) waitForUpgrade();
            else close();
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */ onError(err) {
        $867b20e8b99073f1$export$4798917dbf149b79.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */ onClose(reason, description) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("beforeunload", this.beforeunloadEventListener, false);
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */ filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for(; i < j; i++)if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        return filteredUpgrades;
    }
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */ constructor(uri, opts = {}){
        super();
        this.binaryType = (0, $f71d65a00e29bc63$export$790dcbc41e2d75d5);
        this.writeBuffer = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = (0, $cc568b158a41c6a8$export$98e6a39c04603d36)(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query) opts.query = uri.query;
        } else if (opts.host) opts.hostname = (0, $cc568b158a41c6a8$export$98e6a39c04603d36)(opts.host).host;
        (0, $3e8d861dbfe4f59b$export$2f67576668b97183)(this, opts);
        this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) // if no port is specified manually, use the protocol default
        opts.port = this.secure ? "443" : "80";
        this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
        this.transports = opts.transports || [
            "polling",
            "websocket",
            "webtransport"
        ];
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: false
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") this.opts.query = (0, $0c25b487da6a5ae6$export$2f872c0f2117be69)(this.opts.query);
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this.beforeunloadEventListener = ()=>{
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this.beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = ()=>{
                    this.onClose("transport close", {
                        description: "network connection lost"
                    });
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
}
$867b20e8b99073f1$export$4798917dbf149b79.protocol = (0, $87349ec7f07aa269$export$a51d6b395ff4c65a);







const $129286e487b202b3$export$a51d6b395ff4c65a = (0, $867b20e8b99073f1$export$4798917dbf149b79).protocol;


function $b922b0cf44a155a0$export$128fa18b7194ef(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) uri = loc.protocol + uri;
            else uri = loc.host + uri;
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) uri = loc.protocol + "//" + uri;
            else uri = "https://" + uri;
        }
        // parse
        obj = (0, $cc568b158a41c6a8$export$98e6a39c04603d36)(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) obj.port = "80";
        else if (/^(http|ws)s$/.test(obj.protocol)) obj.port = "443";
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}



var $236410067f5dcdea$exports = {};

$parcel$export($236410067f5dcdea$exports, "protocol", () => $236410067f5dcdea$export$a51d6b395ff4c65a);
$parcel$export($236410067f5dcdea$exports, "PacketType", () => $236410067f5dcdea$export$84d4095e16c6fc19);
$parcel$export($236410067f5dcdea$exports, "Encoder", () => $236410067f5dcdea$export$a50aceb0e02a00aa);
$parcel$export($236410067f5dcdea$exports, "Decoder", () => $236410067f5dcdea$export$f9de6ca0bc043724);

const $d4b37f9ef97d3041$var$withNativeArrayBuffer = typeof ArrayBuffer === "function";
const $d4b37f9ef97d3041$var$isView = (obj)=>{
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const $d4b37f9ef97d3041$var$toString = Object.prototype.toString;
const $d4b37f9ef97d3041$var$withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && $d4b37f9ef97d3041$var$toString.call(Blob) === "[object BlobConstructor]";
const $d4b37f9ef97d3041$var$withNativeFile = typeof File === "function" || typeof File !== "undefined" && $d4b37f9ef97d3041$var$toString.call(File) === "[object FileConstructor]";
function $d4b37f9ef97d3041$export$37488ff1135b1696(obj) {
    return $d4b37f9ef97d3041$var$withNativeArrayBuffer && (obj instanceof ArrayBuffer || $d4b37f9ef97d3041$var$isView(obj)) || $d4b37f9ef97d3041$var$withNativeBlob && obj instanceof Blob || $d4b37f9ef97d3041$var$withNativeFile && obj instanceof File;
}
function $d4b37f9ef97d3041$export$5234c529abdb5610(obj, toJSON) {
    if (!obj || typeof obj !== "object") return false;
    if (Array.isArray(obj)) {
        for(let i = 0, l = obj.length; i < l; i++){
            if ($d4b37f9ef97d3041$export$5234c529abdb5610(obj[i])) return true;
        }
        return false;
    }
    if ($d4b37f9ef97d3041$export$37488ff1135b1696(obj)) return true;
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) return $d4b37f9ef97d3041$export$5234c529abdb5610(obj.toJSON(), true);
    for(const key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key) && $d4b37f9ef97d3041$export$5234c529abdb5610(obj[key])) return true;
    }
    return false;
}


function $c960a3fa1dcf2c22$export$ac2edb9eb7af56f6(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = $c960a3fa1dcf2c22$var$_deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return {
        packet: pack,
        buffers: buffers
    };
}
function $c960a3fa1dcf2c22$var$_deconstructPacket(data, buffers) {
    if (!data) return data;
    if ((0, $d4b37f9ef97d3041$export$37488ff1135b1696)(data)) {
        const placeholder = {
            _placeholder: true,
            num: buffers.length
        };
        buffers.push(data);
        return placeholder;
    } else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for(let i = 0; i < data.length; i++)newData[i] = $c960a3fa1dcf2c22$var$_deconstructPacket(data[i], buffers);
        return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for(const key in data)if (Object.prototype.hasOwnProperty.call(data, key)) newData[key] = $c960a3fa1dcf2c22$var$_deconstructPacket(data[key], buffers);
        return newData;
    }
    return data;
}
function $c960a3fa1dcf2c22$export$a00da3b1ec037a04(packet, buffers) {
    packet.data = $c960a3fa1dcf2c22$var$_reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function $c960a3fa1dcf2c22$var$_reconstructPacket(data, buffers) {
    if (!data) return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
        if (isIndexValid) return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        else throw new Error("illegal attachments");
    } else if (Array.isArray(data)) for(let i = 0; i < data.length; i++)data[i] = $c960a3fa1dcf2c22$var$_reconstructPacket(data[i], buffers);
    else if (typeof data === "object") {
        for(const key in data)if (Object.prototype.hasOwnProperty.call(data, key)) data[key] = $c960a3fa1dcf2c22$var$_reconstructPacket(data[key], buffers);
    }
    return data;
}



/**
 * These strings must not be used as event names, as they have a special meaning.
 */ const $236410067f5dcdea$var$RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
];
const $236410067f5dcdea$export$a51d6b395ff4c65a = 5;
var $236410067f5dcdea$export$84d4095e16c6fc19;
(function(PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})($236410067f5dcdea$export$84d4095e16c6fc19 || ($236410067f5dcdea$export$84d4095e16c6fc19 = {}));
class $236410067f5dcdea$export$a50aceb0e02a00aa {
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */ encode(obj) {
        if (obj.type === $236410067f5dcdea$export$84d4095e16c6fc19.EVENT || obj.type === $236410067f5dcdea$export$84d4095e16c6fc19.ACK) {
            if ((0, $d4b37f9ef97d3041$export$5234c529abdb5610)(obj)) return this.encodeAsBinary({
                type: obj.type === $236410067f5dcdea$export$84d4095e16c6fc19.EVENT ? $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_EVENT : $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_ACK,
                nsp: obj.nsp,
                data: obj.data,
                id: obj.id
            });
        }
        return [
            this.encodeAsString(obj)
        ];
    }
    /**
     * Encode packet as string.
     */ encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_EVENT || obj.type === $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_ACK) str += obj.attachments + "-";
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) str += obj.nsp + ",";
        // immediately followed by the id
        if (null != obj.id) str += obj.id;
        // json data
        if (null != obj.data) str += JSON.stringify(obj.data, this.replacer);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */ encodeAsBinary(obj) {
        const deconstruction = (0, $c960a3fa1dcf2c22$export$ac2edb9eb7af56f6)(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */ constructor(replacer){
        this.replacer = replacer;
    }
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function $236410067f5dcdea$var$isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
class $236410067f5dcdea$export$f9de6ca0bc043724 extends (0, $58e920d552c288a7$export$4293555f241ae35a) {
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */ add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_EVENT;
            if (isBinaryEvent || packet.type === $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_ACK) {
                packet.type = isBinaryEvent ? $236410067f5dcdea$export$84d4095e16c6fc19.EVENT : $236410067f5dcdea$export$84d4095e16c6fc19.ACK;
                // binary packet's json
                this.reconstructor = new $236410067f5dcdea$var$BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) super.emitReserved("decoded", packet);
            } else // non-binary full packet
            super.emitReserved("decoded", packet);
        } else if ((0, $d4b37f9ef97d3041$export$37488ff1135b1696)(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        } else throw new Error("Unknown type: " + obj);
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */ decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0))
        };
        if ($236410067f5dcdea$export$84d4095e16c6fc19[p.type] === undefined) throw new Error("unknown packet type " + p.type);
        // look up attachments if type binary
        if (p.type === $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_EVENT || p.type === $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_ACK) {
            const start = i + 1;
            while(str.charAt(++i) !== "-" && i != str.length);
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") throw new Error("Illegal attachments");
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if ("," === c) break;
                if (i === str.length) break;
            }
            p.nsp = str.substring(start, i);
        } else p.nsp = "/";
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length) break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if ($236410067f5dcdea$export$f9de6ca0bc043724.isPayloadValid(p.type, payload)) p.data = payload;
            else throw new Error("invalid payload");
        }
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        } catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch(type){
            case $236410067f5dcdea$export$84d4095e16c6fc19.CONNECT:
                return $236410067f5dcdea$var$isObject(payload);
            case $236410067f5dcdea$export$84d4095e16c6fc19.DISCONNECT:
                return payload === undefined;
            case $236410067f5dcdea$export$84d4095e16c6fc19.CONNECT_ERROR:
                return typeof payload === "string" || $236410067f5dcdea$var$isObject(payload);
            case $236410067f5dcdea$export$84d4095e16c6fc19.EVENT:
            case $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_EVENT:
                return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && $236410067f5dcdea$var$RESERVED_EVENTS.indexOf(payload[0]) === -1);
            case $236410067f5dcdea$export$84d4095e16c6fc19.ACK:
            case $236410067f5dcdea$export$84d4095e16c6fc19.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */ destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */ constructor(reviver){
        super();
        this.reviver = reviver;
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */ class $236410067f5dcdea$var$BinaryReconstructor {
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */ takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0, $c960a3fa1dcf2c22$export$a00da3b1ec037a04)(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */ finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
    constructor(packet){
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
}


function $3f66244de16c9c94$export$af631764ddc44097(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}



/**
 * Internal events.
 * These events can't be emitted by the user.
 */ const $e9edd5632a587b60$var$RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
});
class $e9edd5632a587b60$export$4798917dbf149b79 extends (0, $58e920d552c288a7$export$4293555f241ae35a) {
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */ get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */ subEvents() {
        if (this.subs) return;
        const io = this.io;
        this.subs = [
            (0, $3f66244de16c9c94$export$af631764ddc44097)(io, "open", this.onopen.bind(this)),
            (0, $3f66244de16c9c94$export$af631764ddc44097)(io, "packet", this.onpacket.bind(this)),
            (0, $3f66244de16c9c94$export$af631764ddc44097)(io, "error", this.onerror.bind(this)),
            (0, $3f66244de16c9c94$export$af631764ddc44097)(io, "close", this.onclose.bind(this))
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */ get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */ connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open
        if ("open" === this.io._readyState) this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */ open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */ send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */ emit(ev, ...args) {
        if ($e9edd5632a587b60$var$RESERVED_EVENTS.hasOwnProperty(ev)) throw new Error('"' + ev.toString() + '" is a reserved event name');
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: (0, $236410067f5dcdea$export$84d4095e16c6fc19).EVENT,
            data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) ;
        else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        } else this.sendBuffer.push(packet);
        this.flags = {};
        return this;
    }
    /**
     * @private
     */ _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(()=>{
            delete this.acks[id];
            for(let i = 0; i < this.sendBuffer.length; i++)if (this.sendBuffer[i].id === id) this.sendBuffer.splice(i, 1);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        const fn = (...args)=>{
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, args);
        };
        fn.withError = true;
        this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */ emitWithAck(ev, ...args) {
        return new Promise((resolve, reject)=>{
            const fn = (arg1, arg2)=>{
                return arg1 ? reject(arg1) : resolve(arg2);
            };
            fn.withError = true;
            args.push(fn);
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */ _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") ack = args.pop();
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args: args,
            flags: Object.assign({
                fromQueue: true
            }, this.flags)
        };
        args.push((err, ...responseArgs)=>{
            if (packet !== this._queue[0]) // the packet has already been acknowledged
            return;
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) ack(err);
                }
            } else {
                this._queue.shift();
                if (ack) ack(null, ...responseArgs);
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */ _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) return;
        const packet = this._queue[0];
        if (packet.pending && !force) return;
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */ packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */ onopen() {
        if (typeof this.auth == "function") this.auth((data)=>{
            this._sendConnectPacket(data);
        });
        else this._sendConnectPacket(this.auth);
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */ _sendConnectPacket(data) {
        this.packet({
            type: (0, $236410067f5dcdea$export$84d4095e16c6fc19).CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, data) : data
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */ onerror(err) {
        if (!this.connected) this.emitReserved("connect_error", err);
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */ onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
        this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */ _clearAcks() {
        Object.keys(this.acks).forEach((id)=>{
            const isBuffered = this.sendBuffer.some((packet)=>String(packet.id) === id);
            if (!isBuffered) {
                // note: handlers that do not accept an error as first argument are ignored here
                const ack = this.acks[id];
                delete this.acks[id];
                if (ack.withError) ack.call(this, new Error("socket has been disconnected"));
            }
        });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */ onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;
        switch(packet.type){
            case (0, $236410067f5dcdea$export$84d4095e16c6fc19).CONNECT:
                if (packet.data && packet.data.sid) this.onconnect(packet.data.sid, packet.data.pid);
                else this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                break;
            case (0, $236410067f5dcdea$export$84d4095e16c6fc19).EVENT:
            case (0, $236410067f5dcdea$export$84d4095e16c6fc19).BINARY_EVENT:
                this.onevent(packet);
                break;
            case (0, $236410067f5dcdea$export$84d4095e16c6fc19).ACK:
            case (0, $236410067f5dcdea$export$84d4095e16c6fc19).BINARY_ACK:
                this.onack(packet);
                break;
            case (0, $236410067f5dcdea$export$84d4095e16c6fc19).DISCONNECT:
                this.ondisconnect();
                break;
            case (0, $236410067f5dcdea$export$84d4095e16c6fc19).CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */ onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) args.push(this.ack(packet.id));
        if (this.connected) this.emitEvent(args);
        else this.receiveBuffer.push(Object.freeze(args));
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners)listener.apply(this, args);
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") this._lastOffset = args[args.length - 1];
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */ ack(id) {
        const self = this;
        let sent = false;
        return function(...args) {
            // prevent double callbacks
            if (sent) return;
            sent = true;
            self.packet({
                type: (0, $236410067f5dcdea$export$84d4095e16c6fc19).ACK,
                id: id,
                data: args
            });
        };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */ onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack !== "function") return;
        delete this.acks[packet.id];
        // @ts-ignore FIXME ack is incorrectly inferred as 'never'
        if (ack.withError) packet.data.unshift(null);
        // @ts-ignore
        ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */ onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */ emitBuffered() {
        this.receiveBuffer.forEach((args)=>this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet)=>{
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */ ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */ destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy)=>subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */ disconnect() {
        if (this.connected) this.packet({
            type: (0, $236410067f5dcdea$export$84d4095e16c6fc19).DISCONNECT
        });
        // remove socket from pool
        this.destroy();
        if (this.connected) // fire events
        this.onclose("io client disconnect");
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */ close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */ compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */ get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */ timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */ onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */ prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */ offAny(listener) {
        if (!this._anyListeners) return this;
        if (listener) {
            const listeners = this._anyListeners;
            for(let i = 0; i < listeners.length; i++)if (listener === listeners[i]) {
                listeners.splice(i, 1);
                return this;
            }
        } else this._anyListeners = [];
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */ offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) return this;
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for(let i = 0; i < listeners.length; i++)if (listener === listeners[i]) {
                listeners.splice(i, 1);
                return this;
            }
        } else this._anyOutgoingListeners = [];
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */ notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners)listener.apply(this, packet.data);
        }
    }
    /**
     * `Socket` constructor.
     */ constructor(io, nsp, opts){
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */ this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */ this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */ this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */ this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */ this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */ this._queueSeq = 0;
        this.ids = 0;
        /**
         * A map containing acknowledgement handlers.
         *
         * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
         *
         * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
         * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
         * - `const value = await socket.emitWithAck("test")`
         *
         * From those that don't:
         *
         * - `socket.emit("test", (value) => { ... });`
         *
         * In the first case, the handlers will be called with an error when:
         *
         * - the timeout is reached
         * - the socket gets disconnected
         *
         * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
         * an acknowledgement from the server.
         *
         * @private
         */ this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) this.auth = opts.auth;
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect) this.open();
    }
}




/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */ function $c173d8446437fcb6$export$2d38012449449c89(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */ $c173d8446437fcb6$export$2d38012449449c89.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */ $c173d8446437fcb6$export$2d38012449449c89.prototype.reset = function() {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */ $c173d8446437fcb6$export$2d38012449449c89.prototype.setMin = function(min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */ $c173d8446437fcb6$export$2d38012449449c89.prototype.setMax = function(max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */ $c173d8446437fcb6$export$2d38012449449c89.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
};



class $e34b8786ac168dc3$export$d0d38e7dec7a1a61 extends (0, $58e920d552c288a7$export$4293555f241ae35a) {
    reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 || _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 || _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 || _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */ maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) // keeps reconnection from firing twice for the same reconnection loop
        this.reconnect();
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */ open(fn) {
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new (0, $867b20e8b99073f1$export$4798917dbf149b79)(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0, $3f66244de16c9c94$export$af631764ddc44097)(socket, "open", function() {
            self.onopen();
            fn && fn();
        });
        const onError = (err)=>{
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) fn(err);
            else // Only do this if there is no fn to handle the error
            this.maybeReconnectOnOpen();
        };
        // emit `error`
        const errorSub = (0, $3f66244de16c9c94$export$af631764ddc44097)(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            // set timer
            const timer = this.setTimeoutFn(()=>{
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) timer.unref();
            this.subs.push(()=>{
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */ connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */ onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0, $3f66244de16c9c94$export$af631764ddc44097)(socket, "ping", this.onping.bind(this)), (0, $3f66244de16c9c94$export$af631764ddc44097)(socket, "data", this.ondata.bind(this)), (0, $3f66244de16c9c94$export$af631764ddc44097)(socket, "error", this.onerror.bind(this)), (0, $3f66244de16c9c94$export$af631764ddc44097)(socket, "close", this.onclose.bind(this)), (0, $3f66244de16c9c94$export$af631764ddc44097)(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */ onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */ ondata(data) {
        try {
            this.decoder.add(data);
        } catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */ ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        (0, $f71d65a00e29bc63$export$bdd553fddd433dcb)(()=>{
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */ onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */ socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new (0, $e9edd5632a587b60$export$4798917dbf149b79)(this, nsp, opts);
            this.nsps[nsp] = socket;
        } else if (this._autoConnect && !socket.active) socket.connect();
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */ _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps){
            const socket = this.nsps[nsp];
            if (socket.active) return;
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */ _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for(let i = 0; i < encodedPackets.length; i++)this.engine.write(encodedPackets[i], packet.options);
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */ cleanup() {
        this.subs.forEach((subDestroy)=>subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */ _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine) this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */ disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */ onclose(reason, description) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) this.reconnect();
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */ reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        } else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(()=>{
                if (self.skipReconnect) return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect) return;
                self.open((err)=>{
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    } else self.onreconnect();
                });
            }, delay);
            if (this.opts.autoUnref) timer.unref();
            this.subs.push(()=>{
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */ onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
    constructor(uri, opts){
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0, $3e8d861dbfe4f59b$export$2f67576668b97183)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new (0, $c173d8446437fcb6$export$2d38012449449c89)({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || $236410067f5dcdea$exports;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect) this.open();
    }
}




/**
 * Managers cache.
 */ const $febebd5f7cf0d49e$var$cache = {};
function $febebd5f7cf0d49e$export$841407ceb083bd74(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0, $b922b0cf44a155a0$export$128fa18b7194ef)(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = $febebd5f7cf0d49e$var$cache[id] && path in $febebd5f7cf0d49e$var$cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) io = new (0, $e34b8786ac168dc3$export$d0d38e7dec7a1a61)(source, opts);
    else {
        if (!$febebd5f7cf0d49e$var$cache[id]) $febebd5f7cf0d49e$var$cache[id] = new (0, $e34b8786ac168dc3$export$d0d38e7dec7a1a61)(source, opts);
        io = $febebd5f7cf0d49e$var$cache[id];
    }
    if (parsed.query && !opts.query) opts.query = parsed.queryKey;
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign($febebd5f7cf0d49e$export$841407ceb083bd74, {
    Manager: $e34b8786ac168dc3$export$d0d38e7dec7a1a61,
    Socket: $e9edd5632a587b60$export$4798917dbf149b79,
    io: $febebd5f7cf0d49e$export$841407ceb083bd74,
    connect: $febebd5f7cf0d49e$export$841407ceb083bd74
});


class $beaab1d07f8f12b5$export$4798917dbf149b79 extends (0, $1dadf489fed5c254$exports.EventEmitter) {
    async start(id, token) {
        return new Promise((resolve, reject)=>{
            let isResolved = false;
            if (this._clientType === "websocket") {
                resolve();
                this._id = id;
            }
            if (!!this._websocket || !this._disconnected || !!this._socketio) return;
            if (this._clientType === "websocket") {
                const wsUrl = `${this._baseWebSocketUrl}&id=${id}&token=${token}`;
                this._websocket = new WebSocket(wsUrl + "&version=" + (0, $f9c7f0b8b7b4c284$exports.version));
            } else this._socketio = (0, $febebd5f7cf0d49e$export$841407ceb083bd74)(this._baseSocketioUrl + "/peerjs", {
                query: {
                    ...this._baseSocketioQueryParams,
                    token: token,
                    version: $f9c7f0b8b7b4c284$exports.version
                }
            });
            this._disconnected = false;
            if (this._clientType === "websocket") {
                this._websocket.onmessage = (event)=>{
                    let data;
                    try {
                        data = JSON.parse(event.data);
                        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Server message received:", data);
                    } catch (e) {
                        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Invalid server message", event.data);
                        return;
                    }
                    this.emit((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Message, data);
                };
                this._websocket.onclose = (event)=>{
                    if (this._disconnected) return;
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Socket closed.", event);
                    this._cleanup();
                    this._disconnected = true;
                    this.emit((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Disconnected);
                    if (!isResolved) {
                        reject("WebSocket connection closed");
                        isResolved = true;
                    }
                };
                // Take care of the queue of connections if necessary and make sure Peer knows
                // socket is open.
                this._websocket.onopen = ()=>{
                    if (this._disconnected) return;
                    this._sendQueuedMessages();
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Socket open");
                    this._scheduleHeartbeat();
                    if (!isResolved) {
                        resolve();
                        isResolved = true;
                    }
                };
            } else {
                this._socketio.on("message", (data)=>{
                    try {
                        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Server message received:", data);
                    } catch (e) {
                        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Invalid server message", data);
                        return;
                    }
                    this.emit((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Message, data);
                });
                this._socketio.on("disconnect", (reason)=>{
                    if (this._disconnected) return;
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Socket closed.", reason);
                    this._cleanup();
                    this._disconnected = true;
                    this.emit((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Disconnected);
                    if (!isResolved) {
                        reject(reason);
                        isResolved = true;
                    }
                });
                this._socketio.on("connect", ()=>{
                    this._id = this._socketio.id;
                    if (this._disconnected) return;
                    this._sendQueuedMessages();
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Socket open");
                    if (!isResolved) {
                        resolve();
                        isResolved = true;
                    }
                });
            }
        });
    }
    _scheduleHeartbeat() {
        this._wsPingTimer = setTimeout(()=>{
            this._sendHeartbeat();
        }, this.pingInterval);
    }
    _sendHeartbeat() {
        if (!this._wsOpen()) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Cannot send heartbeat, because socket closed`);
            return;
        }
        const message = {
            type: (0, $c6218548eff1f889$export$adb4a1754da6f10d).Heartbeat
        };
        if (this._clientType === "websocket") {
            this._websocket.send(JSON.stringify(message));
            this._scheduleHeartbeat();
        }
    }
    /** Is the websocket currently open? */ _wsOpen() {
        if (this._clientType === "websocket") return !!this._websocket && this._websocket.readyState === WebSocket.OPEN;
        else return !!this._socketio && this._socketio.connected;
    }
    /** Send queued messages. */ _sendQueuedMessages() {
        //Create copy of queue and clear it,
        //because send method push the message back to queue if smth will go wrong
        const copiedQueue = [
            ...this._messagesQueue
        ];
        this._messagesQueue = [];
        for (const message of copiedQueue)this.send(message);
    }
    /** Exposed send for DC & Peer. */ send(data) {
        if (this._disconnected) return;
        // If we didn't get an ID yet, we can't yet send anything so we should queue
        // up these messages.
        if (!this._id) {
            this._messagesQueue.push(data);
            return;
        }
        if (!data.type) {
            this.emit((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Error, "Invalid message");
            return;
        }
        if (!this._wsOpen()) return;
        if (this._clientType === "websocket") {
            const message = JSON.stringify(data);
            this._websocket.send(message);
        } else this._socketio.emit("message", data);
    }
    close() {
        if (this._disconnected) return;
        this._cleanup();
        this._disconnected = true;
    }
    _cleanup() {
        if (this._clientType === "websocket") {
            if (this._websocket) {
                this._websocket.onopen = this._websocket.onmessage = this._websocket.onclose = null;
                this._websocket.close();
                this._websocket = undefined;
            }
        } else if (this._socketio) {
            this._socketio.off("connect");
            this._socketio.off("message");
            this._socketio.off("disconnect");
            this._socketio.close();
            this._socketio = undefined;
        }
        clearTimeout(this._wsPingTimer);
    }
    constructor(secure, host, port, path, key, clientType, pingInterval = 5000){
        super();
        this.pingInterval = pingInterval;
        this._disconnected = true;
        this._messagesQueue = [];
        this._clientType = "websocket";
        const wsProtocol = secure ? "wss://" : "ws://";
        this._baseWebSocketUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
        this._baseSocketioUrl = wsProtocol + host + ":" + port;
        this._baseSocketioQueryParams = {
            key: key
        };
        this._clientType = clientType;
    }
}






class $e9b5d17f4528ee98$export$89e6bb5ad64bf4a {
    /** Returns a PeerConnection object set up correctly (for data, media). */ startConnection(options) {
        const peerConnection = this._startPeerConnection();
        // Set the connection's PC.
        this.connection.peerConnection = peerConnection;
        if (this.connection.type === (0, $c6218548eff1f889$export$3157d57b4135e3bc).Media && options._stream) this._addTracksToConnection(options._stream, peerConnection);
        // What do we need to do now?
        if (options.originator) {
            const dataConnection = this.connection;
            const config = {
                ordered: !!options.reliable
            };
            const dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
            dataConnection._initializeDataChannel(dataChannel);
            this._makeOffer();
        } else this.handleSDP("OFFER", options.sdp);
    }
    /** Start a PC. */ _startPeerConnection() {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Creating RTCPeerConnection.");
        const peerConnection = new RTCPeerConnection(this.connection.provider.options.config);
        this._setupListeners(peerConnection);
        return peerConnection;
    }
    /** Set up various WebRTC listeners. */ _setupListeners(peerConnection) {
        const peerId = this.connection.peer;
        const connectionId = this.connection.connectionId;
        const connectionType = this.connection.type;
        const provider = this.connection.provider;
        // ICE CANDIDATES.
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Listening for ICE candidates.");
        peerConnection.onicecandidate = (evt)=>{
            if (!evt.candidate || !evt.candidate.candidate) return;
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Received ICE candidates for ${peerId}:`, evt.candidate);
            provider.socket.send({
                type: (0, $c6218548eff1f889$export$adb4a1754da6f10d).Candidate,
                payload: {
                    candidate: evt.candidate,
                    type: connectionType,
                    connectionId: connectionId
                },
                dst: peerId
            });
        };
        peerConnection.oniceconnectionstatechange = ()=>{
            switch(peerConnection.iceConnectionState){
                case "failed":
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("iceConnectionState is failed, closing connections to " + peerId);
                    this.connection.emitError((0, $c6218548eff1f889$export$7974935686149686).NegotiationFailed, "Negotiation of connection to " + peerId + " failed.");
                    this.connection.close();
                    break;
                case "closed":
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("iceConnectionState is closed, closing connections to " + peerId);
                    this.connection.emitError((0, $c6218548eff1f889$export$7974935686149686).ConnectionClosed, "Connection to " + peerId + " closed.");
                    this.connection.close();
                    break;
                case "disconnected":
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("iceConnectionState changed to disconnected on the connection with " + peerId);
                    break;
                case "completed":
                    peerConnection.onicecandidate = ()=>{};
                    break;
            }
            this.connection.emit("iceStateChanged", peerConnection.iceConnectionState);
        };
        // DATACONNECTION.
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Listening for data channel");
        // Fired between offer and answer, so options should already be saved
        // in the options hash.
        peerConnection.ondatachannel = (evt)=>{
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Received data channel");
            const dataChannel = evt.channel;
            const connection = provider.getConnection(peerId, connectionId);
            connection._initializeDataChannel(dataChannel);
        };
        // MEDIACONNECTION.
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Listening for remote stream");
        peerConnection.ontrack = (evt)=>{
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Received remote stream");
            const stream = evt.streams[0];
            const connection = provider.getConnection(peerId, connectionId);
            if (connection.type === (0, $c6218548eff1f889$export$3157d57b4135e3bc).Media) {
                const mediaConnection = connection;
                this._addStreamToMediaConnection(stream, mediaConnection);
            }
        };
    }
    cleanup() {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Cleaning up PeerConnection to " + this.connection.peer);
        const peerConnection = this.connection.peerConnection;
        if (!peerConnection) return;
        this.connection.peerConnection = null;
        //unsubscribe from all PeerConnection's events
        peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = ()=>{};
        const peerConnectionNotClosed = peerConnection.signalingState !== "closed";
        let dataChannelNotClosed = false;
        const dataChannel = this.connection.dataChannel;
        if (dataChannel) dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
        if (peerConnectionNotClosed || dataChannelNotClosed) peerConnection.close();
    }
    async _makeOffer() {
        const peerConnection = this.connection.peerConnection;
        const provider = this.connection.provider;
        try {
            const offer = await peerConnection.createOffer(this.connection.options.constraints);
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Created offer.");
            if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
            try {
                await peerConnection.setLocalDescription(offer);
                (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Set localDescription:", offer, `for:${this.connection.peer}`);
                let payload = {
                    sdp: offer,
                    type: this.connection.type,
                    connectionId: this.connection.connectionId,
                    metadata: this.connection.metadata
                };
                if (this.connection.type === (0, $c6218548eff1f889$export$3157d57b4135e3bc).Data) {
                    const dataConnection = this.connection;
                    payload = {
                        ...payload,
                        label: dataConnection.label,
                        reliable: dataConnection.reliable,
                        serialization: dataConnection.serialization
                    };
                }
                provider.socket.send({
                    type: (0, $c6218548eff1f889$export$adb4a1754da6f10d).Offer,
                    payload: payload,
                    dst: this.connection.peer
                });
            } catch (err) {
                // TODO: investigate why _makeOffer is being called from the answer
                if (err != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
                    provider.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).WebRTC, err);
                    (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Failed to setLocalDescription, ", err);
                }
            }
        } catch (err_1) {
            provider.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).WebRTC, err_1);
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Failed to createOffer, ", err_1);
        }
    }
    async _makeAnswer() {
        const peerConnection = this.connection.peerConnection;
        const provider = this.connection.provider;
        try {
            const answer = await peerConnection.createAnswer();
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Created answer.");
            if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
            try {
                await peerConnection.setLocalDescription(answer);
                (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Set localDescription:`, answer, `for:${this.connection.peer}`);
                provider.socket.send({
                    type: (0, $c6218548eff1f889$export$adb4a1754da6f10d).Answer,
                    payload: {
                        sdp: answer,
                        type: this.connection.type,
                        connectionId: this.connection.connectionId
                    },
                    dst: this.connection.peer
                });
            } catch (err) {
                provider.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).WebRTC, err);
                (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Failed to setLocalDescription, ", err);
            }
        } catch (err_1) {
            provider.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).WebRTC, err_1);
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Failed to create answer, ", err_1);
        }
    }
    /** Handle an SDP. */ async handleSDP(type, sdp) {
        sdp = new RTCSessionDescription(sdp);
        const peerConnection = this.connection.peerConnection;
        const provider = this.connection.provider;
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Setting remote description", sdp);
        const self = this;
        try {
            await peerConnection.setRemoteDescription(sdp);
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Set remoteDescription:${type} for:${this.connection.peer}`);
            if (type === "OFFER") await self._makeAnswer();
        } catch (err) {
            provider.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).WebRTC, err);
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Failed to setRemoteDescription, ", err);
        }
    }
    /** Handle a candidate. */ async handleCandidate(ice) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`handleCandidate:`, ice);
        try {
            await this.connection.peerConnection.addIceCandidate(ice);
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Added ICE candidate for:${this.connection.peer}`);
        } catch (err) {
            this.connection.provider.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).WebRTC, err);
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Failed to handleCandidate, ", err);
        }
    }
    _addTracksToConnection(stream, peerConnection) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`add tracks from stream ${stream.id} to peer connection`);
        if (!peerConnection.addTrack) return (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error(`Your browser does't support RTCPeerConnection#addTrack. Ignored.`);
        stream.getTracks().forEach((track)=>{
            peerConnection.addTrack(track, stream);
        });
    }
    _addStreamToMediaConnection(stream, mediaConnection) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`add stream ${stream.id} to media connection ${mediaConnection.connectionId}`);
        mediaConnection.addStream(stream);
    }
    constructor(connection){
        this.connection = connection;
    }
}





class $42e4b71328041e53$export$6a678e589c8a4542 extends (0, $1dadf489fed5c254$exports.EventEmitter) {
    /**
	 * Emits a typed error message.
	 *
	 * @internal
	 */ emitError(type, err) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error("Error:", err);
        // @ts-ignore
        this.emit("error", new $42e4b71328041e53$export$98871882f492de82(`${type}`, err));
    }
}
class $42e4b71328041e53$export$98871882f492de82 extends Error {
    /**
	 * @internal
	 */ constructor(type, err){
        if (typeof err === "string") super(err);
        else {
            super();
            Object.assign(this, err);
        }
        this.type = type;
    }
}


class $c18715a335e60dd3$export$23a2a68283c24d80 extends (0, $42e4b71328041e53$export$6a678e589c8a4542) {
    /**
	 * Whether the media connection is active (e.g. your call has been answered).
	 * You can check this if you want to set a maximum wait time for a one-sided call.
	 */ get open() {
        return this._open;
    }
    constructor(/**
		 * The ID of the peer on the other end of this connection.
		 */ peer, provider, options){
        super();
        this.peer = peer;
        this.provider = provider;
        this.options = options;
        this._open = false;
        this.metadata = options.metadata;
    }
}


class $548df18aef40ce70$export$4a84e95a2324ac29 extends (0, $c18715a335e60dd3$export$23a2a68283c24d80) {
    /**
	 * For media connections, this is always 'media'.
	 */ get type() {
        return (0, $c6218548eff1f889$export$3157d57b4135e3bc).Media;
    }
    get localStream() {
        return this._localStream;
    }
    get remoteStream() {
        return this._remoteStream;
    }
    /** Called by the Negotiator when the DataChannel is ready. */ _initializeDataChannel(dc) {
        this.dataChannel = dc;
        this.dataChannel.onopen = ()=>{
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`DC#${this.connectionId} dc connection success`);
            this.emit("willCloseOnRemote");
        };
        this.dataChannel.onclose = ()=>{
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`DC#${this.connectionId} dc closed for:`, this.peer);
            this.close();
        };
    }
    addStream(remoteStream) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("Receiving stream", remoteStream);
        this._remoteStream = remoteStream;
        super.emit("stream", remoteStream); // Should we call this `open`?
    }
    /**
	 * @internal
	 */ handleMessage(message) {
        const type = message.type;
        const payload = message.payload;
        switch(message.type){
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Answer:
                // Forward to negotiator
                this._negotiator.handleSDP(type, payload.sdp);
                this._open = true;
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Candidate:
                this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn(`Unrecognized message type:${type} from peer:${this.peer}`);
                break;
        }
    }
    /**
     * When receiving a {@apilink PeerEvents | `call`} event on a peer, you can call
     * `answer` on the media connection provided by the callback to accept the call
     * and optionally send your own media stream.

     *
     * @param stream A WebRTC media stream.
     * @param options
     * @returns
     */ answer(stream, options = {}) {
        if (this._localStream) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
            return;
        }
        this._localStream = stream;
        if (options && options.sdpTransform) this.options.sdpTransform = options.sdpTransform;
        this._negotiator.startConnection({
            ...this.options._payload,
            _stream: stream
        });
        // Retrieve lost messages stored because PeerConnection not set up.
        const messages = this.provider._getMessages(this.connectionId);
        for (const message of messages)this.handleMessage(message);
        this._open = true;
    }
    /**
	 * Exposed functionality for users.
	 */ /**
	 * Closes the media connection.
	 */ close() {
        if (this._negotiator) {
            this._negotiator.cleanup();
            this._negotiator = null;
        }
        this._localStream = null;
        this._remoteStream = null;
        if (this.provider) {
            this.provider._removeConnection(this);
            this.provider = null;
        }
        if (this.options && this.options._stream) this.options._stream = null;
        if (!this.open) return;
        this._open = false;
        super.emit("close");
    }
    constructor(peerId, provider, options){
        super(peerId, provider, options);
        this._localStream = this.options._stream;
        this.connectionId = this.options.connectionId || $548df18aef40ce70$export$4a84e95a2324ac29.ID_PREFIX + (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).randomToken();
        this._negotiator = new (0, $e9b5d17f4528ee98$export$89e6bb5ad64bf4a)(this);
        if (this._localStream) this._negotiator.startConnection({
            _stream: this._localStream,
            originator: true
        });
    }
}
$548df18aef40ce70$export$4a84e95a2324ac29.ID_PREFIX = "mc_";






class $1b84fdaf43c333a3$export$2c4e825dc9120f87 {
    _buildRequest(method) {
        const protocol = this._options.secure ? "https" : "http";
        const { host: host, port: port, path: path, key: key } = this._options;
        const url = new URL(`${protocol}://${host}:${port}${path}${key}/${method}`);
        // TODO: Why timestamp, why random?
        url.searchParams.set("ts", `${Date.now()}${Math.random()}`);
        url.searchParams.set("version", (0, $f9c7f0b8b7b4c284$exports.version));
        return fetch(url.href, {
            referrerPolicy: this._options.referrerPolicy
        });
    }
    /** Get a unique ID from the server via XHR and initialize with it. */ async retrieveId() {
        try {
            const response = await this._buildRequest("id");
            if (response.status !== 200) throw new Error(`Error. Status:${response.status}`);
            return response.text();
        } catch (error) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error("Error retrieving ID", error);
            let pathError = "";
            if (this._options.path === "/" && this._options.host !== (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).CLOUD_HOST) pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
            throw new Error("Could not get an ID from the server." + pathError);
        }
    }
    /** @deprecated */ async listAllPeers() {
        try {
            const response = await this._buildRequest("peers");
            if (response.status !== 200) {
                if (response.status === 401) {
                    let helpfulError = "";
                    if (this._options.host === (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).CLOUD_HOST) helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";
                    else helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
                    throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
                }
                throw new Error(`Error. Status:${response.status}`);
            }
            return response.json();
        } catch (error) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error("Error retrieving list peers", error);
            throw new Error("Could not get list peers from the server." + error);
        }
    }
    constructor(_options){
        this._options = _options;
    }
}











class $7635d8e6993b4143$export$d365f7ad9d7df9c9 extends (0, $c18715a335e60dd3$export$23a2a68283c24d80) {
    get type() {
        return (0, $c6218548eff1f889$export$3157d57b4135e3bc).Data;
    }
    parseMaximumSize(description) {
        const remoteLines = description?.sdp?.split("\r\n") ?? [];
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("peerDescription\n" + remoteLines);
        let remoteMaximumSize = 0;
        for (const line of remoteLines)if (line.startsWith("a=max-message-size:")) {
            const string = line.substring(19);
            remoteMaximumSize = parseInt(string, 10);
            break;
        }
        if (remoteMaximumSize === 0) (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log("SENDER: No max message size session description");
        // 16 kb should be supported on all clients so we can use it
        // even if no max message is set
        return Math.max(remoteMaximumSize, new (0, $351d3c8bb83bcec5$export$f1c5f4c9cb95390b)().chunkedMTU);
    }
    async updateMaximumMessageSize() {
        const local = await this.peerConnection.localDescription;
        const remote = await this.peerConnection.remoteDescription;
        const localMaximumSize = this.parseMaximumSize(local);
        const remoteMaximumSize = this.parseMaximumSize(remote);
        this.messageSize = Math.min(localMaximumSize, remoteMaximumSize);
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`SENDER: Updated max message size: ${this.messageSize} Local: ${localMaximumSize} Remote: ${remoteMaximumSize}`);
    }
    /** Called by the Negotiator when the DataChannel is ready. */ _initializeDataChannel(dc) {
        this.dataChannel = dc;
        this.dataChannel.onopen = async ()=>{
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`DC#${this.connectionId} dc connection success`);
            this._open = true;
            await this.updateMaximumMessageSize();
            this.emit("open");
        };
        this.dataChannel.onmessage = (e)=>{
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`DC#${this.connectionId} dc onmessage:`, e.data);
        // this._handleDataMessage(e);
        };
        this.dataChannel.onclose = ()=>{
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`DC#${this.connectionId} dc closed for:`, this.peer);
            this.close();
        };
    }
    /**
	 * Exposed functionality for users.
	 */ /** Allows user to close connection. */ close(options) {
        if (options?.flush) {
            this.send({
                __peerData: {
                    type: "close"
                }
            });
            return;
        }
        if (this._negotiator) {
            this._negotiator.cleanup();
            this._negotiator = null;
        }
        if (this.provider) {
            this.provider._removeConnection(this);
            this.provider = null;
        }
        if (this.dataChannel) {
            this.dataChannel.onopen = null;
            this.dataChannel.onmessage = null;
            this.dataChannel.onclose = null;
            this.dataChannel = null;
        }
        if (!this.open) return;
        this._open = false;
        super.emit("close");
    }
    /** Allows user to send data. */ send(data, chunked = false) {
        if (!this.open) {
            this.emitError((0, $c6218548eff1f889$export$49ae800c114df41d).NotOpenYet, "Connection is not open. You should listen for the `open` event before sending messages.");
            return;
        }
        return this._send(data, chunked);
    }
    async handleMessage(message) {
        const payload = message.payload;
        switch(message.type){
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Answer:
                await this._negotiator.handleSDP(message.type, payload.sdp);
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Candidate:
                await this._negotiator.handleCandidate(payload.candidate);
                break;
            default:
                (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn("Unrecognized message type:", message.type, "from peer:", this.peer);
                break;
        }
    }
    constructor(peerId, provider, options){
        super(peerId, provider, options);
        this.messageSize = new (0, $351d3c8bb83bcec5$export$f1c5f4c9cb95390b)().chunkedMTU;
        this.connectionId = this.options.connectionId || $7635d8e6993b4143$export$d365f7ad9d7df9c9.ID_PREFIX + (0, $f9a92468cab27aaf$export$4e61f672936bec77)();
        this.label = this.options.label || this.connectionId;
        this.reliable = !!this.options.reliable;
        this._negotiator = new (0, $e9b5d17f4528ee98$export$89e6bb5ad64bf4a)(this);
        this._negotiator.startConnection(this.options._payload || {
            originator: true,
            reliable: this.reliable
        });
    }
}
$7635d8e6993b4143$export$d365f7ad9d7df9c9.ID_PREFIX = "dc_";
$7635d8e6993b4143$export$d365f7ad9d7df9c9.MAX_BUFFERED_AMOUNT = 8388608;


class $5592ef113ea6fc6a$export$ff7c9d4c11d94e8b extends (0, $7635d8e6993b4143$export$d365f7ad9d7df9c9) {
    get bufferSize() {
        return this._bufferSize;
    }
    _initializeDataChannel(dc) {
        super._initializeDataChannel(dc);
        this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.addEventListener("message", (e)=>this._handleDataMessage(e));
    }
    _bufferedSend(msg) {
        if (this._buffering || !this._trySend(msg)) {
            this._buffer.push(msg);
            this._bufferSize = this._buffer.length;
        }
    }
    // Returns true if the send succeeds.
    _trySend(msg) {
        if (!this.open) return false;
        if (this.dataChannel.bufferedAmount > (0, $7635d8e6993b4143$export$d365f7ad9d7df9c9).MAX_BUFFERED_AMOUNT) {
            this._buffering = true;
            setTimeout(()=>{
                this._buffering = false;
                this._tryBuffer();
            }, 50);
            return false;
        }
        try {
            this.dataChannel.send(msg);
        } catch (e) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error(`DC#:${this.connectionId} Error when sending:`, e);
            this._buffering = true;
            this.close();
            return false;
        }
        return true;
    }
    // Try to send the first message in the buffer.
    _tryBuffer() {
        if (!this.open) return;
        if (this._buffer.length === 0) return;
        const msg = this._buffer[0];
        if (this._trySend(msg)) {
            this._buffer.shift();
            this._bufferSize = this._buffer.length;
            this._tryBuffer();
        }
    }
    close(options) {
        if (options?.flush) {
            this.send({
                __peerData: {
                    type: "close"
                }
            });
            return;
        }
        this._buffer = [];
        this._bufferSize = 0;
        super.close();
    }
    constructor(...args){
        super(...args);
        this._buffer = [];
        this._bufferSize = 0;
        this._buffering = false;
    }
}




function $db36bd6aec32319c$export$78406e843f5312da(byte) {
    return "".concat(byte < 0 ? "-" : "", "0x").concat(Math.abs(byte).toString(16).padStart(2, "0"));
}


// ExtensionCodec to handle MessagePack extensions
/**
 * ExtData is used to handle Extension Types that are not registered to ExtensionCodec.
 */ var $4229fcda2647cfe5$export$bcbeb236456bc779 = /** @class */ function() {
    function ExtData(type, data) {
        this.type = type;
        this.data = data;
    }
    return ExtData;
}();


// https://github.com/msgpack/msgpack/blob/master/spec.md#timestamp-extension-type
var $c021f3f9e0eb4669$var$__extends = undefined && undefined.__extends || function() {
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var $c021f3f9e0eb4669$export$ef3eed12d06c0285 = /** @class */ function(_super) {
    $c021f3f9e0eb4669$var$__extends(DecodeError, _super);
    function DecodeError(message) {
        var _this = _super.call(this, message) || this;
        // fix the prototype chain in a cross-platform way
        var proto = Object.create(DecodeError.prototype);
        Object.setPrototypeOf(_this, proto);
        Object.defineProperty(_this, "name", {
            configurable: true,
            enumerable: false,
            value: DecodeError.name
        });
        return _this;
    }
    return DecodeError;
}(Error);


// Integer Utility
var $57f37663ea6db2c7$export$3314b2c271c86d70 = 4294967295;
function $57f37663ea6db2c7$export$20f71c4c8b0f96c3(view, offset, value) {
    var high = value / 4294967296;
    var low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
function $57f37663ea6db2c7$export$8532a5209571c04a(view, offset, value) {
    var high = Math.floor(value / 4294967296);
    var low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
function $57f37663ea6db2c7$export$69825c7adcc820c6(view, offset) {
    var high = view.getInt32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
}
function $57f37663ea6db2c7$export$59a2dbf579ff9568(view, offset) {
    var high = view.getUint32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
}


var $3eb144fadcdfdb4e$export$f18369fc203f4e13 = -1;
var $3eb144fadcdfdb4e$var$TIMESTAMP32_MAX_SEC = 4294967295; // 32-bit unsigned int
var $3eb144fadcdfdb4e$var$TIMESTAMP64_MAX_SEC = 17179869183; // 34-bit unsigned int
function $3eb144fadcdfdb4e$export$2fd05b828dd81159(_a) {
    var sec = _a.sec, nsec = _a.nsec;
    if (sec >= 0 && nsec >= 0 && sec <= $3eb144fadcdfdb4e$var$TIMESTAMP64_MAX_SEC) {
        // Here sec >= 0 && nsec >= 0
        if (nsec === 0 && sec <= $3eb144fadcdfdb4e$var$TIMESTAMP32_MAX_SEC) {
            // timestamp 32 = { sec32 (unsigned) }
            var rv = new Uint8Array(4);
            var view = new DataView(rv.buffer);
            view.setUint32(0, sec);
            return rv;
        } else {
            // timestamp 64 = { nsec30 (unsigned), sec34 (unsigned) }
            var secHigh = sec / 0x100000000;
            var secLow = sec & 0xffffffff;
            var rv = new Uint8Array(8);
            var view = new DataView(rv.buffer);
            // nsec30 | secHigh2
            view.setUint32(0, nsec << 2 | secHigh & 0x3);
            // secLow32
            view.setUint32(4, secLow);
            return rv;
        }
    } else {
        // timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
        var rv = new Uint8Array(12);
        var view = new DataView(rv.buffer);
        view.setUint32(0, nsec);
        (0, $57f37663ea6db2c7$export$8532a5209571c04a)(view, 4, sec);
        return rv;
    }
}
function $3eb144fadcdfdb4e$export$221d97b3b00b03c2(date) {
    var msec = date.getTime();
    var sec = Math.floor(msec / 1e3);
    var nsec = (msec - sec * 1e3) * 1e6;
    // Normalizes { sec, nsec } to ensure nsec is unsigned.
    var nsecInSec = Math.floor(nsec / 1e9);
    return {
        sec: sec + nsecInSec,
        nsec: nsec - nsecInSec * 1e9
    };
}
function $3eb144fadcdfdb4e$export$32420f352fe0fc83(object) {
    if (object instanceof Date) {
        var timeSpec = $3eb144fadcdfdb4e$export$221d97b3b00b03c2(object);
        return $3eb144fadcdfdb4e$export$2fd05b828dd81159(timeSpec);
    } else return null;
}
function $3eb144fadcdfdb4e$export$abfc8800a5159711(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    // data may be 32, 64, or 96 bits
    switch(data.byteLength){
        case 4:
            // timestamp 32 = { sec32 }
            var sec = view.getUint32(0);
            var nsec = 0;
            return {
                sec: sec,
                nsec: nsec
            };
        case 8:
            // timestamp 64 = { nsec30, sec34 }
            var nsec30AndSecHigh2 = view.getUint32(0);
            var secLow32 = view.getUint32(4);
            var sec = (nsec30AndSecHigh2 & 0x3) * 0x100000000 + secLow32;
            var nsec = nsec30AndSecHigh2 >>> 2;
            return {
                sec: sec,
                nsec: nsec
            };
        case 12:
            // timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
            var sec = (0, $57f37663ea6db2c7$export$69825c7adcc820c6)(view, 4);
            var nsec = view.getUint32(0);
            return {
                sec: sec,
                nsec: nsec
            };
        default:
            throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(data.length));
    }
}
function $3eb144fadcdfdb4e$export$80b8ff9315e4298f(data) {
    var timeSpec = $3eb144fadcdfdb4e$export$abfc8800a5159711(data);
    return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
}
var $3eb144fadcdfdb4e$export$8654479533463da1 = {
    type: $3eb144fadcdfdb4e$export$f18369fc203f4e13,
    encode: $3eb144fadcdfdb4e$export$32420f352fe0fc83,
    decode: $3eb144fadcdfdb4e$export$80b8ff9315e4298f
};


var $3854edd0533193bd$export$12677a794dbd89d7 = /** @class */ function() {
    function ExtensionCodec() {
        // built-in extensions
        this.builtInEncoders = [];
        this.builtInDecoders = [];
        // custom extensions
        this.encoders = [];
        this.decoders = [];
        this.register((0, $3eb144fadcdfdb4e$export$8654479533463da1));
    }
    ExtensionCodec.prototype.register = function(_a) {
        var type = _a.type, encode = _a.encode, decode = _a.decode;
        if (type >= 0) {
            // custom extensions
            this.encoders[type] = encode;
            this.decoders[type] = decode;
        } else {
            // built-in extensions
            var index = 1 + type;
            this.builtInEncoders[index] = encode;
            this.builtInDecoders[index] = decode;
        }
    };
    ExtensionCodec.prototype.tryToEncode = function(object, context) {
        // built-in extensions
        for(var i = 0; i < this.builtInEncoders.length; i++){
            var encodeExt = this.builtInEncoders[i];
            if (encodeExt != null) {
                var data = encodeExt(object, context);
                if (data != null) {
                    var type = -1 - i;
                    return new (0, $4229fcda2647cfe5$export$bcbeb236456bc779)(type, data);
                }
            }
        }
        // custom extensions
        for(var i = 0; i < this.encoders.length; i++){
            var encodeExt = this.encoders[i];
            if (encodeExt != null) {
                var data = encodeExt(object, context);
                if (data != null) {
                    var type = i;
                    return new (0, $4229fcda2647cfe5$export$bcbeb236456bc779)(type, data);
                }
            }
        }
        if (object instanceof (0, $4229fcda2647cfe5$export$bcbeb236456bc779)) // to keep ExtData as is
        return object;
        return null;
    };
    ExtensionCodec.prototype.decode = function(data, type, context) {
        var decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
        if (decodeExt) return decodeExt(data, type, context);
        else // decode() does not fail, returns ExtData instead.
        return new (0, $4229fcda2647cfe5$export$bcbeb236456bc779)(type, data);
    };
    ExtensionCodec.defaultCodec = new ExtensionCodec();
    return ExtensionCodec;
}();





var $757e812703ebe6b4$var$_a, $757e812703ebe6b4$var$_b, $757e812703ebe6b4$var$_c;
var $757e812703ebe6b4$var$TEXT_ENCODING_AVAILABLE = (typeof $933e942aa2823728$exports === "undefined" || (($757e812703ebe6b4$var$_a = $933e942aa2823728$exports === null || $933e942aa2823728$exports === void 0 ? void 0 : $933e942aa2823728$exports.env) === null || $757e812703ebe6b4$var$_a === void 0 ? void 0 : $757e812703ebe6b4$var$_a["TEXT_ENCODING"]) !== "never") && typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined";
function $757e812703ebe6b4$export$b61de95301265227(str) {
    var strLength = str.length;
    var byteLength = 0;
    var pos = 0;
    while(pos < strLength){
        var value = str.charCodeAt(pos++);
        if ((value & 0xffffff80) === 0) {
            // 1-byte
            byteLength++;
            continue;
        } else if ((value & 0xfffff800) === 0) // 2-bytes
        byteLength += 2;
        else {
            // handle surrogate pair
            if (value >= 0xd800 && value <= 0xdbff) // high surrogate
            {
                if (pos < strLength) {
                    var extra = str.charCodeAt(pos);
                    if ((extra & 0xfc00) === 0xdc00) {
                        ++pos;
                        value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                    }
                }
            }
            if ((value & 0xffff0000) === 0) // 3-byte
            byteLength += 3;
            else // 4-byte
            byteLength += 4;
        }
    }
    return byteLength;
}
function $757e812703ebe6b4$export$1042e4338f1ef853(str, output, outputOffset) {
    var strLength = str.length;
    var offset = outputOffset;
    var pos = 0;
    while(pos < strLength){
        var value = str.charCodeAt(pos++);
        if ((value & 0xffffff80) === 0) {
            // 1-byte
            output[offset++] = value;
            continue;
        } else if ((value & 0xfffff800) === 0) // 2-bytes
        output[offset++] = value >> 6 & 0x1f | 0xc0;
        else {
            // handle surrogate pair
            if (value >= 0xd800 && value <= 0xdbff) // high surrogate
            {
                if (pos < strLength) {
                    var extra = str.charCodeAt(pos);
                    if ((extra & 0xfc00) === 0xdc00) {
                        ++pos;
                        value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                    }
                }
            }
            if ((value & 0xffff0000) === 0) {
                // 3-byte
                output[offset++] = value >> 12 & 0x0f | 0xe0;
                output[offset++] = value >> 6 & 0x3f | 0x80;
            } else {
                // 4-byte
                output[offset++] = value >> 18 & 0x07 | 0xf0;
                output[offset++] = value >> 12 & 0x3f | 0x80;
                output[offset++] = value >> 6 & 0x3f | 0x80;
            }
        }
        output[offset++] = value & 0x3f | 0x80;
    }
}
var $757e812703ebe6b4$var$sharedTextEncoder = $757e812703ebe6b4$var$TEXT_ENCODING_AVAILABLE ? new TextEncoder() : undefined;
var $757e812703ebe6b4$export$ed34c0622b397238 = !$757e812703ebe6b4$var$TEXT_ENCODING_AVAILABLE ? (0, $57f37663ea6db2c7$export$3314b2c271c86d70) : typeof $933e942aa2823728$exports !== "undefined" && (($757e812703ebe6b4$var$_b = $933e942aa2823728$exports === null || $933e942aa2823728$exports === void 0 ? void 0 : $933e942aa2823728$exports.env) === null || $757e812703ebe6b4$var$_b === void 0 ? void 0 : $757e812703ebe6b4$var$_b["TEXT_ENCODING"]) !== "force" ? 200 : 0;
function $757e812703ebe6b4$var$utf8EncodeTEencode(str, output, outputOffset) {
    output.set($757e812703ebe6b4$var$sharedTextEncoder.encode(str), outputOffset);
}
function $757e812703ebe6b4$var$utf8EncodeTEencodeInto(str, output, outputOffset) {
    $757e812703ebe6b4$var$sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
var $757e812703ebe6b4$export$34cfdc82d430524 = ($757e812703ebe6b4$var$sharedTextEncoder === null || $757e812703ebe6b4$var$sharedTextEncoder === void 0 ? void 0 : $757e812703ebe6b4$var$sharedTextEncoder.encodeInto) ? $757e812703ebe6b4$var$utf8EncodeTEencodeInto : $757e812703ebe6b4$var$utf8EncodeTEencode;
var $757e812703ebe6b4$var$CHUNK_SIZE = 4096;
function $757e812703ebe6b4$export$551117984c2adf4f(bytes, inputOffset, byteLength) {
    var offset = inputOffset;
    var end = offset + byteLength;
    var units = [];
    var result = "";
    while(offset < end){
        var byte1 = bytes[offset++];
        if ((byte1 & 0x80) === 0) // 1 byte
        units.push(byte1);
        else if ((byte1 & 0xe0) === 0xc0) {
            // 2 bytes
            var byte2 = bytes[offset++] & 0x3f;
            units.push((byte1 & 0x1f) << 6 | byte2);
        } else if ((byte1 & 0xf0) === 0xe0) {
            // 3 bytes
            var byte2 = bytes[offset++] & 0x3f;
            var byte3 = bytes[offset++] & 0x3f;
            units.push((byte1 & 0x1f) << 12 | byte2 << 6 | byte3);
        } else if ((byte1 & 0xf8) === 0xf0) {
            // 4 bytes
            var byte2 = bytes[offset++] & 0x3f;
            var byte3 = bytes[offset++] & 0x3f;
            var byte4 = bytes[offset++] & 0x3f;
            var unit = (byte1 & 0x07) << 0x12 | byte2 << 0x0c | byte3 << 0x06 | byte4;
            if (unit > 0xffff) {
                unit -= 0x10000;
                units.push(unit >>> 10 & 0x3ff | 0xd800);
                unit = 0xdc00 | unit & 0x3ff;
            }
            units.push(unit);
        } else units.push(byte1);
        if (units.length >= $757e812703ebe6b4$var$CHUNK_SIZE) {
            result += String.fromCharCode.apply(String, units);
            units.length = 0;
        }
    }
    if (units.length > 0) result += String.fromCharCode.apply(String, units);
    return result;
}
var $757e812703ebe6b4$var$sharedTextDecoder = $757e812703ebe6b4$var$TEXT_ENCODING_AVAILABLE ? new TextDecoder() : null;
var $757e812703ebe6b4$export$d866281c5a66d1ef = !$757e812703ebe6b4$var$TEXT_ENCODING_AVAILABLE ? (0, $57f37663ea6db2c7$export$3314b2c271c86d70) : typeof $933e942aa2823728$exports !== "undefined" && (($757e812703ebe6b4$var$_c = $933e942aa2823728$exports === null || $933e942aa2823728$exports === void 0 ? void 0 : $933e942aa2823728$exports.env) === null || $757e812703ebe6b4$var$_c === void 0 ? void 0 : $757e812703ebe6b4$var$_c["TEXT_DECODER"]) !== "force" ? 200 : 0;
function $757e812703ebe6b4$export$6ed79e41309992dc(bytes, inputOffset, byteLength) {
    var stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
    return $757e812703ebe6b4$var$sharedTextDecoder.decode(stringBytes);
}


function $6a72f99c7c2367f3$export$f8d669c2a17882f2(buffer) {
    if (buffer instanceof Uint8Array) return buffer;
    else if (ArrayBuffer.isView(buffer)) return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    else if (buffer instanceof ArrayBuffer) return new Uint8Array(buffer);
    else // ArrayLike<number>
    return Uint8Array.from(buffer);
}
function $6a72f99c7c2367f3$export$7277868462c1ba02(buffer) {
    if (buffer instanceof ArrayBuffer) return new DataView(buffer);
    var bufferView = $6a72f99c7c2367f3$export$f8d669c2a17882f2(buffer);
    return new DataView(bufferView.buffer, bufferView.byteOffset, bufferView.byteLength);
}



var $49a5bfac3ac56e1c$var$DEFAULT_MAX_KEY_LENGTH = 16;
var $49a5bfac3ac56e1c$var$DEFAULT_MAX_LENGTH_PER_KEY = 16;
var $49a5bfac3ac56e1c$export$529b830450faf29c = /** @class */ function() {
    function CachedKeyDecoder(maxKeyLength, maxLengthPerKey) {
        if (maxKeyLength === void 0) maxKeyLength = $49a5bfac3ac56e1c$var$DEFAULT_MAX_KEY_LENGTH;
        if (maxLengthPerKey === void 0) maxLengthPerKey = $49a5bfac3ac56e1c$var$DEFAULT_MAX_LENGTH_PER_KEY;
        this.maxKeyLength = maxKeyLength;
        this.maxLengthPerKey = maxLengthPerKey;
        this.hit = 0;
        this.miss = 0;
        // avoid `new Array(N)`, which makes a sparse array,
        // because a sparse array is typically slower than a non-sparse array.
        this.caches = [];
        for(var i = 0; i < this.maxKeyLength; i++)this.caches.push([]);
    }
    CachedKeyDecoder.prototype.canBeCached = function(byteLength) {
        return byteLength > 0 && byteLength <= this.maxKeyLength;
    };
    CachedKeyDecoder.prototype.find = function(bytes, inputOffset, byteLength) {
        var records = this.caches[byteLength - 1];
        FIND_CHUNK: for(var _i = 0, records_1 = records; _i < records_1.length; _i++){
            var record = records_1[_i];
            var recordBytes = record.bytes;
            for(var j = 0; j < byteLength; j++){
                if (recordBytes[j] !== bytes[inputOffset + j]) continue FIND_CHUNK;
            }
            return record.str;
        }
        return null;
    };
    CachedKeyDecoder.prototype.store = function(bytes, value) {
        var records = this.caches[bytes.length - 1];
        var record = {
            bytes: bytes,
            str: value
        };
        if (records.length >= this.maxLengthPerKey) // `records` are full!
        // Set `record` to an arbitrary position.
        records[Math.random() * records.length | 0] = record;
        else records.push(record);
    };
    CachedKeyDecoder.prototype.decode = function(bytes, inputOffset, byteLength) {
        var cachedValue = this.find(bytes, inputOffset, byteLength);
        if (cachedValue != null) {
            this.hit++;
            return cachedValue;
        }
        this.miss++;
        var str = (0, $757e812703ebe6b4$export$551117984c2adf4f)(bytes, inputOffset, byteLength);
        // Ensure to copy a slice of bytes because the byte may be NodeJS Buffer and Buffer#slice() returns a reference to its internal ArrayBuffer.
        var slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
        this.store(slicedCopyOfBytes, str);
        return str;
    };
    return CachedKeyDecoder;
}();



var $c5fbcdb16bc6bdc9$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $c5fbcdb16bc6bdc9$var$__generator = undefined && undefined.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var $c5fbcdb16bc6bdc9$var$__asyncValues = undefined && undefined.__asyncValues || function(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
};
var $c5fbcdb16bc6bdc9$var$__await = undefined && undefined.__await || function(v) {
    return this instanceof $c5fbcdb16bc6bdc9$var$__await ? (this.v = v, this) : new $c5fbcdb16bc6bdc9$var$__await(v);
};
var $c5fbcdb16bc6bdc9$var$__asyncGenerator = undefined && undefined.__asyncGenerator || function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof $c5fbcdb16bc6bdc9$var$__await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
};
var $c5fbcdb16bc6bdc9$var$isValidMapKeyType = function(key) {
    var keyType = typeof key;
    return keyType === "string" || keyType === "number";
};
var $c5fbcdb16bc6bdc9$var$HEAD_BYTE_REQUIRED = -1;
var $c5fbcdb16bc6bdc9$var$EMPTY_VIEW = new DataView(new ArrayBuffer(0));
var $c5fbcdb16bc6bdc9$var$EMPTY_BYTES = new Uint8Array($c5fbcdb16bc6bdc9$var$EMPTY_VIEW.buffer);
var $c5fbcdb16bc6bdc9$export$449c37eaf7093493 = function() {
    try {
        // IE11: The spec says it should throw RangeError,
        // IE11: but in IE11 it throws TypeError.
        $c5fbcdb16bc6bdc9$var$EMPTY_VIEW.getInt8(0);
    } catch (e) {
        return e.constructor;
    }
    throw new Error("never reached");
}();
var $c5fbcdb16bc6bdc9$var$MORE_DATA = new $c5fbcdb16bc6bdc9$export$449c37eaf7093493("Insufficient data");
var $c5fbcdb16bc6bdc9$var$sharedCachedKeyDecoder = new (0, $49a5bfac3ac56e1c$export$529b830450faf29c)();
var $c5fbcdb16bc6bdc9$export$f9de6ca0bc043724 = /** @class */ function() {
    function Decoder(extensionCodec, context, maxStrLength, maxBinLength, maxArrayLength, maxMapLength, maxExtLength, keyDecoder) {
        if (extensionCodec === void 0) extensionCodec = (0, $3854edd0533193bd$export$12677a794dbd89d7).defaultCodec;
        if (context === void 0) context = undefined;
        if (maxStrLength === void 0) maxStrLength = (0, $57f37663ea6db2c7$export$3314b2c271c86d70);
        if (maxBinLength === void 0) maxBinLength = (0, $57f37663ea6db2c7$export$3314b2c271c86d70);
        if (maxArrayLength === void 0) maxArrayLength = (0, $57f37663ea6db2c7$export$3314b2c271c86d70);
        if (maxMapLength === void 0) maxMapLength = (0, $57f37663ea6db2c7$export$3314b2c271c86d70);
        if (maxExtLength === void 0) maxExtLength = (0, $57f37663ea6db2c7$export$3314b2c271c86d70);
        if (keyDecoder === void 0) keyDecoder = $c5fbcdb16bc6bdc9$var$sharedCachedKeyDecoder;
        this.extensionCodec = extensionCodec;
        this.context = context;
        this.maxStrLength = maxStrLength;
        this.maxBinLength = maxBinLength;
        this.maxArrayLength = maxArrayLength;
        this.maxMapLength = maxMapLength;
        this.maxExtLength = maxExtLength;
        this.keyDecoder = keyDecoder;
        this.totalPos = 0;
        this.pos = 0;
        this.view = $c5fbcdb16bc6bdc9$var$EMPTY_VIEW;
        this.bytes = $c5fbcdb16bc6bdc9$var$EMPTY_BYTES;
        this.headByte = $c5fbcdb16bc6bdc9$var$HEAD_BYTE_REQUIRED;
        this.stack = [];
    }
    Decoder.prototype.reinitializeState = function() {
        this.totalPos = 0;
        this.headByte = $c5fbcdb16bc6bdc9$var$HEAD_BYTE_REQUIRED;
        this.stack.length = 0;
    // view, bytes, and pos will be re-initialized in setBuffer()
    };
    Decoder.prototype.setBuffer = function(buffer) {
        this.bytes = (0, $6a72f99c7c2367f3$export$f8d669c2a17882f2)(buffer);
        this.view = (0, $6a72f99c7c2367f3$export$7277868462c1ba02)(this.bytes);
        this.pos = 0;
    };
    Decoder.prototype.appendBuffer = function(buffer) {
        if (this.headByte === $c5fbcdb16bc6bdc9$var$HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) this.setBuffer(buffer);
        else {
            var remainingData = this.bytes.subarray(this.pos);
            var newData = (0, $6a72f99c7c2367f3$export$f8d669c2a17882f2)(buffer);
            // concat remainingData + newData
            var newBuffer = new Uint8Array(remainingData.length + newData.length);
            newBuffer.set(remainingData);
            newBuffer.set(newData, remainingData.length);
            this.setBuffer(newBuffer);
        }
    };
    Decoder.prototype.hasRemaining = function(size) {
        return this.view.byteLength - this.pos >= size;
    };
    Decoder.prototype.createExtraByteError = function(posToShow) {
        var _a = this, view = _a.view, pos = _a.pos;
        return new RangeError("Extra ".concat(view.byteLength - pos, " of ").concat(view.byteLength, " byte(s) found at buffer[").concat(posToShow, "]"));
    };
    /**
     * @throws {@link DecodeError}
     * @throws {@link RangeError}
     */ Decoder.prototype.decode = function(buffer) {
        this.reinitializeState();
        this.setBuffer(buffer);
        var object = this.doDecodeSync();
        if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
        return object;
    };
    Decoder.prototype.decodeMulti = function(buffer) {
        return $c5fbcdb16bc6bdc9$var$__generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    this.reinitializeState();
                    this.setBuffer(buffer);
                    _a.label = 1;
                case 1:
                    if (!this.hasRemaining(1)) return [
                        3 /*break*/ ,
                        3
                    ];
                    return [
                        4 /*yield*/ ,
                        this.doDecodeSync()
                    ];
                case 2:
                    _a.sent();
                    return [
                        3 /*break*/ ,
                        1
                    ];
                case 3:
                    return [
                        2 /*return*/ 
                    ];
            }
        });
    };
    Decoder.prototype.decodeAsync = function(stream) {
        var stream_1, stream_1_1;
        var e_1, _a;
        return $c5fbcdb16bc6bdc9$var$__awaiter(this, void 0, void 0, function() {
            var decoded, object, buffer, e_1_1, _b, headByte, pos, totalPos;
            return $c5fbcdb16bc6bdc9$var$__generator(this, function(_c) {
                switch(_c.label){
                    case 0:
                        decoded = false;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([
                            1,
                            6,
                            7,
                            12
                        ]);
                        stream_1 = $c5fbcdb16bc6bdc9$var$__asyncValues(stream);
                        _c.label = 2;
                    case 2:
                        return [
                            4 /*yield*/ ,
                            stream_1.next()
                        ];
                    case 3:
                        if (!(stream_1_1 = _c.sent(), !stream_1_1.done)) return [
                            3 /*break*/ ,
                            5
                        ];
                        buffer = stream_1_1.value;
                        if (decoded) throw this.createExtraByteError(this.totalPos);
                        this.appendBuffer(buffer);
                        try {
                            object = this.doDecodeSync();
                            decoded = true;
                        } catch (e) {
                            if (!(e instanceof $c5fbcdb16bc6bdc9$export$449c37eaf7093493)) throw e; // rethrow
                        // fallthrough
                        }
                        this.totalPos += this.pos;
                        _c.label = 4;
                    case 4:
                        return [
                            3 /*break*/ ,
                            2
                        ];
                    case 5:
                        return [
                            3 /*break*/ ,
                            12
                        ];
                    case 6:
                        e_1_1 = _c.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [
                            3 /*break*/ ,
                            12
                        ];
                    case 7:
                        _c.trys.push([
                            7,
                            ,
                            10,
                            11
                        ]);
                        if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1.return))) return [
                            3 /*break*/ ,
                            9
                        ];
                        return [
                            4 /*yield*/ ,
                            _a.call(stream_1)
                        ];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        return [
                            3 /*break*/ ,
                            11
                        ];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [
                            7 /*endfinally*/ 
                        ];
                    case 11:
                        return [
                            7 /*endfinally*/ 
                        ];
                    case 12:
                        if (decoded) {
                            if (this.hasRemaining(1)) throw this.createExtraByteError(this.totalPos);
                            return [
                                2 /*return*/ ,
                                object
                            ];
                        }
                        _b = this, headByte = _b.headByte, pos = _b.pos, totalPos = _b.totalPos;
                        throw new RangeError("Insufficient data in parsing ".concat((0, $db36bd6aec32319c$export$78406e843f5312da)(headByte), " at ").concat(totalPos, " (").concat(pos, " in the current buffer)"));
                }
            });
        });
    };
    Decoder.prototype.decodeArrayStream = function(stream) {
        return this.decodeMultiAsync(stream, true);
    };
    Decoder.prototype.decodeStream = function(stream) {
        return this.decodeMultiAsync(stream, false);
    };
    Decoder.prototype.decodeMultiAsync = function(stream, isArray) {
        return $c5fbcdb16bc6bdc9$var$__asyncGenerator(this, arguments, function decodeMultiAsync_1() {
            var isArrayHeaderRequired, arrayItemsLeft, stream_2, stream_2_1, buffer, e_2, e_3_1;
            var e_3, _a;
            return $c5fbcdb16bc6bdc9$var$__generator(this, function(_b) {
                switch(_b.label){
                    case 0:
                        isArrayHeaderRequired = isArray;
                        arrayItemsLeft = -1;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([
                            1,
                            13,
                            14,
                            19
                        ]);
                        stream_2 = $c5fbcdb16bc6bdc9$var$__asyncValues(stream);
                        _b.label = 2;
                    case 2:
                        return [
                            4 /*yield*/ ,
                            $c5fbcdb16bc6bdc9$var$__await(stream_2.next())
                        ];
                    case 3:
                        if (!(stream_2_1 = _b.sent(), !stream_2_1.done)) return [
                            3 /*break*/ ,
                            12
                        ];
                        buffer = stream_2_1.value;
                        if (isArray && arrayItemsLeft === 0) throw this.createExtraByteError(this.totalPos);
                        this.appendBuffer(buffer);
                        if (isArrayHeaderRequired) {
                            arrayItemsLeft = this.readArraySize();
                            isArrayHeaderRequired = false;
                            this.complete();
                        }
                        _b.label = 4;
                    case 4:
                        _b.trys.push([
                            4,
                            9,
                            ,
                            10
                        ]);
                        _b.label = 5;
                    case 5:
                        return [
                            4 /*yield*/ ,
                            $c5fbcdb16bc6bdc9$var$__await(this.doDecodeSync())
                        ];
                    case 6:
                        return [
                            4 /*yield*/ ,
                            _b.sent()
                        ];
                    case 7:
                        _b.sent();
                        if (--arrayItemsLeft === 0) return [
                            3 /*break*/ ,
                            8
                        ];
                        return [
                            3 /*break*/ ,
                            5
                        ];
                    case 8:
                        return [
                            3 /*break*/ ,
                            10
                        ];
                    case 9:
                        e_2 = _b.sent();
                        if (!(e_2 instanceof $c5fbcdb16bc6bdc9$export$449c37eaf7093493)) throw e_2; // rethrow
                        return [
                            3 /*break*/ ,
                            10
                        ];
                    case 10:
                        this.totalPos += this.pos;
                        _b.label = 11;
                    case 11:
                        return [
                            3 /*break*/ ,
                            2
                        ];
                    case 12:
                        return [
                            3 /*break*/ ,
                            19
                        ];
                    case 13:
                        e_3_1 = _b.sent();
                        e_3 = {
                            error: e_3_1
                        };
                        return [
                            3 /*break*/ ,
                            19
                        ];
                    case 14:
                        _b.trys.push([
                            14,
                            ,
                            17,
                            18
                        ]);
                        if (!(stream_2_1 && !stream_2_1.done && (_a = stream_2.return))) return [
                            3 /*break*/ ,
                            16
                        ];
                        return [
                            4 /*yield*/ ,
                            $c5fbcdb16bc6bdc9$var$__await(_a.call(stream_2))
                        ];
                    case 15:
                        _b.sent();
                        _b.label = 16;
                    case 16:
                        return [
                            3 /*break*/ ,
                            18
                        ];
                    case 17:
                        if (e_3) throw e_3.error;
                        return [
                            7 /*endfinally*/ 
                        ];
                    case 18:
                        return [
                            7 /*endfinally*/ 
                        ];
                    case 19:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    Decoder.prototype.doDecodeSync = function() {
        DECODE: while(true){
            var headByte = this.readHeadByte();
            var object = void 0;
            if (headByte >= 0xe0) // negative fixint (111x xxxx) 0xe0 - 0xff
            object = headByte - 0x100;
            else if (headByte < 0xc0) {
                if (headByte < 0x80) // positive fixint (0xxx xxxx) 0x00 - 0x7f
                object = headByte;
                else if (headByte < 0x90) {
                    // fixmap (1000 xxxx) 0x80 - 0x8f
                    var size = headByte - 0x80;
                    if (size !== 0) {
                        this.pushMapState(size);
                        this.complete();
                        continue DECODE;
                    } else object = {};
                } else if (headByte < 0xa0) {
                    // fixarray (1001 xxxx) 0x90 - 0x9f
                    var size = headByte - 0x90;
                    if (size !== 0) {
                        this.pushArrayState(size);
                        this.complete();
                        continue DECODE;
                    } else object = [];
                } else {
                    // fixstr (101x xxxx) 0xa0 - 0xbf
                    var byteLength = headByte - 0xa0;
                    object = this.decodeUtf8String(byteLength, 0);
                }
            } else if (headByte === 0xc0) // nil
            object = null;
            else if (headByte === 0xc2) // false
            object = false;
            else if (headByte === 0xc3) // true
            object = true;
            else if (headByte === 0xca) // float 32
            object = this.readF32();
            else if (headByte === 0xcb) // float 64
            object = this.readF64();
            else if (headByte === 0xcc) // uint 8
            object = this.readU8();
            else if (headByte === 0xcd) // uint 16
            object = this.readU16();
            else if (headByte === 0xce) // uint 32
            object = this.readU32();
            else if (headByte === 0xcf) // uint 64
            object = this.readU64();
            else if (headByte === 0xd0) // int 8
            object = this.readI8();
            else if (headByte === 0xd1) // int 16
            object = this.readI16();
            else if (headByte === 0xd2) // int 32
            object = this.readI32();
            else if (headByte === 0xd3) // int 64
            object = this.readI64();
            else if (headByte === 0xd9) {
                // str 8
                var byteLength = this.lookU8();
                object = this.decodeUtf8String(byteLength, 1);
            } else if (headByte === 0xda) {
                // str 16
                var byteLength = this.lookU16();
                object = this.decodeUtf8String(byteLength, 2);
            } else if (headByte === 0xdb) {
                // str 32
                var byteLength = this.lookU32();
                object = this.decodeUtf8String(byteLength, 4);
            } else if (headByte === 0xdc) {
                // array 16
                var size = this.readU16();
                if (size !== 0) {
                    this.pushArrayState(size);
                    this.complete();
                    continue DECODE;
                } else object = [];
            } else if (headByte === 0xdd) {
                // array 32
                var size = this.readU32();
                if (size !== 0) {
                    this.pushArrayState(size);
                    this.complete();
                    continue DECODE;
                } else object = [];
            } else if (headByte === 0xde) {
                // map 16
                var size = this.readU16();
                if (size !== 0) {
                    this.pushMapState(size);
                    this.complete();
                    continue DECODE;
                } else object = {};
            } else if (headByte === 0xdf) {
                // map 32
                var size = this.readU32();
                if (size !== 0) {
                    this.pushMapState(size);
                    this.complete();
                    continue DECODE;
                } else object = {};
            } else if (headByte === 0xc4) {
                // bin 8
                var size = this.lookU8();
                object = this.decodeBinary(size, 1);
            } else if (headByte === 0xc5) {
                // bin 16
                var size = this.lookU16();
                object = this.decodeBinary(size, 2);
            } else if (headByte === 0xc6) {
                // bin 32
                var size = this.lookU32();
                object = this.decodeBinary(size, 4);
            } else if (headByte === 0xd4) // fixext 1
            object = this.decodeExtension(1, 0);
            else if (headByte === 0xd5) // fixext 2
            object = this.decodeExtension(2, 0);
            else if (headByte === 0xd6) // fixext 4
            object = this.decodeExtension(4, 0);
            else if (headByte === 0xd7) // fixext 8
            object = this.decodeExtension(8, 0);
            else if (headByte === 0xd8) // fixext 16
            object = this.decodeExtension(16, 0);
            else if (headByte === 0xc7) {
                // ext 8
                var size = this.lookU8();
                object = this.decodeExtension(size, 1);
            } else if (headByte === 0xc8) {
                // ext 16
                var size = this.lookU16();
                object = this.decodeExtension(size, 2);
            } else if (headByte === 0xc9) {
                // ext 32
                var size = this.lookU32();
                object = this.decodeExtension(size, 4);
            } else throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Unrecognized type byte: ".concat((0, $db36bd6aec32319c$export$78406e843f5312da)(headByte)));
            this.complete();
            var stack = this.stack;
            while(stack.length > 0){
                // arrays and maps
                var state = stack[stack.length - 1];
                if (state.type === 0 /* State.ARRAY */ ) {
                    state.array[state.position] = object;
                    state.position++;
                    if (state.position === state.size) {
                        stack.pop();
                        object = state.array;
                    } else continue DECODE;
                } else if (state.type === 1 /* State.MAP_KEY */ ) {
                    if (!$c5fbcdb16bc6bdc9$var$isValidMapKeyType(object)) throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("The type of key must be string or number but " + typeof object);
                    if (object === "__proto__") throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("The key __proto__ is not allowed");
                    state.key = object;
                    state.type = 2 /* State.MAP_VALUE */ ;
                    continue DECODE;
                } else {
                    // it must be `state.type === State.MAP_VALUE` here
                    state.map[state.key] = object;
                    state.readCount++;
                    if (state.readCount === state.size) {
                        stack.pop();
                        object = state.map;
                    } else {
                        state.key = null;
                        state.type = 1 /* State.MAP_KEY */ ;
                        continue DECODE;
                    }
                }
            }
            return object;
        }
    };
    Decoder.prototype.readHeadByte = function() {
        if (this.headByte === $c5fbcdb16bc6bdc9$var$HEAD_BYTE_REQUIRED) this.headByte = this.readU8();
        return this.headByte;
    };
    Decoder.prototype.complete = function() {
        this.headByte = $c5fbcdb16bc6bdc9$var$HEAD_BYTE_REQUIRED;
    };
    Decoder.prototype.readArraySize = function() {
        var headByte = this.readHeadByte();
        switch(headByte){
            case 0xdc:
                return this.readU16();
            case 0xdd:
                return this.readU32();
            default:
                if (headByte < 0xa0) return headByte - 0x90;
                else throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Unrecognized array type byte: ".concat((0, $db36bd6aec32319c$export$78406e843f5312da)(headByte)));
        }
    };
    Decoder.prototype.pushMapState = function(size) {
        if (size > this.maxMapLength) throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Max length exceeded: map length (".concat(size, ") > maxMapLengthLength (").concat(this.maxMapLength, ")"));
        this.stack.push({
            type: 1 /* State.MAP_KEY */ ,
            size: size,
            key: null,
            readCount: 0,
            map: {}
        });
    };
    Decoder.prototype.pushArrayState = function(size) {
        if (size > this.maxArrayLength) throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Max length exceeded: array length (".concat(size, ") > maxArrayLength (").concat(this.maxArrayLength, ")"));
        this.stack.push({
            type: 0 /* State.ARRAY */ ,
            size: size,
            array: new Array(size),
            position: 0
        });
    };
    Decoder.prototype.decodeUtf8String = function(byteLength, headerOffset) {
        var _a;
        if (byteLength > this.maxStrLength) throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Max length exceeded: UTF-8 byte length (".concat(byteLength, ") > maxStrLength (").concat(this.maxStrLength, ")"));
        if (this.bytes.byteLength < this.pos + headerOffset + byteLength) throw $c5fbcdb16bc6bdc9$var$MORE_DATA;
        var offset = this.pos + headerOffset;
        var object;
        if (this.stateIsMapKey() && ((_a = this.keyDecoder) === null || _a === void 0 ? void 0 : _a.canBeCached(byteLength))) object = this.keyDecoder.decode(this.bytes, offset, byteLength);
        else if (byteLength > (0, $757e812703ebe6b4$export$d866281c5a66d1ef)) object = (0, $757e812703ebe6b4$export$6ed79e41309992dc)(this.bytes, offset, byteLength);
        else object = (0, $757e812703ebe6b4$export$551117984c2adf4f)(this.bytes, offset, byteLength);
        this.pos += headerOffset + byteLength;
        return object;
    };
    Decoder.prototype.stateIsMapKey = function() {
        if (this.stack.length > 0) {
            var state = this.stack[this.stack.length - 1];
            return state.type === 1 /* State.MAP_KEY */ ;
        }
        return false;
    };
    Decoder.prototype.decodeBinary = function(byteLength, headOffset) {
        if (byteLength > this.maxBinLength) throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Max length exceeded: bin length (".concat(byteLength, ") > maxBinLength (").concat(this.maxBinLength, ")"));
        if (!this.hasRemaining(byteLength + headOffset)) throw $c5fbcdb16bc6bdc9$var$MORE_DATA;
        var offset = this.pos + headOffset;
        var object = this.bytes.subarray(offset, offset + byteLength);
        this.pos += headOffset + byteLength;
        return object;
    };
    Decoder.prototype.decodeExtension = function(size, headOffset) {
        if (size > this.maxExtLength) throw new (0, $c021f3f9e0eb4669$export$ef3eed12d06c0285)("Max length exceeded: ext length (".concat(size, ") > maxExtLength (").concat(this.maxExtLength, ")"));
        var extType = this.view.getInt8(this.pos + headOffset);
        var data = this.decodeBinary(size, headOffset + 1 /* extType */ );
        return this.extensionCodec.decode(data, extType, this.context);
    };
    Decoder.prototype.lookU8 = function() {
        return this.view.getUint8(this.pos);
    };
    Decoder.prototype.lookU16 = function() {
        return this.view.getUint16(this.pos);
    };
    Decoder.prototype.lookU32 = function() {
        return this.view.getUint32(this.pos);
    };
    Decoder.prototype.readU8 = function() {
        var value = this.view.getUint8(this.pos);
        this.pos++;
        return value;
    };
    Decoder.prototype.readI8 = function() {
        var value = this.view.getInt8(this.pos);
        this.pos++;
        return value;
    };
    Decoder.prototype.readU16 = function() {
        var value = this.view.getUint16(this.pos);
        this.pos += 2;
        return value;
    };
    Decoder.prototype.readI16 = function() {
        var value = this.view.getInt16(this.pos);
        this.pos += 2;
        return value;
    };
    Decoder.prototype.readU32 = function() {
        var value = this.view.getUint32(this.pos);
        this.pos += 4;
        return value;
    };
    Decoder.prototype.readI32 = function() {
        var value = this.view.getInt32(this.pos);
        this.pos += 4;
        return value;
    };
    Decoder.prototype.readU64 = function() {
        var value = (0, $57f37663ea6db2c7$export$59a2dbf579ff9568)(this.view, this.pos);
        this.pos += 8;
        return value;
    };
    Decoder.prototype.readI64 = function() {
        var value = (0, $57f37663ea6db2c7$export$69825c7adcc820c6)(this.view, this.pos);
        this.pos += 8;
        return value;
    };
    Decoder.prototype.readF32 = function() {
        var value = this.view.getFloat32(this.pos);
        this.pos += 4;
        return value;
    };
    Decoder.prototype.readF64 = function() {
        var value = this.view.getFloat64(this.pos);
        this.pos += 8;
        return value;
    };
    return Decoder;
}();


var $a2254d8a8e18a019$export$ca6ec972f712a9eb = {};
function $a2254d8a8e18a019$export$2f872c0f2117be69(buffer, options) {
    if (options === void 0) options = $a2254d8a8e18a019$export$ca6ec972f712a9eb;
    var decoder = new (0, $c5fbcdb16bc6bdc9$export$f9de6ca0bc043724)(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
    return decoder.decode(buffer);
}
function $a2254d8a8e18a019$export$43cc91859d9fdc54(buffer, options) {
    if (options === void 0) options = $a2254d8a8e18a019$export$ca6ec972f712a9eb;
    var decoder = new (0, $c5fbcdb16bc6bdc9$export$f9de6ca0bc043724)(options.extensionCodec, options.context, options.maxStrLength, options.maxBinLength, options.maxArrayLength, options.maxMapLength, options.maxExtLength);
    return decoder.decodeMulti(buffer);
}





var $32208514528e18e8$export$2c6de1218fe0e46d = 100;
var $32208514528e18e8$export$29659805a45f979c = 2048;
var $32208514528e18e8$export$a50aceb0e02a00aa = /** @class */ function() {
    function Encoder(extensionCodec, context, maxDepth, initialBufferSize, sortKeys, forceFloat32, ignoreUndefined, forceIntegerToFloat) {
        if (extensionCodec === void 0) extensionCodec = (0, $3854edd0533193bd$export$12677a794dbd89d7).defaultCodec;
        if (context === void 0) context = undefined;
        if (maxDepth === void 0) maxDepth = $32208514528e18e8$export$2c6de1218fe0e46d;
        if (initialBufferSize === void 0) initialBufferSize = $32208514528e18e8$export$29659805a45f979c;
        if (sortKeys === void 0) sortKeys = false;
        if (forceFloat32 === void 0) forceFloat32 = false;
        if (ignoreUndefined === void 0) ignoreUndefined = false;
        if (forceIntegerToFloat === void 0) forceIntegerToFloat = false;
        this.extensionCodec = extensionCodec;
        this.context = context;
        this.maxDepth = maxDepth;
        this.initialBufferSize = initialBufferSize;
        this.sortKeys = sortKeys;
        this.forceFloat32 = forceFloat32;
        this.ignoreUndefined = ignoreUndefined;
        this.forceIntegerToFloat = forceIntegerToFloat;
        this.pos = 0;
        this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
        this.bytes = new Uint8Array(this.view.buffer);
    }
    Encoder.prototype.reinitializeState = function() {
        this.pos = 0;
    };
    /**
     * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
     *
     * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
     */ Encoder.prototype.encodeSharedRef = function(object) {
        this.reinitializeState();
        this.doEncode(object, 1);
        return this.bytes.subarray(0, this.pos);
    };
    /**
     * @returns Encodes the object and returns a copy of the encoder's internal buffer.
     */ Encoder.prototype.encode = function(object) {
        this.reinitializeState();
        this.doEncode(object, 1);
        return this.bytes.slice(0, this.pos);
    };
    Encoder.prototype.doEncode = function(object, depth) {
        if (depth > this.maxDepth) throw new Error("Too deep objects in depth ".concat(depth));
        if (object == null) this.encodeNil();
        else if (typeof object === "boolean") this.encodeBoolean(object);
        else if (typeof object === "number") this.encodeNumber(object);
        else if (typeof object === "string") this.encodeString(object);
        else this.encodeObject(object, depth);
    };
    Encoder.prototype.ensureBufferSizeToWrite = function(sizeToWrite) {
        var requiredSize = this.pos + sizeToWrite;
        if (this.view.byteLength < requiredSize) this.resizeBuffer(requiredSize * 2);
    };
    Encoder.prototype.resizeBuffer = function(newSize) {
        var newBuffer = new ArrayBuffer(newSize);
        var newBytes = new Uint8Array(newBuffer);
        var newView = new DataView(newBuffer);
        newBytes.set(this.bytes);
        this.view = newView;
        this.bytes = newBytes;
    };
    Encoder.prototype.encodeNil = function() {
        this.writeU8(0xc0);
    };
    Encoder.prototype.encodeBoolean = function(object) {
        if (object === false) this.writeU8(0xc2);
        else this.writeU8(0xc3);
    };
    Encoder.prototype.encodeNumber = function(object) {
        if (Number.isSafeInteger(object) && !this.forceIntegerToFloat) {
            if (object >= 0) {
                if (object < 0x80) // positive fixint
                this.writeU8(object);
                else if (object < 0x100) {
                    // uint 8
                    this.writeU8(0xcc);
                    this.writeU8(object);
                } else if (object < 0x10000) {
                    // uint 16
                    this.writeU8(0xcd);
                    this.writeU16(object);
                } else if (object < 0x100000000) {
                    // uint 32
                    this.writeU8(0xce);
                    this.writeU32(object);
                } else {
                    // uint 64
                    this.writeU8(0xcf);
                    this.writeU64(object);
                }
            } else {
                if (object >= -32) // negative fixint
                this.writeU8(0xe0 | object + 0x20);
                else if (object >= -128) {
                    // int 8
                    this.writeU8(0xd0);
                    this.writeI8(object);
                } else if (object >= -32768) {
                    // int 16
                    this.writeU8(0xd1);
                    this.writeI16(object);
                } else if (object >= -2147483648) {
                    // int 32
                    this.writeU8(0xd2);
                    this.writeI32(object);
                } else {
                    // int 64
                    this.writeU8(0xd3);
                    this.writeI64(object);
                }
            }
        } else // non-integer numbers
        if (this.forceFloat32) {
            // float 32
            this.writeU8(0xca);
            this.writeF32(object);
        } else {
            // float 64
            this.writeU8(0xcb);
            this.writeF64(object);
        }
    };
    Encoder.prototype.writeStringHeader = function(byteLength) {
        if (byteLength < 32) // fixstr
        this.writeU8(0xa0 + byteLength);
        else if (byteLength < 0x100) {
            // str 8
            this.writeU8(0xd9);
            this.writeU8(byteLength);
        } else if (byteLength < 0x10000) {
            // str 16
            this.writeU8(0xda);
            this.writeU16(byteLength);
        } else if (byteLength < 0x100000000) {
            // str 32
            this.writeU8(0xdb);
            this.writeU32(byteLength);
        } else throw new Error("Too long string: ".concat(byteLength, " bytes in UTF-8"));
    };
    Encoder.prototype.encodeString = function(object) {
        var maxHeaderSize = 5;
        var strLength = object.length;
        if (strLength > (0, $757e812703ebe6b4$export$ed34c0622b397238)) {
            var byteLength = (0, $757e812703ebe6b4$export$b61de95301265227)(object);
            this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
            this.writeStringHeader(byteLength);
            (0, $757e812703ebe6b4$export$34cfdc82d430524)(object, this.bytes, this.pos);
            this.pos += byteLength;
        } else {
            var byteLength = (0, $757e812703ebe6b4$export$b61de95301265227)(object);
            this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
            this.writeStringHeader(byteLength);
            (0, $757e812703ebe6b4$export$1042e4338f1ef853)(object, this.bytes, this.pos);
            this.pos += byteLength;
        }
    };
    Encoder.prototype.encodeObject = function(object, depth) {
        // try to encode objects with custom codec first of non-primitives
        var ext = this.extensionCodec.tryToEncode(object, this.context);
        if (ext != null) this.encodeExtension(ext);
        else if (Array.isArray(object)) this.encodeArray(object, depth);
        else if (ArrayBuffer.isView(object)) this.encodeBinary(object);
        else if (typeof object === "object") this.encodeMap(object, depth);
        else // symbol, function and other special object come here unless extensionCodec handles them.
        throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(object)));
    };
    Encoder.prototype.encodeBinary = function(object) {
        var size = object.byteLength;
        if (size < 0x100) {
            // bin 8
            this.writeU8(0xc4);
            this.writeU8(size);
        } else if (size < 0x10000) {
            // bin 16
            this.writeU8(0xc5);
            this.writeU16(size);
        } else if (size < 0x100000000) {
            // bin 32
            this.writeU8(0xc6);
            this.writeU32(size);
        } else throw new Error("Too large binary: ".concat(size));
        var bytes = (0, $6a72f99c7c2367f3$export$f8d669c2a17882f2)(object);
        this.writeU8a(bytes);
    };
    Encoder.prototype.encodeArray = function(object, depth) {
        var size = object.length;
        if (size < 16) // fixarray
        this.writeU8(0x90 + size);
        else if (size < 0x10000) {
            // array 16
            this.writeU8(0xdc);
            this.writeU16(size);
        } else if (size < 0x100000000) {
            // array 32
            this.writeU8(0xdd);
            this.writeU32(size);
        } else throw new Error("Too large array: ".concat(size));
        for(var _i = 0, object_1 = object; _i < object_1.length; _i++){
            var item = object_1[_i];
            this.doEncode(item, depth + 1);
        }
    };
    Encoder.prototype.countWithoutUndefined = function(object, keys) {
        var count = 0;
        for(var _i = 0, keys_1 = keys; _i < keys_1.length; _i++){
            var key = keys_1[_i];
            if (object[key] !== undefined) count++;
        }
        return count;
    };
    Encoder.prototype.encodeMap = function(object, depth) {
        var keys = Object.keys(object);
        if (this.sortKeys) keys.sort();
        var size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
        if (size < 16) // fixmap
        this.writeU8(0x80 + size);
        else if (size < 0x10000) {
            // map 16
            this.writeU8(0xde);
            this.writeU16(size);
        } else if (size < 0x100000000) {
            // map 32
            this.writeU8(0xdf);
            this.writeU32(size);
        } else throw new Error("Too large map object: ".concat(size));
        for(var _i = 0, keys_2 = keys; _i < keys_2.length; _i++){
            var key = keys_2[_i];
            var value = object[key];
            if (!(this.ignoreUndefined && value === undefined)) {
                this.encodeString(key);
                this.doEncode(value, depth + 1);
            }
        }
    };
    Encoder.prototype.encodeExtension = function(ext) {
        var size = ext.data.length;
        if (size === 1) // fixext 1
        this.writeU8(0xd4);
        else if (size === 2) // fixext 2
        this.writeU8(0xd5);
        else if (size === 4) // fixext 4
        this.writeU8(0xd6);
        else if (size === 8) // fixext 8
        this.writeU8(0xd7);
        else if (size === 16) // fixext 16
        this.writeU8(0xd8);
        else if (size < 0x100) {
            // ext 8
            this.writeU8(0xc7);
            this.writeU8(size);
        } else if (size < 0x10000) {
            // ext 16
            this.writeU8(0xc8);
            this.writeU16(size);
        } else if (size < 0x100000000) {
            // ext 32
            this.writeU8(0xc9);
            this.writeU32(size);
        } else throw new Error("Too large extension object: ".concat(size));
        this.writeI8(ext.type);
        this.writeU8a(ext.data);
    };
    Encoder.prototype.writeU8 = function(value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setUint8(this.pos, value);
        this.pos++;
    };
    Encoder.prototype.writeU8a = function(values) {
        var size = values.length;
        this.ensureBufferSizeToWrite(size);
        this.bytes.set(values, this.pos);
        this.pos += size;
    };
    Encoder.prototype.writeI8 = function(value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setInt8(this.pos, value);
        this.pos++;
    };
    Encoder.prototype.writeU16 = function(value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setUint16(this.pos, value);
        this.pos += 2;
    };
    Encoder.prototype.writeI16 = function(value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setInt16(this.pos, value);
        this.pos += 2;
    };
    Encoder.prototype.writeU32 = function(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setUint32(this.pos, value);
        this.pos += 4;
    };
    Encoder.prototype.writeI32 = function(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setInt32(this.pos, value);
        this.pos += 4;
    };
    Encoder.prototype.writeF32 = function(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setFloat32(this.pos, value);
        this.pos += 4;
    };
    Encoder.prototype.writeF64 = function(value) {
        this.ensureBufferSizeToWrite(8);
        this.view.setFloat64(this.pos, value);
        this.pos += 8;
    };
    Encoder.prototype.writeU64 = function(value) {
        this.ensureBufferSizeToWrite(8);
        (0, $57f37663ea6db2c7$export$20f71c4c8b0f96c3)(this.view, this.pos, value);
        this.pos += 8;
    };
    Encoder.prototype.writeI64 = function(value) {
        this.ensureBufferSizeToWrite(8);
        (0, $57f37663ea6db2c7$export$8532a5209571c04a)(this.view, this.pos, value);
        this.pos += 8;
    };
    return Encoder;
}();


var $ab68995a32e2e936$var$defaultEncodeOptions = {};
function $ab68995a32e2e936$export$c564cdbbe6da493(value, options) {
    if (options === void 0) options = $ab68995a32e2e936$var$defaultEncodeOptions;
    var encoder = new (0, $32208514528e18e8$export$a50aceb0e02a00aa)(options.extensionCodec, options.context, options.maxDepth, options.initialBufferSize, options.sortKeys, options.forceFloat32, options.ignoreUndefined, options.forceIntegerToFloat);
    return encoder.encodeSharedRef(value);
}


class $44e59ecc19afac1f$export$f0a5a64d5bb37108 extends (0, $5592ef113ea6fc6a$export$ff7c9d4c11d94e8b) {
    close(options) {
        super.close(options);
        this._chunkedData = {};
    }
    // Handles a DataChannel message.
    _handleDataMessage({ data: data }) {
        let deserializedData;
        if (this.options.msgpackType === "peerjs") deserializedData = (0, $b09b85ad69e68d49$export$417857010dc9287f)(data);
        else deserializedData = (0, $a2254d8a8e18a019$export$2f872c0f2117be69)(data);
        // PeerJS specific message
        // console.log(data)
        // console.log(deserializedData)
        const peerData = deserializedData["__peerData"];
        if (peerData) {
            if (peerData.type === "close") {
                this.close();
                return;
            }
            // Chunked data -- piece things back together.
            // @ts-ignore
            this._handleChunk(deserializedData);
            return;
        }
        this.emit("data", deserializedData);
    }
    _handleChunk(data) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).chunk(data);
        const id = data.__peerData;
        const chunkInfo = this._chunkedData[id] || {
            data: [],
            count: 0,
            total: data.total
        };
        chunkInfo.data[data.n] = new Uint8Array(data.data);
        chunkInfo.count++;
        this._chunkedData[id] = chunkInfo;
        if (chunkInfo.total === chunkInfo.count) {
            // Clean up before making the recursive call to `_handleDataMessage`.
            delete this._chunkedData[id];
            // We've received all the chunks--time to construct the complete data.
            // const data = new Blob(chunkInfo.data);
            const data = (0, $351d3c8bb83bcec5$export$52c89ebcdc4f53f2)(chunkInfo.data);
            this._handleDataMessage({
                data: data
            });
        }
    }
    _send(data, chunked) {
        let blob;
        if (this.options.msgpackType === "peerjs") blob = (0, $b09b85ad69e68d49$export$2a703dbb0cb35339)(data);
        else blob = (0, $ab68995a32e2e936$export$c564cdbbe6da493)(data);
        if (blob instanceof Promise) return this._send_blob(blob);
        if (!chunked && blob.byteLength > this.chunker.chunkedMTU) {
            this._sendChunks(blob);
            return;
        }
        this._bufferedSend(blob);
    }
    async _send_blob(blobPromise) {
        const blob = await blobPromise;
        if (blob.byteLength > this.chunker.chunkedMTU) {
            this._sendChunks(blob);
            return;
        }
        this._bufferedSend(blob);
    }
    _sendChunks(blob) {
        this.chunker.chunkedMTU = this.messageSize;
        const blobs = this.chunker.chunk(blob);
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).chunk(`DC#${this.connectionId} Try to send ${blobs.length} chunks...`);
        for (const blob of blobs){
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).chunk(`chunk data ${blob.toString()}`);
            this.send(blob, true);
        }
    }
    constructor(peerId, provider, options){
        super(peerId, provider, options);
        this.chunker = new (0, $351d3c8bb83bcec5$export$f1c5f4c9cb95390b)();
        this.serialization = (0, $c6218548eff1f889$export$89f507cf986a947).Binary;
        this._chunkedData = {};
    }
}




class $aff9818925c2254b$export$6f88fe47d32c9c94 extends (0, $5592ef113ea6fc6a$export$ff7c9d4c11d94e8b) {
    _handleDataMessage({ data: data }) {
        super.emit("data", data);
    }
    _send(data, _chunked) {
        this._bufferedSend(data);
    }
    constructor(...args){
        super(...args);
        this.serialization = (0, $c6218548eff1f889$export$89f507cf986a947).None;
    }
}





class $3c622b0f037f88a0$export$48880ac635f47186 extends (0, $5592ef113ea6fc6a$export$ff7c9d4c11d94e8b) {
    // Handles a DataChannel message.
    _handleDataMessage({ data: data }) {
        const deserializedData = this.parse(this.decoder.decode(data));
        // PeerJS specific message
        const peerData = deserializedData["__peerData"];
        if (peerData && peerData.type === "close") {
            this.close();
            return;
        }
        this.emit("data", deserializedData);
    }
    _send(data, _chunked) {
        const encodedData = this.encoder.encode(this.stringify(data));
        if (encodedData.byteLength >= (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).chunkedMTU) {
            this.emitError((0, $c6218548eff1f889$export$49ae800c114df41d).MessageToBig, "Message too big for JSON channel");
            return;
        }
        this._bufferedSend(encodedData);
    }
    constructor(...args){
        super(...args);
        this.serialization = (0, $c6218548eff1f889$export$89f507cf986a947).JSON;
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
        this.stringify = JSON.stringify;
        this.parse = JSON.parse;
    }
}



class $fe8dc6b0df9bc4f4$var$PeerOptions {
}
class $fe8dc6b0df9bc4f4$export$ecd1fc136c422448 extends (0, $42e4b71328041e53$export$6a678e589c8a4542) {
    /**
	 * The brokering ID of this peer
	 *
	 * If no ID was specified in {@apilink Peer | the constructor},
	 * this will be `undefined` until the {@apilink PeerEvents | `open`} event is emitted.
	 */ get id() {
        return this._id;
    }
    get options() {
        return this._options;
    }
    get open() {
        return this._open;
    }
    /**
	 * @internal
	 */ get socket() {
        return this._socket;
    }
    /**
	 * A hash of all connections associated with this peer, keyed by the remote peer's ID.
	 * @deprecated
	 * Return type will change from Object to Map<string,[]>
	 */ get connections() {
        const plainConnections = Object.create(null);
        for (const [k, v] of this._connections)plainConnections[k] = v;
        return plainConnections;
    }
    /**
	 * true if this peer and all of its connections can no longer be used.
	 */ get destroyed() {
        return this._destroyed;
    }
    /**
	 * false if there is an active connection to the PeerServer.
	 */ get disconnected() {
        return this._disconnected;
    }
    _createServerConnection() {
        const socket = new (0, $beaab1d07f8f12b5$export$4798917dbf149b79)(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.clientType, this._options.pingInterval);
        socket.on((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Message, (data)=>{
            this._handleMessage(data);
        });
        socket.on((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Error, (error)=>{
            this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).SocketError, error);
        });
        socket.on((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Disconnected, ()=>{
            if (this.disconnected) return;
            this.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).Network, "Lost connection to server.");
            this.disconnect();
        });
        socket.on((0, $c6218548eff1f889$export$3b5c4a4b6354f023).Close, ()=>{
            if (this.disconnected) return;
            this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).SocketClosed, "Underlying socket is already closed.");
        });
        return socket;
    }
    /** Initialize a connection with the server. */ async _initialize(id) {
        if (this.options.clientType === "websocket") {
            this._id = id;
            await this.socket.start(id, this._options.token);
        } else {
            await this.socket.start(id, this._options.token);
            this._id = this._socket._socketio.id;
        }
    }
    /** Handles messages from the server. */ _handleMessage(message) {
        const type = message.type;
        const payload = message.payload;
        const peerId = message.src;
        switch(type){
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Open:
                this._lastServerId = this.id;
                this._open = true;
                this.emit("open", this.id);
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Error:
                this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).ServerError, payload.msg);
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).IdTaken:
                this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).UnavailableID, `ID "${this.id}" is taken`);
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).InvalidKey:
                this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).InvalidKey, `API KEY "${this._options.key}" is invalid`);
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Leave:
                (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Received leave message from ${peerId}`);
                this._cleanupPeer(peerId);
                this._connections.delete(peerId);
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Expire:
                this.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).PeerUnavailable, `Could not connect to peer ${peerId}`);
                break;
            case (0, $c6218548eff1f889$export$adb4a1754da6f10d).Offer:
                {
                    // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
                    const connectionId = payload.connectionId;
                    let connection = this.getConnection(peerId, connectionId);
                    if (connection) {
                        connection.close();
                        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn(`Offer received for existing Connection ID:${connectionId}`);
                    }
                    // Create a new connection.
                    if (payload.type === (0, $c6218548eff1f889$export$3157d57b4135e3bc).Media) {
                        const mediaConnection = new (0, $548df18aef40ce70$export$4a84e95a2324ac29)(peerId, this, {
                            connectionId: connectionId,
                            _payload: payload,
                            metadata: payload.metadata
                        });
                        connection = mediaConnection;
                        this._addConnection(peerId, connection);
                        this.emit("call", mediaConnection);
                    } else if (payload.type === (0, $c6218548eff1f889$export$3157d57b4135e3bc).Data) {
                        const dataConnection = new this._serializers[payload.serialization](peerId, this, {
                            connectionId: connectionId,
                            _payload: payload,
                            metadata: payload.metadata,
                            label: payload.label,
                            serialization: payload.serialization,
                            reliable: payload.reliable
                        });
                        connection = dataConnection;
                        this._addConnection(peerId, connection);
                        this.emit("connection", dataConnection);
                    } else {
                        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn(`Received malformed connection type:${payload.type}`);
                        return;
                    }
                    // Find messages.
                    const messages = this._getMessages(connectionId);
                    for (const message of messages)connection.handleMessage(message);
                    break;
                }
            default:
                {
                    if (!payload) {
                        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn(`You received a malformed message from ${peerId} of type ${type}`);
                        return;
                    }
                    const connectionId = payload.connectionId;
                    const connection = this.getConnection(peerId, connectionId);
                    if (connection && connection.peerConnection) // Pass it on.
                    connection.handleMessage(message);
                    else if (connectionId) // Store for possible later use
                    this._storeMessage(connectionId, message);
                    else (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn("You received an unrecognized message:", message);
                    break;
                }
        }
    }
    /** Stores messages without a set up connection, to be claimed later. */ _storeMessage(connectionId, message) {
        if (!this._lostMessages.has(connectionId)) this._lostMessages.set(connectionId, []);
        this._lostMessages.get(connectionId).push(message);
    }
    /**
	 * Retrieve messages from lost message store
	 * @internal
	 */ //TODO Change it to private
    _getMessages(connectionId) {
        const messages = this._lostMessages.get(connectionId);
        if (messages) {
            this._lostMessages.delete(connectionId);
            return messages;
        }
        return [];
    }
    /**
	 * Connects to the remote peer specified by id and returns a data connection.
	 * @param peer The brokering ID of the remote peer (their {@apilink Peer.id}).
	 * @param options for specifying details about Peer Connection
	 */ connect(peer, options = {}) {
        options = {
            serialization: "default",
            ...options
        };
        if (this.disconnected) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
            this.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        const dataConnection = new this._serializers[options.serialization](peer, this, options);
        this._addConnection(peer, dataConnection);
        return dataConnection;
    }
    /**
	 * Calls the remote peer specified by id and returns a media connection.
	 * @param peer The brokering ID of the remote peer (their peer.id).
	 * @param stream The caller's media stream
	 * @param options Metadata associated with the connection, passed in by whoever initiated the connection.
	 */ call(peer, stream, options = {}) {
        if (this.disconnected) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
            this.emitError((0, $c6218548eff1f889$export$9547aaa2e39030ff).Disconnected, "Cannot connect to new Peer after disconnecting from server.");
            return;
        }
        if (!stream) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
            return;
        }
        const mediaConnection = new (0, $548df18aef40ce70$export$4a84e95a2324ac29)(peer, this, {
            ...options,
            _stream: stream
        });
        this._addConnection(peer, mediaConnection);
        return mediaConnection;
    }
    /** Add a data/media connection to this peer. */ _addConnection(peerId, connection) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`add connection ${connection.type}:${connection.connectionId} to peerId:${peerId}`);
        if (!this._connections.has(peerId)) this._connections.set(peerId, []);
        this._connections.get(peerId).push(connection);
    }
    //TODO should be private
    _removeConnection(connection) {
        const connections = this._connections.get(connection.peer);
        if (connections) {
            const index = connections.indexOf(connection);
            if (index !== -1) connections.splice(index, 1);
        }
        //remove from lost messages
        this._lostMessages.delete(connection.connectionId);
    }
    /** Retrieve a data/media connection for this peer. */ getConnection(peerId, connectionId) {
        const connections = this._connections.get(peerId);
        if (!connections) return null;
        for (const connection of connections){
            if (connection.connectionId === connectionId) return connection;
        }
        return null;
    }
    _delayedAbort(type, message) {
        setTimeout(()=>{
            this._abort(type, message);
        }, 0);
    }
    /**
	 * Emits an error message and destroys the Peer.
	 * The Peer is not destroyed if it's in a disconnected state, in which case
	 * it retains its disconnected state and its existing connections.
	 */ _abort(type, message) {
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error("Aborting!");
        this.emitError(type, message);
        if (!this._lastServerId) this.destroy();
        else this.disconnect();
    }
    /**
	 * Destroys the Peer: closes all active connections as well as the connection
	 * to the server.
	 *
	 * :::caution
	 * This cannot be undone; the respective peer object will no longer be able
	 * to create or receive any connections, its ID will be forfeited on the server,
	 * and all of its data and media connections will be closed.
	 * :::
	 */ destroy() {
        if (this.destroyed) return;
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Destroy peer with ID:${this.id}`);
        this.disconnect();
        this._cleanup();
        this._destroyed = true;
        this.emit("close");
    }
    /** Disconnects every connection on this peer. */ _cleanup() {
        for (const peerId of this._connections.keys()){
            this._cleanupPeer(peerId);
            this._connections.delete(peerId);
        }
        this.socket.removeAllListeners();
    }
    /** Closes all connections to this peer. */ _cleanupPeer(peerId) {
        const connections = this._connections.get(peerId);
        if (!connections) return;
        for (const connection of connections)connection.close();
    }
    /**
	 * Disconnects the Peer's connection to the PeerServer. Does not close any
	 *  active connections.
	 * Warning: The peer can no longer create or accept connections after being
	 *  disconnected. It also cannot reconnect to the server.
	 */ disconnect() {
        if (this.disconnected) return;
        const currentId = this.id;
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Disconnect peer with ID:${currentId}`);
        this._disconnected = true;
        this._open = false;
        this.socket.close();
        this._lastServerId = currentId;
        this._id = null;
        this.emit("disconnected", currentId);
    }
    /** Attempts to reconnect with the same ID.
	 *
	 * Only {@apilink Peer.disconnect | disconnected peers} can be reconnected.
	 * Destroyed peers cannot be reconnected.
	 * If the connection fails (as an example, if the peer's old ID is now taken),
	 * the peer's existing connections will not close, but any associated errors events will fire.
	 * should not be called often or at all with a socketio connection
	 */ async reconnect() {
        if (this.disconnected && !this.destroyed) {
            (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).log(`Attempting reconnection to server with ID ${this._lastServerId}`);
            this._disconnected = false;
            await this._initialize(this._lastServerId);
        } else if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
        else if (!this.disconnected && !this.open) // Do nothing. We're still connecting the first time.
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).error("In a hurry? We're still trying to make the initial connection!");
        else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`);
    }
    /**
	 * Get a list of available peer IDs. If you're running your own server, you'll
	 * want to set allow_discovery: true in the PeerServer options. If you're using
	 * the cloud server, email team@peerjs.com to get the functionality enabled for
	 * your key.
	 */ listAllPeers(cb = (_)=>{}) {
        this._api.listAllPeers().then((peers)=>cb(peers)).catch((error)=>this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).ServerError, error));
    }
    constructor(id, options){
        super();
        this._serializers = {
            raw: (0, $aff9818925c2254b$export$6f88fe47d32c9c94),
            json: (0, $3c622b0f037f88a0$export$48880ac635f47186),
            binary: (0, $44e59ecc19afac1f$export$f0a5a64d5bb37108),
            "binary-utf8": (0, $44e59ecc19afac1f$export$f0a5a64d5bb37108),
            default: (0, $44e59ecc19afac1f$export$f0a5a64d5bb37108)
        };
        this._id = null;
        this._lastServerId = null;
        // States.
        this._destroyed = false // Connections have been killed
        ;
        this._disconnected = false // Connection to PeerServer killed but P2P connections still active
        ;
        this._open = false // Sockets and such are not yet open.
        ;
        this._connections = new Map() // All connections for this peer.
        ;
        this._lostMessages = new Map() // src => [list of messages]
        ;
        let userId;
        // Deal with overloading
        if (id && id.constructor == Object) options = id;
        else if (id) userId = id.toString();
        // Configurize options
        options = {
            debug: 0,
            host: (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).CLOUD_HOST,
            port: (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).CLOUD_PORT,
            path: "/",
            key: $fe8dc6b0df9bc4f4$export$ecd1fc136c422448.DEFAULT_KEY,
            token: (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).randomToken(),
            config: (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).defaultConfig,
            referrerPolicy: "strict-origin-when-cross-origin",
            serializers: {},
            clientType: "websocket",
            msgpackType: "peerjs",
            ...options
        };
        this._options = options;
        this._serializers = {
            ...this._serializers,
            ...this.options.serializers
        };
        // Detect relative URL host.
        if (this._options.host === "/") this._options.host = window.location.hostname;
        // Set path correctly.
        if (this._options.path) {
            if (this._options.path[0] !== "/") this._options.path = "/" + this._options.path;
            if (this._options.path[this._options.path.length - 1] !== "/") this._options.path += "/";
        }
        // Set whether we use SSL to same as current host
        if (this._options.secure === undefined && this._options.host !== (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).CLOUD_HOST) this._options.secure = (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).isSecure();
        else if (this._options.host == (0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).CLOUD_HOST) this._options.secure = true;
        // Set a custom log function if present
        if (this._options.logFunction) (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).setLogFunction(this._options.logFunction);
        (0, $5bd1f60cdc4971c6$export$2e2bcd8739ae039).logLevel = this._options.debug || 0;
        this._api = new (0, $1b84fdaf43c333a3$export$2c4e825dc9120f87)(options);
        this._socket = this._createServerConnection();
        // Sanity checks
        // Ensure WebRTC supported
        if (!(0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).supports.audioVideo && !(0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).supports.data) {
            this._delayedAbort((0, $c6218548eff1f889$export$9547aaa2e39030ff).BrowserIncompatible, "The current browser does not support WebRTC");
            return;
        }
        // Ensure alphanumeric id
        if (!!userId && !(0, $ee69724ac22b8c12$export$7debb50ef11d5e0b).validateId(userId)) {
            this._delayedAbort((0, $c6218548eff1f889$export$9547aaa2e39030ff).InvalidID, `ID "${userId}" is invalid`);
            return;
        }
        if (userId) this._initialize(userId).catch((error)=>this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).ServerError, error));
        else if (this.options.clientType === "websocket") this._api.retrieveId().then((id)=>this._initialize(id)).catch((error)=>this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).ServerError, error));
        else this._initialize().catch((error)=>this._abort((0, $c6218548eff1f889$export$9547aaa2e39030ff).ServerError, error));
    }
}
$fe8dc6b0df9bc4f4$export$ecd1fc136c422448.DEFAULT_KEY = "peerjs";


window.peerjs = {
    Peer: $fe8dc6b0df9bc4f4$export$ecd1fc136c422448,
    util: $ee69724ac22b8c12$export$7debb50ef11d5e0b
};
/** @deprecated Should use peerjs namespace */ window.Peer = (0, $fe8dc6b0df9bc4f4$export$ecd1fc136c422448);

})();
//# sourceMappingURL=peerjs.js.map
