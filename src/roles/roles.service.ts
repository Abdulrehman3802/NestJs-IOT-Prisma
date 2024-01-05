import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateRoleDto, CreateRoleModelDto } from './dto/Request/create-role.dto';
import { UpdateRoleDto } from './dto/Request/update-role.dto';
import { RolesRepository } from './roles.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateRoleResponseDto, RolesResponseDto } from './dto/Response/role-response.dto';
import { AssignRoleDto } from './dto/Request/assigne-role.dto';
import { UserRepository } from 'src/user/user.repository';
import {CreateUserRoleDto} from "./dto/Request/create-user-role.dto";


@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly usersRepository: UserRepository
  ) {

  }

  async create(createRoleDto: CreateRoleDto): Promise<ApiResponseDto<CreateRoleResponseDto>> {
   try {

      const checkRoleExist = await this.rolesRepository.findByName(createRoleDto.name)
      if(checkRoleExist > 0 ) throw new BadRequestException("Role exists")

      const role: CreateRoleModelDto = {
        ...createRoleDto,
        normalizedname: createRoleDto.name.toUpperCase(),
        is_active: true,
        is_deleted: false
      }

      const createdRole = await this.rolesRepository.createRole(role);

      const roleRes = {
        roleid: createdRole.roleid,
        name: createdRole.name
      }

      const response:ApiResponseDto<CreateRoleResponseDto> = 
          {
            statusCode: HttpStatus.OK,
            message: "Role Successfully Created",
            data: roleRes,
            error: false
          };

      return response;
   } catch(error) {
        throw new InternalServerErrorException("Something went wrong");
      }

  }

  async createUserRole(userRoleDto:CreateUserRoleDto){
    try{
        return this.rolesRepository.createUserRole(userRoleDto)
    }catch (error) {
        throw new InternalServerErrorException("Something went wrong")
    }
  }

  async assignRoletoUser(assignRoleDto: AssignRoleDto): Promise<ApiResponseDto<string>> {
    try {
        const {roleid, userid} = assignRoleDto
        const user = await this.usersRepository.findUser(+userid);
        if(!user) throw new BadRequestException("User not found")
      
        const role = await this.rolesRepository.findOne(+roleid)
        if(!role) throw new BadRequestException("Role not found")

        await this.rolesRepository.assignRole(+userid,+roleid)

       const response:ApiResponseDto<string> = 
           {
             statusCode: HttpStatus.OK,
             message: "Role Successfully Assigned",
             data: null,
             error: false
           };
 
       return response;
    } catch(error) {
         throw new InternalServerErrorException("Something went wrong");
       }
   }

 async findAll(token: Token) {
  try {
    const { rolename } = token

    const allRoles = await this.rolesRepository.findAll();
    let filteredRoles = allRoles.filter((role) => role.name !== 'SuperAdmin' && role.name !== 'OrganizationAdmin');

   if (rolename === 'FacilityAdmin') {
      filteredRoles = filteredRoles.filter((role) => role.name !== 'FacilityAdmin');
    } 
    else if (rolename === 'DepartmentAdmin') {
      filteredRoles = filteredRoles.filter((role) => role.name !== 'FacilityAdmin' && role.name !== 'FacilityUser' && role.name !== 'DepartmentAdmin');
    } 

    const responseDtoArray = filteredRoles.map((role) => ({
      roleid: role.roleid,
      name: role.name,
      is_active: role.is_active,
    }));

    
    const response:ApiResponseDto<RolesResponseDto[]> = 
    {
      statusCode: HttpStatus.OK,
      message: "Found Successfully",
      data: responseDtoArray,
      error: false
    };

    return response;
  } catch(error) {
      throw new InternalServerErrorException("Something went wrong")
  }
}

async findRoleByName(name:string){
      return this.rolesRepository.findRoleByName(name)
}
  async findOne(id: number) {
    try {
      const foundRole = await this.rolesRepository.findOne(id);
      
      const responseRole = {
        roleid: foundRole.roleid,
        name: foundRole.name,
        is_active: foundRole.is_active,
      };
  
      const response:ApiResponseDto<RolesResponseDto> = 
      {
        statusCode: HttpStatus.OK,
        message: "Found Successfully",
        data: responseRole,
        error: false
      };
      return response;
    } catch(error) {
        throw new InternalServerErrorException("Something went wrong")
      }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const updatedRole = await this.rolesRepository.updateRole(id, updateRoleDto);
      
      const responseRole = {
        roleid: updatedRole.roleid,
        name: updatedRole.name,
        is_active: updatedRole.is_active,
      };

      const response:ApiResponseDto<RolesResponseDto> = 
      {
        statusCode: HttpStatus.OK,
        message: "Role Updated Successfully",
        data: responseRole,
        error: false
      }
      return response;
    } catch(error) {
        throw new InternalServerErrorException("Something went wrong")
      }
  }

  async remove(id: number) {
    try {
      await this.rolesRepository.deleteRole(id);
      
      const response:ApiResponseDto<null> =
      {
        statusCode: HttpStatus.OK,
        message: "Role deleted Successfully",
        data: null,
        error: false
      }
      return response;
    } catch(error) {
        throw new InternalServerErrorException("Something went wrong")
      }
  }
}
