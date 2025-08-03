import { MedicRepository } from '../../domain/repositories/medic.repository';

export class ListMedicsUseCase {
  constructor(private repository: MedicRepository) {}

  async execute(specialtyId: number): Promise<{ statusCode: number; body: any }> {
    const items = await this.repository.findBySpecialtyId(specialtyId);

    return {
      statusCode: 200,
      body: {
        medics: items
      }
    }
  }
}
