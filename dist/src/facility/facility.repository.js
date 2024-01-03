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
exports.FacilityRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FacilityRepository = class FacilityRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createFacility(model) {
        return this.prismaService.facilities.create({
            data: model,
        });
    }
    createFacilityUser(model) {
        return this.prismaService.facilityusers.create({
            data: model,
        });
    }
    createFacilityAdmin(model) {
        return this.prismaService.facilityusers.create({
            data: model,
        });
    }
    findAllFacilities() {
        return this.prismaService.facilities.findMany({
            where: {
                is_deleted: false,
            }
        });
    }
    findAllFacilitiesOfOrgAdmin(orgId) {
        return this.prismaService.facilities.findMany({
            where: {
                is_active: true,
                is_deleted: false,
                customerid: orgId
            }
        });
    }
    findFacilityByUserId(userId) {
        return this.prismaService.facilityusers.findFirst({
            where: {
                userid: userId,
            }
        });
    }
    findOneFacility(id) {
        return this.prismaService.facilities.findFirst({
            where: {
                facilityid: id,
            },
            include: {
                customers: true
            }
        });
    }
    updateFacility(id, body) {
        return this.prismaService.facilities.update({
            where: {
                facilityid: id,
            },
            data: Object.assign(Object.assign({}, body), { date_updated: new Date() }),
        });
    }
    async deleteFacility(id) {
        return this.prismaService.facilities.update({
            where: {
                facilityid: id,
            },
            data: {
                is_active: false,
                is_deleted: true
            }
        });
    }
    async deleteFacilityByOrganizationId(orgid) {
        return this.prismaService.facilities.updateMany({
            where: {
                customerid: orgid,
            },
            data: {
                is_active: false,
                is_deleted: true
            }
        });
    }
};
FacilityRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FacilityRepository);
exports.FacilityRepository = FacilityRepository;
//# sourceMappingURL=facility.repository.js.map