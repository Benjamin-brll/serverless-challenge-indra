import { ScheduleRepository } from '../../domain/repositories/schedule.repository';

export class ListSchedulesUseCase {
  constructor(private repository: ScheduleRepository) {}

  async execute(specialtyId: number, medicId: number, medicalCenterId: number): Promise<{ statusCode: number, body: any}> {
    const items = await this.repository.findBySpecialtyIdAndMedicIdAndMedicalCenterId(specialtyId, medicId, medicalCenterId);

    return {
      statusCode: 200,
      body: {
        schedules: items
      }
    }
  }
}
