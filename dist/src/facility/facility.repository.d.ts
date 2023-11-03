import { PrismaService } from "src/prisma/prisma.service";
import { ModelFacilityDto } from "./dto/request/create-facility.dto";
import { UpdateFacilityDto } from "./dto/request/update-facility.dto";
import { CreateFacilityUserModelDto } from "./dto/request/create-facility-user.dto";
export declare class FacilityRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createFacility(model: ModelFacilityDto): import(".prisma/client").Prisma.Prisma__facilitiesClient<{
        facilityid: number;
        name: string;
        location: string;
        address: string;
        contactname: string;
        contactphonenumber: string;
        email: string;
        isfacilityadmin: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        customerid: number;
        created_by: number;
        updated_by: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createFacilityUser(model: CreateFacilityUserModelDto): import(".prisma/client").Prisma.Prisma__facilityusersClient<{
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllFacilities(): import(".prisma/client").Prisma.PrismaPromise<{
        facilityid: number;
        name: string;
        location: string;
        address: string;
        contactname: string;
        contactphonenumber: string;
        email: string;
        isfacilityadmin: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        customerid: number;
        created_by: number;
        updated_by: number;
    }[]>;
    findAllFacilitiesOfOrgAdmin(orgId: number): import(".prisma/client").Prisma.PrismaPromise<{
        facilityid: number;
        name: string;
        location: string;
        address: string;
        contactname: string;
        contactphonenumber: string;
        email: string;
        isfacilityadmin: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        customerid: number;
        created_by: number;
        updated_by: number;
    }[]>;
    findFacilityByUserId(userId: number): import(".prisma/client").Prisma.Prisma__facilityusersClient<{
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneFacility(id: number): import(".prisma/client").Prisma.Prisma__facilitiesClient<{
        facilityid: number;
        name: string;
        location: string;
        address: string;
        contactname: string;
        contactphonenumber: string;
        email: string;
        isfacilityadmin: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        customerid: number;
        created_by: number;
        updated_by: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateFacility(id: number, body: UpdateFacilityDto): import(".prisma/client").Prisma.Prisma__facilitiesClient<{
        facilityid: number;
        name: string;
        location: string;
        address: string;
        contactname: string;
        contactphonenumber: string;
        email: string;
        isfacilityadmin: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        customerid: number;
        created_by: number;
        updated_by: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteFacility(id: number): import(".prisma/client").Prisma.Prisma__facilitiesClient<{
        facilityid: number;
        name: string;
        location: string;
        address: string;
        contactname: string;
        contactphonenumber: string;
        email: string;
        isfacilityadmin: boolean;
        is_active: boolean;
        is_deleted: boolean;
        date_created: Date;
        date_updated: Date;
        customerid: number;
        created_by: number;
        updated_by: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}