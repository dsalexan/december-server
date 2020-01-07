"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const debug_1 = __importDefault(require("debug"));
exports.info = debug_1.default('december');
exports.warn = debug_1.default('december');
exports.error = debug_1.default('december');
// info.log = console.log.bind(console)
// warn.log = console.warn.bind(console)
// error.log = console.error.bind(console)
exports.not = exports.info.extend('notification');
exports.routes = exports.info.extend('routes');
exports.default = {
    info: exports.info,
    warn: exports.warn,
    error: exports.error,
    not: exports.not,
    routes: exports.routes,
};
//# sourceMappingURL=debug.js.map