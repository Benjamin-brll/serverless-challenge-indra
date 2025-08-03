import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Rimac Appointment API Docs</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            SwaggerUIBundle({
              spec: {
                openapi: "3.0.0",
                info: {
                  title: "Rimac Appointment API",
                  version: "1.0.0",
                  description: "Documentación de la API para agendamiento médico"
                },
                paths: {
                  "/appointment": {
                    post: {
                      summary: "Agendar una cita",
                      requestBody: {
                        required: true,
                        content: {
                          "application/json": {
                            schema: {
                              type: "object",
                              properties: {
                                insuredId: { type: "string" },
                                scheduleId: { type: "integer" },
                                countryISO: { type: "string", enum: ["PE", "CL"] }
                              },
                              required: ["insuredId", "scheduleId", "countryISO"]
                            }
                          }
                        }
                      },
                      responses: {
                        "202": { description: "Agendamiento en proceso" },
                        "400": { description: "Datos inválidos" }
                      }
                    }
                  },
                  "/appointment/{insuredId}": {
                    get: {
                      summary: "Listar citas por asegurado",
                      parameters: [
                        {
                          name: "insuredId",
                          in: "path",
                          required: true,
                          schema: { type: "string" }
                        }
                      ],
                      responses: {
                        "200": { description: "Listado de citas" },
                        "400": { description: "insuredId es requerido" }
                      }
                    }
                  },
                  "/medical-centers/{countryISO}": {
                    get: {
                      summary: "Listar centros médicos por país",
                      parameters: [
                        {
                          name: "countryISO",
                          in: "path",
                          required: true,
                          schema: { type: "string", enum: ["PE", "CL"] }
                        }
                      ],
                      responses: {
                        "200": { description: "Listado de centros médicos" }
                      }
                    }
                  },
                  "/specialties": {
                    get: {
                      summary: "Listar especialidades",
                      responses: {
                        "200": { description: "Listado de especialidades" }
                      }
                    }
                  },
                  "/specialties/{id}/medics": {
                    get: {
                      summary: "Listar médicos por especialidad",
                      parameters: [
                        {
                          name: "id",
                          in: "path",
                          required: true,
                          schema: { type: "integer" }
                        }
                      ],
                      responses: {
                        "200": { description: "Listado de médicos" }
                      }
                    }
                  },
                  "/schedules": {
                    get: {
                      summary: "Listar horarios disponibles",
                      responses: {
                        "200": { description: "Listado de horarios" }
                      }
                    }
                  }
                }
              },
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [SwaggerUIBundle.presets.apis],
              layout: "BaseLayout"
            });
          };
        </script>
      </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*"
    },
    body: html,
  };
};
