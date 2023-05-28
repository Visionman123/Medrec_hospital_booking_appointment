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
const encrypt_info_1 = __importDefault(require("./handlers/encrypt-info"));
exports.default = {
    execute: (connection, patientId, firstName, lastName, dob, sex, email, phone, address, notes) => __awaiter(void 0, void 0, void 0, function* () {
        let info = {
            lastName: lastName,
            firstName: firstName,
            dob: dob,
            sex: sex,
            address: address,
            email: email,
            phone: phone,
            notes: notes
        };
        //encrypt data
        let encryptedInfo = encrypt_info_1.default.execute(info);
        let result = yield (yield connection).query(`SELECT patient_id FROM public.patient WHERE patient_id = ${patientId}`);
        //patient already exists
        if (result.rows.length != 0) {
            yield (yield connection).query(`UPDATE public.patient 
                SET first_name = '${encryptedInfo.encryptedFirstName}', last_name = '${encryptedInfo.encryptedLastName}', dob = '${new Date(dob).toLocaleDateString()}',
                sex = '${sex}', email = '${encryptedInfo.encryptedEmail}', phone = '${encryptedInfo.encryptedPhone}', address = '${encryptedInfo.encryptedAddress}', notes = '${notes}' WHERE patient_id = ${patientId}`);
        }
        else {
            yield (yield connection).query(`INSERT INTO public.patient (patient_id, first_name, last_name, dob, sex, email, phone, address, notes)
                VALUES (${patientId}, '${encryptedInfo.encryptedFirstName}', '${encryptedInfo.encryptedLastName}', 
                '${new Date(dob).toLocaleDateString()}', '${sex}', '${encryptedInfo.encryptedEmail}', 
                '${encryptedInfo.encryptedPhone}', '${encryptedInfo.encryptedAddress}', '${notes}')`);
        }
    })
};
