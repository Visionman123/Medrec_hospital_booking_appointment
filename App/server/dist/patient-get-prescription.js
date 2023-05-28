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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    execute: (connection, doctor_id, patient_id) => __awaiter(void 0, void 0, void 0, function* () {
        const prescriptions = [];
        const result = yield (yield connection).query(`SELECT p.presdate, p.diagnosis, p.indications, d.first_name
            FROM public.prescription p join public.doctor d ON p.doctor_id = d.doctor_id
            WHERE p.patient_id = ${patient_id}`);
        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const prescription = {
                    diagnosis: row.diagnosis,
                    indications: row.indications,
                    prescriptionDate: row.presdate,
                    doctorName: row.first_name
                };
                prescriptions.push(prescription);
            });
        }
        return prescriptions;
    })
};
