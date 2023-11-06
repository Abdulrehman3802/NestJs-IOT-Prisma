import {ConflictException, HttpStatus, Injectable, NotFoundException, NotImplementedException} from '@nestjs/common';
import {CreateUserDto} from './dto/request/create-user.dto';
import {UpdateUserDto} from './dto/request/update-user.dto';
import {UserRepository} from "./user.repository";
import {ApiResponseDto} from "../../core/generics/api-response.dto";
import {ResponseUserDto} from "./dto/response/response-user.dto";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from 'bcrypt'
import {EmailService} from "../email/email.service";
// import {usersCreateInput} from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(
      private readonly userRepository:UserRepository,
      private readonly configService:ConfigService,
      private readonly emailService:EmailService
  ) {
  }
  async create(createUserDto: CreateUserDto) {
    try{
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
