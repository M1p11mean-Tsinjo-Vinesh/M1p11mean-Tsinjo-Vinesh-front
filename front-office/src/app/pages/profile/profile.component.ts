import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UniqueMailValidator} from "../../validators/unique-mail.validator";
import {passwordConfirmationValidator} from "../../validators/password-confirmation.validator";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {PreferencesEmployeeDatasource} from "../../data/datasource/preferencesEmployee.datasource";
import {PreferencesService} from "../../services/preferences/preferences.service";
import {PreferencesServiceDatasource} from "../../data/datasource/preferencesService.datasource";
import {ClientService} from "../../services/client/client.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge, tap} from "rxjs";
import {showSuccess} from "../../../components/services/sweet-alert.util";
import {Router} from "@angular/router";
import {UserUpdateDTO} from "../../data/dto/user.dto";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = this.formBuilder.group({
      firstname: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ],
        },
      ],
      lastname: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ],
        },
      ],
      email: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ],
          asyncValidators: [this.uniqueMailValidator.validate.bind(this.uniqueMailValidator)],
        },
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0|\\+261)[0-9]{9}$'),
        ]
      ],
      currentPassword: [
        ''
      ],
      password:  [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'),
        ]
      ],
      confirmPassword: [
        ''
      ],
    }, {validators: passwordConfirmationValidator})
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
    this.employeeDataSource = new PreferencesEmployeeDatasource(this.preferencesService);
    this.employeeDataSource.loadEmployees();
    this.serviceDataSource = new PreferencesServiceDatasource(this.preferencesService);
    this.serviceDataSource.loadServices();
    const user = this.clientService.getUser();
    this.profileForm.patchValue({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      phone: user.phone,
    })
    this.currentPreferences.employee = user.favoriteEmployees ?? [];
    this.currentPreferences.service = user.favoriteServices ?? [];
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
  
  onSubmit() {
    let userToUpdate: UserUpdateDTO = {
      _id: this.clientService.getUser()._id,
      firstName: this.profileForm.value.firstname,
      lastName: this.profileForm.value.lastname,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      favoriteEmployees: this.currentPreferences.employee,
      favoriteServices: this.currentPreferences.service,
    }
    if (this.profileForm.value.password) {
      userToUpdate = {
        ...userToUpdate,
        currentPassword: this.profileForm.value.currentPassword,
        password: this.profileForm.value.password,
        confirmPassword: this.profileForm.value.confirmPassword,
        
      }
    }
    this.clientService.updateUser(userToUpdate).subscribe(() => {
      showSuccess(
        () => window.location.reload(),
        "Profile mis à jour avec succès");
    })
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
