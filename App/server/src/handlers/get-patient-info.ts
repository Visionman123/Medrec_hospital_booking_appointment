import { PoolClient } from 'pg';

import PatientInfo from '../utils/PatientInfoInterface';
import decryptInfo from './decrypt-info';

export default {
    execute: async (connection: Promise<PoolClient>, patient_id: number) => {
        const result = await (await connection).query(
            `SELECT last_name, first_name, dob, sex, address, email, phone, notes FROM public.patient p WHERE p.patient_id = ${patient_id}`
        );
        if (result.rows.length != 0) {
            let info: PatientInfo = {
                lastName: result.rows[0].last_name, 
                firstName: result.rows[0].first_name, 
                dob: result.rows[0].dob.toLocaleDateString(), 
                sex: result.rows[0].sex, 
                address: result.rows[0].address, 
                email: result.rows[0].email, 
                phone: result.rows[0].phone,
                notes: result.rows[0].notes
            };
            
            //decrypted info
            info = decryptInfo.execute(info);
            return info;
        }
    }
}
