import { Appointment } from '../../domain/entities/appointment.entity';
import { BaseAppointmentRepository } from '../../domain/repositories/base-appointment.repository';

export class CreateAppointmentUseCase {
  constructor(private repository: BaseAppointmentRepository) {}

  async execute(appointment: Appointment): Promise<{ statusCode: number; body: any }> {
    const items = await this.repository.save(appointment);

    return {
      statusCode: 200,
      body: {
        medics: items
      }
    }
  }
}
