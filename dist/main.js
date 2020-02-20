"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.enableCors();
    const PORT = 4000;
    await app.listen(PORT);
    console.log('Server is listening on port ' + PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map