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
const create_sensor_dto_1 = require("./dto/create-sensor.dto");
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
                        sensortypename: "humidity",
                        measurementunit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: true,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
                    },
                    {
                        sensortypename: "CO2",
                        measurementunit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: true,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
                    },
                    {
                        sensortypename: "temprature1",
                        measurementunit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: true,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
                    },
                    {
                        sensortypename: "temprature2",
                        measurementunit: "c",
                        minvalue: 0,
                        maxvalue: 0,
                        sensorid: sensor.sensorid,
                        aws_sensorid: createSensorDto.aws_sensorid,
                        is_hidden: true,
                        is_deleted: false,
                        date_created: new Date(),
                        date_updated: new Date(),
                        updated_by: userId,
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
    async getSensorWidgets() {
        const data = [
            {
                "sensorId": 249,
                "awsSensorId": "00137a100004054f",
                "sensorName": "reading1",
                "minValue": 2,
                "maxValue": 20,
                "value": 13.46,
                "batteryValue": 3.6,
                "readingDateTime": "2023-11-02T13:49:01Z"
            },
            {
                "sensorId": 227,
                "awsSensorId": "a840418c718695d9",
                "sensorName": "temp1",
                "minValue": 5,
                "maxValue": 10,
                "value": 0.74,
                "batteryValue": 3.676,
                "readingDateTime": "2023-11-02T13:50:35Z"
            },
            {
                "sensorId": 259,
                "awsSensorId": "a840418c7186995d",
                "sensorName": "heating1",
                "minValue": 3,
                "maxValue": 15,
                "value": 9.31,
                "batteryValue": 3.621,
                "readingDateTime": "2023-11-02T13:52:25Z"
            }
        ];
        try {
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Widget Found Successfully!",
                data: data,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
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