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
const debug_1 = __importDefault(require("../../debug"));
const info = debug_1.default.error.extend('adapter:users');
const error = debug_1.default.error.extend('adapter:users');
function makeUsersAdapter(connection) {
    function all() {
        info('Select all users');
        return connection.query(`SELECT * FROM users`);
    }
    function exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield connection.query('SELECT * FROM users WHERE _id = $1', [id])).length > 0;
        });
    }
    function byId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            info('Select user by id', id);
            const result = yield connection.query(`SELECT * FROM users WHERE _id = $1`, [id]);
            if (result.length > 1)
                error(`Query for user idd <${id}> returned ${result.length} entries`);
            return result[0];
        });
    }
    function statusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            info('Select user status by id', id);
            const result = yield connection.query(`SELECT status FROM users WHERE _id = $1`, [id]);
            if (result.length > 1)
                error(`Query for user idd <${id}> returned ${result.length} entries`);
            return (result[0] || {}).status;
        });
    }
    function permissionsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            info('Select user permissions by id', id);
            const [{ permissions }] = yield connection.query(`SELECT permissions FROM users WHERE _id = ${id}`, { id });
            return permissions;
        });
    }
    function insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            info('Insert user', user._id);
            const userExists = yield exists(user._id);
            if (userExists) {
                error(`User id ${user._id} already exists`);
                return false;
            }
            yield connection.query('INSERT INTO users VALUES (${_id}, ${__created_at}, ${__modified_at}, ${__sessions}, ${__last_session}, ${player}, ${status}, ${permissions})', user);
            return true;
        });
    }
    function updateStatusById(id, status, new_session) {
        return __awaiter(this, void 0, void 0, function* () {
            info('Update status by id', id);
            const userExists = yield exists(id);
            if (!userExists) {
                error(`User id ${id} doesnt exists`);
                return false;
            }
            if (new_session) {
                yield connection.query('UPDATE users SET status = ${status}, __sessions = array_append(__sessions, __last_session), __last_session = ${last_session} WHERE _id = ${id}', {
                    id,
                    status,
                    last_session: new_session,
                });
            }
            else {
                yield connection.query('UPDATE users SET status = ${status} WHERE _id = ${id}', {
                    id,
                    status,
                });
            }
            return true;
        });
    }
    function updatePermissionsById(id, permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            info('Update permissions by id', id);
            const userExists = yield exists(id);
            if (!userExists) {
                error(`User id ${id} doesnt exists`);
                return false;
            }
            debugger;
            connection.query(`UPDATE users SET permissions = ${permissions} WHERE _id = ${id}`, { id, permissions });
            return true;
        });
    }
    return Object.freeze({
        all,
        exists,
        byId,
        statusById,
        permissionsById,
        insertUser,
        updateStatusById,
        updatePermissionsById,
    });
}
exports.default = makeUsersAdapter;
//# sourceMappingURL=index.js.map