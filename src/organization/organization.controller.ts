import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { Permission } from 'core/generics/Guards/PermissionDecorator';
import { Category, PermissionType } from 'core/generics/Enums/GeneralEnums';
import {FileInterceptor} from "@nestjs/platform-express";

@UseGuards(JwtAuthGuard)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Permission(Category.ORGANIZATION, PermissionType.CREATE)
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto, @Req() req: RequestWithUser) {
    // Extarcting userid from the request
    const token = req.token;
    return this.organizationService.create(createOrganizationDto, token);
  }

  @Permission(Category.ORGANIZATION, PermissionType.VIEW)
  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @Permission(Category.ORGANIZATION, PermissionType.VIEW)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  @Permission(Category.ORGANIZATION, PermissionType.VIEW)
  @Get('credit/:id')
  findCredit(@Param('id') id: string) {
    return this.organizationService.findOrganizationCredit(+id);
  }

  @Permission(Category.ORGANIZATION, PermissionType.UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }

  @Permission(Category.ORGANIZATION, PermissionType.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
  @Permission(Category.LOGO, PermissionType.VIEW)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req: RequestWithUser, @UploadedFile() file: any, @Body() body) {
      return  this.organizationService.uploadLogo(file, body.organizationName)
    }
}
