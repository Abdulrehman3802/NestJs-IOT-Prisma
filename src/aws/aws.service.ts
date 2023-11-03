import {Injectable} from '@nestjs/common';
import {CreateAwsDto} from './dto/create-aw.dto';
import {UpdateAwsDto} from './dto/update-aw.dto';
import {QueryRequest} from 'aws-sdk/clients/timestreamquery';
import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AwsService {
    private readonly timestreamClient: AWS.TimestreamQuery;
    private readonly dynamoDBClient: DocumentClient;
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
        try {
            const request: QueryRequest = {
                QueryString:
                    'SELECT * FROM sensordata.sensorData WHERE time BETWEEN ago(15m) AND now()'
            };
            const response = await this.timestreamClient.query(request).promise();
            const fieldTitles = ['location', 'sensorId', 'type', 'date', 'value'];

            const scalarObject = response.Rows?.map((item) => {
                return item.Data.reduce((obj, scalarItem, index) => {
                    if (scalarItem.ScalarValue) {
                        const title = fieldTitles[index];
                        obj[title] = scalarItem.ScalarValue;
                    }
                    return obj;
                }, {});
            });
            return scalarObject
        } catch (error) {
            throw error
        }
    }
   async findAll() {
        try {
            const request: QueryRequest = {
                QueryString:
                    'SELECT devEUI FROM sensordata.sensorData GROUP BY devEUI'
            };
            const response = await this.timestreamClient.query(request).promise();
             const uniqueSensorIds = new Set<string>();
             response.Rows?.forEach((row) => {
               const sensorId = row.Data[0]?.ScalarValue?.toString();
               if (sensorId) {
                 uniqueSensorIds.add(sensorId);
               }
             });
             return Array.from(uniqueSensorIds);
        } catch (error) {
            throw error
        }
    }
    findOne(id: number) {
        return `This action returns a #${id} aw`;
    }
    update(id: number, updateAwDto: UpdateAwsDto) {
        return `This action updates a #${id} aw`;
    }
    remove(id: number) {
        return `This action removes a #${id} aw`;
    }
}
