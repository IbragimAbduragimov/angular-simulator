import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../../local-storage.service';
import { IToken } from './IToken';
import { catchError, exhaustMap, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { IAuthResponse } from './IAuthResponse';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const token: IToken = localStorageService.getKey('tokens');

  const authReq: HttpRequest<unknown> = addToken(req, token.accessToken);
  
  return next(authReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authService.refreshToken()
            .pipe(
              exhaustMap(() => {
                const newToken: string | undefined = authService.getTokens()?.accessToken;
                const user: IAuthResponse | null = authService.getUser()

                if (!user) {
                  authService.logout();
                  router.navigate(['login']);
                  return throwError(() => error);
                }
                  const retryReq: HttpRequest<unknown> = addToken(req, newToken);
                  return next(retryReq);
              }),
            )
        }
        return throwError(() => error);
      })
    );
};

const addToken = (req: HttpRequest<unknown>, token: string | undefined): HttpRequest<unknown> => req.clone({
  headers: req.headers.set('Authorization', `Bearer ${ token }`)
});
