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
    origin: ['http://localhost:5173', clientUrl],
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
  });

  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://editex-frontend.vercel.app',
    );
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.useGlobalFilters(new CustomExceptionFilter());

  await connectToDb(dbUri);

  await app.listen(port);
}
bootstrap();
