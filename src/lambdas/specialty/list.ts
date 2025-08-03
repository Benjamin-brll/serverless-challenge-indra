import { APIGatewayProxyHandler } from 'aws-lambda';
import { ListSpecialtiesUseCase } from '../../application/use-cases/list-specialty.use-case';
import { MySQLSpecialtyRepository } from '../../infrastructure/database/mysql-specialty.repository';

const repository = new MySQLSpecialtyRepository();
const useCase = new ListSpecialtiesUseCase(repository);

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const result = await useCase.execute();

    return {
      statusCode: result.statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.body),
    };
  } catch (err) {
    console.error('Error en getSpecialties:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
