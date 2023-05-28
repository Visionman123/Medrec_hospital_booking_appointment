import { PoolClient } from 'pg';


interface BookedPeriod {
    date: string,
    time: string
}


interface Doctor {
    id: number,
    name: string,
    sex: string,
    dob: Date,
    phone: string,
    email: string,
    department: string,
    bookedPeriods: BookedPeriod[],
}

export default {
    execute: async (connection: Promise<PoolClient>) => {
        const doctors = await getDoctors(await connection);
        await populateAppointments(await connection, doctors);

        return doctors;
    }
}

async function getDoctors(connection: PoolClient) {
    let doctors: Doctor[] = [];
    const result = await connection.query(
        `SELECT doctor_id, concat('Dr. ', first_name) AS name, sex, dob, phone, email, de.dep_name FROM public.doctor d JOIN department de
        ON d.dep_id = de.dep_id`)

    if (result.rows.length != 0) {
        result.rows.forEach(row => {
            const doctor: Doctor = {
                id: row.doctor_id,
                name: row.name, 
                sex: row.sex, 
                dob: row.dob, 
                phone: row.phone, 
                email: row.email, 
                department: row.dep_name,
                bookedPeriods: [],
            };

            doctors.push(doctor);
        })
    }
    return doctors;
}


async function populateAppointments(connection: PoolClient, doctors: Doctor[]) {
    for (let i = 0; i < doctors.length; i++) {
        const doctor = doctors[i];
        const result = await connection.query(
            `SELECT a.date, a.time FROM public.doctor d JOIN public.appointment a ON d.doctor_id = a.doctor_id WHERE d.doctor_id = ${doctor.id}`);

        result.rows.forEach(row => {
            const date = new Date(row.date).toLocaleDateString();
            const bookedPeriod: BookedPeriod = {date: date, time: row.time};
            doctor.bookedPeriods.push(bookedPeriod);
        })
    }
}

