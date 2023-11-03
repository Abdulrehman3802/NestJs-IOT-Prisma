import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {SensorDto, SensorTypeModelDTO} from "./dto/create-sensor.dto";
import {UpdateSensorDto} from "./dto/update-sensor.dto";

@Injectable()
export class SensorRepository{
    constructor(private readonly prismaService:PrismaService) {
    }

    assignSensor(model: SensorDto) {
        return this.prismaService.sensors.create({
            data: model
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
            }
        });
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