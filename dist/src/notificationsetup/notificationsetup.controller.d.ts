import { NotificationsetupService } from './notificationsetup.service';
import { CreateNotificationsetupDto, FindQueryForUsers } from './dto/request/create-notificationsetup.dto';
import { UpdateNotificationsetupDto } from './dto/request/update-notificationsetup.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
export declare class NotificationsetupController {
    private readonly notificationsetupService;
    constructor(notificationsetupService: NotificationsetupService);
    create(req: RequestWithUser, customerid: string, createNotificationsetupDtos: CreateNotificationsetupDto[]): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
    findAllUsers(query: FindQueryForUsers, id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/notificationsetup.users.response.dto").ResponseNotificationSetupUsersDto[]>>;
    findAll(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/notificationsetup.users.response.dto").ResponseNotificationSetupDto[]>>;
    update(id: string, updateNotificationsetupDto: UpdateNotificationsetupDto): string;
    remove(id: string): string;
}
