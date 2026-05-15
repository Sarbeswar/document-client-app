import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly logger: LoggingService) {}
  handleError(error: unknown): void { this.logger.log('error', 'Unhandled frontend error', error); }
}
