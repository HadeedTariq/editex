import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { connectToDb } from './dbConnection/connectToDb';
import * as cookieParser from 'cookie-parser';
import { CustomExceptionFilter } from './exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configureService = app.get(ConfigService);
  const port = configureService.get<number>('PORT');
  const dbUri = configureService.get<string>('DB_URI');
  const clientUrl = configureService.get<string>('CLIENT_URL');

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      clientUrl,
      'https://editex-frontend.vercel.app',
    ],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
  });
  app.useGlobalFilters(new CustomExceptionFilter());

  await connectToDb(dbUri);

  await app.listen(port);
}
bootstrap();
