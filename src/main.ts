import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  //principal
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  const corsOptions: CorsOptions = {
    origin: 'ws://localhost:3000', // You can set this to your specific frontend URL (e.g., 'http://localhost:3000')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useWebSocketAdapter(new IoAdapter(app));

  //parte do swagger
  const config = new DocumentBuilder()
    .setTitle('Temax Api')
    .setDescription('Esta é a api para a aplicação android Temax')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
