"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAwsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_aw_dto_1 = require("./create-aw.dto");
class UpdateAwsDto extends (0, mapped_types_1.PartialType)(create_aw_dto_1.CreateAwsDto) {
}
exports.UpdateAwsDto = UpdateAwsDto;
//# sourceMappingURL=update-aw.dto.js.map