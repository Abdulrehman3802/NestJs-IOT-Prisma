export class ResponseNotificationSetupUsersDto {
    userid: number;
    name: string;
    email: string;
    phonenumber: string;
    is_email: boolean;
    is_phone: boolean;
}

export class ResponseNotificationSetupDto {
            notificationsetupid: number;
            email: string;
            phonenumber: string;
            text_to_speech: string;
            plain_email: string;
            customerid: number
            userid: number
            is_email: boolean;
            is_phone: boolean;
            is_text_to_speech: boolean;
            is_plain_email: boolean;
            is_active: boolean;
            is_deleted: boolean;
            date_created: Date;
            date_updated: Date;
            created_by: number
            updated_by: number
}