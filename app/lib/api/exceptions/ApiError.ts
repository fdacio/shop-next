
export class ApiError extends Error {
    status: Number;
    message: string ;
    constructor(
        status: Number, message : string){
        super();
        this.status = status;
        this.message = message;
    }
}