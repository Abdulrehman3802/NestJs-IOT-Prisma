import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';

@UseGuards(JwtAuthGuard)
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Permission(Category.DEVICE, PermissionType.CREATE)
  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body() createDeviceDto: CreateDeviceDto
  ) {
    const token = req.token;
    return this.deviceService.create(createDeviceDto, token);
  }

  @Permission(Category.DEVICE, PermissionType.VIEW)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    const token = req.token;
    return this.deviceService.findAll(token);
  }

  @Permission(Category.DEVICE, PermissionType.VIEW)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Permission(Category.FACILITY, PermissionType.VIEW)
  @Get('by-depId/:id')
  finAllDevicesByDepId(@Param('id') id: string) {
    return this.deviceService.findAllDevicesByDepId(+id);
  }

  @Permission(Category.DEVICE, PermissionType.UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Permission(Category.DEVICE, PermissionType.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
