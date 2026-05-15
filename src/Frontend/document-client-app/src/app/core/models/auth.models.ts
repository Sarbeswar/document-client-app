export interface LoginRequest { username: string; password: string; }
export interface AuthResponse { accessToken: string; refreshToken?: string; expiresIn?: number; tokenType?: string; user?: AuthUser; }
export interface AuthUser { id?: string; username: string; displayName?: string; email?: string; roles: string[]; }
export interface JwtPayload { sub?: string; unique_name?: string; name?: string; email?: string; role?: string | string[]; roles?: string[]; exp?: number; iat?: number; [key: string]: unknown; }
