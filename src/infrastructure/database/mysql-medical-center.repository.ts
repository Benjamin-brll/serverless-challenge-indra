import { db } from '../../infrastructure/database/mysql';
import { MedicalCenterRepository } from '../../domain/repositories/medical-center.repository';

export class MySQLMedicalCenterRepository implements MedicalCenterRepository {
  async findByCountryISO(countryISO: string): Promise<any> {
    const [rows] = await db.query('SELECT id, name, address FROM medical_center WHERE country = ?', [countryISO]);
    return rows;
  }
}