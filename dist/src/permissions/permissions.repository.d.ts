import { PrismaService } from "src/prisma/prisma.service";
import { CreatePermissionDto } from "./dto/Request/create-permission.dto";
export declare class PermissionsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createPermission(permission: CreatePermissionDto): Promise<{
        rolepermissionid: number;
        roleid: number;
        permissiontype: string;
        permissionvalue: string;
    }>;
    findByRoleId(roleid: number): Promise<{
        rolepermissionid: number;
        roleid: number;
        permissiontype: string;
        permissionvalue: string;
    }[]>;
}
