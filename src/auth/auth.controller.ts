import {Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import {ChangePasswordDto, ResetPasswordDto} from './dto/request/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('/change-password')
  changePassword(@Body() body:ChangePasswordDto) {
    // Need to change this id through token when guard applied
    const id = 5
    return this.authService.changePassword(id,body);
  }
  @Post('/get-reset-token')
  async getResetToken(@Body() body:{email:string}){
    return this.authService.getResetToken(body.email)
  }
  @Post('/reset-password')
  async resetPassword(@Body() body:ResetPasswordDto){
    return this.authService.resetPassword(body)
  }

}
