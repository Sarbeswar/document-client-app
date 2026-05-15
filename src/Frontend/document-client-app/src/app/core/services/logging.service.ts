import { Injectable } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  log(level: LogLevel, message: string, context?: unknown): void {
    const payload = { timestamp: new Date().toISOString(), level, message, context };
    if (level === 'error') console.error(payload);
    else if (level === 'warn') console.warn(payload);
    else console.log(payload);
  }
}
