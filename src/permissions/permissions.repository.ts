import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePermissionDto } from "./dto/Request/create-permission.dto";

@Injectable()
export class PermissionsRepository{ 
  constructor(
    private readonly prismaService: PrismaService,
) {}


    async createPermission(permission: CreatePermissionDto) {
      return this.prismaService.rolepermissions.create(
        {data: permission})
    }

    async findByRoleId(roleid: number) {
      return await this.prismaService.rolepermissions.findMany({
        where: { roleid: roleid },
      });
      
    }
}