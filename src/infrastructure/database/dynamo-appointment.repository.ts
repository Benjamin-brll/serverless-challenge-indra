import { DynamoDBClient, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { Appointment } from '../../domain/entities/appointment.entity';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';

const dynamo = new DynamoDBClient({});
const TABLE_NAME = process.env.APPOINTMENT_TABLE!;

export class DynamoAppointmentRepository implements AppointmentRepository {
  async save(app: Appointment): Promise<void> {
    await dynamo.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        id: { S: app.id },
        insuredId: { S: app.insuredId },
        scheduleId: { N: String(app.scheduleId) },
        countryISO: { S: app.countryISO },
        status: { S: app.status ?? 'pending' },
        createdAt: { S: app.createdAt }
      }
    }));
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const result = await dynamo.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'InsuredIndex',
      KeyConditionExpression: 'insuredId = :id',
      ExpressionAttributeValues: {
        ':id': { S: insuredId }
      }
    }));

    return (result.Items || []).map(item => ({
      id: item.id.S!,
      insuredId: item.insuredId.S!,
      scheduleId: Number(item.scheduleId.N!),
      countryISO: item.countryISO.S! as 'PE' | 'CL',
      status: item.status.S! as 'pending' | 'completed',
      createdAt: item.createdAt.S!
    }));
  }

  async updateStatus(id: string, status: 'completed'): Promise<void> {
    await dynamo.send(new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: { id: { S: id } },
      UpdateExpression: 'SET #status = :s',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':s': { S: status } }
    }));
  }
}