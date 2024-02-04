export interface HasId {
  id: number
}

export const deepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
}

export interface HttpResponse<T> {
  data: T;
}

export interface ListResponse<T> {
  elements: T[];
  count: number;
  pageSize: number;
  page: number;
}

export interface ErrorResponse {
  error: {
    code: number,
    message: string
  }
}

export interface HttpError {
  error: ErrorResponse,
  message: string,
  status: number
}
