import { CreatePermissionDto } from './dto/Request/create-permission.dto';
import { UpdatePermissionDto } from './dto/Request/update-permission.dto';
import { PermissionsRepository } from './permissions.repository';
import { ApiResponseDto } from 'core/generics/api-response.dto';
export declare class PermissionsService {
    private readonly permssionsRepository;
    constructor(permssionsRepository: PermissionsRepository);
    create(createPermissionDto: CreatePermissionDto): Promise<ApiResponseDto<any>>;
    findAll(roleid: number): Promise<{
        rolepermissionid: number;
        roleid: number;
        permissiontype: string;
        permissionvalue: string;
    }[]>;
    findOne(id: number): string;
    update(id: number, updatePermissionDto: UpdatePermissionDto): string;
    remove(id: number): string;
}
