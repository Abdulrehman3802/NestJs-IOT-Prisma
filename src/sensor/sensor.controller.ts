import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { SensorService } from './sensor.service';
import {CreateSensorDto, SensorDto} from './dto/create-sensor.dto';
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
  @Permission(Category.SENSOR, PermissionType.VIEW)
  @Get('/get-assign-sensors')
  getAllAssignedSensors(@Req()req:RequestWithUser,) {
    return this.sensorService.getAllAssignedSensor(req.token);
  }

  @Permission(Category.SENSOR, PermissionType.VIEW)
  @Get('/get-sensors-by-orgId/:id')
  getSensorsByOrganizationId(@Param('id')id:string) {
    return this.sensorService.getSensorByOrgId(+id);
  }


  @Permission(Category.SENSOR, PermissionType.VIEW)
  @Get('/get-sensors-by-deviceId/:id')
  getSensorByDeviceId(@Param('id')id:string) {
    return this.sensorService.getSensorByDeviceId(+id);
  }

  @Permission(Category.SENSOR, PermissionType.VIEW)
  @Get('/get-unassigned-sensors')
  getAllUnAssignedSensors(@Req()req:RequestWithUser) {
    return this.sensorService.getAllUnAssignedSensors(req.token);
  }
  @Permission(Category.SENSOR, PermissionType.UPDATE)
  @Patch('/update-sensor/:id')
  updateAssignedSensor(@Req()req:RequestWithUser,@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorService.updateAssignedSensor(req.token.id,+id, updateSensorDto);
  }
  @Permission(Category.SENSOR, PermissionType.UPDATE)
  @Patch('unAssigned/:id')
  unAssignedSensor(@Param('id')id:string){
    return this.sensorService.unAssignedSensor(+id)
  }
  @Permission(Category.SENSOR, PermissionType.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorService.remove(+id);
  }
}
