const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation with Swagger',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 4125}`,
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/*.ts'],
  };
  
  export default swaggerOptions;