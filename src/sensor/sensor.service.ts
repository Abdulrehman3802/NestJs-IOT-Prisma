import {HttpStatus, Inject, Injectable, NotImplementedException, forwardRef, NotFoundException} from '@nestjs/common';
import {CreateSensorDto, SensorDto, SensorTypeModelDTO} from './dto/request/create-sensor.dto';
import {UpdateSensorDto} from './dto/request/update-sensor.dto';
import {SensorRepository} from "./sensor.repository";
import {ApiResponseDto, Token} from "../../core/generics/api-response.dto";
import {AwsService} from "../aws/aws.service";
import {DeviceService} from "../device/device.service";
import {tsTsxJsJsxRegex} from "ts-loader/dist/constants";
import {DepartmentService} from "../department/department.service";
import {UpdateConfigurationDto} from "./dto/request/update-configuration.dto";
import {ResponseConfigurationDto} from "./dto/response/response-configuration.dto";


@Injectable()
export class SensorService {
    constructor(
        private readonly sensorRepository: SensorRepository,
        private readonly awsService: AwsService,
        @Inject(forwardRef(() => DepartmentService)) private readonly departmentService: DepartmentService,
        @Inject(forwardRef(() => DeviceService)) private readonly deviceService: DeviceService,
    ) {
    }

    async assignSensor(userId: number, createSensorDto: CreateSensorDto) {
        try {
            if (createSensorDto.deviceid && !(createSensorDto.customerid)) {
                const device = await this.deviceService.findOne(createSensorDto.deviceid)
                createSensorDto.customerid = device.data.customerid
            }
            let sensor
            const model = {
                ...createSensorDto,
                is_active: true,
                is_deleted: false,
                date_created: new Date(),
                date_updated: new Date(),
                assigned_by: userId
            }
            // Find If sensor is there But not assigned to anything
            const existingSensor = await this.sensorRepository.findByAwsId(createSensorDto.aws_sensorid)
            if (existingSensor) {
                // Update un assign sensor and assign to the org or device
                sensor = await this.sensorRepository.updateSensor(existingSensor.sensorid, model)
                if (!sensor) throw new NotImplementedException("Cannot Assign Sensor")
            } else {
                // Simply assign sensor
                sensor = await this.sensorRepository.assignSensor(model)
                if (!sensor) throw new NotImplementedException("Cannot Assign Sensor")
                // create 4 sensor type humidity and so on for later configuration
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
                ]
                const sensorType = await this.sensorRepository.createSensorType(sensorTypeModel)
                if (!sensorType) throw new NotImplementedException("Sensor Type not Created")
            }

            const response: ApiResponseDto<SensorDto> = {
                statusCode: HttpStatus.OK,
                message: "Sensor Assign Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getSensorConfiguration(sensorId: number) {
        try {
            const sensorTypes = await this.sensorRepository.getSensorType(sensorId)
            if(sensorTypes.length == 0) {
                throw new NotFoundException(`Sensor configuration with id ${sensorId} does not exist`)
            }
            const response: ApiResponseDto<ResponseConfigurationDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensor configuration Successfully",
                data: sensorTypes,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async ShowSensorConfiguration(sensorId: number) {
        try {
            const sensorConfiguration = await this.sensorRepository.showSensorConfiguration(sensorId)
            if(!sensorConfiguration){
                throw new NotFoundException(`Sensor configuration with id ${sensorId} does not exist`)
            }
            const response: ApiResponseDto<ResponseConfigurationDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensor configuration Successfully",
                data: sensorConfiguration,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async updateSensorConfiguration(sensorId: number, configuration:UpdateConfigurationDto[]) {
        try {
            const sensorConfiguration = await this.sensorRepository.updateSensorConfiguration(sensorId, configuration)
            if(!sensorConfiguration){
                throw new NotImplementedException("Cannot Update Sensor Configuration")
            }
            const response: ApiResponseDto<null> = {
                statusCode: HttpStatus.OK,
                message: "Sensor configuration Updated Successfully",
                data: null,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async unAssignSensorOnOrganziationDeletion(orgid: number) {
        try {
            const deletionResponse = await this.sensorRepository.unAssignSensorOnOrganizationDeletion(orgid)
            if (!deletionResponse) throw new NotImplementedException("Problem in unassigning sensor")

            const response: ApiResponseDto<null> = {
                statusCode: HttpStatus.OK,
                message: "Sensor UnAssigned Successfully",
                data: null,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds: number[]) {
        try {
            const deletionResponse = await this.sensorRepository.unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds)
            if (!deletionResponse) throw new NotImplementedException("Problem in unassigning sensor")

            const response: ApiResponseDto<null> = {
                statusCode: HttpStatus.OK,
                message: "Sensor UnAssigned Successfully",
                data: null,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async unAssignSensorOnDeviceDeletion(deviceid: number) {
        try {
            const deletionResponse = await this.sensorRepository.unAssignSensorOnDeviceDeletion(deviceid)
            if (!deletionResponse) throw new NotImplementedException("Problem in unassigning sensor")

            const response: ApiResponseDto<null> = {
                statusCode: HttpStatus.OK,
                message: "Sensor UnAssigned Successfully",
                data: null,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getAllAssignedSensor(token: Token) {
        try {
            const {rolename, customerId} = token;
            let assignSensor: SensorDto[];
            if (rolename === 'SuperAdmin') {
                assignSensor = await this.sensorRepository.findAssignSensor()
            } else {
                assignSensor = await this.sensorRepository.findAssignSensorByOrganizationId(customerId)
            }
            const response: ApiResponseDto<SensorDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensors found Successfully",
                data: assignSensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getAllUnAssignedSensors(token: Token) {
        try {
            let assignedSensor: SensorDto[], subtracted: string[]
            const {rolename, customerId} = token;

            if (rolename === 'SuperAdmin') {
                const awsSensor = await this.awsService.findAll()
                assignedSensor = await this.sensorRepository.findAssignSensor()
                let ids = assignedSensor.map((obj) => {
                    return obj.aws_sensorid
                })
                // subtracting or separating the assigned one from all sensors
                subtracted = awsSensor.filter(item => !ids.includes(item));
            } else {
                assignedSensor = await this.sensorRepository.findAssignSensorByOrganizationId(customerId)
                subtracted = assignedSensor.map((obj) => {
                    return obj.aws_sensorid
                })
            }

            const response: ApiResponseDto<string[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensors found Successfully",
                data: subtracted,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async updateAssignedSensor(userid: number, id: number, updateDto: UpdateSensorDto) {
        try {
            const model = new SensorDto()
            model.customerid = updateDto.customerid;
            model.deviceid = updateDto.deviceid;
            model.assigned_by = userid;

            const sensor = await this.sensorRepository.updateSensor(id, model);
            if (!sensor) {
                throw new NotImplementedException("Cannot Update Sensor");
            }
            const response: ApiResponseDto<SensorDto> = {
                statusCode: HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            }
            return response;
        } catch (error) {
            throw error
        }
    }

    async unAssignedSensor(id: number) {
        try {
            const model = new SensorDto()
            model.customerid = null;
            model.deviceid = null;
            model.assigned_by = null;
            model.date_updated = new Date()
            const sensor = await this.sensorRepository.updateSensor(id, model)
            if (!sensor) {
                throw new NotImplementedException("Cannot Update Sensor")
            }
            const response: ApiResponseDto<SensorDto> = {
                statusCode: HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getSensorByDeviceId(devId: number) {
        try {
            const sensor = await this.sensorRepository.findAssignSensorByDeviceId(devId)
            const response: ApiResponseDto<SensorDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getSensorByOrgId(orgId: number) {
        try {
            const sensor = await this.sensorRepository.findAssignSensorByOrganizationId(orgId)
            const response: ApiResponseDto<SensorDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
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
            const response: ApiResponseDto<any[]> = {
                statusCode: HttpStatus.OK,
                message: "Widget Found Successfully!",
                data: data,
                error: false,
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSensorByDepartmentId(depId: number) {
        try {
            const devices = await this.deviceService.findAllDevicesByDepId(depId)
            let deviceIds = devices.data.map((obj) => {
                return obj.deviceid
            })
            const sensor = await this.sensorRepository.findSensorByDeviceIds(deviceIds)
            const response: ApiResponseDto<SensorDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getSensorByFacilityId(facId: number) {
        try {
            const departments = await this.departmentService.GetAllDepartmentIdsByFacilityId(facId)
            let departmentIds = departments.data.map((obj) => {
                return obj.departmentid
            })
            const device = await this.deviceService.findDevicesByDepartmentIds(departmentIds)
            let deviceIds = device.data.map((obj) => {
                return obj.deviceid
            })
            const sensor = await this.sensorRepository.findSensorByDeviceIds(deviceIds)
            const response: ApiResponseDto<SensorDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensors updated Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    remove(id: number) {
        return `This action removes a #${id} sensor`;
    }
}
