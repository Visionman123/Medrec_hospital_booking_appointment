import { PoolClient } from "pg";


export default {
    execute: async (connection: Promise<PoolClient>) => {
        const medName = [];
        const result = await (await connection).query(`SELECT medname FROM public.medicine`);

        result.rows.forEach(row => {
            const med = row.medname;
            medName.push(med);
        })

        return medName;
    }
}