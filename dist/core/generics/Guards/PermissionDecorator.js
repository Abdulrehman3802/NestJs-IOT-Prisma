"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const common_1 = require("@nestjs/common");
const Permission = (category, permission) => {
    return (0, common_1.SetMetadata)('permissions', { Category: category, PermissionType: permission });
};
exports.Permission = Permission;
//# sourceMappingURL=PermissionDecorator.js.map