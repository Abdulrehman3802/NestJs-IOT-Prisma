import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./dto/request/update-user.dto";
import { ModelUserDto } from "./dto/request/create-user.dto";
export declare class UserRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(model: ModelUserDto): Promise<{
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
        resettoken: string;
    }>;
    findUser(id: number): Promise<{
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
        resettoken: string;
    }>;
    findUserByEmail(email: string): Promise<{
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
        resettoken: string;
    }>;
    findUserByToken(token: string): Promise<{
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
        resettoken: string;
    }>;
    findAllUser(): Promise<{
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
        resettoken: string;
    }[]>;
    findAllUserForStaff(): Promise<({
        userroles: ({
            roles: {
                name: string;
            };
        } & {
            userroleid: number;
            roleid: number;
            userid: number;
        })[];
    } & {
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
        resettoken: string;
    })[]>;
    updateUser(id: number, body: UpdateUserDto): Promise<{
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
        resettoken: string;
    }>;
    deleteUser(id: number): Promise<{
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
        resettoken: string;
    }>;
    findAllOrganizationStaff(): Promise<{
        organizationuserid: number;
        customerid: number;
        userid: number;
        is_admin: boolean;
    }[]>;
    findAllFacilityAdmins(): Promise<({
        facilities: {
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
            facility_type: string;
            street: string;
            city: string;
            postcode: number;
            site_manager: string;
            longitude: number;
            latitude: number;
            timezone: string;
            currency: string;
        };
        users: {
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
            resettoken: string;
        };
    } & {
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
    findAllFacilityUsers(): Promise<({
        facilities: {
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
            facility_type: string;
            street: string;
            city: string;
            postcode: number;
            site_manager: string;
            longitude: number;
            latitude: number;
            timezone: string;
            currency: string;
        };
        users: {
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
            resettoken: string;
        };
    } & {
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
    findAllFacilityStaff(): Promise<{
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    }[]>;
    findAllDepartmentAdmins(): Promise<({
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
        users: {
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
            resettoken: string;
        };
    } & {
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
    findAllDepartmentUsers(): Promise<({
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
        users: {
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
            resettoken: string;
        };
    } & {
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
    findAllDepartmentStaff(): Promise<{
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    }[]>;
    findAllDeviceAdmins(): Promise<({
        devices: {
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
        users: {
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
            resettoken: string;
        };
    } & {
        deviceuserid: number;
        deviceid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
    findAllDeviceStaff(): Promise<{
        deviceuserid: number;
        deviceid: number;
        userid: number;
        is_admin: boolean;
    }[]>;
    findFacilityStaff(userid: number, facilityid: number): Promise<{
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    }>;
    findDepartmentStaff(userid: number, departmentid: number): Promise<{
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    }>;
    findDeviceStaff(userid: number, deviceid: number): Promise<{
        deviceuserid: number;
        deviceid: number;
        userid: number;
        is_admin: boolean;
    }>;
    makeFacilityAdminOrUser(facilityuserid: number, is_admin: boolean): Promise<{
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    }>;
    unAssignStaffFromFacility(facilityuserid: number): Promise<{
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    }>;
    unAssignStaffFromDepartment(departmentuserid: number): Promise<{
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    }>;
    unAssignStaffFromDevice(deviceuserid: number): Promise<{
        deviceuserid: number;
        deviceid: number;
        userid: number;
        is_admin: boolean;
    }>;
}
