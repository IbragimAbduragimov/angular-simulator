import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../../local-storage.service';
import { IToken } from './IToken';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> | Promise<boolean> => {

  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const token: IToken = localStorageService.getKey('tokens');

  if (token) {
    const clonedReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token.accessToken }`
      }
    });
    return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401) {
        authService.refresh().subscribe();
      }
      return throwError(() => error);
    })
    );
  } else {
    authService .logout();
    return router.navigate(['login']);
  }

};
