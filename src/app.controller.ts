import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {Request} from "express";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('general')
  GetGeneralData(@Req() request: Request) {
    return this.appService.GetGeneralData(request);
  }
}
