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
const get_patient_prescription_1 = __importDefault(require("./handlers/get-patient-prescription"));
exports.default = {
    execute: (connection, doctor_id, patient_id, presdate) => __awaiter(void 0, void 0, void 0, function* () {
        const patientInfo = yield get_patient_info_1.default.execute(connection, patient_id);
        const patientPrescriptions = yield get_patient_prescription_1.default.execute(connection, doctor_id, patient_id, presdate);
        const patient = {
            info: patientInfo,
            prescription: patientPrescriptions,
            history: []
        };
        return patient;
    })
};
