import { Injectable, NgZone, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class SessionTimeoutService {
  private readonly timeoutMs = 30 * 60 * 1000;
  private readonly warningMs = 5 * 60 * 1000;
  private timeoutId?: number;
  private warningId?: number;
  readonly lastActivity = signal(Date.now());

  constructor(private readonly auth: AuthService, private readonly notifications: NotificationService, private readonly zone: NgZone) {}

  start(): void {
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach((event) => window.addEventListener(event, () => this.reset(), { passive: true }));
    this.reset();
  }

  reset(): void {
    this.lastActivity.set(Date.now());
    window.clearTimeout(this.timeoutId);
    window.clearTimeout(this.warningId);
    this.zone.runOutsideAngular(() => {
      this.warningId = window.setTimeout(() => this.zone.run(() => this.notifications.info('Your session will expire soon.')), this.timeoutMs - this.warningMs);
      this.timeoutId = window.setTimeout(() => this.zone.run(() => this.auth.logout()), this.timeoutMs);
    });
  }
}
