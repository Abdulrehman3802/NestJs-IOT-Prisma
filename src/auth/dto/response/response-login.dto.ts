export class ResponseDto{
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
export class ResponseLoginDto extends ResponseDto{
    accessToken:string
    organizationName: string;
    organizationLogo:string
    organizatoinId:number
}