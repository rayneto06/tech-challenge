import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Tech Challenge FIAP',
        description: 'System for order management in a restaurant'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server 🚀'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['../app.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);