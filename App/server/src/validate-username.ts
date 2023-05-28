import { PoolClient } from "pg";

export default {
    execute: async (connection: Promise<PoolClient>, username: string) => {
        const result = await (await connection).query(`SELECT username FROM public.hms_user WHERE username = '${username}'`);
        if (result.rows.length != 0) {
            return false;
        }
        return true;
    }
}