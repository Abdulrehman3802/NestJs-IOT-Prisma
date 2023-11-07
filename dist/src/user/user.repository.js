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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRepository = class UserRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createUser(model) {
        return this.prismaService.users.create({
            data: model
        });
    }
    async findUser(id) {
        return this.prismaService.users.findFirst({
            where: {
                userid: id,
                is_active: true
            }
        });
    }
    async findUserByEmail(email) {
        return this.prismaService.users.findFirst({
            where: {
                email: email,
                is_active: true,
                is_deleted: false
            }
        });
    }
    async findUserByToken(token) {
        return this.prismaService.users.findFirst({
            where: {
                resettoken: token,
                is_active: true
            }
        });
    }
    async findAllUser() {
        return this.prismaService.users.findMany({
            where: {
                is_deleted: false
            }
        });
    }
    async findAllFacilityAdmins() {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: true
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                facilities: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async findAllDepartmentAdmins() {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: true
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                departments: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async deleteUser(id) {
        return this.prismaService.users.delete({
            where: {
                userid: id
            }
        });
    }
    async updateUser(id, body) {
        return this.prismaService.users.update({
            where: {
                userid: id,
            },
            data: body,
        });
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map