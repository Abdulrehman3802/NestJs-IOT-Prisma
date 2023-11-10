import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDashboardDto, ModelDepartmentDashboardDto, ModelDeviceDashboardDto, ModelFacilityDashboardDto, ModelOrgDashboardDto } from "./dto/request/create-dashboard.dto";
import { UpdateDashboardDto } from "./dto/request/update-dashbard.dto";

@Injectable()
export class DashboardRepository {
    constructor(private readonly prismaService: PrismaService) { }

    createDepartmentDashboard(model: ModelDepartmentDashboardDto) {
        return this.prismaService.departmentdashboard.create({
            data: model,
        })
    }

    createOrganizationDashboard(model: ModelOrgDashboardDto) {
        return this.prismaService.organizationdashboard.create({
            data: model,
        })
    }

    createFacilityDashboard(model: ModelFacilityDashboardDto) {
        return this.prismaService.facilitydashboard.create({
            data: model,
        })
    }

    createDeviceDashboard(model: ModelDeviceDashboardDto) {
        return this.prismaService.devicedashboard.create({
            data: model,
        })
    }

    findDashboardByDepId(depId: number) {
        return this.prismaService.departmentdashboard.findFirst({
            where: {
                departmentid: depId
            }
        })
    }

    findDashboardByOrgId(orgId: number) {
        return this.prismaService.organizationdashboard.findFirst({
            where: {
                customerid: orgId,
            }
        })
    }

    findDashboardByDeviceId(deviceId: number) {
        return this.prismaService.devicedashboard.findFirst({
            where: {
                deviceid: deviceId,
            }
        })
    }

    findDashboardByFacilityId(facId: number) {
        return this.prismaService.facilitydashboard.findFirst({
            where: {
                facilityid: facId,
            }
        })
    }

    updateDepDashboard(id: number, body: UpdateDashboardDto) {
        return this.prismaService.departmentdashboard.update({
            where: {
                departmentdashboardid: id,
            },
            data: body,
        })
    }

    updateOrgDashboard(id: number, body: UpdateDashboardDto) {
        return this.prismaService.organizationdashboard.update({
            where: {
                orgdashboardid: id,
            },
            data: body,
        })
    }

    updateDeviceDashboard(id: number, body: UpdateDashboardDto) {
        return this.prismaService.devicedashboard.update({
            where: {
                devicedashboardid: id,
            },
            data: body,
        })
    }

    updateFacilityDashboard(id: number, body: UpdateDashboardDto) {
        return this.prismaService.facilitydashboard.update({
            where: {
                facilitydashboardid: id,
            },
            data: body,
        })
    }
}