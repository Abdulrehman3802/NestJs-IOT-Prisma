export class ResponseUserDto{
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

export class ResponseUnAssignedUserStaffDto{
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

export class ResponseAdminDto{
    userid: number;
    is_admin: boolean
    users: userResponse;
}

export class userResponse {
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