import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    findAll(): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
