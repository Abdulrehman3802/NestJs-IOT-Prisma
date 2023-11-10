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
  @Get('unassignedUsers')
  findUnAssignedUsers() {
    return this.userService.findUnAssignedUsers();
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('findAdmins')
  findAllAdmins(@Query() query: findQuery) {
    return this.userService.findAdminStaff(query.name);
  }

  @Permission(Category.USER, PermissionType.VIEW)
  @Get('findUserStaff')
  findAllUserStaff(@Query() query: findQuery) {
    return this.userService.findUserStaff(query.name);
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
  @Patch('/updateFacilityStaff')
  updateFacilityStaff(@Body() updateFacilityDto: UpdateFacilityAdminDto) {
    return this.userService.updateFacilityStaff(updateFacilityDto);
  }

  @Permission(Category.USER, PermissionType.UPDATE)
  @Patch('/updateDepartmentStaff')
  updateDepartmentStaff(@Body() updateDepartmentDto: UpdateDepartmentAdminDto) {
    return this.userService.updateDepartmentStaff(updateDepartmentDto);
  }

  @Permission(Category.USER, PermissionType.UPDATE)
  @Patch('/updateDeviceStaff')
  updateDeviceStaff(@Body() updateDeviceDto: UpdateDeviceAdminDto) {
    return this.userService.updateDeviceStaff(updateDeviceDto);
  }
  //#endregion

  //#region Staff CRUD - D
  @Permission(Category.USER, PermissionType.DELETE)
  @Delete('/deleteFacilityStaff')
  deleteFacilityStaff(@Query() query: deleteQueryFacility) {
    return this.userService.deleteFacilityStaff(query);
  }

  @Permission(Category.USER, PermissionType.DELETE)
  @Delete('/deleteDepartmentStaff')
  deleteDepartmentStaff(@Query() query: deleteQueryDepartment) {
    return this.userService.deleteDepartmentStaff(query);
  }

  @Permission(Category.USER, PermissionType.DELETE)
  @Delete('/deleteDeviceStaff')
  deleteDeviceStaff(@Query() query: deleteQueryDevice) {
    return this.userService.deleteDeviceStaff(query);
  }
  //#endregion

  //#endregion
}
