export declare class CreateNotificationsetupDto {
    email: string;
    plain_email: string;
    phonenumber: string;
    text_to_speech: string;
    userid: number;
}
export declare class ModelCreateNotificationsetupDto {
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
}
export declare class FindQueryForUsers {
    type: string;
}
