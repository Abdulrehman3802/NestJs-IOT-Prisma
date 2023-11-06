import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {MailerService} from "@nestjs-modules/mailer";
@Injectable()
export class EmailService {
  constructor(
      private readonly emailService:MailerService,
      private readonly configService:ConfigService
  ) {
  }
  // In sending Email we have two files with different fields so if else is doing this
  async sendEmail(subject, fileName, email, replacements , html = null) {
    try {
      let response
      // For the sake of no error 
//       // If reset token  exist that means we are sending reset password mail
//       if(replacements.resetToken){
//         response = await this.emailService.sendMail({
//           to: email,
//           from: this.configService.get('MAIL_EMAIL'),
//           subject: subject,
//           template: fileName,
//           context: {
//             username: replacements.userName,
//             to: replacements.userEmail,
//             token: replacements.resetToken
//           },
//         });
//       }else {
//         // if no reset token than simple email is sending on creation.
//         response = await this.emailService.sendMail({
//           to: email,
//           from: this.configService.get('MAIL_EMAIL'),
//           subject: subject,
//           template: fileName,
//           context: {
//             username: replacements.userName,
//             to: replacements.userEmail,
//             userPassword: replacements.userPassword
//           },
//         });
//       }
// // this response is wrapping in user service no need to worry
      return response
    } catch (err) {
      return err
    }

  }

 }
