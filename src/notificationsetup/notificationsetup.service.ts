import { HttpStatus, Injectable, NotAcceptableException, NotImplementedException } from '@nestjs/common';
import { CreateNotificationsetupDto, FindQueryForUsers, ModelCreateNotificationsetupDto } from './dto/request/create-notificationsetup.dto';
import { UpdateNotificationsetupDto } from './dto/request/update-notificationsetup.dto';
import { NotificationsetupRepository } from './notificationsetup.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { UserService } from 'src/user/user.service';
import { ResponseNotificationSetupDto, ResponseNotificationSetupUsersDto } from './dto/response/notificationsetup.users.response.dto';

@Injectable()
export class NotificationsetupService {

  //#region Constructor
  constructor(
    private readonly notificationsetupRepository: NotificationsetupRepository,
    private readonly userService: UserService
    ){
  }
  //#endregion

  //#region CRUD - C
  async createOrUpdate(createNotificationsetupDtos: CreateNotificationsetupDto[], token: Token, customerid: number) {
    try{
      const { id } = token

      const existingSetups = await this.notificationsetupRepository.findByCustomerIdsAndUserIds(customerid, createNotificationsetupDtos.map(dto => dto.userid));

      const toUpdate = [];
      const toCreate = [];
      
        createNotificationsetupDtos.forEach(dto => {
            const existing = existingSetups.find(es => es.userid === dto.userid && es.customerid === customerid);
            if (existing) {
                // If exists, prepare for update
                toUpdate.push({ existing, newDto: dto });
            } else {
                // If not exists, prepare for creation
                toCreate.push(dto);
            }
        });

        //#region Update the existing Objects
        if(toUpdate.length > 0) {
          // Prepare data for update operations
          const updateOperations = toUpdate.map(({ existing, newDto }) => {
            let updateData: Partial<ModelCreateNotificationsetupDto> = {
                updated_by: id,
                date_updated: new Date(),
            };

            // Check and prepare update data based on newDto fields
            if (newDto.email !== undefined) {
                updateData.email = newDto.email;
                updateData.is_email = !!newDto.email;
            }
            if (newDto.phonenumber !== undefined) {
                updateData.phonenumber = newDto.phonenumber;
                updateData.is_phone = !!newDto.phonenumber;
            }
            // ...similar checks for 'plain_email' and 'text_to_speech'

            return { 
                where: { notificationsetupid: existing.notificationsetupid }, 
                data: updateData 
            };
          });

          // Perform bulk update
          await this.notificationsetupRepository.performBulkUpdate(updateOperations);
        }
       //#endregion

      //#region creating the non existing objects
      if(toCreate.length > 0 ) {
      const models = toCreate.map(dto => {
        const { email, phonenumber, plain_email, text_to_speech, userid } = dto
        const model: ModelCreateNotificationsetupDto = {
          userid: userid,
          email: email,
          phonenumber: phonenumber,
          plain_email: plain_email,
          text_to_speech: text_to_speech,
          customerid: customerid,
          is_active:true,
          date_created:new Date(),
          date_updated:new Date(),
          is_deleted:false,
          created_by:id,
          updated_by:id,
          is_email: false,
          is_phone: false,
          is_text_to_speech: false,
          is_plain_email: false
        }
       
        // When setting up notification by either 4 fields make their checks true
        if(email) model.is_email = true
        if(phonenumber) model.is_phone = true
        if(plain_email) model.is_plain_email = true
        if(text_to_speech) model.is_text_to_speech = true

        return model;
      });

      const success = await this.notificationsetupRepository.createNotificationSetup(models)
      if(!success) throw new NotAcceptableException("Invalid data or database constraint violation.")
    }
      //#endregion
      const response: ApiResponseDto<null> = {
        statusCode: HttpStatus.OK,
        message: "Notification Setup Successfully",
        data: null,
        error: false
      }
      return response
    } catch(error) {
        throw error
    }
  }
  //#endregion

  //#region CRUD - R
  async findAll(id: number) {
    try{
      const notificationsetups = await this.notificationsetupRepository.GetSelectedNotificationSetupByOrgId(id)

      const response: ApiResponseDto<ResponseNotificationSetupDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Users Found Successfully",
        data: notificationsetups,
        error: false
      }
      return response
    }catch(error){
      throw error
    }
  }
  
  
  async findUsersForNotificationSetupByOrganizationId(id: number, query: FindQueryForUsers) {
    try{
      const type = query.type;
      const organizationstaff = await this.userService.findAllOrganizationStaffByOrganizationId(id)

      const notificationsetups = await this.notificationsetupRepository.GetNotificationSetupByOrgId(id)

      // Adding is_email and phone already checked in the response
      let updatedStaff: ResponseNotificationSetupUsersDto[] = organizationstaff.data.map(staff => {
        const notificationSetup = notificationsetups.find(setup => setup.userid === staff.userid);
        return {
            ...staff,
            is_email: notificationSetup && notificationSetup.email !== null ? notificationSetup.is_email : false,
            is_phone: notificationSetup && notificationSetup.phonenumber !== null ? notificationSetup.is_phone : false
        };
      });

        // Removing null emails or phonenumbers
        if (query) {
          if (type.toLowerCase() === 'email') {
              updatedStaff = updatedStaff.filter(staff => staff.email !== null);
          } else if (type.toLowerCase() === 'phone') {
              updatedStaff = updatedStaff.filter(staff => staff.phonenumber !== null);
          }
        }

      const response: ApiResponseDto<ResponseNotificationSetupUsersDto[]> = {
        statusCode: HttpStatus.OK,
        message: "Users Found Successfully",
        data: updatedStaff,
        error: false
      }
      return response
    }catch(error){
      throw error
    }
  }
  //#endregion

  //#region CRUD - U
  update(id: number, updateNotificationsetupDto: UpdateNotificationsetupDto) {
    return `This action updates a #${id} notificationsetup`;
  }

  //#endregion

  //#region CRUD - D
  remove(id: number) {
    return `This action removes a #${id} notificationsetup`;
  }
  //#endregion
}
