export declare class CreateSensorDto {
    deviceid: number;
    customerid: number;
    aws_sensorid: string;
    sensorname: string;
}
export declare class CheckpointReportDto {
    sensorIds: number[];
    days: number;
    startDate: string;
}
export declare class GraphDto {
    sensorTypeId: number;
    endDate: string;
    startDate: string;
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
    sensorname: string;
}
export declare class SensorTypeModelDTO {
    property: string;
    unit: string;
    description: string;
    minvalue: number;
    maxvalue: number;
    sensorid: number;
    name: string;
    aws_sensorid: string;
    is_hidden: boolean;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    updated_by: number;
}
