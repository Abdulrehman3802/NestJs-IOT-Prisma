import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import {JwtAuthGuard, RequestWithUser} from "../../core/generics/Guards/PermissionAuthGuard";
import {Permission} from "../../core/generics/Guards/PermissionDecorator";
import {Category, PermissionType} from "../../core/generics/Enums/GeneralEnums";
@UseGuards(JwtAuthGuard)
@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}
  @Permission(Category.SENSOR, PermissionType.CREATE)
  @Post('/assign-sensor')
  assignSensor(@Req()req:RequestWithUser,@Body() createSensorDto: CreateSensorDto) {
    return this.sensorService.assignSensor(req.token.id,createSensorDto);
  }

  @Get('/get-assign-sensors')
  getAllAssignedSensors(@Req()req:RequestWithUser,) {
    return this.sensorService.getAllAssignedSensor(req.token);
  }

  @Get('/get-unassigned-sensors')
  getAllUnAssignedSensors(@Req()req:RequestWithUser) {
    return this.sensorService.getAllUnAssignedSensors(req.token);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorService.remove(+id);
  }
}
