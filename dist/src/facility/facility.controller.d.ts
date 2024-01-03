import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/request/create-facility.dto';
import { UpdateFacilityDto } from './dto/request/update-facility.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
export declare class FacilityController {
    private readonly facilityService;
    constructor(facilityService: FacilityService);
    create(createFacilityDto: CreateFacilityDto, req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-facility.dto").ResponseFacilityDto>>;
    findAll(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-facility.dto").ResponseFacilityDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-facility.dto").ResponseFacilityDto>>;
    finAllFacilitiesByOrgId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-facility.dto").ResponseFacilityDto[]>>;
    update(id: string, updateFacilityDto: UpdateFacilityDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-facility.dto").ResponseFacilityDto>>;
    remove(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
}
