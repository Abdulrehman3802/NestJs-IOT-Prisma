import { Request } from "express";
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    GetGeneralData(request: Request): Promise<{
        permissions: string[];
    }>;
}
