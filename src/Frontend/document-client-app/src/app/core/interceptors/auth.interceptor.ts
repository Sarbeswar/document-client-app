import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RefreshTokenService } from '../auth/refresh-token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const refresher = inject(RefreshTokenService);
  const token = auth.token;
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && auth.refreshToken && !req.url.includes('/gateway/auth/refresh')) {
        return refresher.refreshOnce().pipe(switchMap((response) => next(req.clone({ setHeaders: { Authorization: `Bearer ${response.accessToken}` } }))));
      }
      return throwError(() => error);
    })
  );
};
