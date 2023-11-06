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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_repository_1 = require("./department.repository");
const create_user_dto_1 = require("../user/dto/request/create-user.dto");
const roles_service_1 = require("../roles/roles.service");
const user_service_1 = require("../user/user.service");
let DepartmentService = class DepartmentService {
    constructor(departmentRepository, userService, roleService) {
        this.departmentRepository = departmentRepository;
        this.userService = userService;
        this.roleService = roleService;
    }
    async create(createDepartmentDto, token) {
        try {
            const { id, rolename, customerId, facilityId } = token;
            let departmentModel;
            const orgId = createDepartmentDto.customerid;
            const facId = createDepartmentDto.facilityid;
            if (rolename == 'SuperAdmin') {
                if (!orgId || !facId)
                    throw new common_1.NotAcceptableException("customerid and facilityid cannot be empty");
                departmentModel = Object.assign(Object.assign({}, createDepartmentDto), { updated_by: id, created_by: id, is_deleted: false, is_active: true, date_created: new Date(), date_updated: new Date() });
            }
            if (rolename == 'OrganizationAdmin') {
                if (!facId)
                    throw new common_1.NotAcceptableException("facilityid cannot be empty");
                departmentModel = Object.assign(Object.assign({}, createDepartmentDto), { customerid: customerId, updated_by: id, created_by: id, is_deleted: false, is_active: true, date_created: new Date(), date_updated: new Date() });
            }
            if (rolename == 'FacilityAdmin') {
                departmentModel = Object.assign(Object.assign({}, createDepartmentDto), { customerid: customerId, facilityid: facilityId, updated_by: id, created_by: id, is_deleted: false, is_active: true, date_created: new Date(), date_updated: new Date() });
            }
            const department = await this.departmentRepository.createDepartment(departmentModel);
            const userDto = new create_user_dto_1.CreateUserDto();
            userDto.email = department.email;
            const user = await this.userService.create(userDto);
            const depAdminId = await this.roleService.findRoleByName('DepartmentAdmin');
            await this.roleService.createUserRole({ userid: user.data.userid, roleid: depAdminId.roleid });
            await this.departmentRepository.createDepartmentUserDto({ userid: user.data.userid, departmentid: department.departmentid });
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Department Created Successfully!',
                data: department,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(decodedtoken) {
        try {
            const { rolename, facilityId, customerId } = decodedtoken;
            let departments;
            if (rolename === 'OrganizationAdmin') {
                departments = await this.departmentRepository.findAllDepartmentsByOrganizationId(customerId);
            }
            else if (rolename === 'FacilityAdmin') {
                departments = await this.departmentRepository.findAllDepartmentsByFacilityId(facilityId);
            }
            else {
                departments = await this.departmentRepository.findAllDepartments();
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Departments Found Successfully!',
                data: departments,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const department = await this.departmentRepository.findOneDepartment(id);
            if (!department) {
                throw new common_1.NotFoundException(`Department Not Found with id: ${id}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Department Found Successfully!',
                data: {
                    departmentid: department.departmentid,
                    departmentname: department.departmentname,
                    customerid: department.customerid,
                    facilityid: department.facilityid,
                    is_deleted: department.is_deleted,
                    created_by: department.created_by,
                    updated_by: department.updated_by,
                    is_active: department.is_active,
                    date_created: department.date_created,
                    date_updated: department.date_updated
                },
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateDepartmentDto) {
        try {
            const updatedDepartment = await this.departmentRepository.updateDepartment(id, updateDepartmentDto);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Department Updated Successfully!',
                data: {
                    departmentid: updatedDepartment.departmentid,
                    departmentname: updatedDepartment.departmentname,
                    customerid: updatedDepartment.customerid,
                    facilityid: updatedDepartment.facilityid,
                    is_deleted: updatedDepartment.is_deleted,
                    created_by: updatedDepartment.created_by,
                    updated_by: updatedDepartment.updated_by,
                    is_active: updatedDepartment.is_active,
                    date_created: updatedDepartment.date_created,
                    date_updated: updatedDepartment.date_updated
                },
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
            const department = await this.departmentRepository.deleteDepartment(id);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Department Deleted Successfully!',
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllDepartments(facId) {
        try {
            const allDepartments = await this.departmentRepository.findAllDepartmentsByFacilityId(facId);
            if (allDepartments.length == 0) {
                throw new common_1.NotFoundException(`Departments Not Found that are assigned to facility with id ${facId}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Departments Found Associated to Facility",
                data: allDepartments,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [department_repository_1.DepartmentRepository,
        user_service_1.UserService,
        roles_service_1.RolesService])
], DepartmentService);
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map