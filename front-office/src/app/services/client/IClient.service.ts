import {Observable} from "rxjs";
import {AuthDto} from "../../dto/auth.dto";
import {DataDto} from "../../dto/data.dto";

export interface IClientService {
    isMailAvailable(email: string): Observable<boolean>;
    login(email: string, password: string): Observable<DataDto<AuthDto>>;
}