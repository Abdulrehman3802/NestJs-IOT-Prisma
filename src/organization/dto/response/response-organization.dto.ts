export class ResponseOrganizationDto {
    customerid: number
    customername: string
    contactperson: string
    email: string
    phone: string
    address: string
    city: string
    credit?: number
    is_active?: boolean
    date_created: Date
    date_updated?: Date
    calibration_date?: Date
    logo:string
}