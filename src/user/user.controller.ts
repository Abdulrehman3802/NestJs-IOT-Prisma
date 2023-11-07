import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDepartmentAdminDto, CreateFacilityAdminDto, CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create')
  create(
    @Req() req: RequestWithUser,
    @Body() createUserDto: CreateUserDto
    ) {
      const token = req.token
    return this.userService.create(createUserDto, token);
  }
  
  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create/facilityAdmin')
  createFacilityAdmin(
    @Req() req: RequestWithUser,
    @Body() createFacilityAdminDto: CreateFacilityAdminDto
    ) {
    const token = req.token
    return this.userService.createFacilityAdmin(createFacilityAdminDto, token);
  }

  @Permission(Category.USER, PermissionType.CREATE)
  @Post('/create/departmentAdmin')
  createDepartmentAdmin(
    @Req() req: RequestWithUser,
    @Body() createDepartmentAdminDto: CreateDepartmentAdminDto
    ) {
    const token = req.token
    return this.userService.createDepartmentAdmin(createDepartmentAdminDto, token);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('findAdmins')
  findAllAdmins(@Query() query) {
    console.log(query);
    
    return this.userService.findAdmins(query.name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
