import { AppointmentRepository } from '../../domain/repositories/appointment.repository';

export class DynamoListAppointmentsUseCase {
  constructor(private readonly repository: AppointmentRepository) {}

  async execute(insuredId: string): Promise<{ statusCode: number; body: any }> {
    const items = await this.repository.findByInsuredId(insuredId);
    return {
      statusCode: 200,
      body: { appointments: items }
    };
  }
}
