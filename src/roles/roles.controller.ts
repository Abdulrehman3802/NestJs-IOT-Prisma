import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/Request/create-role.dto';
import { UpdateRoleDto } from './dto/Request/update-role.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';
import { AssignRoleDto } from './dto/Request/assigne-role.dto';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Permission(Category.ROLES, PermissionType.CREATE)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Permission(Category.ROLES, PermissionType.CREATE)
  @Post("assign")
  assignRoletoUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.rolesService.assignRoletoUser(assignRoleDto);
  }

  @Permission(Category.ROLES, PermissionType.VIEW)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    const token = req.token
    return this.rolesService.findAll(token);
  }

  @Permission(Category.ROLES, PermissionType.VIEW)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Permission(Category.ROLES, PermissionType.UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Permission(Category.ROLES, PermissionType.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
