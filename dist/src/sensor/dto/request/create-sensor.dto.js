"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorTypeModelDTO = exports.SensorDto = exports.GraphDto = exports.CheckpointReportDto = exports.CreateSensorDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSensorDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSensorDto.prototype, "deviceid", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSensorDto.prototype, "customerid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSensorDto.prototype, "aws_sensorid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSensorDto.prototype, "sensorname", void 0);
exports.CreateSensorDto = CreateSensorDto;
class CheckpointReportDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CheckpointReportDto.prototype, "sensorIds", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CheckpointReportDto.prototype, "days", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckpointReportDto.prototype, "startDate", void 0);
exports.CheckpointReportDto = CheckpointReportDto;
class GraphDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GraphDto.prototype, "sensorTypeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GraphDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GraphDto.prototype, "startDate", void 0);
exports.GraphDto = GraphDto;
class SensorDto {
}
exports.SensorDto = SensorDto;
class SensorTypeModelDTO {
}
exports.SensorTypeModelDTO = SensorTypeModelDTO;
//# sourceMappingURL=create-sensor.dto.js.map