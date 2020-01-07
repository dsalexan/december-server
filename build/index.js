"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = require("./debug");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_useragent_1.default.express());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname)));
app.use((req, res, next) => {
    debug_1.routes(`${req.method} ${req.path} (${req.originalUrl})`);
    next();
});
const routes_1 = require("./routes");
const queries_1 = require("./queries");
app.use('/users', routes_1.users);
app.use('/tracker', routes_1.tracker);
app.get('/database/populate', (req, res) => {
    queries_1.populate.users();
});
const port = 5000;
app.listen(port, () => {
    debug_1.info(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map