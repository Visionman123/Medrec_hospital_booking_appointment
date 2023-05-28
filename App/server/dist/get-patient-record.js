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
const get_patient_info_1 = __importDefault(require("./handlers/get-patient-info"));
exports.default = {
    execute: (connection, patient_id) => __awaiter(void 0, void 0, void 0, function* () {
        const patientInfo = yield get_patient_info_1.default.execute(connection, patient_id);
        const patientHistory = yield getPatientHistory(yield connection, patient_id);
        const patient = { info: patientInfo, history: patientHistory };
        return patient;
    })
};
function getPatientHistory(connection, patient_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield connection.query(`SELECT p.presdate, p.diagnosis, concat('Dr. ', d.first_name) AS name
        FROM public.prescription p NATURAL JOIN doctor d WHERE patient_id = ${patient_id}`);
        const prescriptionHistory = [];
        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const prescription = {
                    prescriptionDate: row.presdate.toLocaleDateString(),
                    diagnosis: row.diagnosis,
                    doctorName: row.name
                };
                prescriptionHistory.push(prescription);
            });
        }
        return prescriptionHistory;
    });
}
