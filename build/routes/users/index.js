"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import uuid from 'uuid/v4'
const lodash_1 = __importDefault(require("lodash"));
const pusher_1 = __importDefault(require("../../pusher"));
const queries_1 = require("../../queries");
const router = express_1.default.Router();
const USERS = {};
const USERS_ONLINE_CONTROL = {
    dsalexan: undefined,
    mario: undefined,
};
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const asIndex = req.query.asIndex || false;
    const result = yield queries_1.users.all();
    res.status(200).json(!asIndex ? result : result.reduce((obj, user) => (Object.assign(Object.assign({}, obj), { [user._id]: user })), {}));
}));
router.get('/:player', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = req.params.player;
    const user = yield queries_1.users.byId(player);
    if (user) {
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    else {
        return res.status(404).json({
            success: false,
            error: `User <${player}> doesn't exists`,
        });
    }
}));
router.get('/:player/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = req.params.player;
    const status = yield queries_1.users.statusById(player);
    if (status) {
        res.status(200).json({
            success: true,
            data: status,
        });
    }
    else {
        return res.status(404).json({
            success: false,
            error: `User <${player}> doesn't exists`,
        });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = req.body.player;
    const _id = player;
    if (yield queries_1.users.exists(_id)) {
        return res.status(409).json({
            success: false,
            error: `User <${player}> already exists`,
        });
    }
    yield queries_1.users.insertUser({
        _id,
        __created_at: new Date(),
        __modified_at: new Date(),
        __sessions: [],
        __last_session: {
            useragent: req.useragent,
            timestamp: new Date(),
        },
        player,
        status: 'offline',
        permissions: {
            __GLOBAL__: {},
            __CHARACTER__: {},
        },
    });
    USERS_ONLINE_CONTROL[_id] = undefined;
    const hash = pusher_1.default('user:added', `${req.method} ${req.originalUrl}`, { user: USERS[_id] });
    const hash2 = pusher_1.default('user:updated', `${req.method} ${req.originalUrl}`, { user: USERS[_id] });
    res.status(201).json({
        success: true,
        ignore: [hash, hash2],
    });
}));
router.put('/:player/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = req.params.player;
    const status = req.query.status;
    const new_session = {
        useragent: req.useragent,
        timestamp: new Date(),
    };
    if (status === undefined) {
        return res.status(400).json({
            success: false,
            error: 'New status is required to update online status',
        });
    }
    const oldStatus = yield queries_1.users.statusById(player);
    const exists = oldStatus !== undefined;
    if (exists) {
        if (status === 'online') {
            yield queries_1.users.updateStatusById(player, status, new_session);
            if (USERS_ONLINE_CONTROL[player] !== undefined)
                clearTimeout(USERS_ONLINE_CONTROL[player]);
            USERS_ONLINE_CONTROL[player] = setTimeout(function () {
                // TODO: Split in domain logic to be able to call changeStatus here
                queries_1.users.updateStatusById(player, 'offline');
                pusher_1.default(`user:updated`, 'server idle timeout', { user: player, status: 'offline', last_session: new_session }, [
                    'status',
                ]);
            }, 6 * 60 * 1000);
        }
        else if (status === 'offline') {
            yield queries_1.users.updateStatusById(player, status);
            if (USERS_ONLINE_CONTROL[player]) {
                clearTimeout(USERS_ONLINE_CONTROL[player]);
                USERS_ONLINE_CONTROL[player] = undefined;
            }
        }
        if (oldStatus !== status) {
            const hash = pusher_1.default(`user:updated`, `${req.method} ${req.originalUrl}`, { user: player, status, last_session: new_session }, ['status']);
            res.status(200).json({
                success: true,
                ignore: [hash],
            });
        }
        else {
            res.status(200).json({
                success: false,
                note: `Status was already ${status} for user ${player}`,
            });
        }
    }
    else {
        return res.status(404).json({
            success: false,
            error: `User <${player}> doesn't exists`,
        });
    }
}));
router.put('/:player/permissions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = req.params.player;
    const permissions = req.body.permissions;
    if (yield queries_1.users.exists(player)) {
        const oldPermissions = yield queries_1.users.permissionsById(player);
        if (!lodash_1.default.isEqual(oldPermissions, permissions)) {
            yield queries_1.users.updatePermissionsById(player, permissions);
            const hash = pusher_1.default(`user:updated`, `${req.method} ${req.originalUrl}`, { user: player, permissions }, [
                'permissions',
            ]);
            res.status(200).json({
                success: true,
                ignore: [hash],
            });
        }
        else {
            res.status(200).json({
                success: false,
                note: `Permissions, new value equals old for user ${player}`,
            });
        }
    }
    else {
        return res.status(404).json({
            success: false,
            error: `User <${player}> doesn't exists`,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map