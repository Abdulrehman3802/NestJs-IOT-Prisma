import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/Request/create-permission.dto';
import { UpdatePermissionDto } from './dto/Request/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<any>>;
    findByRoleId(roleid: string): Promise<{
        rolepermissionid: number;
        roleid: number;
        permissiontype: string;
        permissionvalue: string;
    }[]>;
    findOne(id: string): string;
    update(id: string, updatePermissionDto: UpdatePermissionDto): string;
    remove(id: string): string;
}
