import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Role } from './Role.enum';

export const adminGuard: CanActivateFn = () => {
  
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const userRole: string | undefined = authService.getUser()?.role;
  const role: typeof Role = Role;

  if (userRole === role.ADMIN) {
    return true;
  }

  return router.navigate(['']);

};
