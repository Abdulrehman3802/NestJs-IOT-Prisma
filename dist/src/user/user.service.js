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
let UserService = class UserService {
    constructor(userRepository, configService, emailService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.emailService = emailService;
    }
    async create(createUserDto) {
        try {
            const existingUser = await this.userRepository.findUserByEmail(createUserDto.email);
            if (existingUser) {
                throw new common_1.ConflictException("User already exist");
            }
            const password = await this.passwordGenerator();
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const model = Object.assign(Object.assign({}, createUserDto), { passwordhash: hashedPassword, is_active: true, is_deleted: false, date_created: new Date(), date_updated: new Date() });
            const user = await this.userRepository.createUser(model);
            if (!user) {
                throw new common_1.NotImplementedException("Cannot Create User");
            }
            const email = await this.emailService.sendEmail('Welcome to NazTEC\'s Online System Access!', 'email.hbs', user.email, { userName: `${user.firstname} ${user.lastname}`, userPassword: password, userEmail: user.email });
            if (email.rejected.length > 0) {
                throw new common_1.NotImplementedException("Cannot Send email to user");
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
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map