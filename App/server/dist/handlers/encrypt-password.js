"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passwordKey = process.env.PASSWORD_KEY;
exports.default = {
    execute: (password) => {
        const encryptedPassword = crypto_js_1.default.AES.encrypt(password, passwordKey);
        // console.log(encryptedPassword);
        return encryptedPassword;
    }
};
