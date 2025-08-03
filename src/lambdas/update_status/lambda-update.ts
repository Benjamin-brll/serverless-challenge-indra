import { SQSEvent } from 'aws-lambda';
import { DynamoAppointmentRepository } from '../../infrastructure/database/dynamo-appointment.repository'; 
import { DynamoUpdateAppointmentUseCase } from '../../application/use-cases/dynamo-update-appointment.use-case'; 

const repository = new DynamoAppointmentRepository();
const useCase = new DynamoUpdateAppointmentUseCase(repository);

export const handler = async (event: SQSEvent): Promise<void> => {

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      const { detail } = body;

      const { id, status } = detail;

      console.info(`Mensaje recibido: id ${id}, status ${status}`);

      if (status === 'completed') {
        await useCase.execute(id, 'completed');

        console.info(`Estado actualizado para id: ${id}`);
      } else {
        console.info(`Status no es 'completed': ${status}`);
      }
    } catch (error) {
      console.error('Error de procesaiento de mensaje:', error);
    }
  }
};
