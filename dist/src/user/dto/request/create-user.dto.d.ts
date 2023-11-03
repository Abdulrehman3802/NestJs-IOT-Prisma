export declare class CreateUserDto {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    passwordhash: string;
    phonenumber: string;
    resettoken: string;
}
export declare class ModelUserDto {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    passwordhash: string;
    phonenumber: string;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
}
