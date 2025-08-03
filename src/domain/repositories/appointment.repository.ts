import { Appointment } from '../entities/appointment.entity';
import { BaseAppointmentRepository } from './base-appointment.repository';

export interface AppointmentRepository extends BaseAppointmentRepository {
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
  updateStatus(id: string, status: 'completed'): Promise<void>;
}