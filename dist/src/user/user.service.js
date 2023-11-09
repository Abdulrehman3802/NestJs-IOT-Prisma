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
const device_service_1 = require("../device/device.service");
let UserService = class UserService {
    constructor(userRepository, configService, roleService, facilityService, departmentService, deviceService, emailService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.roleService = roleService;
        this.facilityService = facilityService;
        this.departmentService = departmentService;
        this.deviceService = deviceService;
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
    async findUnAssignedUsers() {
        try {
            let users = await this.userRepository.findAllUserForStaff();
            const organizationStaff = await this.userRepository.findAllOrganizationStaff();
            const facilityStaff = await this.userRepository.findAllFacilityStaff();
            const departmentStaff = await this.userRepository.findAllDepartmentStaff();
            const deviceStaff = await this.userRepository.findAllDeviceStaff();
            let excludedObjects = [];
            for (let user of users) {
                let userId = user.userid;
                if (organizationStaff.some((staff) => staff.userid === userId) ||
                    facilityStaff.some((staff) => staff.userid === userId) ||
                    departmentStaff.some((staff) => staff.userid === userId) ||
                    deviceStaff.some((staff) => staff.userid === userId)) {
                    excludedObjects.push(user);
                }
            }
            const finalArray = users.filter((user) => !excludedObjects.includes(user));
            const response = {
                statusCode: common_1.HttpStatus.FOUND,
                message: "User Found Successfully",
                data: finalArray,
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
    async createStaffUser(createStaffUserDto, token) {
        try {
            const { id } = token;
            const { firstname, address, email, roleid, lastname, phonenumber } = createStaffUserDto;
            const existingUser = await this.userRepository.findUserByEmail(createStaffUserDto.email);
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
            const roleDto = {
                userid: user.userid.toString(),
                roleid: roleid.toString()
            };
            await this.roleService.assignRoletoUser(roleDto);
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
    async createFacilityStaff(createFacilityAdminDto, token) {
        try {
            const { id } = token;
            const { firstname, address, email, facilityid, lastname, phonenumber, is_admin } = createFacilityAdminDto;
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
            if (is_admin) {
                const facilityAdminId = await this.roleService.findRoleByName('FacilityAdmin');
                await this.roleService.createUserRole({ userid: user.userid, roleid: facilityAdminId.roleid });
            }
            else {
                const facilityUserId = await this.roleService.findRoleByName('FacilityUser');
                await this.roleService.createUserRole({ userid: user.userid, roleid: facilityUserId.roleid });
            }
            await this.facilityService.createFacilityStaff(user.userid, facilityid, is_admin);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: is_admin ? "Facility Admin Created Successfully" : "Facility User Created Successfully",
                data: user,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async createDepartmentStaff(createDepartmentAdminDto, token) {
        try {
            const { id } = token;
            const { firstname, address, email, departmentid, lastname, phonenumber, is_admin } = createDepartmentAdminDto;
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
            if (is_admin) {
                const depAdminId = await this.roleService.findRoleByName('DepartmentAdmin');
                await this.roleService.createUserRole({ userid: user.userid, roleid: depAdminId.roleid });
            }
            else {
                const depUserId = await this.roleService.findRoleByName('DepartmentUser');
                await this.roleService.createUserRole({ userid: user.userid, roleid: depUserId.roleid });
            }
            await this.departmentService.createDepartmentStaff(user.userid, departmentid, is_admin);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: is_admin ? "Department Admin Created Successfully" : "Department User Created Successfully",
                data: user,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async createDeviceStaff(createDeviceAdminDto, token) {
        try {
            const { id } = token;
            const { firstname, address, email, deviceid, lastname, phonenumber, is_admin } = createDeviceAdminDto;
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
            const devAdminId = await this.roleService.findRoleByName('DeviceAdmin');
            await this.roleService.createUserRole({ userid: user.userid, roleid: devAdminId.roleid });
            await this.deviceService.createDeviceStaff(user.userid, deviceid, is_admin);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Admin Created Successfully",
                data: user,
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
            else if (query == 'DeviceAdmin') {
                users = await this.userRepository.findAllDeviceAdmins();
            }
            const response = {
                statusCode: common_1.HttpStatus.FOUND,
                message: "Admins Found Successfully",
                data: users,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async updateFacilityStaff(updateFacilityAdminDto) {
        try {
            const { userid, address, facilityid, firstname, lastname, is_admin, phonenumber } = updateFacilityAdminDto;
            const recordToRemove = await this.userRepository.findFacilityStaff(userid, facilityid);
            await this.userRepository.unAssignStaffFromFacility(recordToRemove.facilityuserid);
            const user = await this.userRepository.findUser(userid);
            await this.facilityService.createFacilityStaff(user.userid, facilityid, is_admin);
            await this.userRepository.updateUser(user.userid, {
                firstname: firstname,
                lastname: lastname,
                address: address,
                phonenumber: phonenumber
            });
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Staff Updated Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async updateDepartmentStaff(updateDepartmentAdminDto) {
        try {
            const { userid, address, departmentid, firstname, lastname, is_admin, phonenumber } = updateDepartmentAdminDto;
            const recordToRemove = await this.userRepository.findDepartmentStaff(userid, departmentid);
            await this.userRepository.unAssignStaffFromDepartment(recordToRemove.departmentuserid);
            const user = await this.userRepository.findUser(userid);
            await this.departmentService.createDepartmentStaff(user.userid, departmentid, is_admin);
            await this.userRepository.updateUser(user.userid, {
                firstname: firstname,
                lastname: lastname,
                address: address,
                phonenumber: phonenumber
            });
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Department Staff Updated Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async updateDeviceStaff(updateDeviceAdminDto) {
        try {
            const { userid, address, deviceid, firstname, lastname, is_admin, phonenumber } = updateDeviceAdminDto;
            const recordToRemove = await this.userRepository.findDeviceStaff(userid, deviceid);
            await this.userRepository.unAssignStaffFromDevice(recordToRemove.deviceuserid);
            const user = await this.userRepository.findUser(userid);
            await this.deviceService.createDeviceStaff(user.userid, deviceid, is_admin);
            await this.userRepository.updateUser(user.userid, {
                firstname: firstname,
                lastname: lastname,
                address: address,
                phonenumber: phonenumber
            });
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Staff Updated Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFacilityStaff(query) {
        try {
            const { userid, facilityid } = query;
            const recordToRemove = await this.userRepository.findFacilityStaff(Number(userid), Number(facilityid));
            await this.userRepository.unAssignStaffFromFacility(recordToRemove.facilityuserid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Staff Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteDepartmentStaff(query) {
        try {
            const { userid, departmentid } = query;
            const recordToRemove = await this.userRepository.findDepartmentStaff(Number(userid), Number(departmentid));
            await this.userRepository.unAssignStaffFromDepartment(recordToRemove.departmentuserid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Department Staff Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteDeviceStaff(query) {
        try {
            const { userid, deviceid } = query;
            const recordToRemove = await this.userRepository.findDeviceStaff(Number(userid), Number(deviceid));
            await this.userRepository.unAssignStaffFromDevice(recordToRemove.deviceuserid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Device Staff Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
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
        device_service_1.DeviceService,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map