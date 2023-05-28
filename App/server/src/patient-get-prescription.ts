import { PoolClient } from 'pg';


interface Prescription {
    diagnosis: string,
    indications: string,
    prescriptionDate: string,
    doctorName: string,
}


export default {
    execute: async (connection: Promise<PoolClient>, doctor_id: number, patient_id: number) => {
        const prescriptions: Prescription[] = [];
        const result = await (await connection).query(
            `SELECT p.presdate, p.diagnosis, p.indications, d.first_name
            FROM public.prescription p join public.doctor d ON p.doctor_id = d.doctor_id
            WHERE p.patient_id = ${patient_id}`);

        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const prescription: Prescription = {
                    diagnosis: row.diagnosis, 
                    indications: row.indications,
                    prescriptionDate: row.presdate, 
                    doctorName: row.first_name
                };
                prescriptions.push(prescription);
            })
        }
        return prescriptions;
    }
}



