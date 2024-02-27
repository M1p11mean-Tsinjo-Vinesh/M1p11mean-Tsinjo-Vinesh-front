import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const defaultPageGuard: CanActivateFn = (route, state) => {
  const userData = localStorage.getItem('user');
  const router = inject(Router)
  if(userData) {
    const user = JSON.parse(userData);
    if(user.role === 'MANAGER') {
      return router.createUrlTree(['/management/']);
    } else if (user.role === 'EMPLOYEE') {
      return router.createUrlTree(['/crm/']);
    }
  }
  return router.createUrlTree(['/login']);
};
