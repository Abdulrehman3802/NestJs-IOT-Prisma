import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/request/create-facility.dto';
import { UpdateFacilityDto } from './dto/request/update-facility.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';

@UseGuards(JwtAuthGuard)
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) { }

  @Permission(Category.FACILITY, PermissionType.CREATE)
  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto, @Req() req: RequestWithUser) {
    // Sending the whole token 
    const token = req.token;
    return this.facilityService.create(createFacilityDto, token);
  }

  @Permission(Category.FACILITY, PermissionType.VIEW)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    // Sending the whole token 
    return this.facilityService.findAll(req.token);
  }

  @Permission(Category.FACILITY, PermissionType.VIEW)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(+id);
  }

  @Permission(Category.FACILITY, PermissionType.VIEW)
  @Get('by-orgId/:id')
  finAllFacilitiesByOrgId(@Param('id') id: string) {
    return this.facilityService.findAllFacilities(+id);
  }

  @Permission(Category.FACILITY, PermissionType.UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacilityDto: UpdateFacilityDto) {
    return this.facilityService.update(+id, updateFacilityDto);
  }

  @Permission(Category.FACILITY, PermissionType.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(+id);
  }


}
