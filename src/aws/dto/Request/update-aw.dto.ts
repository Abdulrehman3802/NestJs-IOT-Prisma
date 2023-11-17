import { PartialType } from '@nestjs/mapped-types';
import { CreateAwsDto } from './create-aw.dto';

export class UpdateAwsDto extends PartialType(CreateAwsDto) {}
