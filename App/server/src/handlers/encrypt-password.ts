import CryptoJS from 'crypto-js';

import dotenv from 'dotenv';
dotenv.config();

const passwordKey = process.env.PASSWORD_KEY;


export default {
    execute: (password: string) => {
        const encryptedPassword = CryptoJS.AES.encrypt(password, passwordKey);
        // console.log(encryptedPassword);
        return encryptedPassword;
    } 
}
