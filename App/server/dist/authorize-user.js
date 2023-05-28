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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    execute: (connection, payload) => __awaiter(void 0, void 0, void 0, function* () {
        //JSONify
        const payloadObject = JSON.parse(payload);
        return yield authorize(yield connection, payloadObject);
    })
};
function authorize(connection, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = payload.username;
        const tokenExp = Math.round(payload.exp); // round decimal 
        const generateAt = Math.round(payload.iat);
        const result = yield connection.query(`SELECT user_id FROM public.hms_user WHERE username = '${username}' AND generate_at = ${generateAt} AND expire_at = ${tokenExp}`);
        //user exists
        if (result.rows.length != 0) {
            //not expired
            if (Math.round(Date.now() / 1000) <= tokenExp) {
                return 200;
            }
            console.log("Token expired");
        }
    });
}
