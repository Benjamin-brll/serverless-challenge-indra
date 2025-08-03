import { SQSEvent } from 'aws-lambda';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { MySQLAppointmentRepository } from '../../infrastructure/database/mysql-appointment.repository';
import { CreateAppointmentUseCase } from '../../application/use-cases/create-appointment.use-case';
import { MySQLScheduleRepository } from '../../infrastructure/database/mysql-schedule.repository';
import { UpdateScheduleUseCase } from '../../application/use-cases/update-schedule.use-case';

const repository = new MySQLAppointmentRepository();
const useCase = new CreateAppointmentUseCase(repository);

const scheduleRepository = new MySQLScheduleRepository();
const scheduleUseCase = new UpdateScheduleUseCase(scheduleRepository);

const eventBridge = new EventBridgeClient({});

export const handler = async (event: SQSEvent): Promise<void> => {

  for (const record of event.Records) {
    try {
      const snsMessage = JSON.parse(record.body);
      const appointment = JSON.parse(snsMessage.Message);

      console.info('Appointment:', appointment);

      await useCase.execute(appointment);
      await scheduleUseCase.execute(appointment.scheduleId)
      
      // Publicar a EventBridge
      await eventBridge.send(new PutEventsCommand({
        Entries: [
          {
            Source: 'appointment.processor',
            DetailType: 'AppointmentCompleted',
            EventBusName: process.env.EVENTBRIDGE_BUS_NAME!,
            Detail: JSON.stringify({
              id: appointment.id,
              status: 'completed'
            })
          }
        ]
      }));
      
      console.info(`Enviado a EventBridge con id: ${appointment.id}`);
    } catch (innerError) {
      console.error('Error de appointment individual:', innerError);
    }
  }
};
