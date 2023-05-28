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
    execute: (connection) => __awaiter(void 0, void 0, void 0, function* () {
        const doctors = yield getDoctors(yield connection);
        yield populateAppointments(yield connection, doctors);
        return doctors;
    })
};
function getDoctors(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        let doctors = [];
        const result = yield connection.query(`SELECT doctor_id, concat('Dr. ', first_name) AS name, sex, dob, phone, email, de.dep_name FROM public.doctor d JOIN department de
        ON d.dep_id = de.dep_id`);
        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const doctor = {
                    id: row.doctor_id,
                    name: row.name,
                    sex: row.sex,
                    dob: row.dob,
                    phone: row.phone,
                    email: row.email,
                    department: row.dep_name,
                    bookedPeriods: [],
                };
                doctors.push(doctor);
            });
        }
        return doctors;
    });
}
function populateAppointments(connection, doctors) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < doctors.length; i++) {
            const doctor = doctors[i];
            const result = yield connection.query(`SELECT a.date, a.time FROM public.doctor d JOIN public.appointment a ON d.doctor_id = a.doctor_id WHERE d.doctor_id = ${doctor.id}`);
            result.rows.forEach(row => {
                const date = new Date(row.date).toLocaleDateString();
                const bookedPeriod = { date: date, time: row.time };
                doctor.bookedPeriods.push(bookedPeriod);
            });
        }
    });
}
