import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { PoolClient } from 'pg';
import decryptPassword from './handlers/decrypt-password';

interface User {
    userid: number,
    username: string,
    password: string,
    role: string,
}

interface Payload {
    username: string,
    role: string,
    exp: number,
}


const secretKey = process.env.SECRET_KEY;

export default {
    execute: async (connection: Promise<PoolClient>, username: string, password: string) => {
        const user = await getUserInfo(await connection, username, password);
        //sucess
        if (user) {
            const payload1: Payload = {
                username: user.username,
                role: user.role,
                exp: Date.now() / 1000 + 10 * 60, 
            }

            const token = jwt.sign(payload1, secretKey);
            const decoded = <JwtPayload> jwt.verify(token, secretKey); //add to db only

            const payload2: Payload = {
                username: user.username,
                role: user.role,
                exp: Date.now() / 1000 +  25 * 60, 
            }
            const refreshToken = jwt.sign(payload2, secretKey);
            const decodedRef = <JwtPayload> jwt.verify(refreshToken, secretKey);

            const userid = user.userid;
            const encryptedPassword = user.password;

            await (await connection).query(`UPDATE public.hms_user SET auth_token = '${token}', generate_at = ${Math.round(decoded.iat)}, 
                expire_at = ${Math.round(decoded.exp)}, ref_auth_token = '${refreshToken}', 
                ref_generate_at = ${Math.round(decodedRef.iat)}, ref_expire_at = ${Math.round(decodedRef.exp)}
                WHERE username = '${username}' AND password = '${encryptedPassword}'`);

            return {userid, token, refreshToken};
        }
    }
}

async function getUserInfo(connection: PoolClient, username: string, password: string) {
    const result =  await connection.query(`SELECT user_id, username, password, left(cast(user_id as Varchar), 1) as role FROM public.hms_user WHERE username = '${username}'`);

    if (result.rows.length != 0) {
        const decryptedPassword = decryptPassword.execute(result.rows[0].password);
        if (decryptedPassword ===  password) {
            const user: User = {
                userid: result.rows[0].user_id,
                username: result.rows[0].username,
                password: result.rows[0].password,
                role: result.rows[0].role,
            } 
            return user;
        }
    }
}