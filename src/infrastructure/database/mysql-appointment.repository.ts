import { db } from './mysql';
import { Appointment } from "../../domain/entities/appointment.entity";
import { BaseAppointmentRepository } from "../../domain/repositories/base-appointment.repository";

export class MySQLAppointmentRepository implements BaseAppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    const insertQuery = `
          INSERT INTO appointments (id, insured_id, schedule_id, country_iso, created_at)
          VALUES (?, ?, ?, ?, ?)
        `;

    await db.execute(insertQuery, [
        appointment.id,
        appointment.insuredId,
        appointment.scheduleId,
        appointment.countryISO,
        appointment.createdAt
    ]);
  }
}
