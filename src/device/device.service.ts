import { Injectable, HttpStatus, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { CreateDeviceDto, ModelDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';
import { DeviceRepository } from './device.repository';
import { ResponseDeviceDto } from './dto/response/response-device.dto';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { SensorService } from 'src/sensor/sensor.service';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly sensorService: SensorService
    ) { }

  async create(createDeviceDto: CreateDeviceDto, token: Token) {
    try {
      // In case of Org, Facility, Department Admin 
      // we will put the organization, facility, department id extracted from the token when creating device.
      const { id, rolename, customerId, facilityId, departmentId } = token;
      let deviceModel: ModelDeviceDto;
      const orgId = createDeviceDto.customerid;
      const facId = createDeviceDto.facilityid;
      const depId = createDeviceDto.departmentid;

      if(rolename == 'SuperAdmin') {
        if (!orgId || !facId || !depId) throw new NotAcceptableException("departmentid, facilityid and customerid cannot be empty")
         deviceModel = {
           ...createDeviceDto,
           is_active: true,
           created_by: id,
           is_deleted: false,
           updated_by: id,
           date_created: new Date(),
           date_updated: new Date(),
         }
       } else if(rolename == 'OrganizationAdmin') {
          if (!facId || !depId) throw new NotAcceptableException("departmentid and facilityid cannot be empty")
          deviceModel = {
            ...createDeviceDto,
            customerid: customerId,
            is_active: true,
            created_by: id,
            is_deleted: false,
            updated_by: id,
            date_created: new Date(),
            date_updated: new Date(),
          }
       } else if(rolename == 'FacilityAdmin') {
          if (!depId) throw new NotAcceptableException("departmentid cannot be empty")
            deviceModel = {
              ...createDeviceDto,
              customerid: customerId,
              facilityid: facilityId,
              is_active: true,
              created_by: id,
              is_deleted: false,
              updated_by: id,
              date_created: new Date(),
              date_updated: new Date(),
            }
      } else {
          deviceModel = {
          ...createDeviceDto,
          customerid: customerId,
          facilityid: facilityId,
          departmentid: departmentId,
          is_active: true,
          created_by: id,
          is_deleted: false,
          updated_by: id,
          date_created: new Date(),
          date_updated: new Date(),
        }
      }

      const device = await this.deviceRepository.createDevice(deviceModel);

      const response: ApiResponseDto<ResponseDeviceDto> = {
        statusCode: HttpStatus.CREATED,
        message: "Device Created Successfully!",
        data: device,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(token: Token) {
    try {
      const { rolename, customerId, facilityId, departmentId } = token
      let devices: ResponseDeviceDto[];

      if (rolename === 'OrganizationAdmin') {
        devices = await this.deviceRepository.findAllDevicesByOrganizationId(customerId);
      } else if (rolename === 'FacilityAdmin') {
        devices = await this.deviceRepository.findAllDevicesByFacilityId(facilityId);
      } else if (rolename === 'DepartmentAdmin') {
        devices = await this.deviceRepository.findAllDevicesByDepartmentId(departmentId);
      } else {
        devices = await this.deviceRepository.findAllDevices();
      }

      const response: ApiResponseDto<ResponseDeviceDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Devices Found Successfully!",
        data: devices,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findDevicesByDepartmentIds(departmentIds: number[]) {
    try {
      const devices =  await this.deviceRepository.findDevicesByDepartmentIds(departmentIds);
      
      const response: ApiResponseDto<ResponseDeviceDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Devices Found Successfully!",
        data: devices,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const device = await this.deviceRepository.findOneDevice(id);
      if (!device) {
        throw new NotFoundException(`Facility Not Found with id: ${id}`);
      }
      const response: ApiResponseDto<ResponseDeviceDto> = {
        statusCode: HttpStatus.OK,
        message: "Device Found Successfully!",
        data: {
          deviceid: device.deviceid,
          devicename: device.devicename,
          departmentid: device.departmentid,
          facilityid: device.facilityid,
          customerid: device.customerid,
          devicetype: device.devicetype,
          manufacturer: device.manufacturer,
          is_active: device.is_active,
          is_deleted: device.is_deleted,
          created_by: device.created_by,
          updated_by: device.updated_by,
          date_created: device.date_created,
          date_updated: device.date_updated
        },
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    try {

      const updatedDevice = await this.deviceRepository.updateDevice(id, updateDeviceDto);

      const response: ApiResponseDto<ResponseDeviceDto> = {
        statusCode: HttpStatus.OK,
        message: "Device Updated Successfully!",
        data: {
          deviceid: updatedDevice.deviceid,
          devicename: updatedDevice.devicename,
          departmentid: updatedDevice.departmentid,
          facilityid: updatedDevice.facilityid,
          customerid: updatedDevice.customerid,
          devicetype: updatedDevice.devicetype,
          manufacturer: updatedDevice.manufacturer,
          is_active: updatedDevice.is_active,
          is_deleted: updatedDevice.is_deleted,
          created_by: updatedDevice.created_by,
          updated_by: updatedDevice.updated_by,
          date_created: updatedDevice.date_created,
          date_updated: updatedDevice.date_updated
        },
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.deviceRepository.deleteDevice(id);

      await this.sensorService.unAssignSensorOnDeviceDeletion(id);

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Device Deleted Successfully!",
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
      await this.deviceRepository.deleteDeviceByOrganizationId(orgid);
     
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Device Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async removeByFacilityId(facilityid: number) {
    try {
      await this.deviceRepository.deleteDeviceByFacilityId(facilityid);
     
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Device Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async removeByDepartmentId(departmentid: number) {
    try {
      await this.deviceRepository.deleteDeviceByDepartmentId(departmentid);
     
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Device Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }


  async findAllDevices(depId: number) {
    try {
      const allDevices = await this.deviceRepository.findAllDevicesByDepartmentId(depId);
      const response: ApiResponseDto<ResponseDeviceDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Devices Found Associated to Department",
        data: allDevices,
        error: false,
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
