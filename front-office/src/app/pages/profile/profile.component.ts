import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UniqueMailValidator} from "../../validators/unique-mail.validator";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {PreferencesEmployeeDatasource} from "../../data/datasource/preferencesEmployee.datasource";
import {PreferencesService} from "../../services/preferences/preferences.service";
import {PreferencesServiceDatasource} from "../../data/datasource/preferencesService.datasource";
import {ClientService} from "../../services/client/client.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge, tap} from "rxjs";
import {Router} from "@angular/router";
import {LinkProps} from "../../shared/navbar/header-link/header-link.component";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  links: LinkProps[] = [
    {
      link: "/profile/edit",
      name: "Informations personnelles"
    },
    {
      link: "/profile/favoris/services",
      name: "Services favoris"
    },
    {
      link: "/profile/favoris/employees",
      name: "Employées favoris"
    }
  ];

  // employee list data
  employeeDataSource: PreferencesEmployeeDatasource
  employeeDisplayedColumns = ["fullName", "isFavorite"]
  @ViewChild("employeePaginator") employeePaginator: MatPaginator;
  @ViewChild("employeeSort") employeeSort: MatSort;
  // service list data
  serviceDataSource: PreferencesServiceDatasource
  serviceDisplayedColumns = ["name", "isFavorite"]
  @ViewChild("servicePaginator") servicePaginator: MatPaginator;
  @ViewChild("serviceSort") serviceSort: MatSort;
  
  currentPreferences: any = {
    employee: [],
    service: []
  }
  protected readonly faStar = faStar;
  protected readonly faStarRegular = faStarRegular;
  constructor(
    private formBuilder: FormBuilder,
    private uniqueMailValidator: UniqueMailValidator,
    private preferencesService: PreferencesService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.employeeSort.sortChange.subscribe(() => this.employeePaginator.pageIndex = 0);
    
    merge(this.employeeSort.sortChange, this.employeePaginator.page)
      .pipe(
        tap(() => this.loadEmployeesPage())
      )
      .subscribe();
    
    this.serviceSort.sortChange.subscribe(() => this.servicePaginator.pageIndex = 0);
    
    merge(this.serviceSort.sortChange, this.servicePaginator.page)
      .pipe(
        tap(() => this.loadServicesPage())
      )
      .subscribe();
  }

  
  togglePreferences(field: string, id: string) {
    const index = this.currentPreferences[field].indexOf(id);
    if (index === -1) {
      this.currentPreferences[field].push(id);
    } else {
      this.currentPreferences[field].splice(index, 1);
    }
  }
  
  loadEmployeesPage() {
    this.employeeDataSource.loadEmployees(
      this.employeePaginator.pageIndex + 1,
      this.employeePaginator.pageSize,
      "firstName",
      this.employeeSort.direction === "asc" ? 1 : -1,
    );
  }
  
  loadServicesPage() {
    this.serviceDataSource.loadServices(
      this.servicePaginator.pageIndex + 1,
      this.servicePaginator.pageSize,
      this.serviceSort.active,
      this.serviceSort.direction === "asc" ? 1 : -1,
    );
  }
}
