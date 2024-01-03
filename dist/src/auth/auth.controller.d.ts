import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { ChangePasswordDto, ResetPasswordDto } from './dto/request/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-login.dto").ResponseLoginDto>>;
    changePassword(body: ChangePasswordDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-login.dto").ResponseDto>>;
    getResetToken(body: {
        email: string;
    }): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
    resetPassword(body: ResetPasswordDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-login.dto").ResponseDto>>;
}
