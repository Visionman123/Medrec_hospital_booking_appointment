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
const format_today_1 = __importDefault(require("./handlers/format-today"));
exports.default = {
    execute: (connection, doctor_id, patient_id, indications, diagnosis) => __awaiter(void 0, void 0, void 0, function* () {
        const today = format_today_1.default.execute();
        yield (yield connection).query(`INSERT INTO public.prescription(pres_id, doctor_id, patient_id, presdate, indications, diagnosis)
            VALUES ((SELECT max(pres_id) + 1 FROM public.prescription), ${doctor_id}, ${patient_id}, '${today}', '${indications}', '${diagnosis}')`);
        const result = yield (yield connection).query(`SELECT pres_id FROM public.prescription WHERE doctor_id = ${doctor_id} AND patient_id = ${patient_id} AND presdate = '${today}'`);
        console.log(result.rows[0].pres_id);
        return result.rows[0].pres_id;
    })
};
