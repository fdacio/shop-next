import { AuthError } from "next-auth";

export class ApiAuthError extends AuthError {
    status: Number;
    message: string ;
    constructor(
        status: Number, message : string){
        super();
        this.status = status;
        this.message = message;
    }
}