import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { SensorService } from './sensor.service';
import {CreateSensorDto, SensorDto} from './dto/request/create-sensor.dto';
import { UpdateSensorDto } from './dto/request/update-sensor.dto';
import {JwtAuthGuard, RequestWithUser} from "../../core/generics/Guards/PermissionAuthGuard";
import {Permission} from "../../core/generics/Guards/PermissionDecorator";
import {Category, PermissionType} from "../../core/generics/Enums/GeneralEnums";
import {UpdateConfigurationDto} from "./dto/request/update-configuration.dto";
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
  @Get('/get-sensors-configuration/:id')
  getSensorsConfiguration(@Req()req:RequestWithUser,@Param('id')id:string) {
    return this.sensorService.getSensorConfiguration(+id);
  }

  @Permission(Category.SENSOR, PermissionType.VIEW)
  @Get('/show-sensors-configuration/:id')
  showSensorsConfiguration(@Req()req:RequestWithUser,@Param('id')id:string) {
    return this.sensorService.ShowSensorConfiguration(+id);
  }

  @Permission(Category.SENSOR, PermissionType.UPDATE)
  @Patch('/update-sensors-configuration')
  UpdateSensorsConfiguration(@Req()req:RequestWithUser,@Body() body:UpdateConfigurationDto[]) {
    return this.sensorService.updateSensorConfiguration(req.token.id,body);
  }

  @Permission(Category.SENSOR, PermissionType.VIEW)
  @Get('/get-assign-sensors-widget/:id')
  getSensorWidgets(@Param('id')orgId:string) {
    return this.sensorService.getSensorWidgets(+orgId);
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
  @Permission(Category.SENSOR, PermissionType.UPDATE)
  @Patch('unAssigned-from-device/:id')
  unAssignedSensorFromDevice(@Param('id')id:string){
    return this.sensorService.unAssignedSensorFromDevice(+id)
  }

  @Permission(Category.SENSOR, PermissionType.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorService.remove(+id);
  }
}
