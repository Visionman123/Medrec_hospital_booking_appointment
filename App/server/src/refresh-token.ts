import { PoolClient } from "pg";
import jwt, {JwtPayload} from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

interface Payload {
    username: string,
    role: string,
    exp: number,
    iat: number,
}

interface regenPayload {
    username: string,
    role:string,
    exp: number,
}

export default {
    execute: async (connection: Promise<PoolClient>, refPayload: string,) => {
        //JSONify
        const payloadObject: Payload = JSON.parse(refPayload);
        if (!await isExpired(await connection, payloadObject)) {
            const regenPayload: regenPayload = {
                username: payloadObject.username,
                role: payloadObject.role,
                exp: Date.now() / 1000 + 10 * 60, 
            }
            const token = jwt.sign(regenPayload, secretKey);
            const decoded = <JwtPayload> jwt.verify(token, secretKey);

            await (await connection).query(
                `UPDATE public.hms_user SET auth_token = '${token}', generate_at = ${Math.round(decoded.iat)}, 
                expire_at = ${Math.round(decoded.exp)} WHERE username = '${payloadObject.username}'`);

            return token;
        }

    }
}


async function isExpired(connection: PoolClient, refPayload: Payload) {
    const username = refPayload.username;
    const refTokenExp = Math.round(refPayload.exp); // round decimal 
    const refGenerateAt = Math.round(refPayload.iat);

    const result =  await connection.query(
        `SELECT user_id FROM public.hms_user WHERE username = '${username}' AND ref_generate_at = ${refGenerateAt} AND ref_expire_at = ${refTokenExp}`
    );
    
    //user exists
    if (result.rows.length != 0) {
        //not expired
        if (Math.round(Date.now()/1000) <= refTokenExp) {
            return false;
        }
        console.log("Refresh token expired");
        return true;
    }
}