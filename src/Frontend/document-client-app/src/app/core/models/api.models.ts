export interface ApiError { status: number; message: string; correlationId?: string; details?: unknown; }
export interface PagedResult<T> { items: T[]; total: number; pageIndex: number; pageSize: number; }
export interface LookupItem { code: string; label: string; description?: string; }
export interface NotificationMessage { id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string; read: boolean; createdAt: string; correlationId?: string; }
