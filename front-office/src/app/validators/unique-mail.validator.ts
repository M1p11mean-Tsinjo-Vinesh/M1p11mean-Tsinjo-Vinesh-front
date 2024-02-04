import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {ClientService} from "../services/client/client.service";

@Injectable({providedIn: 'root'})
export class UniqueMailValidator implements AsyncValidator {
    constructor(private clientService: ClientService) {}
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.clientService.isMailAvailable(control.value).pipe(
            map(isAvailable => {
                return isAvailable ? null : {uniqueMail: true};
            })
        );
    }

}
