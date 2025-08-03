import { SpecialtyRepository } from '../../domain/repositories/specialty.repository';

export class ListSpecialtiesUseCase {
  constructor(private repository: SpecialtyRepository) {}

  async execute(): Promise<{ statusCode: number, body: any }> {
    const items = await this.repository.findAll();

    return {
      statusCode: 200,
      body: {
        specialties: items
      }
    }
  }
}
