export declare class CreateSensorDto {
    deviceid: number;
    customerid: number;
    aws_sensorid: string;
}
export declare class SensorDto {
    deviceid: number;
    is_active: boolean;
    customerid: number;
    aws_sensorid: string;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    assigned_by: number;
}
export declare class SensorTypeModelDTO {
    sensortypename: string;
    measurementunit: string;
    minvalue: number;
    maxvalue: number;
    sensorid: number;
    aws_sensorid: string;
    is_hidden: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    updated_by: number;
}
