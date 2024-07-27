"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const connectToDb_1 = require("./dbConnection/connectToDb");
const cookieParser = require("cookie-parser");
const exceptionFilter_1 = require("./exceptionFilter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configureService = app.get(config_1.ConfigService);
    const port = configureService.get('PORT');
    const dbUri = configureService.get('DB_URI');
    const clientUrl = configureService.get('CLIENT_URL');
    app.use(cookieParser());
    app.enableCors({
        origin: ['http://localhost:5173', clientUrl],
        credentials: true,
        exposedHeaders: ['Set-Cookie'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    });
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://editex-frontend.vercel.app/');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
    app.useGlobalFilters(new exceptionFilter_1.CustomExceptionFilter());
    await (0, connectToDb_1.connectToDb)(dbUri);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map