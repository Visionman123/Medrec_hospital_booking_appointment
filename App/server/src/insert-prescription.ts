import { PoolClient } from 'pg';


export default {
    execute: async (connection: Promise<PoolClient>, inputMed: string, pres_id: number, inputPurpose: string, inputDosage: string, 
        inputRoute: string, inputFrequency: string) => {
           let result = await (await (connection)).query(`SELECT med_id FROM public.medicine WHERE medname = '${inputMed}'`);
           let med_id: number;
           if (result.rows.length == 0) {
            med_id = 1;
           } else {
            med_id = result.rows[0].med_id;
           }
           await (await connection).query(
            `INSERT INTO public.pres_med VALUES (${med_id}, ${pres_id}, '${inputPurpose}', 
            '${inputDosage}', '${inputRoute}', '${inputFrequency}')`);
    }
}