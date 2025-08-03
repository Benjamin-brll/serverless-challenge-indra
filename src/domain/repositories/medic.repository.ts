export interface MedicRepository {
  findBySpecialtyId(specialtyId: number): Promise<any>;
}