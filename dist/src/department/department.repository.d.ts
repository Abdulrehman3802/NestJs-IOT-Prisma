import { PrismaService } from "src/prisma/prisma.service";
import { ModelDepartmentDto } from "./dto/request/create-department.dto";
import { UpdateDepartmentDto } from "./dto/request/update-department.dto";
import { CreateDepartmentUserModelDto } from "./dto/request/create-department-user.dto";
export declare class DepartmentRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createDepartment(model: ModelDepartmentDto): import(".prisma/client").Prisma.Prisma__departmentsClient<{
        departmentid: number;
        departmentname: string;
        customerid: number;
        location: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createDepartmentUserDto(model: CreateDepartmentUserModelDto): import(".prisma/client").Prisma.Prisma__departmentusersClient<{
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllDepartments(): import(".prisma/client").Prisma.PrismaPromise<{
        departmentid: number;
        departmentname: string;
        customerid: number;
        location: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findAllDepartmentsByOrganizationId(organizationId: number): import(".prisma/client").Prisma.PrismaPromise<{
        departmentid: number;
        departmentname: string;
        customerid: number;
        location: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findAllDepartmentsByFacilityId(facilityId: number): import(".prisma/client").Prisma.PrismaPromise<{
        departmentid: number;
        departmentname: string;
        customerid: number;
        location: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findDepartmentByUserId(userId: number): import(".prisma/client").Prisma.Prisma__departmentusersClient<{
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneDepartment(id: number): import(".prisma/client").Prisma.Prisma__departmentsClient<{
        departmentid: number;
        departmentname: string;
        customerid: number;
        location: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateDepartment(id: number, body: UpdateDepartmentDto): import(".prisma/client").Prisma.Prisma__departmentsClient<{
        departmentid: number;
        departmentname: string;
        customerid: number;
        location: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteDepartment(id: number): import(".prisma/client").Prisma.Prisma__departmentsClient<{
        departmentid: number;
        departmentname: string;
        customerid: number;
        location: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
