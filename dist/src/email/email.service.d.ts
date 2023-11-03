import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
export declare class EmailService {
    private readonly emailService;
    private readonly configService;
    constructor(emailService: MailerService, configService: ConfigService);
    sendEmail(subject: any, fileName: any, email: any, replacements: any, html?: any): Promise<any>;
}
