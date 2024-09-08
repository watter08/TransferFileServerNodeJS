export class CustomResponse {
    public statusCode: number;
    public message: string;
    public isSucces: boolean;
    public data: any;

    public constructor(statusCode: number, message: string, isSuccess: boolean = false, data: any = null)
    {
        this.statusCode = statusCode;
        this.message = message;
        this.isSucces = isSuccess;
        this.data = this.data
    }
}