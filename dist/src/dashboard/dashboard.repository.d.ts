import { PrismaService } from "src/prisma/prisma.service";
import { ModelDepartmentDashboardDto, ModelDeviceDashboardDto, ModelFacilityDashboardDto, ModelOrgDashboardDto } from "./dto/request/create-dashboard.dto";
import { UpdateDashboardDto } from "./dto/request/update-dashbard.dto";
export declare class DashboardRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createDepartmentDashboard(model: ModelDepartmentDashboardDto): import(".prisma/client").Prisma.Prisma__departmentdashboardClient<{
        departmentdashboardid: number;
        departmentid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createOrganizationDashboard(model: ModelOrgDashboardDto): import(".prisma/client").Prisma.Prisma__organizationdashboardClient<{
        orgdashboardid: number;
        customerid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createFacilityDashboard(model: ModelFacilityDashboardDto): import(".prisma/client").Prisma.Prisma__facilitydashboardClient<{
        facilitydashboardid: number;
        facilityid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createDeviceDashboard(model: ModelDeviceDashboardDto): import(".prisma/client").Prisma.Prisma__devicedashboardClient<{
        devicedashboardid: number;
        deviceid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findDashboardByDepId(depId: number): import(".prisma/client").Prisma.Prisma__departmentdashboardClient<{
        departments: {
            facilities: {
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
                facilityid: number;
                name: string;
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
                longitude: number;
                latitude: number;
                facility_type: string;
                street: string;
                city: string;
                postcode: number;
                site_manager: string;
                timezone: string;
                currency: string;
            };
        } & {
            departmentid: number;
            departmentname: string;
            customerid: number;
            is_active: boolean;
            date_created: Date;
            date_updated: Date;
            is_deleted: boolean;
            facilityid: number;
            created_by: number;
            updated_by: number;
            email: string;
            description: string;
        };
    } & {
        departmentdashboardid: number;
        departmentid: number;
        isCard: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findDashboardByOrgId(orgId: number): import(".prisma/client").Prisma.Prisma__organizationdashboardClient<{
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
        orgdashboardid: number;
        customerid: number;
        isCard: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findDashboardByDeviceId(deviceId: number): import(".prisma/client").Prisma.Prisma__devicedashboardClient<{
        devices: {
            departments: {
                departmentid: number;
                departmentname: string;
                customerid: number;
                is_active: boolean;
                date_created: Date;
                date_updated: Date;
                is_deleted: boolean;
                facilityid: number;
                created_by: number;
                updated_by: number;
                email: string;
                description: string;
            };
        } & {
            deviceid: number;
            devicename: string;
            departmentid: number;
            devicetype: string;
            manufacturer: string;
            is_active: boolean;
            date_created: Date;
            date_updated: Date;
            is_deleted: boolean;
            facilityid: number;
            customerid: number;
            created_by: number;
            updated_by: number;
            email: string;
        };
    } & {
        devicedashboardid: number;
        deviceid: number;
        isCard: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findDashboardByFacilityId(facId: number): import(".prisma/client").Prisma.Prisma__facilitydashboardClient<{
        facilities: {
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
            facilityid: number;
            name: string;
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
            longitude: number;
            latitude: number;
            facility_type: string;
            street: string;
            city: string;
            postcode: number;
            site_manager: string;
            timezone: string;
            currency: string;
        };
    } & {
        facilitydashboardid: number;
        facilityid: number;
        isCard: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateDepDashboard(id: number, body: UpdateDashboardDto): import(".prisma/client").Prisma.Prisma__departmentdashboardClient<{
        departmentdashboardid: number;
        departmentid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateOrgDashboard(id: number, body: UpdateDashboardDto): import(".prisma/client").Prisma.Prisma__organizationdashboardClient<{
        orgdashboardid: number;
        customerid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateDeviceDashboard(id: number, body: UpdateDashboardDto): import(".prisma/client").Prisma.Prisma__devicedashboardClient<{
        devicedashboardid: number;
        deviceid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateFacilityDashboard(id: number, body: UpdateDashboardDto): import(".prisma/client").Prisma.Prisma__facilitydashboardClient<{
        facilitydashboardid: number;
        facilityid: number;
        isCard: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
