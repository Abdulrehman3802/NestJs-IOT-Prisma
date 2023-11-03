import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserRepository } from "./user.repository";
import { ApiResponseDto } from "../../core/generics/api-response.dto";
import { ResponseUserDto } from "./dto/response/response-user.dto";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
export declare class UserService {
    private readonly userRepository;
    private readonly configService;
    private readonly emailService;
    constructor(userRepository: UserRepository, configService: ConfigService, emailService: EmailService);
    create(createUserDto: CreateUserDto): Promise<ApiResponseDto<ResponseUserDto>>;
    findAll(): Promise<ApiResponseDto<ResponseUserDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseUserDto>>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    passwordGenerator(): Promise<string>;
}
