import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../config/server.config";

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

export class ReadService implements IReadService {

  constructor(protected commonURL: string, protected _http: HttpClient) {
  }

  findAll<T>(): Observable<T> {
    return this._http.get<T>(baseUrl(`${this.commonURL}/get/all`));
  }

  findAllWithParams<T>(params: any): Observable<T> {
    return this._http.get<T>(baseUrl(this.commonURL), {
      params: params
    });
  }

  findById<T>(id: string): Observable<T> {
    return this._http.get<T>(baseUrl(`${this.commonURL}/${id}`));
  }

}


export class CrudService extends ReadService implements ICRUDService {

  create<T>(data: any): Observable<T> {
    return this._http.post<T>(baseUrl(this.commonURL), data);
  }

  delete<T>(id: string): Observable<T> {
    return this._http.delete<T>(baseUrl(`${this.commonURL}/${id}`));
  }

  update<T>(data: any): Observable<T> {
    const {_id, ...rest} = data;
    return this._http.put<T>(baseUrl(`${this.commonURL}/${_id}`), rest);
  }

}