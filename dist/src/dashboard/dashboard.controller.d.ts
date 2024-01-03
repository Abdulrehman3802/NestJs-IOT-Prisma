import { DashboardService } from "./dashboard.service";
import { CreateDashboardDto, FindDashboardDto } from "./dto/request/create-dashboard.dto";
import { RequestWithUser } from "core/generics/Guards/PermissionAuthGuard";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    create(createDashboardDto: CreateDashboardDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<any>>;
    find(req: RequestWithUser, findDashboardDto: FindDashboardDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<any>>;
}
