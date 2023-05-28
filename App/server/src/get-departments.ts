import { PoolClient } from "pg";


export default {
    execute: async (connection: Promise<PoolClient>) => {
        const departments = [];
        const result = await (await connection).query(`SELECT dep_name FROM public.department`);

        result.rows.forEach(row => {
            const department = row.dep_name;
            departments.push(department);
        })

        return departments;
    }
}