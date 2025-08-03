import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoListAppointmentsUseCase } from '../../application/use-cases/dynamo-list-appointments.use-case';
import { DynamoAppointmentRepository } from '../../infrastructure/database/dynamo-appointment.repository';

const repository = new DynamoAppointmentRepository();
const useCase = new DynamoListAppointmentsUseCase(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  const insuredId = event.pathParameters?.insuredId;
  if (!insuredId) {
    return { statusCode: 400, body: 'insuredId es requerido' };
  }
  const result = await useCase.execute(insuredId);
  return {
    statusCode: result.statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result.body),
  };
};
