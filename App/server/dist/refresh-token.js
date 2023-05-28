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
const secretKey = process.env.SECRET_KEY;
exports.default = {
    execute: (connection, refPayload) => __awaiter(void 0, void 0, void 0, function* () {
        //JSONify
        const payloadObject = JSON.parse(refPayload);
        if (!(yield isExpired(yield connection, payloadObject))) {
            const regenPayload = {
                username: payloadObject.username,
                role: payloadObject.role,
                exp: Date.now() / 1000 + 10 * 60,
            };
            const token = jsonwebtoken_1.default.sign(regenPayload, secretKey);
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            yield (yield connection).query(`UPDATE public.hms_user SET auth_token = '${token}', generate_at = ${Math.round(decoded.iat)}, 
                expire_at = ${Math.round(decoded.exp)} WHERE username = '${payloadObject.username}'`);
            return token;
        }
    })
};
function isExpired(connection, refPayload) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = refPayload.username;
        const refTokenExp = Math.round(refPayload.exp); // round decimal 
        const refGenerateAt = Math.round(refPayload.iat);
        const result = yield connection.query(`SELECT user_id FROM public.hms_user WHERE username = '${username}' AND ref_generate_at = ${refGenerateAt} AND ref_expire_at = ${refTokenExp}`);
        //user exists
        if (result.rows.length != 0) {
            //not expired
            if (Math.round(Date.now() / 1000) <= refTokenExp) {
                return false;
            }
            console.log("Refresh token expired");
            return true;
        }
    });
}
