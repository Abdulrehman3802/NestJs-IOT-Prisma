import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/Request/create-permission.dto';
import { UpdatePermissionDto } from './dto/Request/update-permission.dto';
import { PermissionsRepository } from './permissions.repository';
import { ApiResponseDto } from 'core/generics/api-response.dto';

@Injectable()
export class PermissionsService {

  constructor(
    private readonly permssionsRepository: PermissionsRepository
  ) {

  }

  async create(createPermissionDto: CreatePermissionDto): Promise<ApiResponseDto<any>> {
    try {

       const createdPermission = await this.permssionsRepository.createPermission(createPermissionDto);
 
       const response:ApiResponseDto<any> = 
           {
             statusCode: HttpStatus.OK,
             message: "Permission Successfully Created",
             data: createdPermission,
             error: false
           };
 
       return response;
    } catch(error) {
         throw new InternalServerErrorException("Something went wrong");
       }
 
   }

  findAll(roleid: number) {
    return this.permssionsRepository.findByRoleId(roleid)
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
