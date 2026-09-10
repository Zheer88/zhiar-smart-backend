"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpgModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const epg_controller_1 = require("./epg.controller");
const epg_service_1 = require("./epg.service");
const epg_program_entity_1 = require("./entities/epg-program.entity");
const auth_module_1 = require("../auth/auth.module");
let EpgModule = class EpgModule {
};
exports.EpgModule = EpgModule;
exports.EpgModule = EpgModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([epg_program_entity_1.EpgProgram]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            auth_module_1.AuthModule,
        ],
        controllers: [epg_controller_1.EpgController],
        providers: [epg_service_1.EpgService],
        exports: [epg_service_1.EpgService, typeorm_1.TypeOrmModule],
    })
], EpgModule);
//# sourceMappingURL=epg.module.js.map