export class CreateDepartmentUserModelDto{
    userid: number;
    departmentid: number;
}

export class CreateDepartmentAdminModelDto{
    userid: number;
    departmentid: number;
    is_admin: boolean;
}