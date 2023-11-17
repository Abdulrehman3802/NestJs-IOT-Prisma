import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ModelCreateNotificationsetupDto } from "./dto/request/create-notificationsetup.dto";


@Injectable()
export class NotificationsetupRepository{

    //#region Constructor
    constructor(private readonly prismaService:PrismaService) {
    }
    //#endregion

    //#region CRUD - C
    async createNotificationSetup(models: ModelCreateNotificationsetupDto[]) {
      return this.prismaService.notificationsetup.createMany({
        data: models
      })
    }
    //#endregion

    //#region CRUD - R
    async GetNotificationSetupByOrgId(customerid: number) {
      return this.prismaService.notificationsetup.findMany({
        where: {
          customerid: customerid
        }
      })
    }

    async GetSelectedNotificationSetupByOrgId(customerid: number) {
      return this.prismaService.notificationsetup.findMany({
        where: {
          customerid: customerid,
          OR: [
            { is_email: true },
            { is_phone: true },
          ],
        }
      })
    }

    async findByCustomerIdsAndUserIds(customerId: number, userIds: number[]) {
      return this.prismaService.notificationsetup.findMany({
          where: {
              customerid: customerId,
              userid: {
                  in: userIds
              },
              is_deleted: false // Assuming you want to ignore logically deleted records
          }
      });
  }
    //#endregion

    //#region CRUD - U
    async performBulkUpdate(updateOperations: { where: { notificationsetupid: number }, data: Partial<ModelCreateNotificationsetupDto> }[]) {
      return this.prismaService.$transaction(
          updateOperations.map(operation => 
              this.prismaService.notificationsetup.update({
                  where: operation.where,
                  data: operation.data,
              })
          )
      );
  }
    //#endregion

    //#region CRUD - D

    //#endregion
  }