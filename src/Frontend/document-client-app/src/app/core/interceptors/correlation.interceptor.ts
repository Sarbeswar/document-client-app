import { HttpInterceptorFn } from '@angular/common/http';
import { createCorrelationId } from '../utilities/correlation.util';

export const correlationInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationId = req.headers.get('X-Correlation-Id') ?? createCorrelationId();
  return next(req.clone({ setHeaders: { 'X-Correlation-Id': correlationId } }));
};
