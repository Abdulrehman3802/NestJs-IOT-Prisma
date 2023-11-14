import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/request/create-gateway.dto';
import { UpdateGatewayDto } from './dto/request/update-gateway.dto';
import {JwtAuthGuard, RequestWithUser} from "../../core/generics/Guards/PermissionAuthGuard";
import {Permission} from "../../core/generics/Guards/PermissionDecorator";
// import {Category, PermissionType} from "../../core/generics/Enums/GeneralEnums";
@UseGuards(JwtAuthGuard)
@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}
  // @Permission(Category.FACILITY, PermissionType.CREATE)
  @Post('/assign-to-organization')
  assignGateway(@Req()req:RequestWithUser,@Body() createGatewayDto: CreateGatewayDto) {
    const token = req.token
    return this.gatewayService.assignGateway(token,createGatewayDto);
  }

  @Get('/get-all-gateways/:id')
  findAll(@Param('id') id: string) {
    return this.gatewayService.findAllGatewayOfOrg(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatewayService.findOne(+id);
  }

  @Patch('/update-gateway/:id')
  updateGateway(@Param('id') id: string, @Body() updateGatewayDto: UpdateGatewayDto) {
    return this.gatewayService.updateGateway(+id, updateGatewayDto);
  }

  @Delete('/delete-gateway/:id')
  remove(@Param('id') id: string) {
    return this.gatewayService.deleteGateway(+id);
  }
}
