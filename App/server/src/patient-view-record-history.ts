import { PoolClient } from 'pg';


import getPatientInfo from './handlers/get-patient-info';
import PatientRecord from './utils/PatientRecordInterface';
import getPatientHistory from './handlers/get-patient-history';
import getPatientPrescription from './handlers/get-patient-prescription';





export default {
    execute: async (connection: Promise<PoolClient>, patient_id: number, doctor_id: number, presdate: string) => {
        const patientInfo = await getPatientInfo.execute(connection, patient_id);
        const patientHistory = await getPatientHistory.execute(connection, patient_id);
        const patientPrescriptions = await getPatientPrescription.execute(connection, doctor_id, patient_id, presdate);
        const patient: PatientRecord = {info: patientInfo, history: patientHistory, prescription: patientPrescriptions};

        return patient;
    }
}
