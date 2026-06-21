import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpLogInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const startTime: number = Date.now()
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        console.log(`ИНФОРМАЦИЯ ЗАПРОСА: ${ req.method } ${ req.url } ${ event.status } ${ Date.now() - startTime }ms`);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(`ИНФОРМАЦИЯ ЗАПРОСА: ${ req.method } ${ req.url } ${ error.status } ${ Date.now() - startTime }ms`);
      return throwError(() => error);
    }),
  );

};
