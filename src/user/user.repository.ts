import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {UpdateUserDto} from "./dto/request/update-user.dto";
import { ModelUserDto} from "./dto/request/create-user.dto";

@Injectable()
export class UserRepository{
    constructor(private readonly prismaService:PrismaService) {
    }
    // Creation of user
    async createUser(model:ModelUserDto){
        return this.prismaService.users.create({
            data:model
        })
    }
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
                  }
            }
        })
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
                  }
            }
        })
    }

// For deleting user not use till
    async deleteUser(id:number){
        return this.prismaService.users.delete({
            where:{
                userid:id
            }
        })
    }
// Update user password , reset token etc.
    async updateUser(id:number,body:UpdateUserDto){
        return this.prismaService.users.update({
            where:{
                userid:id,
            },
            data:body,

        })
    }
}