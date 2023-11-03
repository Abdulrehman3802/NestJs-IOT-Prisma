import { HttpStatus } from '@nestjs/common';

export interface ApiResponseDto<T> {
    statusCode: HttpStatus;
    message: string;
    data: T;
    error: boolean;
}

export class Token {
    id:number;
    customerId: number;
    facilityId:number;
    departmentId: number;
    rolename: string;
}
