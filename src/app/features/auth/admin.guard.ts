import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const get = authService.getCurrentUser().subscribe()
  const userRole: string | undefined = authService.getUser()?.role;

  if (userRole === 'admin') {
    return true;
  }

  return router.navigate(['']);

};
