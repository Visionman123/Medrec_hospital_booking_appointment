import { PoolClient } from 'pg';

import HistoryInfo from '../utils/HistoryInterface';

export default {
    execute: async (connection: Promise<PoolClient>, patient_id: number) => {
        const result = await (await (connection)).query(
            `SELECT a.date, p.diagnosis, concat('Dr. ', d.first_name) AS name, d.doctor_id
            FROM public.appointment a, public.prescription p, public.doctor d
            WHERE a.doctor_id = d.doctor_id AND a.date = p.presdate AND a.patient_id = p.patient_id AND a.doctor_id = p.doctor_id
            AND a.patient_id = ${patient_id}`
    );

  const histories: HistoryInfo[] = [];
  if (result.rows.length != 0) {
    result.rows.forEach((row) => {
      const history: HistoryInfo = {
        prescriptionDate: row.date.toLocaleDateString(),
        diagnosis: row.diagnosis,
        doctorName: row.name,
        doctorId: row.doctor_id,
      };
      histories.push(history);
    });
  }

  return histories;
    }
}
