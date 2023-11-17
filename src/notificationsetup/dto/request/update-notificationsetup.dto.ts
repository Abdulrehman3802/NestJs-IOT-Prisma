import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationsetupDto } from './create-notificationsetup.dto';

export class UpdateNotificationsetupDto extends PartialType(CreateNotificationsetupDto) {}
