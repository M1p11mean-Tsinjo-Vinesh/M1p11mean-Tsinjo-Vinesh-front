import {Observable} from "rxjs";
import {AuthDto} from "../../data/dto/auth.dto";
import {DataDto} from "../../data/dto/data.dto";

export interface IClientService {
    isMailAvailable(email: string): Observable<boolean>;
    login(email: string, password: string): Observable<DataDto<AuthDto>>;
}