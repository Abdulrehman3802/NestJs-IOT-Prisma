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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const device_repository_1 = require("./device.repository");
const sensor_service_1 = require("../sensor/sensor.service");
let DeviceService = class DeviceService {
    constructor(deviceRepository, sensorService) {
        this.deviceRepository = deviceRepository;
        this.sensorService = sensorService;
    }
    async create(createDeviceDto, token) {
        try {
            const { id, rolename, customerId, facilityId, departmentId } = token;
            let deviceModel;
            const orgId = createDeviceDto.customerid;
            const facId = createDeviceDto.facilityid;
            const depId = createDeviceDto.departmentid;
            if (rolename == 'SuperAdmin') {
                if (!orgId || !facId || !depId)
                    throw new common_1.NotAcceptableException("departmentid, facilityid and customerid cannot be empty");
                deviceModel = Object.assign(Object.assign({}, createDeviceDto), { is_active: true, created_by: id, is_deleted: false, updated_by: id, date_created: new Date(), date_updated: new Date() });
            }
            else if (rolename == 'OrganizationAdmin') {
                if (!facId || !depId)
                    throw new common_1.NotAcceptableException("departmentid and facilityid cannot be empty");
                deviceModel = Object.assign(Object.assign({}, createDeviceDto), { customerid: customerId, is_active: true, created_by: id, is_deleted: false, updated_by: id, date_created: new Date(), date_updated: new Date() });
            }
            else if (rolename == 'FacilityAdmin') {
                if (!depId)
                    throw new common_1.NotAcceptableException("departmentid cannot be empty");
                deviceModel = Object.assign(Object.assign({}, createDeviceDto), { customerid: customerId, facilityid: facilityId, is_active: true, created_by: id, is_deleted: false, updated_by: id, date_created: new Date(), date_updated: new Date() });
            }
            else {
                deviceModel = Object.assign(Object.assign({}, createDeviceDto), { customerid: customerId, facilityid: facilityId, departmentid: departmentId, is_active: true, created_by: id, is_deleted: false, updated_by: id, date_created: new Date(), date_updated: new Date() });
            }
            const device = await this.deviceRepository.createDevice(deviceModel);
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: "Device Created Successfully!",
                data: device,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(token) {
        try {
            const { rolename, customerId, facilityId, departmentId } = token;
            let devices;
            if (rolename === 'OrganizationAdmin') {
                devices = await this.deviceRepository.findAllDevicesByOrganizationId(customerId);
            }
            else if (rolename === 'FacilityAdmin') {
                devices = await this.deviceRepository.findAllDevicesByFacilityId(facilityId);
            }
            else if (rolename === 'DepartmentAdmin') {
                devices = await this.deviceRepository.findAllDevicesByDepartmentId(departmentId);
            }
            else {
                devices = await this.deviceRepository.findAllDevices();
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Devices Found Successfully!",
                data: devices,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findDevicesByDepartmentIds(departmentIds) {
        try {
            const devices = await this.deviceRepository.findDevicesByDepartmentIds(departmentIds);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Devices Found Successfully!",
                data: devices,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const device = await this.deviceRepository.findOneDevice(id);
            if (!device) {
                throw new common_1.NotFoundException(`Facility Not Found with id: ${id}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Found Successfully!",
                data: {
                    deviceid: device.deviceid,
                    devicename: device.devicename,
                    departmentid: device.departmentid,
                    facilityid: device.facilityid,
                    customerid: device.customerid,
                    devicetype: device.devicetype,
                    manufacturer: device.manufacturer,
                    is_active: device.is_active,
                    is_deleted: device.is_deleted,
                    created_by: device.created_by,
                    updated_by: device.updated_by,
                    date_created: device.date_created,
                    date_updated: device.date_updated
                },
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateDeviceDto) {
        try {
            const updatedDevice = await this.deviceRepository.updateDevice(id, updateDeviceDto);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Updated Successfully!",
                data: {
                    deviceid: updatedDevice.deviceid,
                    devicename: updatedDevice.devicename,
                    departmentid: updatedDevice.departmentid,
                    facilityid: updatedDevice.facilityid,
                    customerid: updatedDevice.customerid,
                    devicetype: updatedDevice.devicetype,
                    manufacturer: updatedDevice.manufacturer,
                    is_active: updatedDevice.is_active,
                    is_deleted: updatedDevice.is_deleted,
                    created_by: updatedDevice.created_by,
                    updated_by: updatedDevice.updated_by,
                    date_created: updatedDevice.date_created,
                    date_updated: updatedDevice.date_updated
                },
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.deviceRepository.deleteDevice(id);
            await this.sensorService.unAssignSensorOnDeviceDeletion(id);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async removeByOrganizationId(orgid) {
        try {
            await this.deviceRepository.deleteDeviceByOrganizationId(orgid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async removeByFacilityId(facilityid) {
        try {
            await this.deviceRepository.deleteDeviceByFacilityId(facilityid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async removeByDepartmentId(departmentid) {
        try {
            await this.deviceRepository.deleteDeviceByDepartmentId(departmentid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllDevices(depId) {
        try {
            const allDevices = await this.deviceRepository.findAllDevicesByDepartmentId(depId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Devices Found Associated to Department",
                data: allDevices,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [device_repository_1.DeviceRepository,
        sensor_service_1.SensorService])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map