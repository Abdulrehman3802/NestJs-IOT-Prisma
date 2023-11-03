"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SensorRepository = class SensorRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    assignSensor(model) {
        return this.prismaService.sensors.create({
            data: model
        });
    }
    createSensorType(model) {
        return this.prismaService.sensortypes.createMany({
            data: model
        });
    }
    findUnAssignedSensor() {
        return this.prismaService.sensors.findMany({
            where: {
                assigned_by: null,
                is_deleted: false
            }
        });
    }
    findByAwsId(awsId) {
        return this.prismaService.sensors.findFirst({
            where: {
                is_active: true,
                aws_sensorid: awsId,
                is_deleted: false,
                customerid: null
            }
        });
    }
    findAssignSensor() {
        return this.prismaService.sensors.findMany({
            where: {
                assigned_by: { not: null },
                is_deleted: false
            }
        });
    }
    findAssignSensorByOrganizationId(orgId) {
        return this.prismaService.sensors.findMany({
            where: {
                customerid: orgId,
                deviceid: null,
                assigned_by: { not: null },
                is_deleted: false,
                is_active: true
            }
        });
    }
    updateSensor(id, updateSensorDto) {
        return this.prismaService.sensors.update({
            where: {
                sensorid: id
            },
            data: updateSensorDto
        });
    }
    remove(id) {
        return `This action removes a #${id} sensor`;
    }
};
SensorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SensorRepository);
exports.SensorRepository = SensorRepository;
//# sourceMappingURL=sensor.repository.js.map