import { PoolClient } from 'pg';

interface Appointment {
    doctorName: string,
    date: Date,
    time: any,
    room: number
}

export default {
    execute: async (connection: Promise<PoolClient>,  patient_id: number) => {
        const appointments: Appointment[] = [];
        const today = new Date().toLocaleDateString();
        const result = await (await connection).query(
            `SELECT concat('Dr. ', d.first_name) as name, a.date, a.time, d.room FROM public.appointment a JOIN public.doctor d 
            ON a.doctor_id = d.doctor_id WHERE a.patient_id = '${patient_id}' AND a.date >= '${today}'`);

        if (result.rows.length != 0) {
            result.rows.forEach(row => {
                const appointment: Appointment = {doctorName: row.name, date: row.date.toLocaleDateString(), time: row.time, room: row.room};
                appointments.push(appointment);
            })
        }

        return appointments;
    }
}


