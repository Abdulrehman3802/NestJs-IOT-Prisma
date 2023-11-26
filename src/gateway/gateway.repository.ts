import {Injectable} from "@nestjs/common";
import {CreateGatewayDto, GatewayModelDto} from "./dto/request/create-gateway.dto";
import {UpdateGatewayDto} from "./dto/request/update-gateway.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class GatewayRepository{
    constructor(private readonly prismaService:PrismaService) {
    }
    async assignGateway(model: GatewayModelDto) {
       return this.prismaService.gateways.create({
           data:model
       })
    }

    findAllGatewayOfOrg(id:number) {
        return this.prismaService.gateways.findMany({
            where:{
                customerid:id,
                is_active:true,
                is_deleted: false
            }
        })
    }

    findAllGateways(){
        return this.prismaService.gateways.findMany({
            where:{
                is_deleted:false,
                is_active:true
            }
        })
    }
    findOne(id: number) {
        return `This action returns a #${id} gateway`;
    }

    updateGateway(id: number, updateGatewayDto: UpdateGatewayDto) {
        return this.prismaService.gateways.update({
            where:{
                gatewayid:id,
            },
            data:updateGatewayDto
        });
    }

    deleteGateway(id: number) {
        return this.prismaService.gateways.update({
            where:{
                gatewayid:id,
            },
            data:{
                is_deleted:true,
                is_active:false
            }
        })
    }
}