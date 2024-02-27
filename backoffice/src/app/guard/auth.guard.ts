import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  } else {
    return inject(Router).createUrlTree(['/login'])
  }
};
