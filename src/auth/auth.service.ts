import {
    HttpStatus,
    Injectable,
    NotFoundException,
    NotImplementedException,
    UnauthorizedException
} from '@nestjs/common';
import {LoginDto} from './dto/request/login.dto';
import {UserRepository} from "../user/user.repository";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {ApiResponseDto} from "../../core/generics/api-response.dto";
import {ResponseDto, ResponseLoginDto} from "./dto/response/response-login.dto";
import {ChangePasswordDto, ResetPasswordDto} from "./dto/request/reset-password.dto";
import {v4 as uuidv4} from 'uuid';
import {EmailService} from "../email/email.service";
import {RolesRepository} from 'src/roles/roles.repository';
import {OrganizationRepository} from 'src/organization/organization.repository';
import {FacilityRepository} from 'src/facility/facility.repository';
import {DepartmentRepository} from 'src/department/department.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly rolesRepository: RolesRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly facilityRepository: FacilityRepository,
        private readonly departmentRepository: DepartmentRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) {
    }

    async login(loginDto: LoginDto) {
        try {
            const user = await this.userRepository.findUserByEmail(loginDto.email)
            if (!user) {
                throw new UnauthorizedException("Incorrect Email or Password")
            }
            const validation = await bcrypt.compare(loginDto.password, user.passwordhash);
            if (!validation) {
                throw new UnauthorizedException("Incorrect Email or password")
            }

            const role = await this.rolesRepository.findRoleOfUser(user.userid)
            let accessToken: string;

            if (role.roles.name === "SuperAdmin") {
                accessToken = this.jwtService.sign(
                    {
                        id: user.userid,
                        rolename: role.roles.name,
                        roleid: role.roleid
                    },
                    {secret: this.configService.get('JWT_SECRET')}
                );
            }

            if (role.roles.name === "OrganizationAdmin") {
                const organization = await this.organizationRepository.findOrganizationByUserId(user.userid)
                accessToken = this.jwtService.sign(
                    {
                        id: user.userid,
                        rolename: role.roles.name,
                        roleid: role.roleid,
                        customerId: organization.customerid
                    },
                    {secret: this.configService.get('JWT_SECRET')}
                );
            }

            if (role.roles.name === "FacilityAdmin") {
                const facilityUser = await this.facilityRepository.findFacilityByUserId(user.userid)
                const facility = await this.facilityRepository.findOneFacility(facilityUser.facilityid)
                accessToken = this.jwtService.sign(
                    {
                        id: user.userid,
                        rolename: role.roles.name,
                        roleid: role.roleid,
                        customerId: facility.customerid,
                        facilityId: facilityUser.facilityid
                    },
                    {secret: this.configService.get('JWT_SECRET')}
                );
            }

            if (role.roles.name === "DepartmentAdmin") {
                const departmentUser = await this.departmentRepository.findDepartmentByUserId(user.userid)
                const department = await this.departmentRepository.findOneDepartment(departmentUser.departmentid)
                accessToken = this.jwtService.sign(
                    {
                        id: user.userid,
                        rolename: role.roles.name,
                        roleid: role.roleid,
                        customerId: department.customerid,
                        facilityId: department.facilityid,
                        departmentId: departmentUser.departmentid
                    },
                    {secret: this.configService.get('JWT_SECRET')}
                );
            }

            const response: ApiResponseDto<ResponseLoginDto> = {
                statusCode: HttpStatus.OK,
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
            return response
        } catch (error) {
            throw error
        }
    }

    // Change password for security purpose
    async changePassword(userid: number, body: ChangePasswordDto) {
        try {
            // user id comes from req.user.id jwt token
            const user = await this.userRepository.findUser(userid)
            if (!user) {
                throw new NotFoundException("Cannot find user")
            }
            const validate = await bcrypt.compare(body.oldPassword, user.passwordhash)
            if (!validate) {
                throw new UnauthorizedException("Incorrect Password")
            }
            const salt = await bcrypt.genSalt()
            const newHashedPassword = await bcrypt.hash(body.newPassword, salt)
            const updatePassword = await this.userRepository.updateUser(user.userid, {passwordhash: newHashedPassword})
            if (!updatePassword) {
                throw new NotImplementedException("Cannot Update Password")
            }
            const response: ApiResponseDto<ResponseDto> = {
                statusCode: HttpStatus.OK,
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
            return response
        } catch (error) {
            throw error
        }
    }

    // Get token for resetting password
    async getResetToken(email: string) {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new NotFoundException("User does not exist")
            }
            const token = await uuidv4()
            user.resettoken = token
            const updateUser = await this.userRepository.updateUser(user.userid, user)
            if (!updateUser) {
                throw new NotImplementedException("Cannot Set Token")
            }
            const sendEmail = await this.emailService.sendEmail("Reset Password", "reset.hbs", user.email, {
                userName: `${updateUser.firstname} ${updateUser.lastname}`,
                userEmail: updateUser.email,
                resetToken: updateUser.resettoken
            })
            if (sendEmail.rejected.length > 0) {
                throw new NotImplementedException("Email cannot send")
            }
            const response: ApiResponseDto<null> = {
                statusCode: HttpStatus.OK,
                message: 'Email Sent Successfully',
                data: null,
                error: false,
            };
            return response
        } catch (error) {
            throw error
        }
    }

    // Reset Password through UUId
    async resetPassword(body: ResetPasswordDto) {
        try {
            const user = await this.userRepository.findUserByToken(body.token)
            if (!user) {
                throw new NotFoundException("Cannot find user")
            }
            const salt = await bcrypt.genSalt()
            const newHashedPassword = await bcrypt.hash(body.password, salt)
            const updatePassword = await this.userRepository.updateUser(user.userid, {
                passwordhash: newHashedPassword,
                resettoken: null
            })
            if (!updatePassword) {
                throw new NotImplementedException("Cannot Update Password")
            }
            const response: ApiResponseDto<ResponseDto> = {
                statusCode: HttpStatus.OK,
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
            return response
        } catch (error) {
            throw error
        }
    }
}

