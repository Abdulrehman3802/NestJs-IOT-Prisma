import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDepartmentAdminDto, CreateDeviceAdminDto, CreateFacilityAdminDto, CreateStaffUserDto, CreateUserDto} from './dto/request/create-user.dto';
import { UpdateDepartmentAdminDto, UpdateDeviceAdminDto, UpdateFacilityAdminDto, UpdateUserDto } from './dto/request/update-user.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';
import { deleteQueryDepartment, deleteQueryDevice, deleteQueryFacility, findQuery } from './dto/request/user-queries-dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  //#region Constructor
  constructor(private readonly userService: UserService) {}
  //#endregion

  //#region User

  //#region User CRUD - C
  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create')
  create(
    @Req() req: RequestWithUser,
    @Body() createUserDto: CreateUserDto
    ) {
      const token = req.token
    return this.userService.create(createUserDto, token);
  }
    //#endregion

  //#region User CRUD - R
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('unassigned-users')
  findUnAssignedUsers() {
    return this.userService.findUnAssignedUsers();
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('find-admins')
  findAllAdmins(
    @Req() req: RequestWithUser,
    @Query() query: findQuery
    ) {
    const token = req.token
    return this.userService.findAdminStaff(query.name, token);
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('find-user-staff')
  findAllUserStaff(
    @Req() req: RequestWithUser,
    @Query() query: findQuery
    ) {
    const token = req.token
    return this.userService.findUserStaff(query.name, token);
  }
  
  @Permission(Category.USER, PermissionType.VIEW)
  @Get('admins-by-orgId/:id')
  findAllAdminsByOrganizationId(
    @Param('id') id: string,
    @Query() query: findQuery,
    ) {
    
    return this.userService.findAdminStaffByOrganizationId(query.name, +id);
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('admins-by-facId/:id')
  findAllAdminsByFacilityId(
    @Param('id') id: string,
    @Query() query: findQuery,
    ) {
    
    return this.userService.findAdminStaffByFacilityId(query.name, +id);
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('admins-by-depId/:id')
  findAllAdminsByDepartmentId(
    @Param('id') id: string,
    @Query() query: findQuery,
    ) {
    
    return this.userService.findAdminStaffByDepartmentId(query.name, +id);
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('user-staff-by-orgId/:id')
  findAllUserStaffByOrganizationId(
    @Param('id') id: string,
    @Query() query: findQuery,
    ) {
    
    return this.userService.findUserStaffByOrganizationId(query.name, +id);
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('user-staff-by-facId/:id')
  findAllUserStaffByFacilityId(
    @Param('id') id: string,
    @Query() query: findQuery,
    ) {
    
    return this.userService.findUserStaffByFacilityId(query.name, +id);
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('user-staff-by-depId/:id')
  findAllUserStaffByDepartmentId(
    @Param('id') id: string,
    @Query() query: findQuery,
    ) {
    
    return this.userService.findUserStaffByDepartmentId(query.name, +id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  //#endregion

  //#region User CRUD - U  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  //#endregion

  //#region User CRUD - D
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  //#endregion 

  //#endregion

  //#region Staff

  //#region Staff CRUD - C
  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create/createUserStaff')
  createUserStaff(
    @Req() req: RequestWithUser,
    @Body() createStaffUserDto: CreateStaffUserDto
    ) {
    const token = req.token
    return this.userService.createStaffUser(createStaffUserDto, token);
  }

  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create/facilityAdmin')
  createFacilityStaff(
    @Req() req: RequestWithUser,
    @Body() createFacilityAdminDto: CreateFacilityAdminDto
    ) {
    const token = req.token
    return this.userService.createFacilityStaff(createFacilityAdminDto, token);
  }

  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create/departmentAdmin')
  createDepartmentStaff(
    @Req() req: RequestWithUser,
    @Body() createDepartmentAdminDto: CreateDepartmentAdminDto
    ) {
    const token = req.token
    return this.userService.createDepartmentStaff(createDepartmentAdminDto, token);
  }

  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create/deviceAdmin')
  createDeviceStaff(
    @Req() req: RequestWithUser,
    @Body() createDeviceAdminDto: CreateDeviceAdminDto
    ) {
    const token = req.token
    return this.userService.createDeviceStaff(createDeviceAdminDto, token);
  }
  //#endregion 
  
  //#region Staff CRUD - R
 
  //#endregion

  //#region Staff CRUD - U
  @Permission(Category.USER, PermissionType.UPDATE)
  @Patch('staff/updateFacilityStaff')
  updateFacilityStaff(@Body() updateFacilityDto: UpdateFacilityAdminDto) {
    return this.userService.updateFacilityStaff(updateFacilityDto);
  }

  @Permission(Category.USER, PermissionType.UPDATE)
  @Patch('staff/updateDepartmentStaff')
  updateDepartmentStaff(@Body() updateDepartmentDto: UpdateDepartmentAdminDto) {
    return this.userService.updateDepartmentStaff(updateDepartmentDto);
  }

  @Permission(Category.USER, PermissionType.UPDATE)
  @Patch('staff/updateDeviceStaff')
  updateDeviceStaff(@Body() updateDeviceDto: UpdateDeviceAdminDto) {
    return this.userService.updateDeviceStaff(updateDeviceDto);
  }
  //#endregion

  //#region Staff CRUD - D
  @Permission(Category.USER, PermissionType.DELETE)
  @Delete('staff/deleteFacilityStaff')
  deleteFacilityStaff(@Query() query: deleteQueryFacility) {
    return this.userService.deleteFacilityStaff(query);
  }

  @Permission(Category.USER, PermissionType.DELETE)
  @Delete('staff/deleteDepartmentStaff')
  deleteDepartmentStaff(@Query() query: deleteQueryDepartment) {
    return this.userService.deleteDepartmentStaff(query);
  }

  @Permission(Category.USER, PermissionType.DELETE)
  @Delete('staff/deleteDeviceStaff')
  deleteDeviceStaff(@Query() query: deleteQueryDevice) {
    return this.userService.deleteDeviceStaff(query);
  }
  //#endregion

  //#endregion
}
