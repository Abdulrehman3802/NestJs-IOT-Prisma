import { Injectable, HttpStatus, NotFoundException, NotAcceptableException, forwardRef, Inject, InternalServerErrorException } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateDepartmentDto, ModelDepartmentDto } from './dto/request/create-department.dto';
import { UpdateDepartmentDto } from './dto/request/update-department.dto';
import { ResponseDepartmentDto } from './dto/response/response-department.dto';
import { CreateUserDto } from "../user/dto/request/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { UserService } from "../user/user.service";
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
import {DashboardService} from "../dashboard/dashboard.service";
import {CreateDashboardDto} from "../dashboard/dto/request/create-dashboard.dto";

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly deviceService: DeviceService,
    private readonly dashboardService: DashboardService,
    private readonly sensorService: SensorService
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto, token: Token) {
    try {
      // In case of Org, Facility Admin 
      // we will put the organization, facility id extracted from the token when creating department.
      const { id, rolename, customerId, facilityId } = token;
      let departmentModel: ModelDepartmentDto;
      const orgId = createDepartmentDto.customerid;
      const facId = createDepartmentDto.facilityid;

      if(rolename == 'SuperAdmin') {
        if(!orgId || !facId ) throw new NotAcceptableException("customerid and facilityid cannot be empty")
        departmentModel = {
          ...createDepartmentDto,
          updated_by: id,
          created_by: id,
          is_deleted: false,
          is_active: true,
          date_created: new Date(),
          date_updated: new Date()
        }
      }

      if(rolename == 'OrganizationAdmin') {
        if(!facId) throw new NotAcceptableException("facilityid cannot be empty")
        departmentModel = {
          ...createDepartmentDto,
          customerid: customerId,
          updated_by: id,
          created_by: id,
          is_deleted: false,
          is_active: true,
          date_created: new Date(),
          date_updated: new Date()
        }
      }

      if(rolename == 'FacilityAdmin') {
        departmentModel = {
          ...createDepartmentDto,
          customerid: customerId,
          facilityid: facilityId,
          updated_by: id,
          created_by: id,
          is_deleted: false,
          is_active: true,
          date_created: new Date(),
          date_updated: new Date()
        }
      }

      const department = await this.departmentRepository.createDepartment(departmentModel);
      const userDto = new CreateUserDto()
      userDto.email = department.email
      const user = await this.userService.create(userDto, token)
      // Now Creation OF user Role
      const depAdminId = await this.roleService.findRoleByName('DepartmentAdmin')
      await this.roleService.createUserRole({ userid: user.data.userid, roleid: depAdminId.roleid })
      // Now Creation OF user Role in Department
      await this.departmentRepository.createDepartmentUser({ userid: user.data.userid, departmentid: department.departmentid, is_admin: true })
      const dashboardDto = new CreateDashboardDto()
      dashboardDto.departmentid = department.departmentid
      await this.dashboardService.createDashboard(dashboardDto)
      const response: ApiResponseDto<ResponseDepartmentDto> = {
        statusCode: HttpStatus.CREATED,
        message: 'Department Created Successfully!',
        data: department,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async createDepartmentStaff(userid: number, departmentid: number, is_admin: boolean) {
    try {
      await this.departmentRepository.createDepartmentStaff({ 
        userid: userid, 
        departmentid: departmentid,
        is_admin: is_admin
      })

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.CREATED,
        message: "Department Admin Created Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch(error) {
      throw new InternalServerErrorException("Something went wrong")
    }
  }

  async findAll(decodedtoken: Token) {
    try {
      const { rolename, facilityId, customerId } = decodedtoken;
      let departments: ResponseDepartmentDto[];

      if (rolename === 'OrganizationAdmin') {
        departments = await this.departmentRepository.findAllDepartmentsByOrganizationId(customerId);
      } else if (rolename === 'FacilityAdmin') {
        departments = await this.departmentRepository.findAllDepartmentsByFacilityId(facilityId);
      } else {
        departments = await this.departmentRepository.findAllDepartments();
      }

      const response: ApiResponseDto<ResponseDepartmentDto[]> = {
        statusCode: HttpStatus.OK,
        message: 'Departments Found Successfully!',
        data: departments,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async GetAllDepartmentIdsByFacilityId(facilityid: number) {
    try {

      const departments = await this.departmentRepository.findAllDepartmentsByFacilityId(facilityid);
      
      const response: ApiResponseDto<ResponseDepartmentDto[]> = {
        statusCode: HttpStatus.OK,
        message: 'Departments Found Successfully!',
        data: departments,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async findOne(id: number) {
    try {
      const department = await this.departmentRepository.findOneDepartment(id);
      if (!department) {
        throw new NotFoundException(`Department Not Found with id: ${id}`);
      }
      const response: ApiResponseDto<ResponseDepartmentDto> = {
        statusCode: HttpStatus.OK,
        message: 'Department Found Successfully!',
        data: {
          departmentid: department.departmentid,
          departmentname: department.departmentname,
          customerid: department.customerid,
          facilityid: department.facilityid,
          is_deleted: department.is_deleted,
          created_by: department.created_by,
          updated_by: department.updated_by,
          is_active: department.is_active,
          date_created: department.date_created,
          date_updated: department.date_updated
        },
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const updatedDepartment = await this.departmentRepository.updateDepartment(id, updateDepartmentDto)
      const response: ApiResponseDto<ResponseDepartmentDto> = {
        statusCode: HttpStatus.OK,
        message: 'Department Updated Successfully!',
        data: {
          departmentid: updatedDepartment.departmentid,
          departmentname: updatedDepartment.departmentname,
          customerid: updatedDepartment.customerid,
          facilityid: updatedDepartment.facilityid,
          is_deleted: updatedDepartment.is_deleted,
          created_by: updatedDepartment.created_by,
          updated_by: updatedDepartment.updated_by,
          is_active: updatedDepartment.is_active,
          date_created: updatedDepartment.date_created,
          date_updated: updatedDepartment.date_updated
        },
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async remove(id: number) {
    try {
      await this.departmentRepository.deleteDepartment(id);

      const devices = await this.deviceService.findAllDevicesByDepId(id)
      await this.deviceService.removeByDepartmentId(id)
      const deviceIds = devices.data.map(dev => dev.deviceid)

      await this.sensorService.unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds)

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: 'Department Deleted Successfully!',
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong")
    }
  }

  async removeByOrganizationId(orgid: number) {
    try {
      await this.departmentRepository.deleteDepartmentByOrganizationId(orgid);
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: 'Department Deleted Successfully!',
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong")
    }
  }

  async removeByFacilityId(facilityid: number) {
    try {
      await this.departmentRepository.deleteDepartmentByFacilityId(facilityid);
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: 'Department Deleted Successfully!',
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong")
    }
  }

  async findAllDepartments(facId: number) {
    try {
      const allDepartments = await this.departmentRepository.findAllDepartmentsByFacilityId(facId);
      const response: ApiResponseDto<ResponseDepartmentDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Departments Found Associated to Facility",
        data: allDepartments,
        error: false,
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async GetAllDepartmentsByOrgId(orgId: number){
    try {
      const allDepartments = await this.departmentRepository.findAllDepartmentsByOrganizationId(orgId);
      const response: ApiResponseDto<ResponseDepartmentDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Departments Found Associated to Organization",
        data: allDepartments,
        error: false,
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async findAllDepartmentsForSuperAdmin(){
    try {
      const departments = await this.departmentRepository.findAllDepartments()
      const response: ApiResponseDto<ResponseDepartmentDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Departments Found Associated to Facility",
        data: departments,
        error: false,
      }
      return response;
    }catch (error) {
      throw new InternalServerErrorException("Something went wrong")
    }
  }
}
