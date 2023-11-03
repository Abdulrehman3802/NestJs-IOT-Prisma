import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {PrismaService} from "../prisma/prisma.service";
import {UserRepository} from "./user.repository";
import {JwtModule} from "@nestjs/jwt";
import {EmailModule} from "../email/email.module";

@Module({
  imports:[PrismaModule,JwtModule,EmailModule],
  controllers: [UserController],
  providers: [UserService,PrismaService,UserRepository],
  exports:[UserRepository,UserService]
})
export class UserModule {}
