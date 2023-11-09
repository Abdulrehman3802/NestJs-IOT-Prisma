import { Injectable, HttpStatus, NotFoundException, NotAcceptableException, Inject, forwardRef } from '@nestjs/common';
import { FacilityRepository } from './facility.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateFacilityDto, ModelFacilityDto } from './dto/request/create-facility.dto';
import { UpdateFacilityDto } from './dto/request/update-facility.dto';
import { ResponseFacilityDto } from './dto/response/response-facility.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/request/create-user.dto";
import { DepartmentService } from 'src/department/department.service';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';

@Injectable()
export class FacilityService {
  constructor(
    private readonly facilityRepository: FacilityRepository,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly departmentService: DepartmentService,
    private readonly deviceService: DeviceService,
    private readonly sensorService: SensorService

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
      const user = await this.userService.create(userDto, token)
      // Now Creation OF user Role
      const facilityAdminId = await this.roleService.findRoleByName('FacilityAdmin')
      await this.roleService.createUserRole({ userid: user.data.userid, roleid: facilityAdminId.roleid })
      await this.facilityRepository.createFacilityUser({ userid: user.data.userid, facilityid: facility.facilityid, is_admin: true })
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

  async createFacilityStaff(userid: number, facilityid: number, is_admin: boolean) {
    try {
      await this.facilityRepository.createFacilityAdmin({ 
        userid: userid, 
        facilityid: facilityid,
        is_admin: is_admin
      })

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.CREATED,
        message: "Facility Admin Created Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch(error) {
      throw error
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

      await this.facilityRepository.deleteFacility(id);

      const departments = await this.departmentService.GetAllDepartmentIdsByFacilityId(id)
      await this.departmentService.removeByFacilityId(id)
      const departmentIds = departments.data.map(d => d.departmentid)
      
      const devices = await this.deviceService.findDevicesByDepartmentIds(departmentIds)
      await this.deviceService.removeByFacilityId(id)
      const deviceIds = devices.data.map(dev => dev.deviceid)

      await this.sensorService.unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds)

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

  async removeByOrganizationId(orgid: number) {
    try {

      await this.facilityRepository.deleteFacilityByOrganizationId(orgid);

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
