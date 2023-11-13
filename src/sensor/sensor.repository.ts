import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {SensorDto, SensorTypeModelDTO} from "./dto/request/create-sensor.dto";
import {UpdateSensorDto} from "./dto/request/update-sensor.dto";
import {UpdateConfigurationDto} from "./dto/request/update-configuration.dto";
import {ResponseConfigurationDto} from "./dto/response/response-configuration.dto";

@Injectable()
export class SensorRepository{
    constructor(private readonly prismaService:PrismaService) {
    }

    assignSensor(model: SensorDto) {
        return this.prismaService.sensors.create({
            data: model
        })
    }

    unAssignSensorOnOrganizationDeletion(orgid: number) {
        return this.prismaService.sensors.updateMany({
            where: {
                customerid: orgid
            },
            data: {
                deviceid: null,
                customerid: null
            }
        })
    }

    getSensorType(sensorId: number) {
        return this.prismaService.sensortypes.findMany({
            where:{
                sensorid: sensorId,
            }

        })
    }

    showSensorConfiguration(sensorId: number) {
        return this.prismaService.sensortypes.findMany({
            where:{
                sensorid: sensorId,
                is_hidden:false
            }
        })
    }

    async updateSensorConfiguration(sensorId: number, configuration: UpdateConfigurationDto[]) {
        // Retrieve existing records
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
                    name: config.name,
                },
            });
        }));

        return updatedData;
    }


    unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds: number[]) {
        return this.prismaService.sensors.updateMany({
            where: {
                deviceid: {
                    in: deviceIds
                }
            },
            data: {
                deviceid: null            
            }
        })
    }

    unAssignSensorOnDeviceDeletion(deviceid: number) {
        return this.prismaService.sensors.updateMany({
            where: {
                deviceid: deviceid
            },
            data: {
                deviceid: null
            }
        })
    }

    createSensorType(model: SensorTypeModelDTO[]){
        return this.prismaService.sensortypes.createMany({
            data:model
        })
    }
    findUnAssignedSensor() {
        return this.prismaService.sensors.findMany({
            where:{
                assigned_by: null,
                is_deleted: false
            }
        });
    }

    findByAwsId(awsId:string){
        return this.prismaService.sensors.findFirst({
            where:{
                is_active:true,
                aws_sensorid:awsId,
                is_deleted:false,
                customerid: null
            }
        })
    }

    findAssignSensor() {
        return this.prismaService.sensors.findMany({
            where: {
                assigned_by: {not:null},
                is_deleted: false
            },
            include:{
                customers:true,
            }
        });
    }

    findAssignSensorByOrganizationId(orgId:number){
        return this.prismaService.sensors.findMany({
            where: {
                customerid: orgId,
                deviceid:null,
                assigned_by: {not:null},
                is_deleted: false,
                is_active: true
            },
            include:{
                customers:true
            }
        });
    }
    findAssignSensorByDeviceId(devId:number){
        return this.prismaService.sensors.findMany({
            where: {
                deviceid:devId,
                assigned_by: {not:null},
                is_deleted: false,
                is_active: true
            },
            include:{
                devices:{
                    include:{
                        departments:true
                    }
                },
            }
        });
    }

    findSensorByDeviceIds(deviceIds:number[]){
        return this.prismaService.sensors.findMany({
            where:{
                deviceid: {
                    in:deviceIds
                },
                is_deleted:false,
            }
        })
    }

    updateSensor(id: number, updateSensorDto: SensorDto) {
        return this.prismaService.sensors.update({
            where:{
                sensorid:id
            },
            data:updateSensorDto
        })
    }

    remove(id: number) {
        return `This action removes a #${id} sensor`;
    }
}