"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pusher_1 = __importDefault(require("pusher"));
const v4_1 = __importDefault(require("uuid/v4"));
const debug_1 = require("./debug");
if (global.pusher === undefined) {
    const pusher = new pusher_1.default({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.CLUSTER,
    });
    // const client = new Client(process.env.PUSHER_APP_KEY, {
    //   cluster: process.env.CLUSTER,
    // })
    // client.connection.bind('disconnected', (context, data) => {
    //   console.log('DISCONNECTION', context, data)
    // })
    global.pusher = (event, from, data, path = []) => {
        const hash = v4_1.default().substr(0, 13);
        debug_1.not(`Triggered event (${hash})`, event, 'at path', path, 'from', from);
        pusher.trigger('december', event, { hash, from, path, data });
        return hash;
    };
}
exports.default = global.pusher;
//# sourceMappingURL=pusher.js.map