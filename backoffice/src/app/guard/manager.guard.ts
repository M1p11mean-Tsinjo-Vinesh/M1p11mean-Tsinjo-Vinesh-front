import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const managerGuard: CanActivateFn = (route, state) => {
  const data = localStorage.getItem('user');
  if (data) {
    const user = JSON.parse(data);
    if (user && user.role === 'MANAGER') {
      return true;
    }
  }
  return inject(Router).parseUrl('/');
};
