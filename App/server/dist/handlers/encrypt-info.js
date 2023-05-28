"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const patientInfoKey = process.env.INFO_KEY;
exports.default = {
    execute: (patientInfo) => {
        const encryptedFirstName = crypto_js_1.default.AES.encrypt(patientInfo.firstName, patientInfoKey);
        const encryptedLastName = crypto_js_1.default.AES.encrypt(patientInfo.lastName, patientInfoKey);
        const encryptedPhone = crypto_js_1.default.AES.encrypt(patientInfo.phone, patientInfoKey);
        const encryptedAddress = crypto_js_1.default.AES.encrypt(patientInfo.address, patientInfoKey);
        const encryptedEmail = crypto_js_1.default.AES.encrypt(patientInfo.email, patientInfoKey);
        const dob = patientInfo.dob;
        const sex = patientInfo.sex;
        const notes = patientInfo.notes;
        return { encryptedFirstName, encryptedLastName, encryptedPhone, encryptedAddress, encryptedEmail, dob, sex, notes };
    }
};
