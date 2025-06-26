// src/config/swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configSwagger = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('Nestjs API Documentation')
    .setDescription('This API provide the first contact with the creation of an API using Nestjs, Nodejs and typescript.')
    .setVersion('1.0')
    //.addTag('User')
    //.addTag('Product')
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
};