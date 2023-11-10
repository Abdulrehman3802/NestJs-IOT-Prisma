import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {UpdateFacilityAdminDto, UpdateUserDto} from "./dto/request/update-user.dto";
import { ModelUserDto} from "./dto/request/create-user.dto";

@Injectable()
export class UserRepository{
    //#region Constructor
    constructor(private readonly prismaService:PrismaService) {
    }
    //#endregion

    //#region User 

    //#region User CRUD - C
    // Creation of user
    async createUser(model:ModelUserDto){
        return this.prismaService.users.create({
            data:model
        })
    }
    //#endregion

    //#region User CRUD - R
    // Find One user using id
    async findUser(id:number){
        return this.prismaService.users.findFirst({
            where:{
                userid:id,
                is_active:true
            }
        })
    }
    // find one user using his email
    async findUserByEmail(email:string){
        return this.prismaService.users.findFirst({
            where:{
                email:email,
                is_active:true,
                is_deleted:false
            }
        })
    }
    // find user by reset toke for resetting password
    async findUserByToken(token:string){
        return this.prismaService.users.findFirst({
            where:{
                resettoken:token,
                is_active:true
            }
        })
    }
    // find all users for super Admin
    async findAllUser(){
        return this.prismaService.users.findMany({
            where:{
                is_deleted:false
            }
        })
    }

    async findAllUserForStaff(){
        return this.prismaService.users.findMany({
            where:{
                is_deleted:false
            },
            include: {   
                userroles: {
                    include: {
                        roles: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
        })
    }
    //#endregion

    //#region User CRUD - U
    // Update user password , reset token etc.
    async updateUser(id:number,body:UpdateUserDto){
        return this.prismaService.users.update({
            where:{
                userid:id,
            },
            data:{
                ...body,
                date_updated: new Date()
            },

        })
    }
    //#endregion

    //#region User CRUD - D
    // For deleting user not use till
    async deleteUser(id:number){
        return this.prismaService.users.update({
            where:{
                userid:id
            }, data: {
                is_active: false,
                is_deleted: true
            }
        })
    }
    //#endregion

    //#endregion

    //#region Staff

    //#region Staff CRUD - R

    async findAllOrganizationStaff(){
        return this.prismaService.organizationusers.findMany()
    }

    async findAllFacilityAdmins(){
        return this.prismaService.facilityusers.findMany({
            where:{
                is_admin:true
            }, 
            include: {
                users: {
                    where: {
                      is_deleted: false,
                      is_active: true
                    }
                  },
                facilities: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        })
    }

    async findAllFacilityUsers(){
        return this.prismaService.facilityusers.findMany({
            where:{
                is_admin:false
            }, 
            include: {
                users: {
                    where: {
                      is_deleted: false,
                      is_active: true
                    }
                  },
                facilities: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        })
    }

    async findAllFacilityStaff(){
        return this.prismaService.facilityusers.findMany()
    }

    async findAllDepartmentAdmins(){
        return this.prismaService.departmentusers.findMany({
            where:{
                is_admin:true
            }, 
            include: {
                users: {
                    where: {
                      is_deleted: false,
                      is_active: true
                    }
                  },
                departments: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        })
    }

    async findAllDepartmentUsers(){
        return this.prismaService.departmentusers.findMany({
            where:{
                is_admin:false
            }, 
            include: {
                users: {
                    where: {
                      is_deleted: false,
                      is_active: true
                    }
                  },
                departments: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        })
    }

    async findAllDepartmentStaff(){
        return this.prismaService.departmentusers.findMany()
    }

    async findAllDeviceAdmins(){
        return this.prismaService.deviceusers.findMany({
            where:{
                is_admin:true
            }, 
            include: {
                users: {
                    where: {
                      is_deleted: false,
                      is_active: true
                    }
                  },
                devices: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        })
    }

    async findAllDeviceStaff(){
        return this.prismaService.deviceusers.findMany()
    }

    async findFacilityStaff(userid: number, facilityid: number) {      
        return this.prismaService.facilityusers.findFirstOrThrow({
            where: {
                userid: userid,
                facilityid: facilityid
            },
        });
    }

    async findDepartmentStaff(userid: number, departmentid: number) {
        return this.prismaService.departmentusers.findFirstOrThrow({
            where: {
                userid: userid,
                departmentid: departmentid,
            },
        });
    }

    async findDeviceStaff(userid: number, deviceid: number) {
        return this.prismaService.deviceusers.findFirstOrThrow({
            where: {
                userid: userid,
                deviceid: deviceid,
            },
        });
    }
    //#endregion

    // No use case right now
    //#region Staff CRUD - U
    async makeFacilityAdminOrUser(facilityuserid: number, is_admin: boolean){
        return this.prismaService.facilityusers.update({
            where: {
                facilityuserid: facilityuserid,
            },
            data: {
                is_admin: is_admin
            }
        });
    }
    //#endregion

    //#region Staff CRUD - D
    async unAssignStaffFromFacility(facilityuserid: number){
        return this.prismaService.facilityusers.delete({
            where: {
                facilityuserid: facilityuserid,
            },
        });
    }

    async unAssignStaffFromDepartment(departmentuserid: number){
        return this.prismaService.departmentusers.delete({
            where: {
                departmentuserid: departmentuserid,
            },
        });
    }

    async unAssignStaffFromDevice(deviceuserid: number){
        return this.prismaService.deviceusers.delete({
            where: {
                deviceuserid: deviceuserid,
            },
        });
    }
    //#endregion

    //#endregion
}