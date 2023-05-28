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
const decrypt_info_1 = __importDefault(require("./decrypt-info"));
exports.default = {
    execute: (connection, patient_id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (yield connection).query(`SELECT last_name, first_name, dob, sex, address, email, phone, notes FROM public.patient p WHERE p.patient_id = ${patient_id}`);
        if (result.rows.length != 0) {
            let info = {
                lastName: result.rows[0].last_name,
                firstName: result.rows[0].first_name,
                dob: result.rows[0].dob.toLocaleDateString(),
                sex: result.rows[0].sex,
                address: result.rows[0].address,
                email: result.rows[0].email,
                phone: result.rows[0].phone,
                notes: result.rows[0].notes
            };
            //decrypted info
            info = decrypt_info_1.default.execute(info);
            return info;
        }
    })
};
