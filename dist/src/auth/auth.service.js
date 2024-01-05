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
const device_repository_1 = require("../device/device.repository");
let AuthService = class AuthService {
    constructor(userRepository, rolesRepository, organizationRepository, facilityRepository, departmentRepository, deviceRepository, configService, jwtService, emailService) {
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
        this.organizationRepository = organizationRepository;
        this.facilityRepository = facilityRepository;
        this.departmentRepository = departmentRepository;
        this.deviceRepository = deviceRepository;
        this.configService = configService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(loginDto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        try {
            let orgLogo, orgName, orgId;
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
            if (role.roles.name == "SuperAdmin") {
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            if (role.roles.name == "OrganizationAdmin") {
                const organization = await this.organizationRepository.findOrganizationByUserId(user.userid);
                orgName = (_a = organization === null || organization === void 0 ? void 0 : organization.customers) === null || _a === void 0 ? void 0 : _a.customername;
                orgLogo = (_b = organization === null || organization === void 0 ? void 0 : organization.customers) === null || _b === void 0 ? void 0 : _b.logo;
                orgId = (_c = organization === null || organization === void 0 ? void 0 : organization.customers) === null || _c === void 0 ? void 0 : _c.customerid;
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid,
                    customerId: organization.customerid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            if (role.roles.name == "FacilityAdmin") {
                const facilityUser = await this.facilityRepository.findFacilityByUserId(user.userid);
                const facility = await this.facilityRepository.findOneFacility(facilityUser.facilityid);
                orgName = (_d = facility === null || facility === void 0 ? void 0 : facility.customers) === null || _d === void 0 ? void 0 : _d.customername;
                orgLogo = (_e = facility === null || facility === void 0 ? void 0 : facility.customers) === null || _e === void 0 ? void 0 : _e.logo;
                orgId = (_f = facility === null || facility === void 0 ? void 0 : facility.customers) === null || _f === void 0 ? void 0 : _f.customerid;
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid,
                    customerId: facility.customerid,
                    facilityId: facilityUser.facilityid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            if (role.roles.name == "DepartmentAdmin") {
                const departmentUser = await this.departmentRepository.findDepartmentByUserId(user.userid);
                const department = await this.departmentRepository.findOneDepartment(departmentUser.departmentid);
                orgName = (_h = (_g = department === null || department === void 0 ? void 0 : department.facilities) === null || _g === void 0 ? void 0 : _g.customers) === null || _h === void 0 ? void 0 : _h.customername;
                orgLogo = (_k = (_j = department === null || department === void 0 ? void 0 : department.facilities) === null || _j === void 0 ? void 0 : _j.customers) === null || _k === void 0 ? void 0 : _k.logo;
                orgId = (_m = (_l = department === null || department === void 0 ? void 0 : department.facilities) === null || _l === void 0 ? void 0 : _l.customers) === null || _m === void 0 ? void 0 : _m.customerid;
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid,
                    customerId: department.customerid,
                    facilityId: department.facilityid,
                    departmentId: departmentUser.departmentid
                }, { secret: this.configService.get('JWT_SECRET') });
            }
            if (role.roles.name == "DeviceAdmin") {
                const deviceUser = await this.deviceRepository.findDeviceByUserId(user.userid);
                const device = await this.departmentRepository.findOneDepartment(deviceUser.deviceid);
                orgName = (_p = (_o = device === null || device === void 0 ? void 0 : device.facilities) === null || _o === void 0 ? void 0 : _o.customers) === null || _p === void 0 ? void 0 : _p.customername;
                orgLogo = (_r = (_q = device === null || device === void 0 ? void 0 : device.facilities) === null || _q === void 0 ? void 0 : _q.customers) === null || _r === void 0 ? void 0 : _r.logo;
                orgId = (_t = (_s = device === null || device === void 0 ? void 0 : device.facilities) === null || _s === void 0 ? void 0 : _s.customers) === null || _t === void 0 ? void 0 : _t.customerid;
                accessToken = this.jwtService.sign({
                    id: user.userid,
                    rolename: role.roles.name,
                    roleid: role.roleid,
                    customerId: device.customerid,
                    facilityId: device.facilityid,
                    departmentId: device.departmentid,
                    deviceid: deviceUser.deviceid
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
                    organizatoinId: orgId,
                    organizationLogo: orgLogo,
                    organizationName: orgName,
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
        device_repository_1.DeviceRepository,
        config_1.ConfigService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map