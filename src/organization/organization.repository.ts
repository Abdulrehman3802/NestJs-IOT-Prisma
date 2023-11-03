import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModelOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import { OrganizationUserModelDto} from "./dto/request/create-organization-user.dto";

@Injectable()
export class OrganizationRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async createOrganization(model: ModelOrganizationDto) {
        return this.prismaService.customers.create({
            data: model,
        })
    }

    async createOrganizationUser(model: OrganizationUserModelDto) {
        return this.prismaService.organizationusers.create({
            data: model,
        })
    }

    async findAllOrganization() {
        return this.prismaService.customers.findMany({
            where:{
                is_deleted:false
            }
        });
    }

    async findOrganization(orgId: number) {
        return this.prismaService.customers.findFirst({
            where: {
                customerid: orgId,
                is_deleted: false
            }
        })
    }

    async findOrganizationByUserId(userId: number) {
        return this.prismaService.organizationusers.findFirst({
            where: {
                userid: userId,
            }
        })
    }

    async updateOrganization(orgId: number, body: UpdateOrganizationDto) {
        return this.prismaService.customers.update({
            where: {
                customerid: orgId
            },
            data: body
        })
    }

    async deleteOrganization(orgId: number) {
        return this.prismaService.customers.update({
            where: {
                customerid: orgId
            },
            data: {
                is_active: false,
                is_deleted: true
            }
        })
    }
}