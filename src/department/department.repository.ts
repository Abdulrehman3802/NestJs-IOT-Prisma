import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ModelDepartmentDto } from "./dto/request/create-department.dto";
import { UpdateDepartmentDto } from "./dto/request/update-department.dto";
import {CreateDepartmentStaffModelDto, CreateDepartmentUserModelDto} from "./dto/request/create-department-user.dto";

@Injectable()
export class DepartmentRepository {
    constructor(private readonly prismaService: PrismaService) { }

    createDepartment(model: ModelDepartmentDto) {
        return this.prismaService.departments.create({
            data: model,
        })
    }

    createDepartmentUser(model:CreateDepartmentUserModelDto){
        return this.prismaService.departmentusers.create({
            data: model,
        })
    }

    createDepartmentStaff(model:CreateDepartmentStaffModelDto){
        return this.prismaService.departmentusers.create({
            data:model,
        })
    }

    findAllDepartments() {
        return this.prismaService.departments.findMany({
            where: {
                is_deleted: false,
            }
        })
    }

    findAllDepartmentsByOrganizationId(organizationId: number) {
        return this.prismaService.departments.findMany({
            where: {
                is_deleted: false,
                customerid: organizationId
            }
        })
    }

    findAllDepartmentsByFacilityId(facilityId: number) {
        return this.prismaService.departments.findMany({
            where: {
                is_deleted: false,
                facilityid: facilityId
            }
        })
    }

    findDepartmentByUserId(userId: number) {
        return this.prismaService.departmentusers.findFirst({
            where: {
                userid: userId,
            }
        })
    }

    findOneDepartment(id: number) {
        return this.prismaService.departments.findFirst({
            where: {
                departmentid: id,
            },
            include:{
                facilities:{
                    include:{
                        customers:true
                    }
                }
            }
        })
    }

    updateDepartment(id: number, body: UpdateDepartmentDto) {
        return this.prismaService.departments.update({
            where: {
                departmentid: id,
            },
            data: { ...body, date_updated: new Date() }
        })
    }

    deleteDepartment(id: number) {
        return this.prismaService.departments.update({
            where: {
                departmentid: id
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        })
    }

    async deleteDepartmentByOrganizationId(orgid: number) {
        return this.prismaService.departments.updateMany({
            where: {
                customerid: orgid
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        })
    }

    async deleteDepartmentByFacilityId(facilityid: number) {
        return this.prismaService.departments.updateMany({
            where: {
                facilityid: facilityid
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        })
    }
}