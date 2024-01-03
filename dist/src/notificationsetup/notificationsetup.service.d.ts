import { CreateNotificationsetupDto, FindQueryForUsers } from './dto/request/create-notificationsetup.dto';
import { UpdateNotificationsetupDto } from './dto/request/update-notificationsetup.dto';
import { NotificationsetupRepository } from './notificationsetup.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { UserService } from 'src/user/user.service';
import { ResponseNotificationSetupDto, ResponseNotificationSetupUsersDto } from './dto/response/notificationsetup.users.response.dto';
export declare class NotificationsetupService {
    private readonly notificationsetupRepository;
    private readonly userService;
    constructor(notificationsetupRepository: NotificationsetupRepository, userService: UserService);
    createOrUpdate(createNotificationsetupDtos: CreateNotificationsetupDto[], token: Token, customerid: number): Promise<ApiResponseDto<null>>;
    findAll(id: number): Promise<ApiResponseDto<ResponseNotificationSetupDto[]>>;
    findUsersForNotificationSetupByOrganizationId(id: number, query: FindQueryForUsers): Promise<ApiResponseDto<ResponseNotificationSetupUsersDto[]>>;
    update(id: number, updateNotificationsetupDto: UpdateNotificationsetupDto): string;
    remove(id: number): string;
}
