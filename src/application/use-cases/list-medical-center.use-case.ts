import { MedicalCenterRepository } from '../../domain/repositories/medical-center.repository';

export class ListMedicalCentersUseCase {
  constructor(private repository: MedicalCenterRepository) {}

  async execute(countryISO: string): Promise<{statusCode: number; body: any}> {
    const items = await this.repository.findByCountryISO(countryISO);

    return {
      statusCode: 200,
      body: {
        medical_centers: items
      }
    }
  }
}
