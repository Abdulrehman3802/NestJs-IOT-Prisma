import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { PermissionsRepository } from './permissions/permissions.repository';
import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly jwtService;
    private readonly configService;
    private readonly permissionsRepository;
    constructor(jwtService: JwtService, configService: ConfigService, permissionsRepository: PermissionsRepository);
    getHello(): string;
    GetGeneralData(request: Request): Promise<{
        permissions: string[];
    }>;
}
