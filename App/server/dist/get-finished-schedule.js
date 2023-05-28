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
const crypto_js_1 = __importDefault(require("crypto-js"));
const format_today_1 = __importDefault(require("./handlers/format-today"));
const patientInfoKey = process.env.INFO_KEY;
exports.default = {
    execute: (connection, doctor_id) => __awaiter(void 0, void 0, void 0, function* () {
        const today = format_today_1.default.execute();
        const result = yield (yield connection).query(`select a.time, p.patient_id, p.last_name, p.first_name from public.patient p natural join public.appointment a 
            join public.prescription pres on pres.patient_id = a.patient_id and pres.doctor_id = a.doctor_id 
            and pres.presdate = a.date where presdate = '${today}' and a.doctor_id = ${doctor_id} order by a.time`);
        const schedule = [];
        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const patient = { id: row.patient_id, name: decryptPatientName(row.first_name, row.last_name) };
                const appointment = { time: row.time, patient: patient };
                schedule.push(appointment);
            });
        }
        return schedule;
    })
};
function decryptPatientName(firstName, lastName) {
    const first_name = crypto_js_1.default.AES.decrypt(firstName, patientInfoKey).toString(crypto_js_1.default.enc.Utf8);
    const last_name = crypto_js_1.default.AES.decrypt(lastName, patientInfoKey).toString(crypto_js_1.default.enc.Utf8);
    return first_name + " " + last_name;
}
