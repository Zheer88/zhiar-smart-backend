"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Zhiar Smart Backend is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map