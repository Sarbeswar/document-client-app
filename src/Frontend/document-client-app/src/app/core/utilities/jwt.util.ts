import { JwtPayload } from '../models/auth.models';

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as JwtPayload;
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string, skewSeconds = 0): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 <= Date.now() + skewSeconds * 1000;
}

export function rolesFromJwt(token: string): string[] {
  const payload = decodeJwt(token);
  const rawRoles = payload?.roles ?? payload?.role ?? [];
  return Array.isArray(rawRoles) ? rawRoles : [rawRoles];
}
