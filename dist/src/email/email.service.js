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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = class EmailService {
    constructor(emailService, configService) {
        this.emailService = emailService;
        this.configService = configService;
    }
    async sendEmail(subject, fileName, email, replacements, html = null) {
        try {
            let response;
            if (replacements.resetToken) {
                response = await this.emailService.sendMail({
                    to: email,
                    from: this.configService.get('MAIL_EMAIL'),
                    subject: subject,
                    template: fileName,
                    context: {
                        username: replacements.userName,
                        to: replacements.userEmail,
                        token: replacements.resetToken
                    },
                });
            }
            else {
                response = await this.emailService.sendMail({
                    to: email,
                    from: this.configService.get('MAIL_EMAIL'),
                    subject: subject,
                    template: fileName,
                    context: {
                        username: replacements.userName,
                        to: replacements.userEmail,
                        userPassword: replacements.userPassword
                    },
                });
            }
            return response;
        }
        catch (err) {
            return err;
        }
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map