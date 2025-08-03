import { db } from './mysql';
import { MedicRepository } from '../../domain/repositories/medic.repository';

export class MySQLMedicRepository implements MedicRepository{
  async findBySpecialtyId(specialtyId: number): Promise<any> {
    const [rows] = await db.query(`SELECT id, name, lastname FROM medic WHERE specialty_id = ?`, [specialtyId]);
    return rows;
  }
}