"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname)));
/*
 * Initialise Pusher
 */
const pusher_1 = __importDefault(require("pusher"));
const pusher = new pusher_1.default({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.CLUSTER,
});
/*
 * Define post route for creating new reviews
 */
app.post('/review', (req, res) => {
    pusher.trigger('reviews', 'review_added', { review: req.body });
    res.status(200).send();
});
/*
 * Run app
 */
const port = 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
//# sourceMappingURL=index.js.map