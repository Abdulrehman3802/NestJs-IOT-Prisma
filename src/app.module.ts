import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { OrganizationModule } from './organization/organization.module';
import { FacilityModule } from './facility/facility.module';
import { DepartmentModule } from './department/department.module';
import { DeviceModule } from './device/device.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PermissionsRepository } from './permissions/permissions.repository';

import {MailerModule} from "@nestjs-modules/mailer";
import{join} from 'path'
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { AwsModule } from './aws/aws.module';
import { SensorModule } from './sensor/sensor.module';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.sendgrid.net',
          auth: {
            user: configService.get('MAIL_USERNAME'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        template: {
          dir: join(__dirname, '..', 'mail'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
    }),
  }),
    OrganizationModule,
    FacilityModule,
    DepartmentModule,
    DeviceModule,
    UserModule,
    JwtModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    AwsModule,
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, ConfigService, PermissionsRepository],
  exports: []
})
export class AppModule {}
