import { PoolClient } from "pg";

export default {
    execute: async (connection: Promise<PoolClient>, token: string) => {
        const result = await (await connection).query(`SELECT user_id FROM public.hms_user WHERE auth_token = '${token}'`);
        if (result.rows.length != 0) {
            return true;
        }
        return false;
    }
}