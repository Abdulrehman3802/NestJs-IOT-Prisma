import {ConflictException, HttpStatus, Injectable, NotFoundException, NotImplementedException} from '@nestjs/common';
import {CreateUserDto, CreateFacilityAdminDto, CreateDepartmentAdminDto, CreateDeviceAdminDto} from './dto/request/create-user.dto';
import {UpdateDepartmentAdminDto, UpdateDeviceAdminDto, UpdateFacilityAdminDto, UpdateUserDto} from './dto/request/update-user.dto';
import {UserRepository} from "./user.repository";
import {ApiResponseDto, Token} from "../../core/generics/api-response.dto";
import {ResponseUserDto, ResponseAdminDto} from "./dto/response/response-user.dto";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt'
import {EmailService} from "../email/email.service";
import { RolesService } from 'src/roles/roles.service';
import { FacilityService } from 'src/facility/facility.service';
import { DepartmentService } from 'src/department/department.service';
import { DeviceService } from 'src/device/device.service';

// import {usersCreateInput} from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(
      private readonly userRepository:UserRepository,
      private readonly configService:ConfigService,
      private readonly roleService: RolesService,
      private readonly facilityService: FacilityService,
      private readonly departmentService: DepartmentService,
      private readonly deviceService: DeviceService,
      private readonly emailService:EmailService
  ) {
  }
  async create(createUserDto: CreateUserDto, token: Token) {
    try{
      const { id } = token
      const existingUser = await this.userRepository.findUserByEmail(createUserDto.email)
      if(existingUser){
        throw new ConflictException("User already exist")
      }
      const password = await this.passwordGenerator()
      // const password = createUserDto.passwordhash
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password,salt)
      const model = {
        ...createUserDto,
        passwordhash: hashedPassword,
        is_active: true,
        is_deleted: false,
        createdby: id,
        updatedby: id,
        date_created: new Date(),
        date_updated: new Date()
      }
      const user = await this.userRepository.createUser(model)
      if(!user){
        throw new NotImplementedException("Cannot Create User")
      }
      // const email = await this.emailService.sendEmail('Welcome to NazTEC\'s Online System Access!','email.hbs',user.email, {userName:`${user.firstname} ${user.lastname}`,userPassword:password,userEmail:user.email})
      // if(email.rejected.length > 0){
      //   throw new NotImplementedException("Cannot Send email to user")
      // }
      const response:ApiResponseDto<ResponseUserDto> = {
        statusCode:HttpStatus.OK,
          message:"User Created Successfully",
        data:user,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async findAll() {
    try{
      const users = await this.userRepository.findAllUser()
      const response:ApiResponseDto<ResponseUserDto[]> = {
        statusCode:HttpStatus.FOUND,
        message:"User Found Successfully",
        data:users,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try{
      const user = await this.userRepository.findUser(id)
      if(!user){
       throw  new NotFoundException(`Cannot find user with id ${id}`)
      }
      const response:ApiResponseDto<ResponseUserDto> = {
        statusCode:HttpStatus.FOUND,
        message:"User Found Successfully",
        data:user,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Staff Related APIs
  async createFacilityStaff(createFacilityAdminDto: CreateFacilityAdminDto, token: Token) {
    try {
      const { id } = token;
      const { firstname, address, email, facilityid, lastname, phonenumber, is_admin } = createFacilityAdminDto
      const existingUser = await this.userRepository.findUserByEmail(email)
        if(existingUser){
          throw new ConflictException("User already exist")
        }
        const password = await this.passwordGenerator()
        // const password = createUserDto.passwordhash
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        const model = {
          firstname:firstname,
          lastname: lastname,
          address: address,
          email: email,
          phonenumber:phonenumber,
          passwordhash: hashedPassword,
          is_active: true,
          is_deleted: false,
          createdby: id,
          updatedby: id,
          date_created: new Date(),
          date_updated: new Date()
        }
        const user = await this.userRepository.createUser(model)
        if(!user){
          throw new NotImplementedException("Cannot Create User")
        }
        
        if(is_admin) {
          const facilityAdminId = await this.roleService.findRoleByName('FacilityAdmin')
          await this.roleService.createUserRole({ userid: user.userid, roleid: facilityAdminId.roleid })
        } else {
          const facilityUserId = await this.roleService.findRoleByName('FacilityUser')
          await this.roleService.createUserRole({ userid: user.userid, roleid: facilityUserId.roleid })
        }
        
        await this.facilityService.createFacilityStaff(user.userid, facilityid, is_admin)

        const response:ApiResponseDto<ResponseUserDto> = {
          statusCode:HttpStatus.OK,
            message: is_admin ? "Facility Admin Created Successfully" : "Facility User Created Successfully",
          data:user,
          error:false
        }
        return response
    } catch(error) {
      throw error
    }
  }

  async createDepartmentStaff(createDepartmentAdminDto: CreateDepartmentAdminDto, token: Token) {
    try {
      const { id } = token;
      const { firstname, address, email, departmentid, lastname, phonenumber, is_admin } = createDepartmentAdminDto
      const existingUser = await this.userRepository.findUserByEmail(email)
        if(existingUser){
          throw new ConflictException("User already exist")
        }
        const password = await this.passwordGenerator()
        // const password = createUserDto.passwordhash
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        const model = {
          firstname:firstname,
          lastname: lastname,
          address: address,
          email: email,
          phonenumber:phonenumber,
          passwordhash: hashedPassword,
          is_active: true,
          is_deleted: false,
          createdby: id,
          updatedby: id,
          date_created: new Date(),
          date_updated: new Date()
        }
        const user = await this.userRepository.createUser(model)
        if(!user){
          throw new NotImplementedException("Cannot Create User")
        }
        
        if(is_admin) {
          const depAdminId = await this.roleService.findRoleByName('DepartmentAdmin')
          await this.roleService.createUserRole({ userid: user.userid, roleid: depAdminId.roleid })
        } else {
          const depUserId = await this.roleService.findRoleByName('DepartmentUser')
          await this.roleService.createUserRole({ userid: user.userid, roleid: depUserId.roleid })
        }
        await this.departmentService.createDepartmentStaff(user.userid, departmentid, is_admin)

        const response:ApiResponseDto<ResponseUserDto> = {
          statusCode:HttpStatus.OK,
          message: is_admin ? "Department Admin Created Successfully" : "Department User Created Successfully",
          data:user,
          error:false
        }
        return response
    } catch(error) {
      throw error
    }
  }

  async createDeviceStaff(createDeviceAdminDto: CreateDeviceAdminDto, token: Token) {
    try {
      const { id } = token;
      const { firstname, address, email, deviceid, lastname, phonenumber, is_admin } = createDeviceAdminDto
      const existingUser = await this.userRepository.findUserByEmail(email)
        if(existingUser){
          throw new ConflictException("User already exist")
        }
        const password = await this.passwordGenerator()
        // const password = createUserDto.passwordhash
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        const model = {
          firstname:firstname,
          lastname: lastname,
          address: address,
          email: email,
          phonenumber:phonenumber,
          passwordhash: hashedPassword,
          is_active: true,
          is_deleted: false,
          createdby: id,
          updatedby: id,
          date_created: new Date(),
          date_updated: new Date()
        }
        const user = await this.userRepository.createUser(model)
        if(!user){
          throw new NotImplementedException("Cannot Create User")
        }
  
        const devAdminId = await this.roleService.findRoleByName('DeviceAdmin')
        await this.roleService.createUserRole({ userid: user.userid, roleid: devAdminId.roleid })
        await this.deviceService.createDeviceStaff(user.userid, deviceid, is_admin)

        const response:ApiResponseDto<ResponseUserDto> = {
          statusCode:HttpStatus.OK,
            message:"Device Admin Created Successfully",
          data:user,
          error:false
        }
        return response
    } catch(error) {
      throw error
    }
  }

  async findAdmins(query: string) {
    try{
      let users: ResponseAdminDto[];
      
      if(query.toString() == 'FacilityAdmin') {
          users = await this.userRepository.findAllFacilityAdmins()
      } else if(query == 'DepartmentAdmin') {
          users = await this.userRepository.findAllDepartmentAdmins()
      } else if(query == 'DeviceAdmin') {
          users = await this.userRepository.findAllDeviceAdmins()
    }
      
      const response:ApiResponseDto<ResponseAdminDto[]> = {
        statusCode:HttpStatus.FOUND,
        message:"Admins Found Successfully",
        data:users,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async updateFacilityStaff(updateFacilityAdminDto: UpdateFacilityAdminDto) {
    try{
      const { userid, address, facilityid, firstname, lastname, is_admin, phonenumber } = updateFacilityAdminDto
      const recordToRemove = await this.userRepository.findFacilityStaff(userid, facilityid);
      await this.userRepository.unAssignStaffFromFacility(recordToRemove.facilityuserid);
      
      const user = await this.userRepository.findUser(userid)

      await this.facilityService.createFacilityStaff(user.userid, facilityid, is_admin)

      await this.userRepository.updateUser(user.userid, 
        {
          firstname: firstname,
          lastname: lastname,
          address: address,
          phonenumber: phonenumber
        })

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Facility Staff Updated Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateDepartmentStaff(updateDepartmentAdminDto: UpdateDepartmentAdminDto) {
    try{
      const { userid, address, departmentid, firstname, lastname, is_admin, phonenumber } = updateDepartmentAdminDto
      const recordToRemove = await this.userRepository.findDepartmentStaff(userid, departmentid);
      await this.userRepository.unAssignStaffFromDepartment(recordToRemove.departmentuserid);
      
      const user = await this.userRepository.findUser(userid)

      await this.departmentService.createDepartmentStaff(user.userid, departmentid, is_admin)

      await this.userRepository.updateUser(user.userid, 
        {
          firstname: firstname,
          lastname: lastname,
          address: address,
          phonenumber: phonenumber
        })

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Department Staff Updated Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateDeviceStaff(updateDeviceAdminDto: UpdateDeviceAdminDto) {
    try{
      const { userid, address, deviceid, firstname, lastname, is_admin, phonenumber } = updateDeviceAdminDto
      const recordToRemove = await this.userRepository.findDeviceStaff(userid, deviceid);
      await this.userRepository.unAssignStaffFromDevice(recordToRemove.deviceuserid);
      
      const user = await this.userRepository.findUser(userid)

      await this.deviceService.createDeviceStaff(user.userid, deviceid, is_admin)

      await this.userRepository.updateUser(user.userid, 
        {
          firstname: firstname,
          lastname: lastname,
          address: address,
          phonenumber: phonenumber
        })

      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Device Staff Updated Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
  // This is a function for generating password used when super admin created and guard are done.
  async passwordGenerator (){
    let length = 12,
        charset = this.configService.get<string>('PASSWORD_CHARACTER_SET'),
        password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password
  }
}
