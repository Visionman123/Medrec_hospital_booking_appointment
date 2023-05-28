import { PoolClient } from "pg";
import encryptPassword from "./handlers/encrypt-password";


export default {
    execute: async (connection: Promise<PoolClient>, username: string, password: string) => {
        const encryptedPassword = encryptPassword.execute(password);
        await (await connection).query(
            `INSERT INTO public.hms_user(user_id, username, password) VALUES((SELECT max(user_id) + 1 FROM public.hms_user),'${username}', '${encryptedPassword}')`
        );
    }
}