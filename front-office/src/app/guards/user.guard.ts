import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import AppStore from "../store/Appstore";
import {firstValueFrom} from "rxjs";

export const userGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const store: Store<AppStore> = inject(Store<AppStore>);
  const {user} = await firstValueFrom(store);
  const expirationTime = user.exp * 1000;
  if(expirationTime < new Date().getTime()) {
    return router.navigate(['/login'])
  }
  return true;
};
