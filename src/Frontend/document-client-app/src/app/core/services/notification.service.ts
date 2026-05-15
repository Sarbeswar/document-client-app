import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer, switchMap, catchError, of } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { NotificationMessage } from '../models/api.models';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messagesSignal = signal<NotificationMessage[]>([]);
  readonly messages = this.messagesSignal.asReadonly();
  constructor(private readonly snackBar: MatSnackBar, private readonly api: ApiService) {}
  success(message: string, correlationId?: string): void { this.open(message, 'success', correlationId); }
  error(message: string, correlationId?: string): void { this.open(message, 'error', correlationId); }
  info(message: string, correlationId?: string): void { this.open(message, 'info', correlationId); }
  startPolling(): void {
    timer(0, environment.notificationPollingMs).pipe(
      switchMap(() => this.api.get<NotificationMessage[]>(API_ENDPOINTS.notifications, { retries: 0 })),
      catchError(() => of([]))
    ).subscribe((messages) => this.messagesSignal.set(messages));
  }
  markRead(id: string): void { this.messagesSignal.update((items) => items.map((item) => item.id === id ? { ...item, read: true } : item)); }
  private open(message: string, panelClass: string, correlationId?: string): void {
    this.snackBar.open(correlationId ? `${message} (${correlationId})` : message, 'Dismiss', { duration: 6000, panelClass: [`toast-${panelClass}`] });
  }
}
