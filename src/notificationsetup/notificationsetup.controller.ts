import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { NotificationsetupService } from './notificationsetup.service';
import { CreateNotificationsetupDto, FindQueryForUsers } from './dto/request/create-notificationsetup.dto';
import { UpdateNotificationsetupDto } from './dto/request/update-notificationsetup.dto';
import { JwtAuthGuard, RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';

@UseGuards(JwtAuthGuard)
@Controller('notificationsetup')
export class NotificationsetupController {

  //#region Constructor
  constructor(private readonly notificationsetupService: NotificationsetupService) {}
  //#endregion

  //#region CRUD - C
  @Post('create/:id')
  create(
    @Req() req: RequestWithUser,
    @Param('id') customerid: string,
    @Body() createNotificationsetupDtos: CreateNotificationsetupDto[]
    ) {
    const token = req.token;
    return this.notificationsetupService.createOrUpdate(createNotificationsetupDtos, token, +customerid);
  }

  //#endregion

  //#region CRUD - R
  @Get(':id')
  findAllUsers(
    @Query() query: FindQueryForUsers,
    @Param('id') id: string
    ) {
      return this.notificationsetupService.findUsersForNotificationSetupByOrganizationId(+id, query);
    }
    
    @Get('selected-users/:id')
    findAll(@Param('id') id: string) {
      return this.notificationsetupService.findAll(+id);
    }
  //#endregion

  //#region CRUD - U
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationsetupDto: UpdateNotificationsetupDto) {
    return this.notificationsetupService.update(+id, updateNotificationsetupDto);
  }

  //#endregion

  //#region CRUD - D
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsetupService.remove(+id);
  }

  //#endregion
}
