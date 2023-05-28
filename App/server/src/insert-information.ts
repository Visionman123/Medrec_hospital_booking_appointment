import { PoolClient } from 'pg';
import formatToday from './handlers/format-today';

export default {
    execute: async (connection: Promise<PoolClient>, doctor_id: number, patient_id: number, indications: string, diagnosis: string) => {
        const today = formatToday.execute(); 
        await (await connection).query(
            `INSERT INTO public.prescription(pres_id, doctor_id, patient_id, presdate, indications, diagnosis)
            VALUES ((SELECT max(pres_id) + 1 FROM public.prescription), ${doctor_id}, ${patient_id}, '${today}', '${indications}', '${diagnosis}')`
        );
        const result = await (await connection).query(
            `SELECT pres_id FROM public.prescription WHERE doctor_id = ${doctor_id} AND patient_id = ${patient_id} AND presdate = '${today}'`
        )
        console.log(result.rows[0].pres_id)
        return result.rows[0].pres_id;
    }
}