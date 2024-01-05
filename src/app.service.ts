import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {Request} from "express";
import { PermissionsRepository } from './permissions/permissions.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly permissionsRepository: PermissionsRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async GetGeneralData(request: Request) {
    try {

      const authorizationHeader = request.headers['authorization']; 

      if (!authorizationHeader) {
        throw new Error('Authorization header is missing.');
      }

      const token = authorizationHeader.replace('Bearer ', ''); 

      // Decode the token to access the roleId
      const decodedToken = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('JWT_SECRET')
        }
      );
     
      const roleId = decodedToken.roleid;

      // Fetch permissions based on the roleId
      const permissions = await this.permissionsRepository.findByRoleId(roleId);

      // Converting the response for frontend
      
      const transformedPermissions: string[] = permissions.map((permission) => {
        return permission.permissionvalue.replace('Permissions.', '').replace('.', '_').toLowerCase();
      });

      return { permissions : transformedPermissions};

    } catch(error) {
        throw new InternalServerErrorException("Something went wrong")
    }
  }
}
