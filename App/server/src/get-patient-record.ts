import { PoolClient } from 'pg';

import PatientInfo from './utils/PatientInfoInterface';

import getPatientInfo from './handlers/get-patient-info';

interface Prescription {
    prescriptionDate: Date,
    diagnosis: string,
    doctorName: string
}


interface Patient {
   info: PatientInfo,
   history: Prescription[],
   
}

export default {
    execute: async (connection: Promise<PoolClient>, patient_id: number) => {
        const patientInfo = await getPatientInfo.execute(connection, patient_id);
        const patientHistory = await getPatientHistory(await connection, patient_id);
        const patient: Patient = {info: patientInfo, history: patientHistory};

        return patient;
    }
}


async function getPatientHistory(connection: PoolClient, patient_id: number) {
    
    const result = await connection.query(
        `SELECT p.presdate, p.diagnosis, concat('Dr. ', d.first_name) AS name
        FROM public.prescription p NATURAL JOIN doctor d WHERE patient_id = ${patient_id}`
    );

    const prescriptionHistory: Prescription[] = [];
    if (result.rows.length != 0) {
        result.rows.forEach(row => {
            const prescription: Prescription = {
                prescriptionDate: row.presdate.toLocaleDateString(), 
                diagnosis: row.diagnosis,
                doctorName: row.name
            };
            prescriptionHistory.push(prescription);
        })
    }

    return prescriptionHistory;
}