import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import { v4 as uuidv4 } from 'uuid';

export class DynamoAppointmentUseCase {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly publisher: { publish(appointment: Appointment): Promise<void> }
  ) {}

  async execute(input: {
    insuredId: string;
    scheduleId: number;
    countryISO: string;
  }): Promise<{ statusCode: number; body: any }> {
    const { insuredId, scheduleId, countryISO } = input;

    if (!/^\d{5}$/.test(insuredId)) {
      return { statusCode: 400, body: { error: 'insuredId must be 5 digits' } };
    }
    if (!['PE', 'CL'].includes(countryISO)) {
      return { statusCode: 400, body: { error: 'countryISO must be PE or CL' } };
    }

    const appointment: Appointment = {
      id: uuidv4(),
      insuredId,
      scheduleId,
      countryISO: countryISO as 'PE' | 'CL',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await this.repository.save(appointment);
    await this.publisher.publish(appointment);

    return {
      statusCode: 202,
      body: { message: 'Agendamiento en proceso', id: appointment.id }
    };
  }
}