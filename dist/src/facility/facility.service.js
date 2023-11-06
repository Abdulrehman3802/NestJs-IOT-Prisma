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
exports.FacilityService = void 0;
const common_1 = require("@nestjs/common");
const facility_repository_1 = require("./facility.repository");
const roles_service_1 = require("../roles/roles.service");
const user_service_1 = require("../user/user.service");
const create_user_dto_1 = require("../user/dto/request/create-user.dto");
let FacilityService = class FacilityService {
    constructor(facilityRepository, userService, roleService) {
        this.facilityRepository = facilityRepository;
        this.userService = userService;
        this.roleService = roleService;
    }
    async create(createFacilityDto, token) {
        try {
            const { id, customerId, rolename } = token;
            let facilityModel;
            const orgId = createFacilityDto.customerid;
            if (rolename == 'SuperAdmin') {
                if (!orgId)
                    throw new common_1.NotAcceptableException("customerid cannot be empty");
                facilityModel = Object.assign(Object.assign({}, createFacilityDto), { is_active: true, is_deleted: false, date_created: new Date(), date_updated: new Date(), created_by: id, updated_by: id });
            }
            if (rolename == 'OrganizationAdmin') {
                facilityModel = Object.assign(Object.assign({}, createFacilityDto), { customerid: customerId, is_active: true, is_deleted: false, date_created: new Date(), date_updated: new Date(), created_by: id, updated_by: id });
            }
            const facility = await this.facilityRepository.createFacility(facilityModel);
            const userDto = new create_user_dto_1.CreateUserDto();
            userDto.email = facility.email;
            const user = await this.userService.create(userDto);
            const facilityAdminId = await this.roleService.findRoleByName('FacilityAdmin');
            await this.roleService.createUserRole({ userid: user.data.userid, roleid: facilityAdminId.roleid });
            await this.facilityRepository.createFacilityUser({ userid: user.data.userid, facilityid: facility.facilityid });
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: "Facility Created Successfully!",
                data: facility,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(decodedtoken) {
        try {
            const { rolename, customerId } = decodedtoken;
            let facilities;
            if (rolename === 'OrganizationAdmin') {
                facilities = await this.facilityRepository.findAllFacilitiesOfOrgAdmin(customerId);
            }
            else {
                facilities = await this.facilityRepository.findAllFacilities();
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facilities Found Successfully!",
                data: facilities,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const facility = await this.facilityRepository.findOneFacility(id);
            if (!facility) {
                throw new common_1.NotFoundException(`Facility Not Found with id: ${id}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Found Successfully!",
                data: facility,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateFacilityDto) {
        try {
            const updatedFacility = await this.facilityRepository.updateFacility(id, updateFacilityDto);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Updated Successfully!",
                data: updatedFacility,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const facility = await this.facilityRepository.deleteFacility(id);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllFacilities(orgId) {
        try {
            const allFacilities = await this.facilityRepository.findAllFacilitiesOfOrgAdmin(orgId);
            if (allFacilities.length == 0) {
                throw new common_1.NotFoundException(`Facilities Not Found that are assigned to organization with id ${orgId}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facilities Found Associated to Organization",
                data: allFacilities,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
FacilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [facility_repository_1.FacilityRepository,
        user_service_1.UserService,
        roles_service_1.RolesService])
], FacilityService);
exports.FacilityService = FacilityService;
//# sourceMappingURL=facility.service.js.map