import { PoolClient } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


interface Payload {
    username: string,
    role: string,
    exp: number,
    iat: number,
}


export default {
    execute: async (connection: Promise<PoolClient>, payload: string) => {
        //JSONify
        const payloadObject: Payload = JSON.parse(payload);
        return await authorize(await connection, payloadObject);
    }
}

async function authorize(connection: PoolClient, payload: Payload) {
    const username = payload.username;
    const tokenExp = Math.round(payload.exp); // round decimal 
    const generateAt = Math.round(payload.iat);

    const result =  await connection.query(
        `SELECT user_id FROM public.hms_user WHERE username = '${username}' AND generate_at = ${generateAt} AND expire_at = ${tokenExp}`
    );
    
    //user exists
    if (result.rows.length != 0) {
        //not expired
        if (Math.round(Date.now()/1000) <= tokenExp) {
            return 200;
        }
        console.log("Token expired");
    }
}