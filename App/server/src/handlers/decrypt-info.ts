import CryptoJS from 'crypto-js';

import dotenv from 'dotenv';
dotenv.config();

import PatientInfo from '../utils/PatientInfoInterface';

const patientInfoKey = process.env.INFO_KEY;

export default {
    execute: (encryptedPatientInfo: PatientInfo) => {
        const firstName = CryptoJS.AES.decrypt(encryptedPatientInfo.firstName, patientInfoKey).toString(CryptoJS.enc.Utf8);
        const lastName = CryptoJS.AES.decrypt(encryptedPatientInfo.lastName, patientInfoKey).toString(CryptoJS.enc.Utf8);
        const phone = CryptoJS.AES.decrypt(encryptedPatientInfo.phone, patientInfoKey).toString(CryptoJS.enc.Utf8);
        const address = CryptoJS.AES.decrypt(encryptedPatientInfo.address, patientInfoKey).toString(CryptoJS.enc.Utf8);
        const email = CryptoJS.AES.decrypt(encryptedPatientInfo.email, patientInfoKey).toString(CryptoJS.enc.Utf8);
        const dob = encryptedPatientInfo.dob;
        const sex = encryptedPatientInfo.sex;
        const notes = encryptedPatientInfo.notes;
        return {firstName, lastName, phone, address, email, dob, sex, notes};
    } 
}
