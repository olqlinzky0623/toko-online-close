"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IN_PROD = exports.APP_PORT = exports.NODE_ENV = void 0;
_a = process.env, _b = _a.NODE_ENV, exports.NODE_ENV = _b === void 0 ? 'development' : _b, _c = _a.APP_PORT, exports.APP_PORT = _c === void 0 ? 3000 : _c;
exports.IN_PROD = exports.NODE_ENV === 'production';
