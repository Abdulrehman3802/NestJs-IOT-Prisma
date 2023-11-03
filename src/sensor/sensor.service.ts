import {BadRequestException, HttpStatus, Injectable, NotImplementedException} from '@nestjs/common';
import {CreateSensorDto, SensorDto} from './dto/create-sensor.dto';
import {UpdateSensorDto} from './dto/update-sensor.dto';
import {SensorRepository} from "./sensor.repository";
import {ApiResponseDto, Token} from "../../core/generics/api-response.dto";
import {AwsService} from "../aws/aws.service";


@Injectable()
export class SensorService {
  constructor(
      private readonly sensorRepository: SensorRepository,
      private readonly awsService: AwsService,
  )
  {  }
  async assignSensor(userId:number,createSensorDto: CreateSensorDto) {
    try{
      let sensor
      const model = {
        ...createSensorDto,
        is_active:true,
        is_deleted   : false,
        date_created  :new Date(),
        date_updated  :new Date(),
        assigned_by:userId
      }
      const existingSensor = await this.sensorRepository.findByAwsId(createSensorDto.aws_sensorid)
      if(existingSensor){
        // unassigned sensor with the same id exist in db then update it.
         sensor = await this.sensorRepository.updateSensor(existingSensor.sensorid, model)
        if(!sensor) throw new NotImplementedException("Cannot Assign Sensor")
      }else {
        // Simply assign sensor
         sensor = await this.sensorRepository.assignSensor(model)
        if(!sensor) throw new NotImplementedException("Cannot Assign Sensor")
        // create 4 sensor type humidity and so on for later configuration
        let sensorTypeModel =[
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
        ]
        const sensorType = await this.sensorRepository.createSensorType(sensorTypeModel)
        if(!sensorType) throw new NotImplementedException("Sensor Type not Created")
      }

      const response:ApiResponseDto<SensorDto> ={
        statusCode:HttpStatus.OK,
        message:"Sensor Assign Successfully",
        data:sensor,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async getAllAssignedSensor(token:Token) {
   try{
     const { rolename, customerId } = token;
     let assignSensor:SensorDto[];
     if(rolename === 'SuperAdmin'){
       assignSensor = await this.sensorRepository.findAssignSensor()
     }
     else
     {
       assignSensor = await this.sensorRepository.findAssignSensorByOrganizationId(customerId)
     }
     const response:ApiResponseDto<SensorDto[]> ={
       statusCode:HttpStatus.OK,
       message:"Sensors found Successfully",
       data:assignSensor,
       error:false
     }
     return response
   }catch (error) {
     throw error
   }
  }

  async getAllUnAssignedSensors(token:Token) {
    try{
      let assignedSensor:SensorDto[],subtracted:string[]
      const { rolename, customerId } = token;

      if(rolename === 'SuperAdmin'){
        const awsSensor = await this.awsService.findAll()
        assignedSensor = await this.sensorRepository.findAssignSensor()
        let ids = assignedSensor.map((obj)=> {
          return obj.aws_sensorid
        })
        // subtracting or separating the assigned one from all sensors
         subtracted = awsSensor.filter(item => !ids.includes(item));
      }
      else
      {
        assignedSensor = await this.sensorRepository.findAssignSensorByOrganizationId(customerId)
        subtracted = assignedSensor.map((obj)=> {
          return obj.aws_sensorid
        })
      }

      const response:ApiResponseDto<string[]> ={
        statusCode:HttpStatus.OK,
        message:"Sensors found Successfully",
        data:subtracted,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  update(id: number, updateSensorDto: UpdateSensorDto) {
    return `This action updates a #${id} sensor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensor`;
  }
}
