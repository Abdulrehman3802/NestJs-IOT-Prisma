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
exports.AwsService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let AwsService = class AwsService {
    constructor() {
        this.timestreamClient = new AWS.TimestreamQuery({
            region: 'ap-southeast-2',
            credentials: {
                accessKeyId: 'AKIASN25JAWHXMZ3PWEF',
                secretAccessKey: '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',
            },
        });
        this.dynamoDBClient = new AWS.DynamoDB.DocumentClient({
            region: 'ap-southeast-2',
            credentials: {
                accessKeyId: 'AKIASN25JAWHXMZ3PWEF',
                secretAccessKey: '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',
            },
        });
    }
    async getSensors() {
        var _a;
        try {
            const request = {
                QueryString: 'SELECT * FROM sensordata.sensorData WHERE time BETWEEN ago(15m) AND now()'
            };
            const response = await this.timestreamClient.query(request).promise();
            const fieldTitles = ['location', 'sensorId', 'type', 'date', 'value'];
            const scalarObject = (_a = response.Rows) === null || _a === void 0 ? void 0 : _a.map((item) => {
                return item.Data.reduce((obj, scalarItem, index) => {
                    if (scalarItem.ScalarValue) {
                        const title = fieldTitles[index];
                        obj[title] = scalarItem.ScalarValue;
                    }
                    return obj;
                }, {});
            });
            return scalarObject;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        var _a;
        try {
            const request = {
                QueryString: 'SELECT devEUI FROM sensordata.sensorData GROUP BY devEUI'
            };
            const response = await this.timestreamClient.query(request).promise();
            const uniqueSensorIds = new Set();
            (_a = response.Rows) === null || _a === void 0 ? void 0 : _a.forEach((row) => {
                var _a, _b;
                const sensorId = (_b = (_a = row.Data[0]) === null || _a === void 0 ? void 0 : _a.ScalarValue) === null || _b === void 0 ? void 0 : _b.toString();
                if (sensorId) {
                    uniqueSensorIds.add(sensorId);
                }
            });
            return Array.from(uniqueSensorIds);
        }
        catch (error) {
            throw error;
        }
    }
    findOne(id) {
        return `This action returns a #${id} aw`;
    }
    update(id, updateAwDto) {
        return `This action updates a #${id} aw`;
    }
    remove(id) {
        return `This action removes a #${id} aw`;
    }
};
AwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AwsService);
exports.AwsService = AwsService;
//# sourceMappingURL=aws.service.js.map