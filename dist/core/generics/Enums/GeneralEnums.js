"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionType = exports.Category = void 0;
var Category;
(function (Category) {
    Category["USER"] = "User";
    Category["ADMIN"] = "Admin";
    Category["ROLES"] = "Roles";
    Category["PERMISSIONS"] = "Permissions";
    Category["ORGANIZATION"] = "Organization";
    Category["FACILITY"] = "Facility";
    Category["SENSOR"] = "Sensor";
    Category["DEPARTMENT"] = "Department";
    Category["DEVICE"] = "Device";
    Category["LOGO"] = "Logo";
})(Category = exports.Category || (exports.Category = {}));
var PermissionType;
(function (PermissionType) {
    PermissionType["VIEW"] = "View";
    PermissionType["CREATE"] = "Create";
    PermissionType["UPDATE"] = "Update";
    PermissionType["DELETE"] = "Delete";
})(PermissionType = exports.PermissionType || (exports.PermissionType = {}));
//# sourceMappingURL=GeneralEnums.js.map