import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ModelFacilityDto } from "./dto/request/create-facility.dto";
import { UpdateFacilityDto } from "./dto/request/update-facility.dto";
import { facilities } from '@prisma/client';
import {CreateFacilityAdminModelDto, CreateFacilityUserModelDto} from "./dto/request/create-facility-user.dto";

@Injectable()
export class FacilityRepository {
    constructor(private readonly prismaService: PrismaService) { }

    createFacility(model: ModelFacilityDto) {
        return this.prismaService.facilities.create({
            data: model,
        })
    }

    createFacilityUser(model:CreateFacilityUserModelDto){
        return this.prismaService.facilityusers.create({
            data:model,
        })
    }

    createFacilityAdmin(model:CreateFacilityAdminModelDto){
        return this.prismaService.facilityusers.create({
            data:model,
        })
    }

    findAllFacilities() {
        return this.prismaService.facilities.findMany({
            where: {
                is_deleted: false,
            }
        });
    }

    findAllFacilitiesOfOrgAdmin(orgId: number) {
        return this.prismaService.facilities.findMany({
            where: {
                is_deleted: false,
                customerid: orgId
            }
        });
    }

    findFacilityByUserId(userId: number) {
        return this.prismaService.facilityusers.findFirst({
            where: {
                userid: userId,
            }
        })
    }

    findOneFacility(id: number) {
        return this.prismaService.facilities.findFirst({
            where: {
                facilityid: id,
            }
        })
    }

    updateFacility(id: number, body: UpdateFacilityDto) {
        return this.prismaService.facilities.update({
            where: {
                facilityid: id,
            },
            data: {
                ...body,
                date_updated: new Date()
            },
        })
    }

    async deleteFacility(id: number) {
        return this.prismaService.facilities.update({
            where: {
                facilityid: id,
            },
            data: {
                is_active: false,
                is_deleted: true
            }
        })
    }

    async deleteFacilityByOrganizationId(orgid: number) {
        return this.prismaService.facilities.updateMany({
            where: {
                customerid: orgid,
            },
            data: {
                is_active: false,
                is_deleted: true
            }
        })
    }
}