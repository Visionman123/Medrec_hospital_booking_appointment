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
        const appointments = [];
        const today = new Date().toLocaleDateString();
        const result = yield (yield connection).query(`SELECT concat('Dr. ', d.first_name) as name, a.date, a.time, d.room FROM public.appointment a JOIN public.doctor d 
            ON a.doctor_id = d.doctor_id WHERE a.patient_id = '${patient_id}' AND a.date >= '${today}'`);
        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const appointment = { doctorName: row.name, date: row.date.toLocaleDateString(), time: row.time, room: row.room };
                appointments.push(appointment);
            });
        }
        return appointments;
    })
};
