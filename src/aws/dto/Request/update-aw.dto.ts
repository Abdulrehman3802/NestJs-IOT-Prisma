import { PartialType } from '@nestjs/mapped-types';
import {AwsDto} from './create-aw.dto';

export class UpdateAwsDto extends PartialType(AwsDto) {}
