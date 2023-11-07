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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const email_service_1 = require("../email/email.service");
const roles_service_1 = require("../roles/roles.service");
const facility_service_1 = require("../facility/facility.service");
const department_service_1 = require("../department/department.service");
let UserService = class UserService {
    constructor(userRepository, configService, roleService, facilityService, departmentService, emailService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.roleService = roleService;
        this.facilityService = facilityService;
        this.departmentService = departmentService;
        this.emailService = emailService;
    }
    async create(createUserDto, token) {
        try {
            const { id } = token;
            const existingUser = await this.userRepository.findUserByEmail(createUserDto.email);
            if (existingUser) {
                throw new common_1.ConflictException("User already exist");
            }
            const password = await this.passwordGenerator();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const model = Object.assign(Object.assign({}, createUserDto), { passwordhash: hashedPassword, is_active: true, is_deleted: false, createdby: id, updatedby: id, date_created: new Date(), date_updated: new Date() });
            const user = await this.userRepository.createUser(model);
            if (!user) {
                throw new common_1.NotImplementedException("Cannot Create User");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "User Created Successfully",
                data: user,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async createFacilityAdmin(createFacilityAdminDto, token) {
        try {
            const { id } = token;
            const { firstname, address, email, facilityid, lastname, phonenumber } = createFacilityAdminDto;
            const existingUser = await this.userRepository.findUserByEmail(email);
            if (existingUser) {
                throw new common_1.ConflictException("User already exist");
            }
            const password = await this.passwordGenerator();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const model = {
                firstname: firstname,
                lastname: lastname,
                address: address,
                email: email,
                phonenumber: phonenumber,
                passwordhash: hashedPassword,
                is_active: true,
                is_deleted: false,
                createdby: id,
                updatedby: id,
                date_created: new Date(),
                date_updated: new Date()
            };
            const user = await this.userRepository.createUser(model);
            if (!user) {
                throw new common_1.NotImplementedException("Cannot Create User");
            }
            const facilityAdminId = await this.roleService.findRoleByName('FacilityAdmin');
            await this.roleService.createUserRole({ userid: user.userid, roleid: facilityAdminId.roleid });
            await this.facilityService.createFacilityAdmin(user.userid, facilityid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Admin Created Successfully",
                data: user,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async createDepartmentAdmin(createDepartmentAdminDto, token) {
        try {
            const { id } = token;
            const { firstname, address, email, departmentid, lastname, phonenumber } = createDepartmentAdminDto;
            const existingUser = await this.userRepository.findUserByEmail(email);
            if (existingUser) {
                throw new common_1.ConflictException("User already exist");
            }
            const password = await this.passwordGenerator();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const model = {
                firstname: firstname,
                lastname: lastname,
                address: address,
                email: email,
                phonenumber: phonenumber,
                passwordhash: hashedPassword,
                is_active: true,
                is_deleted: false,
                createdby: id,
                updatedby: id,
                date_created: new Date(),
                date_updated: new Date()
            };
            const user = await this.userRepository.createUser(model);
            if (!user) {
                throw new common_1.NotImplementedException("Cannot Create User");
            }
            const depAdminId = await this.roleService.findRoleByName('DepartmentAdmin');
            await this.roleService.createUserRole({ userid: user.userid, roleid: depAdminId.roleid });
            await this.departmentService.createDepartmentAdmin(user.userid, departmentid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Department Admin Created Successfully",
                data: user,
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
            const users = await this.userRepository.findAllUser();
            const response = {
                statusCode: common_1.HttpStatus.FOUND,
                message: "User Found Successfully",
                data: users,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAdmins(query) {
        try {
            let users;
            if (query.toString() == 'FacilityAdmin') {
                users = await this.userRepository.findAllFacilityAdmins();
            }
            else if (query == 'DepartmentAdmin') {
                users = await this.userRepository.findAllDepartmentAdmins();
            }
            const response = {
                statusCode: common_1.HttpStatus.FOUND,
                message: "Users Found Successfully",
                data: users,
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
            const user = await this.userRepository.findUser(id);
            if (!user) {
                throw new common_1.NotFoundException(`Cannot find user with id ${id}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.FOUND,
                message: "User Found Successfully",
                data: user,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async passwordGenerator() {
        let length = 12, charset = this.configService.get('PASSWORD_CHARACTER_SET'), password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        config_1.ConfigService,
        roles_service_1.RolesService,
        facility_service_1.FacilityService,
        department_service_1.DepartmentService,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map