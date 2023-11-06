import { Injectable, HttpStatus, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { FacilityRepository } from './facility.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateFacilityDto, ModelFacilityDto } from './dto/request/create-facility.dto';
import { UpdateFacilityDto } from './dto/request/update-facility.dto';
import { ResponseFacilityDto } from './dto/response/response-facility.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/request/create-user.dto";

@Injectable()
export class FacilityService {
  constructor(
    private readonly facilityRepository: FacilityRepository,
    private readonly userService: UserService,
    private readonly roleService: RolesService,
  ) { }

  async create(createFacilityDto: CreateFacilityDto, token: Token) {
    try {
      // In case of Organization Admin we will put the customerid from token in the facility table
      const { id, customerId, rolename } = token;
      let facilityModel: ModelFacilityDto;
      const orgId = createFacilityDto.customerid;

      if (rolename == 'SuperAdmin') {
        if(!orgId) throw new NotAcceptableException("customerid cannot be empty")

        facilityModel  = {
          ...createFacilityDto,
          is_active: true,
          is_deleted: false,
          date_created: new Date(),
          date_updated: new Date(),
          created_by: id,
          updated_by: id
        }
      }

      if(rolename == 'OrganizationAdmin') {
        facilityModel  = {
          ...createFacilityDto,
          customerid: customerId,
          is_active: true,
          is_deleted: false,
          date_created: new Date(),
          date_updated: new Date(),
          created_by: id,
          updated_by: id
        }
      }

      const facility = await this.facilityRepository.createFacility(facilityModel);
      const userDto = new CreateUserDto()
      userDto.email = facility.email
      const user = await this.userService.create(userDto)
      // Now Creation OF user Role
      const facilityAdminId = await this.roleService.findRoleByName('FacilityAdmin')
      await this.roleService.createUserRole({ userid: user.data.userid, roleid: facilityAdminId.roleid })
      await this.facilityRepository.createFacilityUser({ userid: user.data.userid, facilityid: facility.facilityid })
      const response: ApiResponseDto<ResponseFacilityDto> = {
        statusCode: HttpStatus.CREATED,
        message: "Facility Created Successfully!",
        data: facility,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(decodedtoken: Token) {
    try {
      const { rolename, customerId } = decodedtoken;

      let facilities: ResponseFacilityDto[];
      if (rolename === 'OrganizationAdmin') {
        facilities = await this.facilityRepository.findAllFacilitiesOfOrgAdmin(customerId);
      } else {
        facilities = await this.facilityRepository.findAllFacilities();
      }

      const response: ApiResponseDto<ResponseFacilityDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Facilities Found Successfully!",
        data: facilities,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const facility = await this.facilityRepository.findOneFacility(id);
      if (!facility) {
        throw new NotFoundException(`Facility Not Found with id: ${id}`);
      }
      const response: ApiResponseDto<ResponseFacilityDto> = {
        statusCode: HttpStatus.OK,
        message: "Facility Found Successfully!",
        data: facility,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto) {
    try {

      const updatedFacility = await this.facilityRepository.updateFacility(id, updateFacilityDto);

      const response: ApiResponseDto<ResponseFacilityDto> = {
        statusCode: HttpStatus.OK,
        message: "Facility Updated Successfully!",
        data: updatedFacility,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {

      const facility = await this.facilityRepository.deleteFacility(id);

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Facility Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAllFacilities(orgId: number) {
    try {
      const allFacilities = await this.facilityRepository.findAllFacilitiesOfOrgAdmin(orgId);
      if (allFacilities.length == 0) {
        throw new NotFoundException(`Facilities Not Found that are assigned to organization with id ${orgId}`);
      }
      const response: ApiResponseDto<ResponseFacilityDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Facilities Found Associated to Organization",
        data: allFacilities,
        error: false,
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
