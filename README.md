# Serverless Appointment Service – Rimac Challenge

Este proyecto implementa un backend escalable basado en AWS Serverless para gestionar agendamientos médicos por país, siguiendo arquitectura limpia, principios SOLID y usando TypeScript + Node.js.

## Características

- ✅ API HTTP (API Gateway + Lambda)
- ✅ DynamoDB como almacenamiento principal
- ✅ SNS + SQS para desacoplar procesos por país (PE, CL)
- ✅ RDS (MySQL) para almacenamiento por país
- ✅ EventBridge + SQS para conformidad de agendamiento
- ✅ Arquitectura limpia + principios SOLID
- ✅ Documentación OpenAPI (Swagger)
- ✅ Pruebas unitarias con Jest

## Frontend para hacer uso del servicio

https://rimac-challenge-front.s3.us-east-2.amazonaws.com/index.html

## Rutas del servicio

- POST - https://pknqt32tpe.execute-api.us-east-2.amazonaws.com/appointment
- GET - https://pknqt32tpe.execute-api.us-east-2.amazonaws.com/appointment/{insuredId}
- GET - https://pknqt32tpe.execute-api.us-east-2.amazonaws.com/medical-centers/{countryISO}
- GET - https://pknqt32tpe.execute-api.us-east-2.amazonaws.com/specialties
- GET - https://pknqt32tpe.execute-api.us-east-2.amazonaws.com/specialties/{id}/medics
- GET - https://pknqt32tpe.execute-api.us-east-2.amazonaws.com/schedules
- GET - https://pknqt32tpe.execute-api.us-east-2.amazonaws.com/swagger