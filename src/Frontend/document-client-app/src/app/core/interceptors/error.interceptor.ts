import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { LoggingService } from '../services/logging.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);
  const logger = inject(LoggingService);
  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const correlationId = error.headers.get('X-Correlation-Id') ?? req.headers.get('X-Correlation-Id') ?? undefined;
        logger.log('error', `API request failed: ${req.method} ${req.url}`, { status: error.status, correlationId, body: error.error });
        if (error.status !== 401) notifications.error(error.error?.message ?? 'The request failed. Please retry.', correlationId);
      }
      return throwError(() => error);
    })
  );
};
