import CryptoJS from 'crypto-js';

import dotenv from 'dotenv';
dotenv.config();

import PatientInfo from '../utils/PatientInfoInterface';

const patientInfoKey = process.env.INFO_KEY;

export default {
    execute: (patientInfo: PatientInfo) => {
        const encryptedFirstName = CryptoJS.AES.encrypt(patientInfo.firstName, patientInfoKey);
        const encryptedLastName = CryptoJS.AES.encrypt(patientInfo.lastName, patientInfoKey);
        const encryptedPhone = CryptoJS.AES.encrypt(patientInfo.phone, patientInfoKey);
        const encryptedAddress = CryptoJS.AES.encrypt(patientInfo.address, patientInfoKey);
        const encryptedEmail = CryptoJS.AES.encrypt(patientInfo.email, patientInfoKey);
        const dob = patientInfo.dob;
        const sex = patientInfo.sex;
        const notes = patientInfo.notes;

        return {encryptedFirstName, encryptedLastName, encryptedPhone, encryptedAddress, encryptedEmail, dob, sex, notes};
    } 
}
