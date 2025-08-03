import { db } from '../../infrastructure/database/mysql';
import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

export class MySQLScheduleRepository implements ScheduleRepository {
  async findBySpecialtyIdAndMedicIdAndMedicalCenterId(specialtyId: number, medicId: number, medicalCenterId: number): Promise<any> {
    const [rows] = await db.query(`
      SELECT id, date_time, available FROM schedule WHERE specialty_id = ? and medic_id = ? and medical_center_id = ? and available = 1
    `, [specialtyId, medicId, medicalCenterId]);
    return rows;
  }

  async setScheduleAsUnavailable(scheduleId: number): Promise<void> {
    await db.query('UPDATE schedule SET available = 0 WHERE id = ?', [scheduleId]);
  }
}
