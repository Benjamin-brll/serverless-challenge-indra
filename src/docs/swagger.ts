export const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Rimac Appointment API',
    version: '1.0.0'
  },
  paths: {
    '/appointment': {
      post: {
        summary: 'Agendar una cita',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  insuredId: { type: 'string' },
                  scheduleId: { type: 'integer' },
                  countryISO: { type: 'string', enum: ['PE', 'CL'] }
                },
                required: ['insuredId', 'scheduleId', 'countryISO']
              }
            }
          }
        },
        responses: {
          202: { description: 'Agendamiento en proceso' },
          400: { description: 'Datos inválidos' }
        }
      }
    },
    '/appointment/{insuredId}': {
      get: {
        summary: 'Listar citas por asegurado',
        parameters: [
          {
            name: 'insuredId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Listado de citas' },
          400: { description: 'insuredId es requerido' }
        }
      }
    }
  }
};
