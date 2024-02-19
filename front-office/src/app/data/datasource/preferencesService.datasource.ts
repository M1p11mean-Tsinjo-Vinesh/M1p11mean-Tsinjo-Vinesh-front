import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {ServiceDto} from "../dto/service.dto";
import {BehaviorSubject} from "rxjs";
import {PreferencesService} from "../../services/preferences/preferences.service";

export class PreferencesServiceDatasource implements DataSource<ServiceDto> {
  private servicesSubject = new BehaviorSubject<ServiceDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public loading$ = this.loadingSubject.asObservable();
  public pageSize: number = 10;
  public length: number = 0;
  public page: number = 1;
  
  constructor(private preferencesService: PreferencesService) {}
  
  connect(collectionViewer: CollectionViewer) {
    return this.servicesSubject.asObservable();
  }
  
  disconnect(collectionViewer: CollectionViewer) {
    this.servicesSubject.complete();
    this.loadingSubject.complete();
  }
  
  loadServices(
    page = 1,
    offset = 10,
    column = 'name',
    method = 1,
    name?: string) {
    this.servicesSubject.next([]);
    this.loadingSubject.next(true);
    this.preferencesService.findServices(page, offset, column, method, name)
      .subscribe(
        services => {
          this.length = services.count;
          this.pageSize = services.pageSize;
          this.page = services.page;
          this.servicesSubject.next(services.elements)
          this.loadingSubject.next(false);
        });
  }
}