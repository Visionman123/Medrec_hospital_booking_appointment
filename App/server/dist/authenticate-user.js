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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const decrypt_password_1 = __importDefault(require("./handlers/decrypt-password"));
const secretKey = process.env.SECRET_KEY;
exports.default = {
    execute: (connection, username, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield getUserInfo(yield connection, username, password);
        //sucess
        if (user) {
            const payload1 = {
                username: user.username,
                role: user.role,
                exp: Date.now() / 1000 + 10 * 60,
            };
            const token = jsonwebtoken_1.default.sign(payload1, secretKey);
            const decoded = jsonwebtoken_1.default.verify(token, secretKey); //add to db only
            const payload2 = {
                username: user.username,
                role: user.role,
                exp: Date.now() / 1000 + 25 * 60,
            };
            const refreshToken = jsonwebtoken_1.default.sign(payload2, secretKey);
            const decodedRef = jsonwebtoken_1.default.verify(refreshToken, secretKey);
            const userid = user.userid;
            const encryptedPassword = user.password;
            yield (yield connection).query(`UPDATE public.hms_user SET auth_token = '${token}', generate_at = ${Math.round(decoded.iat)}, 
                expire_at = ${Math.round(decoded.exp)}, ref_auth_token = '${refreshToken}', 
                ref_generate_at = ${Math.round(decodedRef.iat)}, ref_expire_at = ${Math.round(decodedRef.exp)}
                WHERE username = '${username}' AND password = '${encryptedPassword}'`);
            return { userid, token, refreshToken };
        }
    })
};
function getUserInfo(connection, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection.query(`SELECT user_id, username, password, left(cast(user_id as Varchar), 1) as role FROM public.hms_user WHERE username = '${username}'`);
        if (result.rows.length != 0) {
            const decryptedPassword = decrypt_password_1.default.execute(result.rows[0].password);
            if (decryptedPassword === password) {
                const user = {
                    userid: result.rows[0].user_id,
                    username: result.rows[0].username,
                    password: result.rows[0].password,
                    role: result.rows[0].role,
                };
                return user;
            }
        }
    });
}
