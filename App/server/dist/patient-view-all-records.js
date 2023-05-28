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
    execute: (connection, patient_id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (yield connection).query(`SELECT a.date, p.diagnosis, concat('Dr. ', d.first_name) AS name, d.doctor_id
            FROM public.appointment a, public.prescription p, public.doctor d
            WHERE a.doctor_id = d.doctor_id AND a.date = p.presdate AND a.patient_id = p.patient_id AND a.doctor_id = p.doctor_id
            AND a.patient_id = ${patient_id}`);
        const histories = [];
        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const history = {
                    prescriptionDate: row.date.toLocaleDateString(),
                    diagnosis: row.diagnosis,
                    doctorName: row.name,
                    doctorId: row.doctor_id
                };
                histories.push(history);
            });
        }
        return histories;
    })
};
