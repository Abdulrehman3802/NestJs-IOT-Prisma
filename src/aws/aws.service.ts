import {Injectable} from '@nestjs/common';
import {CreateAwsDto} from './dto/Request/create-aw.dto';
import {UpdateAwsDto} from './dto/Request/update-aw.dto';
import {QueryRequest} from 'aws-sdk/clients/timestreamquery';
import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {ConfigService} from "@nestjs/config";
import {AwsSensorData} from "./dto/response/aws-sensor.dto";

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
                    'SELECT * FROM sensordata.sensorData WHERE time BETWEEN ago(5m) AND now()'
            };
            const response = await this.timestreamClient.query(request).promise();
            const fieldTitles = ['location', 'sensorId', 'type', 'time', 'value'];
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

// Getting single sensor data
    async getDataOfSpecificSensor(awsId: string) {
        try {
            const query = `
      SELECT devEUI, region, measure_name, measure_value::double, time
      FROM sensordata.sensorData
      WHERE devEUI = awsId
        AND time BETWEEN ago(5m) AND now()
      ORDER BY measure_name, time DESC
    `;
            const request = {
                QueryString: query,
            };
            const response = await this.timestreamClient.query(request).promise();
            // Object to store unique measure_name values with their latest corresponding data
            const uniqueMeasureNames = {};
            response.Rows?.forEach((row) => {
                const measureName = row.Data[2].ScalarValue; // Assuming measure_name is at index 2
                if (!uniqueMeasureNames[measureName]) {
                    uniqueMeasureNames[measureName] = {
                        sensorId: row.Data[0].ScalarValue,
                        location: row.Data[1].ScalarValue,
                        type: measureName,
                        value: row.Data[3].ScalarValue,
                        time: row.Data[4].ScalarValue,
                    };
                }
            });
            // Convert object values to an array to match the previous structure
            const uniqueValues = Object.values(uniqueMeasureNames);
            return uniqueValues;
        } catch (error) {
            throw error;
        }
    }

    async getSensorDataForWidgets(devEUIs: string[]): Promise<AwsSensorData[]> {
        try {
            const query = `
      SELECT devEUI, region, measure_name, measure_value::double, time
      FROM sensordata.sensorData
      WHERE devEUI IN (${devEUIs.map((devEUI) => `'${devEUI}'`).join(',')})
        AND time BETWEEN ago(5m) AND now()
      ORDER BY devEUI, measure_name, time DESC
    `;
            const request = {
                QueryString: query,
            };
            const response = await this.timestreamClient.query(request).promise();
            // Object to store unique devEUI and measure_name combinations with their latest corresponding data
            const uniqueData = {};
            response.Rows?.forEach((row) => {
                // Separating Unique values according to Id and type
                const devEUI = row.Data[0].ScalarValue;
                const measureName = row.Data[2].ScalarValue;
                const key = `${devEUI}-${measureName}`;
                if (!uniqueData[key]) {
                    // Mapping data according to condition
                    uniqueData[key] = {
                        sensorId: devEUI,
                        location: row.Data[1].ScalarValue,
                        type: measureName,
                        value: row.Data[3].ScalarValue,
                        time: row.Data[4].ScalarValue,
                    };
                }
            });
            // Convert object values to an array to match the previous structure
            const uniqueValues = Object.values(uniqueData);
            return uniqueValues;
        } catch (error) {
            throw error;
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
