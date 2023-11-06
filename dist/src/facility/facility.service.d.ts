import { FacilityRepository } from './facility.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateFacilityDto } from './dto/request/create-facility.dto';
import { UpdateFacilityDto } from './dto/request/update-facility.dto';
import { ResponseFacilityDto } from './dto/response/response-facility.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from "../user/user.service";
export declare class FacilityService {
    private readonly facilityRepository;
    private readonly userService;
    private readonly roleService;
    constructor(facilityRepository: FacilityRepository, userService: UserService, roleService: RolesService);
    create(createFacilityDto: CreateFacilityDto, token: Token): Promise<ApiResponseDto<ResponseFacilityDto>>;
    findAll(decodedtoken: Token): Promise<ApiResponseDto<ResponseFacilityDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseFacilityDto>>;
    update(id: number, updateFacilityDto: UpdateFacilityDto): Promise<ApiResponseDto<ResponseFacilityDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
    findAllFacilities(orgId: number): Promise<ApiResponseDto<ResponseFacilityDto[]>>;
}
