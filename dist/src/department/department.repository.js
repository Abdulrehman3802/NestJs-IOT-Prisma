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
exports.DepartmentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DepartmentRepository = class DepartmentRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createDepartment(model) {
        return this.prismaService.departments.create({
            data: model,
        });
    }
    createDepartmentUserDto(model) {
        return this.prismaService.departmentusers.create({
            data: model,
        });
    }
    findAllDepartments() {
        return this.prismaService.departments.findMany({
            where: {
                is_deleted: false,
            }
        });
    }
    findAllDepartmentsByOrganizationId(organizationId) {
        return this.prismaService.departments.findMany({
            where: {
                is_deleted: false,
                customerid: organizationId
            }
        });
    }
    findAllDepartmentsByFacilityId(facilityId) {
        return this.prismaService.departments.findMany({
            where: {
                is_deleted: false,
                facilityid: facilityId
            }
        });
    }
    findDepartmentByUserId(userId) {
        return this.prismaService.departmentusers.findFirst({
            where: {
                userid: userId,
            }
        });
    }
    findOneDepartment(id) {
        return this.prismaService.departments.findFirst({
            where: {
                departmentid: id,
            }
        });
    }
    updateDepartment(id, body) {
        return this.prismaService.departments.update({
            where: {
                departmentid: id,
            },
            data: Object.assign(Object.assign({}, body), { date_updated: new Date() })
        });
    }
    deleteDepartment(id) {
        return this.prismaService.departments.update({
            where: {
                departmentid: id
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        });
    }
};
DepartmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentRepository);
exports.DepartmentRepository = DepartmentRepository;
//# sourceMappingURL=department.repository.js.map