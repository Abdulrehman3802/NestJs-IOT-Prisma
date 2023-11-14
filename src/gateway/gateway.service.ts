import {HttpStatus, Injectable, NotImplementedException} from '@nestjs/common';
import { CreateGatewayDto } from './dto/request/create-gateway.dto';
import { UpdateGatewayDto } from './dto/request/update-gateway.dto';
import {GatewayRepository} from "./gateway.repository";
import {ApiResponseDto, Token} from "../../core/generics/api-response.dto";
import {GatewayResponseDto} from "./dto/response/gateway-response.dto";
import {errorContext} from "rxjs/internal/util/errorContext";

@Injectable()
export class GatewayService {
  constructor(private readonly gateWayRepository: GatewayRepository){
  }
  async assignGateway(token:Token,createGatewayDto: CreateGatewayDto) {
    try{
      const model = {
        ...createGatewayDto,
        is_active:true,
        date_created:new Date(),
        date_updated:new Date(),
        is_deleted:false,
        created_by:token.id,
        updated_by:token.id,
      }
      const gateway = await this.gateWayRepository.assignGateway(model)
      if(!gateway){
        throw new NotImplementedException("Cannot assign gateway")
      }
      const response: ApiResponseDto<GatewayResponseDto> = {
        statusCode: HttpStatus.OK,
        message: "Gateway Assigned Successfully",
        data: gateway,
        error: false
      }
      return response
    }catch(error){
throw error
    }
  }

  async findAllGatewayOfOrg(id:number) {
    try{
      const gateways = await this.gateWayRepository.findAllGatewayOfOrg(id)
      const response: ApiResponseDto<GatewayResponseDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Gateways Found Successfully",
        data: gateways,
        error: false
      }
      return response
    }catch(error){
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gateway`;
  }

 async updateGateway(id: number, updateGatewayDto: UpdateGatewayDto) {
    try{
      const gateway = await this.gateWayRepository.updateGateway(id, updateGatewayDto)
      if(!gateway){
        throw new NotImplementedException("cannot update gateway")
      }
      const response: ApiResponseDto<GatewayResponseDto> = {
        statusCode: HttpStatus.OK,
        message: "Gateway Updated Successfully",
        data: gateway,
        error: false
      }
      return response
    }catch (error) {
      throw error
    }
  }

  async deleteGateway(id: number) {
    try{
      const gateway = await this.gateWayRepository.deleteGateway(id)
      if(!gateway){
        throw new NotImplementedException("Cannot Delete Gateway")
      }
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Gateway Deleted Successfully",
        data: null,
        error: false
      }
      return response
    }catch (error) {
      throw error
    }
  }
}
