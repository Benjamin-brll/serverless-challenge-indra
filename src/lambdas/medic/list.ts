import { APIGatewayProxyHandler } from 'aws-lambda';
import { ListMedicsUseCase } from '../../application/use-cases/list-medic.use-case';
import { MySQLMedicRepository } from '../../infrastructure/database/mysql-medic.repository';

const repository = new MySQLMedicRepository();
const useCase = new ListMedicsUseCase(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const specialtyId = event.pathParameters?.id

    if (!specialtyId){
      return { statusCode: 400, body: 'El id especialidad es requerido'}
    }

    const result = await useCase.execute(Number(specialtyId));

    return {
      statusCode: result.statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.body),
    };
  } catch (err) {
    console.error('Error en getMedics:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
