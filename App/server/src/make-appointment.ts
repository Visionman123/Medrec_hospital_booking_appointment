import { PoolClient } from 'pg';


export default {
    execute: async (connection: Promise<PoolClient>, doctor_id: number, patient_id: number, selectedDate: any, selectedTime: any) => {
        const result = await (await connection).query(
            `SELECT doctor_id FROM public.appointment WHERE doctor_id = ${doctor_id} AND patient_id = ${patient_id} AND date = '${selectedDate}'`
        )
        //if patient already booked that day
        if (result.rows.length != 0) {
            return "You have already booked this day";
        }
        await (await connection).query(
            `INSERT INTO public.appointment values(${doctor_id}, ${patient_id}, '${selectedDate}', '${selectedTime}')`
        )

        return "Appointment Made";
    }
}


