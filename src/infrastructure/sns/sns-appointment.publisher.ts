import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { Appointment } from '../../domain/entities/appointment.entity';

const sns = new SNSClient({});
const TOPIC_ARN = process.env.SNS_TOPIC_ARN!;

export class SNSAppointmentPublisher {
  async publish(app: Appointment): Promise<void> {
    await sns.send(new PublishCommand({
      TopicArn: TOPIC_ARN,
      Message: JSON.stringify(app),
      MessageAttributes: {
        countryISO: {
          DataType: 'String',
          StringValue: app.countryISO
        }
      }
    }));
  }
}