import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { AuthResponse, AuthUser, LoginRequest } from '../models/auth.models';
import { decodeJwt, isJwtExpired, rolesFromJwt } from '../utilities/jwt.util';
import { ApiService } from '../services/api.service';
import { SecureStorageService } from '../services/secure-storage.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly accessTokenKey = 'access-token';
  private readonly refreshTokenKey = 'refresh-token';
  private readonly tokenSignal = signal<string | null>(this.storage.get(this.accessTokenKey));
  private readonly userSignal = signal<AuthUser | null>(this.buildUserFromToken(this.tokenSignal()));
  readonly user = this.userSignal.asReadonly();
  readonly roles = computed(() => this.userSignal()?.roles ?? []);
  readonly isAuthenticated = computed(() => !!this.tokenSignal() && !isJwtExpired(this.tokenSignal()!, environment.tokenRefreshSkewSeconds));

  constructor(private readonly api: ApiService, private readonly storage: SecureStorageService, private readonly router: Router) {}

  get token(): string | null { return this.tokenSignal(); }
  get refreshToken(): string | null { return this.storage.get(this.refreshTokenKey); }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_ENDPOINTS.auth.login, request).pipe(tap((response) => this.setSession(response)));
  }

  refresh(): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(API_ENDPOINTS.auth.refresh, { refreshToken: this.refreshToken }).pipe(tap((response) => this.setSession(response)));
  }

  logout(): void {
    this.storage.clear();
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    void this.router.navigate(['/login']);
  }

  hasAnyRole(requiredRoles: string[]): boolean {
    if (!requiredRoles.length) return true;
    const current = this.roles().map((role) => role.toLowerCase());
    return requiredRoles.some((role) => current.includes(role.toLowerCase()));
  }

  private setSession(response: AuthResponse): void {
    this.storage.set(this.accessTokenKey, response.accessToken);
    this.tokenSignal.set(response.accessToken);
    if (response.refreshToken) this.storage.set(this.refreshTokenKey, response.refreshToken);
    this.userSignal.set(response.user ?? this.buildUserFromToken(response.accessToken));
  }

  private buildUserFromToken(token: string | null): AuthUser | null {
    if (!token) return null;
    const payload = decodeJwt(token);
    if (!payload) return null;
    return { username: payload.unique_name ?? payload.name ?? payload.sub ?? 'user', displayName: payload.name, email: payload.email, roles: rolesFromJwt(token) };
  }
}
