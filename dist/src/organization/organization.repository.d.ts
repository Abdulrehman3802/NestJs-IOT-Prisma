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
        street: string;
        postcode: number;
        credit: number;
        calibration_date: Date;
        logo: string;
        interval1: number;
        interval2: number;
        interval3: number;
        interval4: number;
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
        street: string;
        postcode: number;
        credit: number;
        calibration_date: Date;
        logo: string;
        interval1: number;
        interval2: number;
        interval3: number;
        interval4: number;
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
        street: string;
        postcode: number;
        credit: number;
        calibration_date: Date;
        logo: string;
        interval1: number;
        interval2: number;
        interval3: number;
        interval4: number;
    }>;
    findOrganizationByUserId(userId: number): Promise<{
        customers: {
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
            street: string;
            postcode: number;
            credit: number;
            calibration_date: Date;
            logo: string;
            interval1: number;
            interval2: number;
            interval3: number;
            interval4: number;
        };
    } & {
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
        street: string;
        postcode: number;
        credit: number;
        calibration_date: Date;
        logo: string;
        interval1: number;
        interval2: number;
        interval3: number;
        interval4: number;
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
        street: string;
        postcode: number;
        credit: number;
        calibration_date: Date;
        logo: string;
        interval1: number;
        interval2: number;
        interval3: number;
        interval4: number;
    }>;
    getOrganizationCredit(orgId: number): Promise<{
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
        street: string;
        postcode: number;
        credit: number;
        calibration_date: Date;
        logo: string;
        interval1: number;
        interval2: number;
        interval3: number;
        interval4: number;
    }>;
}