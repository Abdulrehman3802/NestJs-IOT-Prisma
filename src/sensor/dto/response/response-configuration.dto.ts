export class ResponseConfigurationDto{
    sensortypeid:number
    property: string;
    unit: string;
    name:string;
    description:string
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