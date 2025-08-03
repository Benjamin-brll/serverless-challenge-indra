import { AppointmentRepository } from '../../domain/repositories/appointment.repository';

export class DynamoUpdateAppointmentUseCase {
  constructor(private repository: AppointmentRepository) {}

  async execute(id: string, status: 'completed') {
    return this.repository.updateStatus(id, status);
  }
}
