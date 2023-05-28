import {Pool} from 'pg'
import dotenv from 'dotenv';
dotenv.config();

interface Config {
    host: string,
    user: string,
    password: string,
    database: string,
    port: number,
};

const config: Config = {
    host: process.env.HOST!,
    user: process.env.USERDB!,
    password: process.env.PASSWORDDB!,
    database: process.env.DATABASE!,
    port: 5432,
};

export default {
    name: 'dbConnection',
    execute: async () => {
        const pool = new Pool(config);
        const connection = await pool.connect();
        return connection;
    }
}