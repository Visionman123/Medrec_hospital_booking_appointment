import { PoolClient } from 'pg';

import Prescription from '../utils/PrescriptionInterface';

export default {
    execute: async (connection: Promise<PoolClient>, doctor_id: number, patient_id: number, presdate: string) => {
        const result = await (await connection).query(
            `SELECT p.diagnosis, p.indications, m.medname, pm.purpose, pm.dosage, pm.route, pm.frequency FROM public.prescription p 
                LEFT JOIN public.pres_med pm ON p.pres_id = pm.pres_id 
                LEFT JOIN medicine m ON pm.med_id = m.med_id
                WHERE doctor_id = ${doctor_id} AND patient_id = ${patient_id} AND presdate = '${presdate}'`
          );
        
          const prescriptions: Prescription[] = [];
          result.rows.forEach((row) => {
            const prescription: Prescription = {
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
    }
}
