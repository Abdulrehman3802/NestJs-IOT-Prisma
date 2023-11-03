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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/user.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const email_service_1 = require("../email/email.service");
const roles_repository_1 = require("../roles/roles.repository");
const organization_repository_1 = require("../organization/organization.repository");
const facility_repository_1 = require("../facility/facility.repository");
const department_repository_1 = require("../department/department.repository");
let AuthService = class AuthService {
    constructor(userRepository, rolesRepository, organizationRepository, facilityRepository, departmentRepository, configService, jwtService, emailService) {
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
        this.organizationRepository = organizationRepository;
        this.facilityRepository = facilityRepository;
        this.departmentRepository = departmentRepository;
        this.configService = configService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(loginDto) {
        try {
            const user = await this.userRepository.findUserByEmail(loginDto.email);
            if (!user) {
                throw new common_1.UnauthorizedException("Incorrect Email or Password");
            }
            const validation = await bcrypt.compare(loginDto.password, user.passwordhash);
            if (!validation) {
                throw new common_1.UnauthorizedException("Incorrect Email or password");
            }
            const role = await this.rolesRepository.findRoleOfUser(user.userid);
            let accessToken;
            if (role.roles.name === "SuperAdmin") {
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            if (role.roles.name === "OrganizationAdmin") {
                const organization = await this.organizationRepository.findOrganizationByUserId(user.userid);
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid,
                    customerId: organization.customerid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            if (role.roles.name === "FacilityAdmin") {
                const facilityUser = await this.facilityRepository.findFacilityByUserId(user.userid);
                const facility = await this.facilityRepository.findOneFacility(facilityUser.facilityid);
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid,
                    customerId: facility.customerid,
                    facilityId: facilityUser.facilityid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            if (role.roles.name === "DepartmentAdmin") {
                const departmentUser = await this.departmentRepository.findDepartmentByUserId(user.userid);
                const department = await this.departmentRepository.findOneDepartment(departmentUser.departmentid);
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid,
                    customerId: department.customerid,
                    facilityId: department.facilityid,
                    departmentId: departmentUser.departmentid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Signed in Successfully',
                data: {
                    accessToken: accessToken,
                    userid: user.userid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                    passwordhash: user.passwordhash,
                    phonenumber: user.phonenumber,
                    createdby: user.createdby,
                    updatedby: user.updatedby,
                    is_active: user.is_active,
                    is_deleted: user.is_deleted,
                    date_created: user.date_created,
                    date_updated: user.date_updated,
                },
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(userid, body) {
        try {
            const user = await this.userRepository.findUser(userid);
            if (!user) {
                throw new common_1.NotFoundException("Cannot find user");
            }
            const validate = await bcrypt.compare(body.oldPassword, user.passwordhash);
            if (!validate) {
                throw new common_1.UnauthorizedException("Incorrect Password");
            }
            const salt = await bcrypt.genSalt();
            const newHashedPassword = await bcrypt.hash(body.newPassword, salt);
            const updatePassword = await this.userRepository.updateUser(user.userid, { passwordhash: newHashedPassword });
            if (!updatePassword) {
                throw new common_1.NotImplementedException("Cannot Update Password");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Signed in Successfully',
                data: {
                    userid: updatePassword.userid,
                    firstname: updatePassword.firstname,
                    lastname: updatePassword.lastname,
                    email: updatePassword.email,
                    address: updatePassword.address,
                    passwordhash: updatePassword.passwordhash,
                    phonenumber: updatePassword.phonenumber,
                    createdby: updatePassword.createdby,
                    updatedby: updatePassword.updatedby,
                    is_active: updatePassword.is_active,
                    is_deleted: updatePassword.is_deleted,
                    date_created: updatePassword.date_created,
                    date_updated: updatePassword.date_updated,
                },
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getResetToken(email) {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException("User does not exist");
            }
            const token = await (0, uuid_1.v4)();
            user.resettoken = token;
            const updateUser = await this.userRepository.updateUser(user.userid, user);
            if (!updateUser) {
                throw new common_1.NotImplementedException("Cannot Set Token");
            }
            const sendEmail = await this.emailService.sendEmail("Reset Password", "reset.hbs", user.email, {
                userName: `${updateUser.firstname} ${updateUser.lastname}`,
                userEmail: updateUser.email,
                resetToken: updateUser.resettoken
            });
            if (sendEmail.rejected.length > 0) {
                throw new common_1.NotImplementedException("Email cannot send");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Email Sent Successfully',
                data: null,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(body) {
        try {
            const user = await this.userRepository.findUserByToken(body.token);
            if (!user) {
                throw new common_1.NotFoundException("Cannot find user");
            }
            const salt = await bcrypt.genSalt();
            const newHashedPassword = await bcrypt.hash(body.password, salt);
            const updatePassword = await this.userRepository.updateUser(user.userid, {
                passwordhash: newHashedPassword,
                resettoken: null
            });
            if (!updatePassword) {
                throw new common_1.NotImplementedException("Cannot Update Password");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: 'Password Updated Successfully',
                data: {
                    userid: updatePassword.userid,
                    firstname: updatePassword.firstname,
                    lastname: updatePassword.lastname,
                    email: updatePassword.email,
                    address: updatePassword.address,
                    passwordhash: updatePassword.passwordhash,
                    phonenumber: updatePassword.phonenumber,
                    createdby: updatePassword.createdby,
                    updatedby: updatePassword.updatedby,
                    is_active: updatePassword.is_active,
                    is_deleted: updatePassword.is_deleted,
                    date_created: updatePassword.date_created,
                    date_updated: updatePassword.date_updated,
                },
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        roles_repository_1.RolesRepository,
        organization_repository_1.OrganizationRepository,
        facility_repository_1.FacilityRepository,
        department_repository_1.DepartmentRepository,
        config_1.ConfigService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map