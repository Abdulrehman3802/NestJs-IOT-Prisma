import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {  CreateRoleModelDto } from "./dto/Request/create-role.dto";
import { UpdateRoleDto } from "./dto/Request/update-role.dto";
import {CreateUserRoleModelDto} from "./dto/Request/create-user-role.dto";

@Injectable()
export class RolesRepository{ 
  constructor(
    private readonly prismaService: PrismaService,
) {}

    async findByName(name: string) {
        return this.prismaService.roles.count({
          where: {
            normalizedname: name.toUpperCase()
          }
        })
    }

    async findAll() {
      return this.prismaService.roles.findMany({
        where: {
          is_deleted: false
        }})
    }

    async findRoleByName(name: string) {
        return this.prismaService.roles.findFirst({
            where: {
                normalizedname: name.toUpperCase()
            }
        })
    }
    async findOne(id: number) {
      return this.prismaService.roles.findFirst
      ({
        where: {
          roleid: id,
          is_deleted: false
        }
      })
    }

    async findRoleOfUser(userid: number) {
      return this.prismaService.userroles.findFirst
      ({
        where: {
          userid: userid,
        }, 
        include: {
           roles: true
        }
      })
    }

    async createUserRole(model: CreateUserRoleModelDto) {
      return this.prismaService.userroles.create({
        data:model
      })
    }

    async createRole(role: CreateRoleModelDto) {
      return this.prismaService.roles.create(
        {data: role})
    }

    async assignRole(userid: number, roleid: number ) {      
      return this.prismaService.userroles.create
      ({
        data: {
          userid: userid,
          roleid: roleid
        }})
    }


    async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
      return this.prismaService.roles.update
      ({
        where: {
          roleid: id
        },
        data: updateRoleDto
      })
    }

    async deleteRole(id: number) {
      return this.prismaService.roles.update
      ({
        where: {
          roleid: id
        },
        data: {
          is_active: false,
          is_deleted: true
        }
      })
    }
}