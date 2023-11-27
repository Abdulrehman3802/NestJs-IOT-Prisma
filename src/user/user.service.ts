import {ConflictException, HttpStatus, Injectable, NotFoundException, NotImplementedException} from '@nestjs/common';
import {CreateUserDto, CreateFacilityAdminDto, CreateDepartmentAdminDto, CreateDeviceAdminDto, CreateStaffUserDto} from './dto/request/create-user.dto';
import {UpdateDepartmentAdminDto, UpdateDeviceAdminDto, UpdateFacilityAdminDto, UpdateUserDto, UpdateUserStaffDto} from './dto/request/update-user.dto';
import {UserRepository} from "./user.repository";
import {ApiResponseDto, Token} from "../../core/generics/api-response.dto";
import {ResponseUserDto, ResponseAdminDto, ResponseUnAssignedUserStaffDto, OrganizationAllStaffEmailPhoneResponse} from "./dto/response/response-user.dto";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt'
import {EmailService} from "../email/email.service";
import { RolesService } from 'src/roles/roles.service';
import { FacilityService } from 'src/facility/facility.service';
import { DepartmentService } from 'src/department/department.service';
import { DeviceService } from 'src/device/device.service';
import { deleteQueryDepartment, deleteQueryDevice, deleteQueryFacility } from './dto/request/user-queries-dto';
import { AssignRoleDto } from 'src/roles/dto/Request/assigne-role.dto';

// import {usersCreateInput} from '../prisma/prisma.service'

@Injectable()
export class UserService {
  //#region Constructor
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
  //#endregion

  //#region User

  //#region User CRUD - C
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
  //#endregion

  //#region User CRUD - R
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

