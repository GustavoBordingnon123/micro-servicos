import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Autenticação',
    version: '1.0.0',
    description: 'API para autenticação com Prisma e Next.js',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor de Desenvolvimento',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./pages/api/**/*.ts'], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
