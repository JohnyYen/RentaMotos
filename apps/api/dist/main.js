"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const option = new swagger_1.DocumentBuilder()
        .setTitle('API Renta de Motos')
        .setDescription("Documentación para la API de Renta de Motos")
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, option);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map