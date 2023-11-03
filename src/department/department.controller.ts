import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/request/create-department.dto';
import { UpdateDepartmentDto } from './dto/request/update-department.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';

@UseGuards(JwtAuthGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Permission(Category.DEPARTMENT, PermissionType.CREATE)
  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body() createDepartmentDto: CreateDepartmentDto
  ) {
    const token = req.token
    return this.departmentService.create(createDepartmentDto, token);
  }

  @Permission(Category.DEPARTMENT, PermissionType.VIEW)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    const token = req.token;
    return this.departmentService.findAll(token);
  }

  @Permission(Category.DEPARTMENT, PermissionType.VIEW)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Permission(Category.FACILITY, PermissionType.VIEW)
  @Get('by-facId/:id')
  finAllDepartmentsByFacId(@Param('id') id: string) {
    return this.departmentService.findAllDepartments(+id);
  }

  @Permission(Category.DEPARTMENT, PermissionType.UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Permission(Category.DEPARTMENT, PermissionType.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
