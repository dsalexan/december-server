"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
if (global.connection === undefined) {
    const connection = pg_promise_1.default()({
        host: 'localhost',
        port: 5432,
        database: 'december',
        user: 'postgres',
        password: 'thinker',
    });
    global.connection = connection;
}
//# sourceMappingURL=connection.js.map