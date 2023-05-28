import { PoolClient } from 'pg';
import encryptInfo from './handlers/encrypt-info';
import PatientInfo from './utils/PatientInfoInterface';


export default {
    execute: async (connection: Promise<PoolClient>, patientId: number, firstName: string, lastName: string, dob: string, sex: string, 
        email: string, phone: string, address: string, notes: string) => {
        
        let info: PatientInfo = {
            lastName: lastName,
            firstName: firstName,
            dob: dob,
            sex: sex,
            address: address,
            email: email,
            phone: phone,
            notes: notes
        };

        //encrypt data
        let encryptedInfo = encryptInfo.execute(info);

        let result = await (await connection).query(`SELECT patient_id FROM public.patient WHERE patient_id = ${patientId}`);
        //patient already exists
        if (result.rows.length != 0) {
            await (await connection).query(
                `UPDATE public.patient 
                SET first_name = '${encryptedInfo.encryptedFirstName}', last_name = '${encryptedInfo.encryptedLastName}', dob = '${new Date(dob).toLocaleDateString()}',
                sex = '${sex}', email = '${encryptedInfo.encryptedEmail}', phone = '${encryptedInfo.encryptedPhone}', address = '${encryptedInfo.encryptedAddress}', notes = '${notes}' WHERE patient_id = ${patientId}`
            )
        }
        else {
            await (await connection).query(
                `INSERT INTO public.patient (patient_id, first_name, last_name, dob, sex, email, phone, address, notes)
                VALUES (${patientId}, '${encryptedInfo.encryptedFirstName}', '${encryptedInfo.encryptedLastName}', 
                '${new Date(dob).toLocaleDateString()}', '${sex}', '${encryptedInfo.encryptedEmail}', 
                '${encryptedInfo.encryptedPhone}', '${encryptedInfo.encryptedAddress}', '${notes}')`
            );
        }
    }
}


