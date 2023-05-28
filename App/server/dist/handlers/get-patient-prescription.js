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
    execute: (connection, doctor_id, patient_id, presdate) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (yield connection).query(`SELECT p.diagnosis, p.indications, m.medname, pm.purpose, pm.dosage, pm.route, pm.frequency FROM public.prescription p 
                LEFT JOIN public.pres_med pm ON p.pres_id = pm.pres_id 
                LEFT JOIN medicine m ON pm.med_id = m.med_id
                WHERE doctor_id = ${doctor_id} AND patient_id = ${patient_id} AND presdate = '${presdate}'`);
        const prescriptions = [];
        result.rows.forEach((row) => {
            const prescription = {
                diagnosis: row.diagnosis,
                indications: row.indications,
                medName: row.medname,
                dosage: row.dosage,
                purpose: row.purpose,
                method: row.route,
                time: row.frequency,
            };
            prescriptions.push(prescription);
        });
        return prescriptions;
    })
};
