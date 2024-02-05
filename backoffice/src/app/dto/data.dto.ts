export type DataDto<T> = {
    data?: T;
    error?: {
        statusCode: number;
        message: string;
    }
}