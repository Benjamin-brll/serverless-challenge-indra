import { db } from './mysql';
import { SpecialtyRepository } from '../../domain/repositories/specialty.repository';

export class MySQLSpecialtyRepository implements SpecialtyRepository {
  async findAll(): Promise<any> {
    const [rows] = await db.query('SELECT id, name FROM specialty');
    return rows;
  }
}
