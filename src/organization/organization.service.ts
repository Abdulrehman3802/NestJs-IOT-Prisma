import {Injectable, HttpStatus, NotFoundException, NotImplementedException} from '@nestjs/common';
import { CreateOrganizationDto, ModelOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizationRepository } from './organization.repository';
import { ApiResponseDto } from 'core/generics/api-response.dto';
import { ResponseOrganizationDto } from './dto/response/response-organization.dto';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/request/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {CreateOrganizationUserDto} from "./dto/request/create-organization-user.dto";


@Injectable()
export class OrganizationService {
  constructor(
      private readonly organizationRepository: OrganizationRepository,
      private readonly userService:UserService,
      private readonly roleService:RolesService,

  ) { }

  async create(createOrganizationDto: CreateOrganizationDto, userid: number) {
    try {
      const organizationModel: ModelOrganizationDto = {
        ...createOrganizationDto,
        is_active: true,
        created_by: userid,
        updated_by: userid,
        date_created: new Date(),
        date_updated: new Date()
      }
      const organization = await this.organizationRepository.createOrganization(organizationModel);
      if (!organization) {
        throw new NotImplementedException('Cannot create organization');
      }
      // Creation of Organization Admin
      const userDto = new CreateUserDto()
      userDto.email = organization.email
      const user = await this.userService.create(userDto)
      // Now Creation OF user Role
      const orgAdminId = await this.roleService.findRoleByName('OrganizationAdmin')
      await this.roleService.createUserRole({userid: user.data.userid, roleid: orgAdminId.roleid})
      // Creation of Organization User
      const orgUser = new CreateOrganizationUserDto()
      orgUser.customerid = organization.customerid
      orgUser.userid = user.data.userid
      await this.organizationRepository.createOrganizationUser(orgUser)
      // Returning Response
      const response: ApiResponseDto<ResponseOrganizationDto> = {
        statusCode: HttpStatus.CREATED,
        message: "Organization Created Successfully!",
        data: organization,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }

  }

  async findAll() {
    try {
      const organizations = await this.organizationRepository.findAllOrganization();
      const response: ApiResponseDto<ResponseOrganizationDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Organizations Found Successfully!",
        data: organizations,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }

  }

  async findOne(id: number) {
    try {
      const organization = await this.organizationRepository.findOrganization(id);
      if (!organization) {
        throw new NotFoundException(`Organization Not Found with id: ${id}`);
      }
      const response: ApiResponseDto<ResponseOrganizationDto> = {
        statusCode: HttpStatus.OK,
        message: "Organization Found Successfully!",
        data: organization,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      const organization = await this.organizationRepository.findOrganization(id);
      if (!organization) {
        throw new NotFoundException(`Organization Not Found with id: ${id}`);
      }
      const updatedOrganization = await this.organizationRepository.updateOrganization(id, updateOrganizationDto);
      const response: ApiResponseDto<ResponseOrganizationDto> = {
        statusCode: HttpStatus.OK,
        message: "Organization Updated Successfully!",
        data: updatedOrganization,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const organization = await this.organizationRepository.deleteOrganization(id);
      if (!organization) {
        throw new NotFoundException(`Organization Not Found with id: ${id}`);
      }
      const response: ApiResponseDto<ResponseOrganizationDto> = {
        statusCode: HttpStatus.OK,
        message: "Organization Deleted Successfully!",
        data: organization,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
