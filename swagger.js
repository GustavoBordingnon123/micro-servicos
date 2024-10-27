// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Login',
      version: '1.0.0',
      description: 'Documentação da API para login e registro de usuários',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./pages/api/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
