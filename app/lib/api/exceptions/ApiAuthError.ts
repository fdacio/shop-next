import { AuthError } from "next-auth";

export class ApiAuthError extends AuthError {
    status: number | undefined;
    message: string ;
    constructor(status: number | undefined,  message: string ) {
        super();
        this.status = status;
        this.message = message;
    }
}