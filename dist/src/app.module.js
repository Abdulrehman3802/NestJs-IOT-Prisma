"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const organization_module_1 = require("./organization/organization.module");
const facility_module_1 = require("./facility/facility.module");
const department_module_1 = require("./department/department.module");
const device_module_1 = require("./device/device.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const configuration_1 = require("./config/configuration");
const jwt_1 = require("@nestjs/jwt");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const permissions_repository_1 = require("./permissions/permissions.repository");
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const aws_module_1 = require("./aws/aws.module");
const sensor_module_1 = require("./sensor/sensor.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET')
                }),
            }),
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        host: 'smtp.sendgrid.net',
                        auth: {
                            user: configService.get('MAIL_USERNAME'),
                            pass: configService.get('MAIL_PASSWORD'),
                        },
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, '..', 'mail'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
            organization_module_1.OrganizationModule,
            facility_module_1.FacilityModule,
            department_module_1.DepartmentModule,
            device_module_1.DeviceModule,
            user_module_1.UserModule,
            jwt_1.JwtModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            aws_module_1.AwsModule,
            sensor_module_1.SensorModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_1.JwtService, config_1.ConfigService, permissions_repository_1.PermissionsRepository],
        exports: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map