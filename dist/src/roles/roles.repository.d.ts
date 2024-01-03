import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleModelDto } from "./dto/Request/create-role.dto";
import { UpdateRoleDto } from "./dto/Request/update-role.dto";
import { CreateUserRoleModelDto } from "./dto/Request/create-user-role.dto";
export declare class RolesRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findByName(name: string): Promise<number>;
    findAll(): Promise<{
        roleid: number;
        name: string;
        normalizedname: string;
        is_active: boolean;
        is_deleted: boolean;
    }[]>;
    findRoleByName(name: string): Promise<{
        roleid: number;
        name: string;
        normalizedname: string;
        is_active: boolean;
        is_deleted: boolean;
    }>;
    findOne(id: number): Promise<{
        roleid: number;
        name: string;
        normalizedname: string;
        is_active: boolean;
        is_deleted: boolean;
    }>;
    findRoleOfUser(userid: number): Promise<{
        roles: {
            roleid: number;
            name: string;
            normalizedname: string;
            is_active: boolean;
            is_deleted: boolean;
        };
    } & {
        userroleid: number;
        roleid: number;
        userid: number;
    }>;
    createUserRole(model: CreateUserRoleModelDto): Promise<{
        userroleid: number;
        roleid: number;
        userid: number;
    }>;
    createRole(role: CreateRoleModelDto): Promise<{
        roleid: number;
        name: string;
        normalizedname: string;
        is_active: boolean;
        is_deleted: boolean;
    }>;
    assignRole(userid: number, roleid: number): Promise<{
        userroleid: number;
        roleid: number;
        userid: number;
    }>;
    updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<{
        roleid: number;
        name: string;
        normalizedname: string;
        is_active: boolean;
        is_deleted: boolean;
    }>;
    deleteRole(id: number): Promise<{
        roleid: number;
        name: string;
        normalizedname: string;
        is_active: boolean;
        is_deleted: boolean;
    }>;
}
