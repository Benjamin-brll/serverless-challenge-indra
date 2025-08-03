export interface ScheduleRepository {
  findBySpecialtyIdAndMedicIdAndMedicalCenterId(specialtyId: number, medicId: number, medicalCenterId: number): Promise<any>;

  setScheduleAsUnavailable(scheduleId: number): Promise<void>;
}
