"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./connection");
const users_1 = __importDefault(require("./users"));
const populate_1 = __importDefault(require("./populate"));
const characters_1 = __importDefault(require("./characters"));
exports.populate = populate_1.default(global.connection);
exports.users = users_1.default(global.connection);
exports.characters = characters_1.default(global.connection);
exports.default = {
    users: exports.users,
    characters: exports.characters,
};
//# sourceMappingURL=index.js.map