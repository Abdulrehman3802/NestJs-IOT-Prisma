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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
const common_1 = require("@nestjs/common");
const create_sensor_dto_1 = require("./dto/request/create-sensor.dto");
const sensor_repository_1 = require("./sensor.repository");
const aws_service_1 = require("../aws/aws.service");
const device_service_1 = require("../device/device.service");
const department_service_1 = require("../department/department.service");
let SensorService = class SensorService {
    constructor(sensorRepository, awsService, departmentService, deviceService) {
        this.sensorRepository = sensorRepository;
        this.awsService = awsService;
        this.departmentService = departmentService;
        this.deviceService = deviceService;
    }
    async assignSensor(userId, createSensorDto) {
        try {
            if (createSensorDto.deviceid && !(createSensorDto.customerid)) {
                const device = await this.deviceService.findOne(createSensorDto.deviceid);
                createSensorDto.customerid = device.data.customerid;
            }
            let sensor;
            const model = Object.assign(Object.assign({}, createSensorDto), { is_active: true, is_deleted: false, date_created: new Date(), date_updated: new Date(), assigned_by: userId });
            const existingSensor = await this.sensorRepository.findByAwsId(createSensorDto.aws_sensorid);
            if (existingSensor) {
                sensor = await this.sensorRepository.updateSensor(existingSensor.sensorid, model);
                if (!sensor)
                    throw new common_1.NotImplementedException("Cannot Assign Sensor");
            }
            else {
                sensor = await this.sensorRepository.assignSensor(model);
                if (!sensor)
                    throw new common_1.NotImplementedException("Cannot Assign Sensor");
                let sensorTypeModel = [
                    {
                        property: "humidity",
                        unit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        name: "humidity",
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: false,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
                        description: " "
                    },
                    {
                        property: "co2",
                        unit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        name: "co2",
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: false,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
                        description: " "
                    },
                    {
                        property: "temp",
                        unit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        name: "temp",
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: false,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
                        description: " "
                    },
                    {
                        property: "temp2",
                        unit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        name: "temp2",
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: false,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
                        description: " "
                    }
                ];
                const sensorType = await this.sensorRepository.createSensorType(sensorTypeModel);
                if (!sensorType)
                    throw new common_1.NotImplementedException("Sensor Type not Created");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensor Assign Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getSensorConfiguration(sensorId) {
        try {
            const sensorTypes = await this.sensorRepository.getSensorType(sensorId);
            if (sensorTypes.length == 0) {
                throw new common_1.NotFoundException(`Sensor configuration with id ${sensorId} does not exist`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensor configuration Successfully",
                data: sensorTypes,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async ShowSensorConfiguration(sensorId) {
        try {
            const sensorConfiguration = await this.sensorRepository.showSensorConfiguration(sensorId);
            if (!sensorConfiguration) {
                throw new common_1.NotFoundException(`Sensor configuration with id ${sensorId} does not exist`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensor configuration Successfully",
                data: sensorConfiguration,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async updateSensorConfiguration(userId, configuration) {
        try {
            const sensorConfiguration = await this.sensorRepository.updateSensorConfiguration(userId, configuration);
            if (!sensorConfiguration) {
                throw new common_1.NotImplementedException("Cannot Update Sensor Configuration");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensor configuration Updated Successfully",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async unAssignSensorOnOrganziationDeletion(orgid) {
        try {
            const deletionResponse = await this.sensorRepository.unAssignSensorOnOrganizationDeletion(orgid);
            if (!deletionResponse)
                throw new common_1.NotImplementedException("Problem in unassigning sensor");
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensor UnAssigned Successfully",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds) {
        try {
            const deletionResponse = await this.sensorRepository.unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds);
            if (!deletionResponse)
                throw new common_1.NotImplementedException("Problem in unassigning sensor");
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensor UnAssigned Successfully",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async unAssignSensorOnDeviceDeletion(deviceid) {
        try {
            const deletionResponse = await this.sensorRepository.unAssignSensorOnDeviceDeletion(deviceid);
            if (!deletionResponse)
                throw new common_1.NotImplementedException("Problem in unassigning sensor");
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensor UnAssigned Successfully",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllAssignedSensor(token) {
        try {
            const { rolename, customerId } = token;
            let assignSensor;
            if (rolename === 'SuperAdmin') {
                assignSensor = await this.sensorRepository.findAssignSensor();
            }
            else {
                assignSensor = await this.sensorRepository.findAssignSensorByOrganizationId(customerId);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors found Successfully",
                data: assignSensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUnAssignedSensors(token) {
        try {
            let assignedSensor, subtracted;
            const { rolename, customerId } = token;
            if (rolename === 'SuperAdmin') {
                const awsSensor = await this.awsService.findAll();
                assignedSensor = await this.sensorRepository.findAssignSensor();
                let ids = assignedSensor.map((obj) => {
                    return obj.aws_sensorid;
                });
                subtracted = awsSensor.filter(item => !ids.includes(item));
            }
            else {
                assignedSensor = await this.sensorRepository.findAssignSensorByOrganizationId(customerId);
                subtracted = assignedSensor.map((obj) => {
                    return obj.aws_sensorid;
                });
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors found Successfully",
                data: subtracted,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async updateAssignedSensor(userid, id, updateDto) {
        try {
            const model = new create_sensor_dto_1.SensorDto();
            model.customerid = updateDto.customerid;
            model.deviceid = updateDto.deviceid;
            model.assigned_by = userid;
            const sensor = await this.sensorRepository.updateSensor(id, model);
            if (!sensor) {
                throw new common_1.NotImplementedException("Cannot Update Sensor");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async unAssignedSensor(id) {
        try {
            const model = new create_sensor_dto_1.SensorDto();
            model.customerid = null;
            model.deviceid = null;
            model.assigned_by = null;
            model.date_updated = new Date();
            const sensor = await this.sensorRepository.updateSensor(id, model);
            if (!sensor) {
                throw new common_1.NotImplementedException("Cannot Update Sensor");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getSensorByDeviceId(devId) {
        try {
            const sensor = await this.sensorRepository.findAssignSensorByDeviceId(devId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getSensorByOrgId(orgId) {
        try {
            const sensor = await this.sensorRepository.findAssignSensorByOrganizationId(orgId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async unAssignedSensorFromDevice(id) {
        try {
            const model = new create_sensor_dto_1.SensorDto();
            model.deviceid = null;
            model.date_updated = new Date();
            const sensor = await this.sensorRepository.updateSensor(id, model);
            if (!sensor) {
                throw new common_1.NotImplementedException("Cannot Update Sensor");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors UnAssigned from device Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getSensorWidgets(orgId) {
        const sensors = await this.sensorRepository.getAllSensorByOrgId(orgId);
        if (sensors.length === 0) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Widget Not Found!",
                data: [],
                error: false,
            };
        }
        const awsIds = sensors.map((obj) => obj.aws_sensorid);
        const sensorIds = sensors.map((obj) => obj.sensorid);
        const [sensorType, awsSensorData] = await Promise.all([
            this.sensorRepository.getSensorTypesOfSensors(sensorIds),
            this.awsService.getSensorDataForWidgets(awsIds),
        ]);
        if (awsSensorData.length === 0) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Widget Not Found!",
                data: [],
                error: false,
            };
        }
        const batteryDataBySensor = {};
        const mergedData = [];
        awsSensorData.forEach((awsData) => {
            var _a;
            if (awsData.type === 'battery') {
                const sensorId = awsData.sensorId || '';
                if (!batteryDataBySensor[sensorId]) {
                    batteryDataBySensor[sensorId] = [];
                }
                batteryDataBySensor[sensorId].push({
                    aws_sensorid: awsData.sensorId,
                    value: awsData.value,
                    time: awsData.time,
                });
            }
            const matchingSensorType = sensorType.find((sensorType) => {
                return (sensorType.aws_sensorid === (awsData === null || awsData === void 0 ? void 0 : awsData.sensorId) &&
                    sensorType.property === (awsData === null || awsData === void 0 ? void 0 : awsData.type));
            });
            const batteryData = batteryDataBySensor[awsData.sensorId || ''] || [];
            if (matchingSensorType) {
                mergedData.push({
                    property: matchingSensorType.property,
                    sensorId: matchingSensorType.sensorid,
                    awsSensorId: matchingSensorType.aws_sensorid,
                    value: awsData === null || awsData === void 0 ? void 0 : awsData.value,
                    batteryValue: (_a = batteryData[0]) === null || _a === void 0 ? void 0 : _a.value,
                    minValue: matchingSensorType.minvalue,
                    maxValue: matchingSensorType.maxvalue,
                    sensorName: matchingSensorType.name,
                    readingDateTime: awsData === null || awsData === void 0 ? void 0 : awsData.time,
                });
            }
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Widget Found Successfully!",
            data: mergedData,
            error: false,
        };
    }
    async getSensorByDepartmentId(depId) {
        try {
            const devices = await this.deviceService.findAllDevicesByDepId(depId);
            let deviceIds = devices.data.map((obj) => {
                return obj.deviceid;
            });
            const sensor = await this.sensorRepository.findSensorByDeviceIds(deviceIds);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getSensorByFacilityId(facId) {
        try {
            const departments = await this.departmentService.GetAllDepartmentIdsByFacilityId(facId);
            let departmentIds = departments.data.map((obj) => {
                return obj.departmentid;
            });
            const device = await this.deviceService.findDevicesByDepartmentIds(departmentIds);
            let deviceIds = device.data.map((obj) => {
                return obj.deviceid;
            });
            const sensor = await this.sensorRepository.findSensorByDeviceIds(deviceIds);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    remove(id) {
        return `This action removes a #${id} sensor`;
    }
};
SensorService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => department_service_1.DepartmentService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => device_service_1.DeviceService))),
    __metadata("design:paramtypes", [sensor_repository_1.SensorRepository,
        aws_service_1.AwsService,
        department_service_1.DepartmentService,
        device_service_1.DeviceService])
], SensorService);
exports.SensorService = SensorService;
//# sourceMappingURL=sensor.service.js.map