import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Admin } from './admin';

export const adminGuard: CanActivateFn = () => {
  
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const userRole: string | undefined = authService.getUser()?.role;
  const admin: typeof Admin = Admin;

  if (userRole === admin.ADMIN) {
    return true;
  }

  return router.navigate(['']);

};
