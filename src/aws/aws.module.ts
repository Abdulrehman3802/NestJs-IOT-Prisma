import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import {ConfigModule} from "@nestjs/config";
import {PrismaService} from "../prisma/prisma.service";
@Module({
  imports:[ConfigModule.forRoot()],
  controllers: [AwsController],
  providers: [AwsService,PrismaService]
})
export class AwsModule {}
