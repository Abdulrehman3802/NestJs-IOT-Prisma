import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/Request/create-permission.dto';
import { UpdatePermissionDto } from './dto/Request/update-permission.dto';
import { JwtAuthGuard } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Permission(Category.PERMISSIONS, PermissionType.CREATE)
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Permission(Category.PERMISSIONS, PermissionType.VIEW)
  @Get('role/:id')
  findByRoleId(@Param('id') roleid: string) {
    return this.permissionsService.findAll(+roleid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
