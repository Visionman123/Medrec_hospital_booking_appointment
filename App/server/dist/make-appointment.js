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
    execute: (connection, doctor_id, patient_id, selectedDate, selectedTime) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (yield connection).query(`SELECT doctor_id FROM public.appointment WHERE doctor_id = ${doctor_id} AND patient_id = ${patient_id} AND date = '${selectedDate}'`);
        //if patient already booked that day
        if (result.rows.length != 0) {
            return "You have already booked this day";
        }
        yield (yield connection).query(`INSERT INTO public.appointment values(${doctor_id}, ${patient_id}, '${selectedDate}', '${selectedTime}')`);
        return "Appointment Made";
    })
};