  async findUnAssignedUsers() {
    try{
      let users = await this.userRepository.findAllUserForStaff()

      const organizationStaff = await this.userRepository.findAllOrganizationStaff()
 
      const facilityStaff = await this.userRepository.findAllFacilityStaff()

      const departmentStaff = await this.userRepository.findAllDepartmentStaff()

      const deviceStaff = await this.userRepository.findAllDeviceStaff()

      let excludedObjects = [];

    for (let user of users) {
      let userId = user.userid;

      if (
        organizationStaff.some((staff) => staff.userid === userId) ||
        facilityStaff.some((staff) => staff.userid === userId) ||
        departmentStaff.some((staff) => staff.userid === userId) ||
        deviceStaff.some((staff) => staff.userid === userId)
      ) {
        excludedObjects.push(user);
      }
    }

      const finalArray = users.filter((user) => !excludedObjects.includes(user));
   
      const responeArray = finalArray.map(user => ({
        userid: user.userid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        passwordhash: user.passwordhash,
        phonenumber: user.phonenumber,
        createdby: user.createdby,
        updatedby: user.updatedby,
        is_active: user.is_active,
        is_deleted: user.is_deleted,
        date_created: user.date_created,
        date_updated: user.date_updated,
        resettoken: user.resettoken,
        rolename: user.userroles[0]?.roles?.name || null,
        roleid: user.userroles[0]?.roleid
      }));

      const response:ApiResponseDto<ResponseUnAssignedUserStaffDto[]> = {
        statusCode:HttpStatus.FOUND,
        message:"Users Found Successfully",
        data: responeArray,
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
  //#endregion

  //#region User CRUD - U
  async update(id: number, updateUserStaffDto: UpdateUserStaffDto) {
    try {
      const { roleid } = updateUserStaffDto

      const user = await this.userRepository.findUser(id);
      if (!user) {
        throw new NotFoundException(`User Not Found with id: ${id}`);
      }

      if(roleid) {
          const userroleid = await this.userRepository.findUserRoleRelation(user.userid)
          if(userroleid.roleid !== roleid) {
            await this.userRepository.deleteUserRoleRelation(userroleid.userroleid)
    
            const roleDto: AssignRoleDto = {
              userid: user.userid.toString(),
              roleid: roleid.toString()
          }
    
          await this.roleService.assignRoletoUser(roleDto)
        }
        delete updateUserStaffDto.roleid
      }

      const updatedUser = await this.userRepository.updateUser(id, updateUserStaffDto);
      const response: ApiResponseDto<ResponseUserDto> = {
        statusCode: HttpStatus.OK,
        message: "User Updated Successfully!",
        data: updatedUser,
        error: false
      }
      return response;
    } catch(error) {
      throw error 
    }
  }
  //#endregion

  //#region User CRUD - D 
  async remove(id: number) {
    try {
      const user = await this.userRepository.findUser(id);
      if (!user) {
        throw new NotFoundException(`User Not Found with id: ${id}`);
      }

      await this.userRepository.deleteUser(id);
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "User Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch(error) {
      throw error 
    }
  }
  //#endregion 

  //#endregion

  //#region Staff Related APIs

  //#region Staff CRUD - C
  async createStaffUser(createStaffUserDto: CreateStaffUserDto, token: Token) {
    try{
      const { id } = token
      const { firstname, address, email, roleid, lastname, phonenumber } = createStaffUserDto
      const existingUser = await this.userRepository.findUserByEmail(createStaffUserDto.email)
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

      const roleDto: AssignRoleDto = {
          userid: user.userid.toString(),
          roleid: roleid.toString()
      }

      await this.roleService.assignRoletoUser(roleDto)
      
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

  //#endregion

  //#region Staff CRUD - R
  async findAdminStaff(query: string, token: Token) {
    try{
      const { customerId, facilityId, departmentId, rolename } = token
      let users: ResponseAdminDto[];

      if(rolename == 'SuperAdmin') {
        if(query.toString() == 'FacilityAdmin') {
          users = await this.userRepository.findAllFacilityAdmins()
        } else if(query == 'DepartmentAdmin') {
            users = await this.userRepository.findAllDepartmentAdmins()
        } else if(query == 'DeviceAdmin') {
            users = await this.userRepository.findAllDeviceAdmins()
        }
      } else if (rolename == 'OrganizationAdmin') {
        if(query == 'FacilityAdmin') {
          users = await this.userRepository.findAllFacilityAdminsUsingOrganizationId(customerId)
        } else if(query == 'DepartmentAdmin') {
            users = await this.userRepository.findAllDepartmentAdminsByOrganizationId(customerId)
        } else if(query == 'DeviceAdmin') {
            users = await this.userRepository.findAllDeviceAdminsByOrganizationId(customerId)
        }
      } else if (rolename == 'FacilityAdmin') {
        if(query == 'DepartmentAdmin') {
            users = await this.userRepository.findAllDepartmentAdminsByFacilityId(facilityId)
        } else if(query == 'DeviceAdmin') {
            users = await this.userRepository.findAllDeviceAdminsByFacilityId(facilityId)
        }
      } else if (rolename == 'DepartmentAdmin') {
        if(query == 'DeviceAdmin') {
            users = await this.userRepository.findAllDeviceAdminsByDepartmentId(departmentId)
        }
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

  async findAllOrganizationStaffByOrganizationId(id: number) {
    try{
  
      const customerId = id;
      const finalarray: OrganizationAllStaffEmailPhoneResponse[] = [];    

      const facilityusers = await this.userRepository.findAllFacilityStaffEmailPhoneUsingOrganizationId(customerId)
      facilityusers.map((user) => finalarray.push({
        userid: user.users.userid,
        email: user.users.email,
        name: user.users.firstname + ' ' + user.users.lastname,
        phonenumber: user.users.phonenumber
      }))

      const departmentusers = await this.userRepository.findAllDepartmentStaffEmailPhoneByOrganizationId(customerId)
      departmentusers.map((user) => finalarray.push({
        userid: user.users.userid,
        email: user.users.email,
        name: user.users.firstname + ' ' + user.users.lastname,
        phonenumber: user.users.phonenumber
      }))

      const deviceadmins = await this.userRepository.findAllDeviceStaffEmailPhoneByOrganizationId(customerId)
      deviceadmins.map((user) => finalarray.push({
        userid: user.users.userid,
        email: user.users.email,
        name: user.users.firstname + ' ' + user.users.lastname,
        phonenumber: user.users.phonenumber
      }))

      const response:ApiResponseDto<OrganizationAllStaffEmailPhoneResponse[]> = {
        statusCode:HttpStatus.FOUND,
        message:"Staff Found Successfully",
        data:finalarray,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async findAdminStaffByOrganizationId(query: string, id: number) {
    try{
  
      let users: ResponseAdminDto[];
      const customerId = id;
      
        if(query == 'FacilityAdmin') {
          users = await this.userRepository.findAllFacilityAdminsUsingOrganizationId(customerId)
        } else if(query == 'DepartmentAdmin') {
            users = await this.userRepository.findAllDepartmentAdminsByOrganizationId(customerId)
        } else if(query == 'DeviceAdmin') {
            users = await this.userRepository.findAllDeviceAdminsByOrganizationId(customerId)
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

  async findAdminStaffByFacilityId(query: string, id: number) {
    try{
  
      let users: ResponseAdminDto[];
      const facilityId = id;
      
        if(query == 'FacilityAdmin') {
          users = await this.userRepository.findAllFacilityAdminsUsingFacilityId(facilityId)
        } else if(query == 'DepartmentAdmin') {
            users = await this.userRepository.findAllDepartmentAdminsByFacilityId(facilityId)
        } else if(query == 'DeviceAdmin') {
            users = await this.userRepository.findAllDeviceAdminsByFacilityId(facilityId)
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

  async findAdminStaffByDepartmentId(query: string, id: number) {
    try{
  
      let users: ResponseAdminDto[];
      const departmentId = id;
      
        if(query == 'DepartmentAdmin') {
            users = await this.userRepository.findAllDepartmentAdminsByDepartmentId(departmentId)
        } else if(query == 'DeviceAdmin') {
            users = await this.userRepository.findAllDeviceAdminsByDepartmentId(departmentId)
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

  async findUserStaff(query: string, token: Token) {
    try{
      const { customerId, facilityId, departmentId, rolename } = token;
      let users: ResponseAdminDto[];
      if(rolename == 'SuperAdmin') {
          if(query.toString() == 'FacilityUser') {
              users = await this.userRepository.findAllFacilityUsers()
          } else if(query == 'DepartmentUser') {
              users = await this.userRepository.findAllDepartmentUsers()
          } 
      } else if (rolename == 'OrganizationAdmin') {
        if(query.toString() == 'FacilityUser') {
            users = await this.userRepository.findAllFacilityUsersByOrganizationId(customerId)
        } else if(query == 'DepartmentUser') {
            users = await this.userRepository.findAllDepartmentUsersByOrganizationId(customerId)
        } 
      } else if (rolename == 'FacilityAdmin') {
        if(query.toString() == 'FacilityUser') {
            users = await this.userRepository.findAllFacilityUsersByFacilityId(facilityId)
        } else if(query == 'DepartmentUser') {
            users = await this.userRepository.findAllDepartmentUsersByFacilityId(facilityId)
        } 
      } else if (rolename == 'DepartmentAdmin') {
        if(query == 'DepartmentUser') {
            users = await this.userRepository.findAllDepartmentUsersByDepartmentId(departmentId)
        } 
      } 


      const response:ApiResponseDto<ResponseAdminDto[]> = {
        statusCode:HttpStatus.FOUND,
        message:"Users Found Successfully",
        data:users,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async findUserStaffByOrganizationId(query: string, id: number) {
    try{
      let users: ResponseAdminDto[];
      const customerId = id;

        if(query.toString() == 'FacilityUser') {
            users = await this.userRepository.findAllFacilityUsersByOrganizationId(customerId)
        } else if(query == 'DepartmentUser') {
            users = await this.userRepository.findAllDepartmentUsersByOrganizationId(customerId)
        } 

      const response:ApiResponseDto<ResponseAdminDto[]> = {
        statusCode:HttpStatus.FOUND,
        message:"Users Found Successfully",
        data:users,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async findUserStaffByFacilityId(query: string, id: number) {
    try{
      let users: ResponseAdminDto[];
      const facilityId = id;

        if(query.toString() == 'FacilityUser') {
            users = await this.userRepository.findAllFacilityUsersByFacilityId(facilityId)
        } else if(query == 'DepartmentUser') {
            users = await this.userRepository.findAllDepartmentUsersByFacilityId(facilityId)
        } 

      const response:ApiResponseDto<ResponseAdminDto[]> = {
        statusCode:HttpStatus.FOUND,
        message:"Users Found Successfully",
        data:users,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async findUserStaffByDepartmentId(query: string, id: number) {
    try{
      let users: ResponseAdminDto[];
      const departmentId = id;

        if(query == 'DepartmentUser') {
            users = await this.userRepository.findAllDepartmentUsersByDepartmentId(departmentId)
        } 

      const response:ApiResponseDto<ResponseAdminDto[]> = {
        statusCode:HttpStatus.FOUND,
        message:"Users Found Successfully",
        data:users,
        error:false
      }
      return response
    }catch (error) {
      throw error
    }
  }
  //#endregion
  
  //#region Staff CRUD - U 
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
  //#endregion 

  //#region Staff CRUD - D
  async deleteFacilityStaff(query: deleteQueryFacility) {
    try{
      const { userid, facilityid} = query

      const recordToRemove = await this.userRepository.findFacilityStaff(Number(userid), Number(facilityid));
      await this.userRepository.unAssignStaffFromFacility(recordToRemove.facilityuserid);
      
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Facility Staff Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteDepartmentStaff(query: deleteQueryDepartment) {
    try{
      const { userid, departmentid } = query
      const recordToRemove = await this.userRepository.findDepartmentStaff(Number(userid), Number(departmentid));
      await this.userRepository.unAssignStaffFromDepartment(recordToRemove.departmentuserid);
      
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Department Staff Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteDeviceStaff(query: deleteQueryDevice) {
    try{
      const { userid, deviceid } = query
      const recordToRemove = await this.userRepository.findDeviceStaff(Number(userid), Number(deviceid));
      await this.userRepository.unAssignStaffFromDevice(recordToRemove.deviceuserid);
      
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Device Staff Deleted Successfully!",
        data: null,
        error: false
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#endregion

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
