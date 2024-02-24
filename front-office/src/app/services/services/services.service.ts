import {Injectable} from '@angular/core';
import {ReadService} from "../base-crud";
import {Observable} from "rxjs";
import {ServiceProps} from "../../../components/common-components/service-card/service-card.component";
import {DataDto} from "../../data/dto/data.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends ReadService {

  constructor(private http: HttpClient) {
    super("services", http)
  }

  findServices(): Observable<ServiceProps[]> {
    return new Observable<ServiceProps[]>(subscriber => {
      const findAllObservable = super.findAll<DataDto<ServiceProps[]>>();
      findAllObservable.subscribe(response => {
        subscriber.next(response.data);
        subscriber.complete();
      })
    });
  }

}
