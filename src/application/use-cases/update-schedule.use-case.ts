import { ScheduleRepository } from "../../domain/repositories/schedule.repository"; 

export class UpdateScheduleUseCase {
  constructor(private repository: ScheduleRepository) {}

  async execute(scheduleId: number) {
    return this.repository.setScheduleAsUnavailable(scheduleId);
  }
}
