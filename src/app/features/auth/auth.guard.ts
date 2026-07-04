import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { IAuthResponse } from './IAuthResponse';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService)

  const isLogin: boolean = authService.getUser() ? true : false;

  if (isLogin) {
    return true;
  }

  return router.navigate(['login']);

};
