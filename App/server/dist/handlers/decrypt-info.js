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
    execute: (encryptedPatientInfo) => {
        const firstName = crypto_js_1.default.AES.decrypt(encryptedPatientInfo.firstName, patientInfoKey).toString(crypto_js_1.default.enc.Utf8);
        const lastName = crypto_js_1.default.AES.decrypt(encryptedPatientInfo.lastName, patientInfoKey).toString(crypto_js_1.default.enc.Utf8);
        const phone = crypto_js_1.default.AES.decrypt(encryptedPatientInfo.phone, patientInfoKey).toString(crypto_js_1.default.enc.Utf8);
        const address = crypto_js_1.default.AES.decrypt(encryptedPatientInfo.address, patientInfoKey).toString(crypto_js_1.default.enc.Utf8);
        const email = crypto_js_1.default.AES.decrypt(encryptedPatientInfo.email, patientInfoKey).toString(crypto_js_1.default.enc.Utf8);
        const dob = encryptedPatientInfo.dob;
        const sex = encryptedPatientInfo.sex;
        const notes = encryptedPatientInfo.notes;
        return { firstName, lastName, phone, address, email, dob, sex, notes };
    }
};
