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
    unAssignSensorOnOrganizationDeletion(orgid) {
        return this.prismaService.sensors.updateMany({
            where: {
                customerid: orgid
            },
            data: {
                deviceid: null,
                customerid: null
            }
        });
    }
    getSensorType(sensorId) {
        return this.prismaService.sensortypes.findMany({
            where: {
                sensorid: sensorId,
            }
        });
    }
    getSensorTypesOfSensors(sensorId) {
        return this.prismaService.sensortypes.findMany({
            where: {
                sensorid: { in: sensorId },
                is_active: true,
                is_hidden: false
            },
            include: {
                sensors: {
                    select: {
                        sensorid: true,
                        devices: {
                            select: {
                                devicename: true,
                            },
                        },
                    },
                },
            },
        });
    }
    showSensorConfiguration(sensorId) {
        return this.prismaService.sensortypes.findMany({
            where: {
                sensorid: sensorId,
                is_hidden: false
            }
        });
    }
    async updateSensorConfiguration(userid, configuration) {
        const updatedData = await Promise.all(configuration.map((config) => {
            return this.prismaService.sensortypes.update({
                where: {
                    sensortypeid: config.sensortypeid,
                },
                data: {
                    property: config.property,
                    unit: config.unit,
                    minvalue: config.minvalue,
                    maxvalue: config.maxvalue,
                    aws_sensorid: config.aws_sensorid,
                    is_hidden: config.is_hidden,
                    description: config.description,
                    is_active: config.is_active,
                    name: config.name,
                    updated_by: userid,
                    date_updated: new Date()
                },
            });
        }));
        return updatedData;
    }
    unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds) {
        return this.prismaService.sensors.updateMany({
            where: {
                deviceid: {
                    in: deviceIds
                }
            },
            data: {
                deviceid: null
            }
        });
    }
    unAssignSensorOnDeviceDeletion(deviceid) {
        return this.prismaService.sensors.updateMany({
            where: {
                deviceid: deviceid
            },
            data: {
                deviceid: null
            }
        });
    }
    createSensorType(model) {
        return this.prismaService.sensortypes.createMany({
            data: model
        });
    }
    getSensorTypeById(typeId) {
        return this.prismaService.sensortypes.findFirst({
            where: {
                sensortypeid: typeId
            }
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
    findByAwsIdWithOrgId(awsId, orgId) {
        return this.prismaService.sensors.findFirst({
            where: {
                is_active: true,
                aws_sensorid: awsId,
                is_deleted: false,
                customerid: orgId,
                deviceid: null
            }
        });
    }
    findAssignSensor() {
        return this.prismaService.sensors.findMany({
            where: {
                assigned_by: { not: null },
                is_deleted: false,
                customerid: { not: null }
            },
            include: {
                customers: true,
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
            },
            include: {
                customers: true
            }
        });
    }
    findAllSensorByOrganizationId(orgId) {
        return this.prismaService.sensors.findMany({
            where: {
                customerid: orgId,
                assigned_by: { not: null },
                is_deleted: false,
                is_active: true
            },
            include: {
                customers: true,
                devices: true
            }
        });
    }
    findAssignSensorByDeviceId(devId) {
        return this.prismaService.sensors.findMany({
            where: {
                deviceid: devId,
                assigned_by: { not: null },
                is_deleted: false,
                is_active: true
            },
            include: {
                devices: {
                    include: {
                        departments: true
                    }
                },
            }
        });
    }
    findSensorByDeviceIds(deviceIds) {
        return this.prismaService.sensors.findMany({
            where: {
                deviceid: {
                    in: deviceIds
                },
                is_deleted: false,
            }
        });
    }
    findEquipmentSensorByOrgId(orgId) {
        return this.prismaService.sensors.findMany({
            where: {
                customerid: orgId,
                assigned_by: { not: null },
                deviceid: { not: null },
                is_deleted: false,
                is_active: true
            },
            include: {
                devices: {
                    include: {
                        departments: true
                    }
                },
            }
        });
    }
    findEquipmentSensorByDeviceIds(deviceIds) {
        return this.prismaService.sensors.findMany({
            where: {
                deviceid: {
                    in: deviceIds
                },
                is_deleted: false,
            },
            include: {
                devices: {
                    include: {
                        departments: true
                    }
                },
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
    getAllSensorByOrgId(orgId) {
        return this.prismaService.sensors.findMany({
            where: {
                customerid: orgId,
                is_active: true,
                is_deleted: false
            }
        });
    }
    async getGraphOfSensor(aws_id, startDate, endDate) {
        if (startDate == endDate) {
            return this.prismaService.readings.findMany({
                where: {
                    aws_id: aws_id,
                    reading_timestamp: {
                        gte: startDate,
                    }
                }
            });
        }
        else {
            return this.prismaService.readings.findMany({
                where: {
                    aws_id: aws_id,
                    reading_timestamp: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });
        }
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