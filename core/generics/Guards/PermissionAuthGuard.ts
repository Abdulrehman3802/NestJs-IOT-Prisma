import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly permissionsRepository: PermissionsRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
  try {
    const request = context.switchToHttp().getRequest();
    const token = request.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException();
    }
   
    // Authentication
    const decodedToken = await this.jwtService.verifyAsync(
      token,
      {
        secret: this.configService.get('JWT_SECRET')
      }
    );

    // Getting values from the Permission Decorator   
    const requiredPermissions = this.reflector.get('permissions', context.getHandler());

    // Adding required fields in the request to get in controllers
    request.token = decodedToken;

    // In case we dont want to set Permission to a route but Guard is implemented on the Controller
    // So no need to put Permission Decorator on that Route
    if(!requiredPermissions) return true;

    //Converting into the pattern coming from the database
    //eg: {Permission.Category.PermissionType}
    const claimId = `Permissions.${requiredPermissions.Category}.${requiredPermissions.PermissionType}`;

      const roleid = decodedToken.roleid;
      const permissions = await this.permissionsRepository.findByRoleId(roleid);

      const check = permissions.some((obj) => obj.permissionvalue.includes(claimId));
     
      if (check) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}

export interface RequestWithUser extends Request{
  token: {
    id:number;
    customerId: number;
    facilityId:number;
    departmentId: number;
    rolename: string;
  }
}
