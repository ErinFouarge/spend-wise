import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from './session';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService).session();

  if (session?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.token}`
      }
    });
  }

  return next(req);
};
