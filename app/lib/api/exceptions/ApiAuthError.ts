import { AuthError } from "next-auth";

export class ApiAuthError extends AuthError {
    status: Number | undefined;
    message: string ;
    constructor(
        status: Number | undefined, 
        message : string){
        super();
        this.status = status;
        this.message = message;
    }
}