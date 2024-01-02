import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { AwsService } from './aws.service';
import { UpdateAwsDto } from './dto/Request/update-aw.dto';
import {JwtAuthGuard} from "../../core/generics/Guards/PermissionAuthGuard";
@UseGuards(JwtAuthGuard)
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Get('/get-sensors')
  getSensors() {
    return this.awsService.getSensors();
  }
  @Post('/save-sensor-data')
  saveAWSData() {
    return this.awsService.saveAWSData();
  }

  @Get('/get-all-aws-sensors')
  findAll() {
    return this.awsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAwDto: UpdateAwsDto) {
    return this.awsService.update(+id, updateAwDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awsService.remove(+id);
  }
}
