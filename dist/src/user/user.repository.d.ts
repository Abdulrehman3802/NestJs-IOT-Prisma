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
    findUserRoleRelation(userid: number): Promise<{
        userroleid: number;
        roleid: number;
        userid: number;
    }>;
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
    deleteUserRoleRelation(userroleid: number): Promise<{
        userroleid: number;
        roleid: number;
        userid: number;
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
    findAllFacilityStaffEmailPhoneUsingOrganizationId(customerid: number): Promise<({
        users: {
            email: string;
            userid: number;
            firstname: string;
            lastname: string;
            phonenumber: string;
        };
    } & {
        facilityuserid: number;
        facilityid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
    findAllFacilityAdminsUsingOrganizationId(customerid: number): Promise<({
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
    findAllFacilityAdminsUsingFacilityId(facilityid: number): Promise<({
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
    findAllFacilityUsersByOrganizationId(customerid: number): Promise<({
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
    findAllFacilityUsersByFacilityId(facilityid: number): Promise<({
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
    findAllDepartmentStaffEmailPhoneByOrganizationId(customerid: number): Promise<({
        users: {
            email: string;
            userid: number;
            firstname: string;
            lastname: string;
            phonenumber: string;
        };
    } & {
        departmentuserid: number;
        departmentid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
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
    findAllDepartmentAdminsByOrganizationId(customerid: number): Promise<({
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
    findAllDepartmentAdminsByFacilityId(facilityid: number): Promise<({
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
    findAllDepartmentAdminsByDepartmentId(departmentid: number): Promise<({
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
    findAllDepartmentUsersByOrganizationId(customerid: number): Promise<({
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
    findAllDepartmentUsersByFacilityId(facilityid: number): Promise<({
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
    findAllDepartmentUsersByDepartmentId(departmentid: number): Promise<({
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
    findAllDeviceStaffEmailPhoneByOrganizationId(customerid: number): Promise<({
        users: {
            email: string;
            userid: number;
            firstname: string;
            lastname: string;
            phonenumber: string;
        };
    } & {
        deviceuserid: number;
        deviceid: number;
        userid: number;
        is_admin: boolean;
    })[]>;
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
            delaytime: number;
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
    findAllDeviceAdminsByOrganizationId(customerid: number): Promise<({
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
            delaytime: number;
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
    findAllDeviceAdminsByFacilityId(facilityid: number): Promise<({
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
            delaytime: number;
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
    findAllDeviceAdminsByDepartmentId(departmentid: number): Promise<({
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
            delaytime: number;
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
