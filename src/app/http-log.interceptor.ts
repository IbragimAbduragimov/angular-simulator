import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const httpLogInterceptor: HttpInterceptorFn = (req, next) => {

  const startTime: number = Date.now()
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          console.log(`ИНФОРМАЦИЯ ЗАПРОСА: ${ req.method } ${ req.url } ${ event.status } ${ startTime - Date.now() }ms`);
        }
      }
    }),
  );

};
