import { APIGatewayProxyHandler } from 'aws-lambda';
import { ListSchedulesUseCase } from '../../application/use-cases/list-schedule.use-case';
import { MySQLScheduleRepository } from '../../infrastructure/database/mysql-schedule.repository';

const repository = new MySQLScheduleRepository();
const useCase = new ListSchedulesUseCase(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const specialtyId = event.queryStringParameters?.specialtyId;
    const medicId = event.queryStringParameters?.medicId;
    const medicalCenterId = event.queryStringParameters?.medicalCenterId;

    const result = await useCase.execute(Number(specialtyId), Number(medicId), Number(medicalCenterId));

    return {
      statusCode: result.statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.body),
    };
  } catch (err) {
    console.error('Error en getSchedules:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
