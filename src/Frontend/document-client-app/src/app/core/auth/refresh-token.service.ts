import { Injectable } from '@angular/core';
import { finalize, Observable, shareReplay } from 'rxjs';
import { AuthResponse } from '../models/auth.models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RefreshTokenService {
  private refresh$?: Observable<AuthResponse>;
  constructor(private readonly auth: AuthService) {}
  refreshOnce(): Observable<AuthResponse> {
    this.refresh$ ??= this.auth.refresh().pipe(finalize(() => this.reset()), shareReplay({ bufferSize: 1, refCount: true }));
    return this.refresh$;
  }
  reset(): void { this.refresh$ = undefined; }
}
