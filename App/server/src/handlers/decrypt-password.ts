import CryptoJS from 'crypto-js';

import dotenv from 'dotenv';
dotenv.config();

import PatientInfo from '../utils/PatientInfoInterface';

const passwordKey = process.env.PASSWORD_KEY;

export default {
    execute: (encryptedPassword: CryptoJS.lib.CipherParams) => {
        const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, passwordKey).toString(CryptoJS.enc.Utf8);

        return decryptedPassword;
    } 
}
