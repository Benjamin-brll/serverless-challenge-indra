import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoAppointmentUseCase } from '../../application/use-cases/dynamo-create-appointment.use-case';
import { DynamoAppointmentRepository } from '../../infrastructure/database/dynamo-appointment.repository';
import { SNSAppointmentPublisher } from '../../infrastructure/sns/sns-appointment.publisher';

const repository = new DynamoAppointmentRepository();
const publisher = new SNSAppointmentPublisher();
const useCase = new DynamoAppointmentUseCase(repository, publisher);

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const result = await useCase.execute(body);
  return {
    statusCode: result.statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result.body),
  };
};