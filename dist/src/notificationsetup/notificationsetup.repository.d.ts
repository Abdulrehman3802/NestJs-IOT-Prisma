import { PrismaService } from "src/prisma/prisma.service";
import { ModelCreateNotificationsetupDto } from "./dto/request/create-notificationsetup.dto";
export declare class NotificationsetupRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createNotificationSetup(models: ModelCreateNotificationsetupDto[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    GetNotificationSetupByOrgId(customerid: number): Promise<{
        notificationsetupid: number;
        email: string;
        phonenumber: string;
        text_to_speech: string;
        plain_email: string;
        customerid: number;
        userid: number;
        is_email: boolean;
        is_phone: boolean;
        is_text_to_speech: boolean;
        is_plain_email: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        created_by: number;
        updated_by: number;
    }[]>;
    GetSelectedNotificationSetupByOrgId(customerid: number): Promise<{
        notificationsetupid: number;
        email: string;
        phonenumber: string;
        text_to_speech: string;
        plain_email: string;
        customerid: number;
        userid: number;
        is_email: boolean;
        is_phone: boolean;
        is_text_to_speech: boolean;
        is_plain_email: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        created_by: number;
        updated_by: number;
    }[]>;
    findByCustomerIdsAndUserIds(customerId: number, userIds: number[]): Promise<{
        notificationsetupid: number;
        email: string;
        phonenumber: string;
        text_to_speech: string;
        plain_email: string;
        customerid: number;
        userid: number;
        is_email: boolean;
        is_phone: boolean;
        is_text_to_speech: boolean;
        is_plain_email: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        created_by: number;
        updated_by: number;
    }[]>;
    performBulkUpdate(updateOperations: {
        where: {
            notificationsetupid: number;
        };
        data: Partial<ModelCreateNotificationsetupDto>;
    }[]): Promise<{
        notificationsetupid: number;
        email: string;
        phonenumber: string;
        text_to_speech: string;
        plain_email: string;
        customerid: number;
        userid: number;
        is_email: boolean;
        is_phone: boolean;
        is_text_to_speech: boolean;
        is_plain_email: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        created_by: number;
        updated_by: number;
    }[]>;
}
