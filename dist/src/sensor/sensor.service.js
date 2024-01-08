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
const organization_service_1 = require("../organization/organization.service");
let SensorService = class SensorService {
    constructor(sensorRepository, awsService, organizationService, departmentService, deviceService) {
        this.sensorRepository = sensorRepository;
        this.awsService = awsService;
        this.organizationService = organizationService;
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
            const model = Object.assign(Object.assign({}, createSensorDto), { sensorname: createSensorDto.sensorname || "", is_active: true, is_deleted: false, date_created: new Date(), date_updated: new Date(), assigned_by: userId });
            const existingSensor = await this.sensorRepository.findByAwsId(createSensorDto.aws_sensorid);
            const existingSensorWithOrgId = await this.sensorRepository.findByAwsIdWithOrgId(createSensorDto.aws_sensorid, createSensorDto.customerid);
            if (existingSensor) {
                sensor = await this.sensorRepository.updateSensor(existingSensor.sensorid, model);
                if (!sensor)
                    throw new common_1.NotImplementedException("Cannot Assign Sensor");
            }
            else if (existingSensorWithOrgId) {
                sensor = await this.sensorRepository.updateSensor(existingSensorWithOrgId.sensorid, model);
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
                        is_active: false,
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
                        is_active: false,
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
                        is_active: false,
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
                        is_active: false,
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async getSensorByDeviceId(devId) {
        try {
            const sensor = await this.sensorRepository.findAssignSensorByDeviceId(devId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async getAllSensorByOrgId(orgId) {
        try {
            const sensor = await this.sensorRepository.findAllSensorByOrganizationId(orgId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async getEquipmentSensorByOrgId(orgId) {
        try {
            const sensor = await this.sensorRepository.findEquipmentSensorByOrgId(orgId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async getEquipmentSensorByFacId(facId) {
        try {
            const departments = await this.departmentService.GetAllDepartmentIdsByFacilityId(facId);
            let departmentIds = departments.data.map((obj) => {
                return obj.departmentid;
            });
            const device = await this.deviceService.findDevicesByDepartmentIds(departmentIds);
            let deviceIds = device.data.map((obj) => {
                return obj.deviceid;
            });
            const sensor = await this.sensorRepository.findEquipmentSensorByDeviceIds(deviceIds);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async getEquipmentSensorByDepId(depId) {
        try {
            const devices = await this.deviceService.findAllDevicesByDepId(depId);
            let deviceIds = devices.data.map((obj) => {
                return obj.deviceid;
            });
            const sensor = await this.sensorRepository.findEquipmentSensorByDeviceIds(deviceIds);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
        const allSensorTypes = sensorType.map((type) => ({
            property: type.property,
            sensorId: type.sensorid,
            sensorTypeId: type.sensortypeid,
            awsSensorId: type.aws_sensorid,
            minValue: type.minvalue,
            maxValue: type.maxvalue,
            sensorName: type.name,
            deviceName: type.sensors.devices.devicename
        }));
        const responseArray = allSensorTypes.map((sensorType) => {
            const matchingData = mergedData.find((data) => data.awsSensorId === sensorType.awsSensorId && data.property === sensorType.property);
            return Object.assign(Object.assign({}, sensorType), { value: (matchingData === null || matchingData === void 0 ? void 0 : matchingData.value) || null, batteryValue: matchingData ? matchingData.batteryValue : null, readingDateTime: matchingData ? matchingData.readingDateTime : null });
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Widget Found Successfully!",
            data: responseArray,
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
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
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
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    remove(id) {
        return `This action removes a #${id} sensor`;
    }
    async removeNullEntries(obj) {
        await Object.keys(obj).forEach(key => obj[key] === null && delete obj[key]);
        return obj;
    }
    async checkPointReport(id, days, startDate, sensorsIds) {
        try {
            const data = await this.sensorRepository.getAllSensorByOrgId(id);
            let timeInterval = await this.organizationService.findOrganizationInterval(id);
            timeInterval = await this.removeNullEntries(timeInterval.data);
            if (data.length == 0) {
                const response = {
                    statusCode: common_1.HttpStatus.OK,
                    message: "Sensors not found so cannot create Check point report",
                    data: {
                        intervals: timeInterval,
                        checkPoints: [],
                        sensors: []
                    },
                    error: false
                };
                return response;
            }
            const awsIds = data.map((obj) => {
                return obj.aws_sensorid;
            });
            const sensorIds = data.map((obj) => {
                return obj.sensorid;
            });
            const sensorTypes = await this.sensorRepository.getSensorTypesOfSensors(sensorIds);
            const reportData = await this.awsService.getSensorDataForReport(awsIds, days, startDate);
            const readingsByDate = await this.groupReadingsByDate(reportData);
            const report = await this.filterReadingsWithIntervalsForFinalReport(readingsByDate, timeInterval);
            let finalResponse = report.flatMap((objects) => {
                return sensorTypes.map((sensor) => {
                    if (sensor.aws_sensorid === objects.aws_id && sensor.property === objects.sensorValue) {
                        objects.sensorValue = sensor.name;
                        return Object.assign({ min: sensor.minvalue, max: sensor.maxvalue, sensorTypeId: sensor.sensortypeid }, objects);
                    }
                    return null;
                }).filter((entry) => entry !== null);
            });
            if (sensorsIds.length > 0) {
                finalResponse = finalResponse.map((object) => {
                    if (sensorsIds.includes(object.sensorTypeId)) {
                        return object;
                    }
                    else {
                        return null;
                    }
                }).filter((entry) => entry !== null);
            }
            const filteredResponse = finalResponse.map((object) => {
                object.readings = object.readings.filter((reading) => (reading.interval));
                return object;
            });
            let graphSensors = filteredResponse.map((objects) => {
                return {
                    sensorTypeId: objects.sensorTypeId,
                    sensorValue: objects.sensorValue,
                    aws_id: objects.aws_id
                };
            });
            const uniqueSensors = Array.from(new Set(graphSensors.map(sensor => sensor.sensorTypeId)))
                .map(sensorTypeId => graphSensors.find(sensor => sensor.sensorTypeId === sensorTypeId));
            const dataResponse = {
                statusCode: common_1.HttpStatus.OK,
                message: "Checkpoint Report Created Successfully",
                data: { intervals: timeInterval, checkPoints: filteredResponse, sensors: uniqueSensors },
                error: false
            };
            return dataResponse;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async groupReadingsByDate(sensorData) {
        const sensorReadings = {};
        for (const reading of sensorData) {
            const { readingid, measure, aws_id, reading_timestamp, sensorvalue } = reading;
            const date = reading_timestamp.split(' ')[0];
            if (!sensorReadings[date]) {
                sensorReadings[date] = {};
            }
            if (!sensorReadings[date][aws_id]) {
                sensorReadings[date][aws_id] = {};
            }
            if (!sensorReadings[date][aws_id][sensorvalue]) {
                sensorReadings[date][aws_id][sensorvalue] = [];
            }
            sensorReadings[date][aws_id][sensorvalue].push({
                readingid,
                measure,
                reading_timestamp,
            });
        }
        const reportResponse = [];
        for (const date in sensorReadings) {
            const awsData = sensorReadings[date];
            for (const aws_id in awsData) {
                const sensorValues = awsData[aws_id];
                for (const sensorValue in sensorValues) {
                    const readings = sensorValues[sensorValue];
                    reportResponse.push({
                        date,
                        aws_id,
                        sensorValue,
                        readings,
                    });
                }
            }
        }
        return reportResponse;
    }
    async filterReadingsWithIntervalsForFinalReport(response, intervals) {
        const filteredObject = response.map((object) => {
            const times = [
                intervals.interval1,
                intervals.interval2,
                intervals.interval3,
                intervals.interval4,
            ];
            const filteredReadings = [];
            const includedIntervals = new Set();
            times.forEach((interval) => {
                let closestReading = null;
                let minDifference = Number.MAX_SAFE_INTEGER;
                object.readings.forEach((reading) => {
                    const readingTime = new Date(reading.reading_timestamp);
                    const readingHour = readingTime.getHours();
                    const readingMinutes = readingTime.getMinutes();
                    if (readingHour === interval) {
                        const difference = Math.abs(readingMinutes - 0);
                        if (difference < minDifference) {
                            minDifference = difference;
                            closestReading = Object.assign(Object.assign({}, reading), { interval });
                        }
                    }
                });
                if (closestReading) {
                    filteredReadings.push(closestReading);
                    includedIntervals.add(interval);
                }
                else if (!includedIntervals.has(interval)) {
                    filteredReadings.push({
                        readingid: 0,
                        measure: "0",
                        reading_timestamp: `00-00-00:00:00.000`,
                        interval,
                    });
                }
            });
            return Object.assign(Object.assign({}, object), { readings: filteredReadings });
        });
        const filteredResponse = filteredObject.filter((obj) => obj.sensorValue !== "battery");
        return filteredResponse;
    }
    async getGraphForSensor(sensorTypeId, aws_id, startDate, endDate) {
        try {
            const startingDate = new Date(startDate);
            startingDate.setDate(startingDate.getDate() - 1);
            let endingDate = new Date(endDate).toISOString();
            const data = await this.sensorRepository.getGraphOfSensor(aws_id, startingDate.toISOString(), endingDate);
            if (data.length === 0) {
                const response = {
                    statusCode: common_1.HttpStatus.OK,
                    message: `No readings found against ${aws_id}`,
                    data: [],
                    error: false,
                };
                return response;
            }
            const sensorType = await this.sensorRepository.getSensorTypeById(sensorTypeId);
            const getSpecificProperty = data.filter((object) => sensorType.property === object.sensorvalue);
            const uniqueEntries = new Set();
            const filteredData = getSpecificProperty.filter((reading) => {
                const key = `${reading.reading_timestamp.split(' ')[1]}-${reading.measure}`;
                const key2 = key.split(':');
                const finalKey = `${key2[0]}:${key2[1]}-${reading.measure}`;
                if (!uniqueEntries.has(finalKey)) {
                    uniqueEntries.add(finalKey);
                    return true;
                }
                return false;
            });
            const groupedResponse = filteredData.reduce((acc, reading) => {
                const date = reading.reading_timestamp.split(' ')[0];
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(reading);
                return acc;
            }, {});
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: `Graph created for ${aws_id}`,
                data: Object.assign(Object.assign({}, groupedResponse), { dates: Object.keys(groupedResponse), sensorName: sensorType.name, minvalue: sensorType.minvalue, maxvalue: sensorType.maxvalue, sensorTypeId: sensorType.sensortypeid }),
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
};
SensorService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => organization_service_1.OrganizationService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => department_service_1.DepartmentService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => device_service_1.DeviceService))),
    __metadata("design:paramtypes", [sensor_repository_1.SensorRepository,
        aws_service_1.AwsService,
        organization_service_1.OrganizationService,
        department_service_1.DepartmentService,
        device_service_1.DeviceService])
], SensorService);
exports.SensorService = SensorService;
//# sourceMappingURL=sensor.service.js.map