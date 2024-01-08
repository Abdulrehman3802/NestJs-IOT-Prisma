import { Injectable, HttpStatus, NotFoundException, NotImplementedException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrganizationDto, ModelOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { promises as fs } from 'fs';
import { OrganizationRepository } from './organization.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { ResponseOrganizationDto, ResponseOrganizationInterval } from './dto/response/response-organization.dto';
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/request/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { CreateOrganizationUserDto } from "./dto/request/create-organization-user.dto";
import { FacilityService } from 'src/facility/facility.service';
import { DepartmentService } from 'src/department/department.service';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
import { DashboardService } from "../dashboard/dashboard.service";
import { CreateDashboardDto } from "../dashboard/dto/request/create-dashboard.dto";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class OrganizationService {
  private awsAccessKey: string;
  private awsSecretKeyAccess: string;
  private awsRegion: string;
  private awsBucket: string;
  private awsClient: S3Client;
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly facilityService: FacilityService,
    private readonly departmentService: DepartmentService,
    private readonly deviceService: DeviceService,
    private readonly dashboardService: DashboardService,
    private readonly sensorService: SensorService,
    private readonly configService:ConfigService

  ) {
    this.awsAccessKey = this.configService.get('AWS_ACCESS_KEY');
    this.awsSecretKeyAccess = this.configService.get('AWS_SECRET_ACCESS_KEY');
    this.awsRegion = this.configService.get('AWS_S3_REGION');
    this.awsBucket = this.configService.get('AWS_S3_BUCKET_NAME');
    this.awsClient = new S3Client({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: this.awsAccessKey,
        secretAccessKey: this.awsSecretKeyAccess,
      },
    });
  }

  async create(createOrganizationDto: CreateOrganizationDto, token: Token) {
    try {
      const { id } = token;
      const organizationModel: ModelOrganizationDto = {
        ...createOrganizationDto,
        is_active: true,
        created_by: id,
        updated_by: id,
        calibration_date:new Date(),
        date_created: new Date(),
        date_updated: new Date(),
      }
      if (organizationModel.credit == undefined) {
        organizationModel.credit = 0;
      }


      const organization = await this.organizationRepository.createOrganization(organizationModel);
      if (!organization) {
        throw new NotImplementedException('Cannot create organization');
      }
      const dashBoardDro = new CreateDashboardDto()
      dashBoardDro.customerid = organization.customerid
      await this.dashboardService.createDashboard(dashBoardDro)
      // Creation of Organization Admin
      const userDto = new CreateUserDto()
      userDto.email = organization.email
      userDto.firstname = organization.contactperson
      userDto.phonenumber = organization.phone
      const user = await this.userService.create(userDto, token)
      // Now Creation OF user Role
      const orgAdminId = await this.roleService.findRoleByName('OrganizationAdmin')
      await this.roleService.createUserRole({ userid: user.data.userid, roleid: orgAdminId.roleid })
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
      throw new InternalServerErrorException("Something went wrong");
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
      throw new InternalServerErrorException("Something went wrong");
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
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async findOrganizationCredit(orgId: number) {
    try {
      const organization = await this.organizationRepository.getOrganizationCredit(orgId);
      if (!organization) {
        throw new NotFoundException(`Organization Not Found With Id ${orgId}`);
      }
      
      const response: ApiResponseDto<number> = {
        statusCode: HttpStatus.OK,
        message: "Organization Credit Fetched Successfully!",
        data: (organization.credit === null) ? 0 : organization.credit,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async findOrganizationInterval(orgId: number) {
    try {
      const organization = await this.organizationRepository.findOrganization(orgId);
      if (!organization) {
        throw new NotFoundException(`Organization Not Found With Id ${orgId}`);
      }
      
      const response: ApiResponseDto<ResponseOrganizationInterval> = {
        statusCode: HttpStatus.OK,
        message: "Organization Interval Fetched Successfully!",
        data: {
          interval1: organization.interval1,
          interval2: organization.interval2,
          interval3: organization.interval3,
          interval4: organization.interval4
        },
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
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
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async remove(id: number) {
    try {
      const organization = await this.organizationRepository.deleteOrganization(id);
      if (!organization) {
        throw new NotFoundException(`Organization Not Found with id: ${id}`);
      }

      await this.facilityService.removeByOrganizationId(id)

      await this.departmentService.removeByOrganizationId(id)

      await this.deviceService.removeByOrganizationId(id)

      await this.sensorService.unAssignSensorOnOrganziationDeletion(id)

      const response: ApiResponseDto<ResponseOrganizationDto> = {
        statusCode: HttpStatus.OK,
        message: "Organization Deleted Successfully!",
        data: organization,
        error: false
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }

  async uploadLogo(file:any, organizationName:string){
    try{
      console.log(file,"sadasfs")
      const fileName = `iot.${organizationName}.${file.originalname}`
      return this.uploadToAWS(file.buffer,fileName)
    }catch (error) {
      throw new InternalServerErrorException("Something went wrong")
    }
  }
  async uploadToAWS(fileBuffer: Buffer, fileName: string) {
    const params = {
      Bucket: this.awsBucket,
      Key: fileName,
      Body: fileBuffer,
    };
    try {
     await this.awsClient.send(new PutObjectCommand(params));
      return `https://${this.awsBucket}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong");
    }
  }
}
