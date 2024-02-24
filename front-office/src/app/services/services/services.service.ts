import {Injectable} from '@angular/core';
import {ReadService} from "../base-crud";
import {firstValueFrom, Observable} from "rxjs";
import {ServiceProps} from "../../../components/common-components/service-card/service-card.component";
import {DataDto} from "../../data/dto/data.dto";

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends ReadService {

  constructor(private http) {
    super("services", http)
  }

  findAll(): Observable<ServiceProps[]> {
    return new Observable<ServiceProps[]>(subscriber => {
      const response = await firstValueFrom(super.findAll<DataDto<{elements: ServiceProps[]}>>());
      subscriber.next(response.data.elements);
    });
  }

}
