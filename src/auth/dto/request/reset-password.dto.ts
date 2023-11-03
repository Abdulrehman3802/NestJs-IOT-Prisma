export class ResetPasswordDto{
    password:string
    token:string
}

export class ChangePasswordDto {
    oldPassword:string
    newPassword:string
}
