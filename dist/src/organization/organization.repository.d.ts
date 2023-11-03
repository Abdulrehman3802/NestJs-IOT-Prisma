import { PrismaService } from 'src/prisma/prisma.service';
import { ModelOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import { OrganizationUserModelDto } from "./dto/request/create-organization-user.dto";
export declare class OrganizationRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createOrganization(model: ModelOrganizationDto): Promise<{
        customerid: number;
        customername: string;
        contactperson: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
    }>;
    createOrganizationUser(model: OrganizationUserModelDto): Promise<{
        organizationuserid: number;
        customerid: number;
        userid: number;
        is_admin: boolean;
    }>;
    findAllOrganization(): Promise<{
        customerid: number;
        customername: string;
        contactperson: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
    }[]>;
    findOrganization(orgId: number): Promise<{
        customerid: number;
        customername: string;
        contactperson: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
    }>;
    findOrganizationByUserId(userId: number): Promise<{
        organizationuserid: number;
        customerid: number;
        userid: number;
        is_admin: boolean;
    }>;
    updateOrganization(orgId: number, body: UpdateOrganizationDto): Promise<{
        customerid: number;
        customername: string;
        contactperson: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
    }>;
    deleteOrganization(orgId: number): Promise<{
        customerid: number;
        customername: string;
        contactperson: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
    }>;
}
