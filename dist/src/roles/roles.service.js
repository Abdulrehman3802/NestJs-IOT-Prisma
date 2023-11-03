"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_repository_1 = require("./roles.repository");
const user_repository_1 = require("../user/user.repository");
let RolesService = class RolesService {
    constructor(rolesRepository, usersRepository) {
        this.rolesRepository = rolesRepository;
        this.usersRepository = usersRepository;
    }
    async create(createRoleDto) {
        try {
            const checkRoleExist = await this.rolesRepository.findByName(createRoleDto.name);
            if (checkRoleExist > 0)
                throw new common_1.BadRequestException("Role exists");
            const role = Object.assign(Object.assign({}, createRoleDto), { normalizedname: createRoleDto.name.toUpperCase(), is_active: true, is_deleted: false });
            const createdRole = await this.rolesRepository.createRole(role);
            const roleRes = {
                roleid: createdRole.roleid,
                name: createdRole.name
            };
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Role Successfully Created",
                data: roleRes,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async createUserRole(userRoleDto) {
        try {
            return this.rolesRepository.createUserRole(userRoleDto);
        }
        catch (error) {
            throw error;
        }
    }
    async assignRoletoUser(assignRoleDto) {
        try {
            const { roleid, userid } = assignRoleDto;
            const user = await this.usersRepository.findUser(+userid);
            if (!user)
                throw new common_1.BadRequestException("User not found");
            const role = await this.rolesRepository.findOne(+roleid);
            if (!role)
                throw new common_1.BadRequestException("Role not found");
            await this.rolesRepository.assignRole(+userid, +roleid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Role Successfully Assigned",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const allRoles = await this.rolesRepository.findAll();
            const responseDtoArray = allRoles.map((role) => ({
                roleid: role.roleid,
                name: role.name,
                is_active: role.is_active,
            }));
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Found Successfully",
                data: responseDtoArray,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findRoleByName(name) {
        return this.rolesRepository.findRoleByName(name);
    }
    async findOne(id) {
        try {
            const foundRole = await this.rolesRepository.findOne(id);
            const responseRole = {
                roleid: foundRole.roleid,
                name: foundRole.name,
                is_active: foundRole.is_active,
            };
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Found Successfully",
                data: responseRole,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateRoleDto) {
        try {
            const updatedRole = await this.rolesRepository.updateRole(id, updateRoleDto);
            const responseRole = {
                roleid: updatedRole.roleid,
                name: updatedRole.name,
                is_active: updatedRole.is_active,
            };
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Role Updated Successfully",
                data: responseRole,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.rolesRepository.deleteRole(id);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Role deleted Successfully",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [roles_repository_1.RolesRepository,
        user_repository_1.UserRepository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map