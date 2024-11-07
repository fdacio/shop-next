import { AxiosError } from "axios";

export class ApiError extends AxiosError {
    status: number | undefined;
    message: string ;
    constructor(
        status: number | undefined, message : string ){
        super();
        this.status = status;
        this.message = message;
    }
}