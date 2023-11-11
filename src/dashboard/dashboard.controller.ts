import {Controller, Post, Body, Req, UseGuards, Get} from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { CreateDashboardDto, FindDashboardDto } from "./dto/request/create-dashboard.dto";
import { JwtAuthGuard, RequestWithUser } from "core/generics/Guards/PermissionAuthGuard";

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Post('create')
    create(
        @Body() createDashboardDto: CreateDashboardDto,

    ) {

        return this.dashboardService.createDashboard(createDashboardDto);
    }

        @Post("find")
    find(
        @Req() req: RequestWithUser,
        @Body() findDashboardDto: FindDashboardDto,
    ) {
        const token = req.token;
        return this.dashboardService.findDashboard(findDashboardDto, token);
    }

}
