import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpLogInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const startTime: number = Date.now();

  const logRequest = (message: string) => {
    console.log(
      `ИНФОРМАЦИЯ ЗАПРОСА: ${req.method} ${req.url} ${message}${Date.now() - startTime}ms`,
    );
  };

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        logRequest(event.status.toString());
      }
    }),
    catchError((error: HttpErrorResponse) => {
      logRequest(error.status.toString());
      return throwError(() => error);
    }),
  );
};
