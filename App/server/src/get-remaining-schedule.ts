import { PoolClient } from 'pg';
import CryptoJS from 'crypto-js';
import formatToday from './handlers/format-today';


interface Patient {
    id: number,
    name: string
}

interface Appointment {
    time: string,
    patient: Patient
}

const patientInfoKey = process.env.INFO_KEY;

export default {
    execute: async (connection: Promise<PoolClient>, doctor_id: number) => {
        const today = formatToday.execute();
        const result = await (await connection).query(
            `SELECT * FROM (select a.time, p.patient_id, p.last_name, p.first_name from public.patient p natural join public.appointment a
            where date = '${today}' and a.doctor_id = ${doctor_id} EXCEPT 
            select a.time, p.patient_id, p.last_name, p.first_name from public.patient p natural join public.appointment a 
            join public.prescription pres on pres.patient_id = a.patient_id and pres.doctor_id = a.doctor_id 
            and pres.presdate = a.date where presdate = '${today}' and a.doctor_id = ${doctor_id}) as getRemaining order by time`
        );

        const schedule: Appointment[] = [];
        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const patient: Patient = {id: row.patient_id, name: decryptPatientName(row.first_name, row.last_name)}
                const appointment: Appointment = {time: row.time, patient: patient};
                schedule.push(appointment);
            })
        }

        return schedule;
    }
}

function decryptPatientName(firstName: string, lastName: string) {
    const first_name = CryptoJS.AES.decrypt(firstName, patientInfoKey).toString(CryptoJS.enc.Utf8);
    const last_name = CryptoJS.AES.decrypt(lastName, patientInfoKey).toString(CryptoJS.enc.Utf8);
    return first_name + " " + last_name;
}