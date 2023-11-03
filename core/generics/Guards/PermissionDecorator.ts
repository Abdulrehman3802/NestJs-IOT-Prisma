import { SetMetadata } from '@nestjs/common';
import { Category, PermissionType } from '../Enums/GeneralEnums';

export const Permission = (category: Category, permission: PermissionType) => {
  return SetMetadata('permissions', { Category: category, PermissionType: permission });
};