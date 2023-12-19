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
import {OrganizationService} from "../organization/organization.service";


@Injectable()
export class SensorService {
    constructor(
        private readonly sensorRepository: SensorRepository,
        private readonly awsService: AwsService,
        @Inject(forwardRef(() => OrganizationService)) private readonly organizationService: OrganizationService,
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
                sensorname:createSensorDto.sensorname ||"",
                // customerid:createSensorDto.customerid,
                // aws_sensorid:createSensorDto.aws_sensorid,
                is_active: true,
                is_deleted: false,
                date_created: new Date(),
                date_updated: new Date(),
                assigned_by: userId
            }
            // Find If sensor is there But not assigned to anything
            const existingSensor = await this.sensorRepository.findByAwsId(createSensorDto.aws_sensorid)
            const existingSensorWithOrgId = await this.sensorRepository.findByAwsIdWithOrgId(createSensorDto.aws_sensorid,createSensorDto.customerid)
            if (existingSensor) {
                // Update un assign sensor and assign to the org or device
                sensor = await this.sensorRepository.updateSensor(existingSensor.sensorid , model)
                if (!sensor) throw new NotImplementedException("Cannot Assign Sensor")
            }
            else if(existingSensorWithOrgId){
                sensor = await this.sensorRepository.updateSensor(existingSensorWithOrgId.sensorid , model)
                if (!sensor) throw new NotImplementedException("Cannot Assign Sensor")
            }
            else {
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
            if (sensorTypes.length == 0) {
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
            if (!sensorConfiguration) {
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

    async updateSensorConfiguration(userId: number, configuration: UpdateConfigurationDto[]) {
        try {
            const sensorConfiguration = await this.sensorRepository.updateSensorConfiguration(userId, configuration)
            if (!sensorConfiguration) {
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
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getAllSensorByOrgId(orgId: number) {
        try {
            const sensor = await this.sensorRepository.findAllSensorByOrganizationId(orgId)
            const response: ApiResponseDto<SensorDto[]> = {
                statusCode: HttpStatus.OK,
                message: "Sensors Found Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async unAssignedSensorFromDevice(id: number) {
        try {
            const model = new SensorDto()
            model.deviceid = null;
            model.date_updated = new Date()
            const sensor = await this.sensorRepository.updateSensor(id, model)
            if (!sensor) {
                throw new NotImplementedException("Cannot Update Sensor")
            }
            const response: ApiResponseDto<SensorDto> = {
                statusCode: HttpStatus.OK,
                message: "Sensors UnAssigned from device Successfully",
                data: sensor,
                error: false
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async getSensorWidgets(orgId: number) {
        // Finding Sensor of an organization
        const sensors = await this.sensorRepository.getAllSensorByOrgId(orgId);

        if (sensors.length === 0) {
            return {
                statusCode: HttpStatus.OK,
                message: "Widget Not Found!",
                data: [],
                error: false,
            };
        }

        // Separating their AWS ids
        const awsIds: string[] = sensors.map((obj) => obj.aws_sensorid);
        const sensorIds = sensors.map((obj) => obj.sensorid);

        const [sensorType, awsSensorData] = await Promise.all([
            this.sensorRepository.getSensorTypesOfSensors(sensorIds),
            this.awsService.getSensorDataForWidgets(awsIds),
        ]);

        if (awsSensorData.length === 0) {
            return {
                statusCode: HttpStatus.OK,
                message: "Widget Not Found!",
                data: [],
                error: false,
            };
        }

        const batteryDataBySensor = {};
        const mergedData = [];

        awsSensorData.forEach((awsData) => {
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
                return (
                    sensorType.aws_sensorid === awsData?.sensorId &&
                    sensorType.property === awsData?.type
                );
            });

            const batteryData = batteryDataBySensor[awsData.sensorId || ''] || [];

            if (matchingSensorType) {
                mergedData.push({
                    property: matchingSensorType.property,
                    sensorId: matchingSensorType.sensorid,
                    awsSensorId: matchingSensorType.aws_sensorid,
                    value: awsData?.value,
                    batteryValue: batteryData[0]?.value,
                    minValue: matchingSensorType.minvalue,
                    maxValue: matchingSensorType.maxvalue,
                    sensorName: matchingSensorType.name,
                    readingDateTime: awsData?.time,
                });
            }
        });

        return {
            statusCode: HttpStatus.OK,
            message: "Widget Found Successfully!",
            data: mergedData,
            error: false,
        };
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
                message: "Sensors Found Successfully",
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
                message: "Sensors Found Successfully",
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
    async checkPointReport(id: number, days: number, startDate: string) {
        try {
            // Getting all sensor of organization
            const data = await this.sensorRepository.getAllSensorByOrgId(id)
            // Getting time interval of organization
            const timeInterval = await this.organizationService.findOrganizationInterval(id)
            if (data.length == 0) {
                const response: ApiResponseDto<SensorDto[]> = {
                    statusCode: HttpStatus.OK,
                    message: "Sensors not found so cannot create Check point report",
                    data: [],
                    error: false
                }
                return response
            }
            // Separating aws_id of organization sensors
            const awsIds = data.map((obj) => {return obj.aws_sensorid})
            const sensorIds = data.map((obj) => {return obj.sensorid})
            const sensorTypes = await this.sensorRepository.getSensorTypesOfSensors(sensorIds)
            // DB call of reading table to fetch data for sensor of organization
            const reportData = await this.awsService.getSensorDataForReport(awsIds, days, startDate)
            const readingsByDate = await this.groupReadingsByDate(reportData)
            const report = await this.filterReadingsWithIntervalsForFinalReport(readingsByDate, timeInterval.data)
            const finalResponse = report.flatMap((objects) => {
                return sensorTypes.map((sensor) => {
                    if (sensor.aws_sensorid === objects.aws_id && sensor.property === objects.sensorValue) {
                        objects.sensorValue = sensor.name;
                        return { min: sensor.minvalue, max: sensor.maxvalue, ...objects };
                    }
                    return null; // Return null for entries that don't meet the condition
                }).filter((entry) => entry !== null); // Filter out null entries
            });
            return {intervals: timeInterval.data, checkPoints:finalResponse}
        } catch (error) {
            throw error
        }
    }
    async groupReadingsByDate(sensorData: any[]) {
        // Group the readings by date, aws_id, and sensorValue
        const sensorReadings = {};
        for (const reading of sensorData) {
            const {readingid, measure, aws_id, reading_timestamp, sensorvalue} = reading;
            // separating date from timestamp
            const date = reading_timestamp.split(' ')[0];
            // For separating object by Date
            if (!sensorReadings[date]) {
                sensorReadings[date] = {};
            }
            // For separating object by Date and Aws_id
            if (!sensorReadings[date][aws_id]) {
                sensorReadings[date][aws_id] = {};
            }

            if (!sensorReadings[date][aws_id][sensorvalue]) {
                sensorReadings[date][aws_id][sensorvalue] = [];
            }
            // For separating object by Date , aws_id and sensor value
            sensorReadings[date][aws_id][sensorvalue].push({
                readingid,
                measure,
                reading_timestamp,
            });
        }

        // Prepare the response for sending it to check intervals
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
    async filterReadingsWithIntervalsForFinalReport(response: any[], intervals: any) {
        const filteredObject = response.map((object) => {
            const times = [
                intervals.interval1,
                intervals.interval2,
                intervals.interval3,
                intervals.interval4,
            ];

            const filteredReadings = [];
            const includedIntervals = new Set(); // To keep track of intervals already included in readings

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
                            closestReading = { ...reading, interval };
                        }
                    }
                });

                if (closestReading) {
                    filteredReadings.push(closestReading);
                    includedIntervals.add(interval); // Record the included interval
                } else if (!includedIntervals.has(interval)) {
                    // If interval is missing and not included previously, add an object with 0 value
                    filteredReadings.push({
                        readingid: 0,
                        measure: "0",
                        reading_timestamp: `00-00-00:00:00.000`,
                        interval,
                    });
                }
            });

            return { ...object, readings: filteredReadings};
        });

        const filteredResponse = filteredObject.filter(
            (obj) => obj.sensorValue !== "battery"
        );
        return filteredResponse;
    }

}
