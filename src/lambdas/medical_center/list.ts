import { APIGatewayProxyHandler } from 'aws-lambda';
import { ListMedicalCentersUseCase } from '../../application/use-cases/list-medical-center.use-case';
import { MySQLMedicalCenterRepository } from '../../infrastructure/database/mysql-medical-center.repository';

const repository = new MySQLMedicalCenterRepository();
const useCase = new ListMedicalCentersUseCase(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const countryISO = event.pathParameters?.countryISO

    if(!countryISO){
      return { statusCode: 400, body: 'countryISO es requerido' }
    }

    const result = await useCase.execute(countryISO);

    return {
      statusCode: result.statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.body),
    };
  } catch (err) {
    console.error('Error en getMedicalCenters:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
