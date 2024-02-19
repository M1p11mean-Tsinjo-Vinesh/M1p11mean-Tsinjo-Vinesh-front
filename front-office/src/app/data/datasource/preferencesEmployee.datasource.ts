import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {EmployeeDTO} from "../dto/employee.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {PreferencesService} from "../../services/preferences/preferences.service";

export class PreferencesEmployeeDatasource implements DataSource<EmployeeDTO> {
  private employeesSubject = new BehaviorSubject<EmployeeDTO[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public loading$ = this.loadingSubject.asObservable();
  public pageSize: number = 10;
  public length: number = 0;
  public page: number = 1;
  
  constructor(private preferencesService: PreferencesService) {}
  
  connect(collectionViewer: CollectionViewer): Observable<EmployeeDTO[]> {
    return this.employeesSubject.asObservable();
  }
  
  disconnect(collectionViewer: CollectionViewer) {
    this.employeesSubject.complete();
    this.loadingSubject.complete();
  }
  
  loadEmployees(
    page = 1,
    offset = 3,
    column = 'firstName',
    method = 1,
    fullName?: string) {
    this.employeesSubject.next([]);
    this.loadingSubject.next(true);
    this.preferencesService.findEmployees(page, offset, column, method, fullName)
      .subscribe(
        employees => {
          this.length = employees.count;
          this.pageSize = employees.pageSize;
          this.page = employees.page;
          this.employeesSubject.next(employees.elements)
          this.loadingSubject.next(false);
        });
  }
}