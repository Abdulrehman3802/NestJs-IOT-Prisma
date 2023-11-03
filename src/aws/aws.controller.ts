import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AwsService } from './aws.service';
import { CreateAwsDto } from './dto/create-aw.dto';
import { UpdateAwsDto } from './dto/update-aw.dto';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Get('/get-sensors')
  getSensors() {
    return this.awsService.getSensors();
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
