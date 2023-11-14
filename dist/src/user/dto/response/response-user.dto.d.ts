export declare class ResponseUserDto {
    userid: number;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    passwordhash: string;
    phonenumber: string;
    createdby: number;
    updatedby: number;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
}
export declare class ResponseUnAssignedUserStaffDto {
    userid: number;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    passwordhash: string;
    phonenumber: string;
    createdby: number;
    updatedby: number;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    rolename: string;
    roleid: number;
}
export declare class ResponseAdminDto {
    userid: number;
    is_admin: boolean;
    users: userResponse;
}
export declare class userResponse {
    userid: number;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    passwordhash: string;
    phonenumber: string;
    createdby: number;
    updatedby: number;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
}
export declare class OrganizationAllStaffEmailPhoneResponse {
    userid: number;
    name: string;
    email: string;
    phonenumber: string;
}
