import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../../../local-storage.service';
import { IToken } from './IToken';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const router: Router = inject(Router);

  const token: IToken | null = localStorageService.getKey('tokens');

  if (token) {
    return true;
  }

  return router.navigate(['login']);

};
