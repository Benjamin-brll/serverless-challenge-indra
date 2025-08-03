import { Appointment } from '../entities/appointment.entity';

export interface BaseAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
}