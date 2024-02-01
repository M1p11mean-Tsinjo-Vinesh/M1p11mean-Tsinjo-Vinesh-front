import {Observable} from "rxjs";

export interface IReadService {
  findAllWithParams<T>(params: any): Observable<T>;
  findAll<T>(): Observable<T>;
  findById<T>(id: string): Observable<T>;
}

export interface ICRUDService extends IReadService {
  delete<T>(id: string): Observable<T>;
  create<T>(data: any): Observable<T>;
  update<T>(data: any): Observable<T>;
}