import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { Request } from 'express';
export declare class JwtAuthGuard implements CanActivate {
    private readonly permissionsRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly reflector;
    constructor(permissionsRepository: PermissionsRepository, jwtService: JwtService, configService: ConfigService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export interface RequestWithUser extends Request {
    token: {
        id: number;
        customerId: number;
        facilityId: number;
        departmentId: number;
        rolename: string;
    };
}
