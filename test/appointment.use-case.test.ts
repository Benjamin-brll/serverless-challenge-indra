import { DynamoAppointmentUseCase } from '../src/application/use-cases/dynamo-create-appointment.use-case';
import { Appointment } from '../src/domain/entities/appointment.entity';

describe('DynamoAppointmentUseCase', () => {
  const mockRepo = {
    save: jest.fn(),
    findByInsuredId: jest.fn(),
    updateStatus: jest.fn()
  };
  const mockPublisher = {
    publish: jest.fn()
  };

  const useCase = new DynamoAppointmentUseCase(mockRepo, mockPublisher);

  it('should return 400 if insuredId is invalid', async () => {
    const result = await useCase.execute({ insuredId: '123', scheduleId: 1, countryISO: 'PE' });
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if countryISO is invalid', async () => {
    const result = await useCase.execute({ insuredId: '12345', scheduleId: 1, countryISO: 'BR' });
    expect(result.statusCode).toBe(400);
  });

  it('should create appointment successfully', async () => {
    const result = await useCase.execute({ insuredId: '12345', scheduleId: 1, countryISO: 'CL' });
    expect(result.statusCode).toBe(202);
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockPublisher.publish).toHaveBeenCalled();
  });
});