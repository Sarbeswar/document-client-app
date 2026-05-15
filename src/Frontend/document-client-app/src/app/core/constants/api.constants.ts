export const API_ENDPOINTS = {
  auth: { login: '/gateway/auth/login', refresh: '/gateway/auth/refresh', logout: '/gateway/auth/logout' },
  dashboard: '/gateway/dashboard',
  documents: { upload: '/gateway/documents/upload', status: (id: string) => `/gateway/documents/status/${encodeURIComponent(id)}` },
  download: { file: (id: string) => `/gateway/download/${encodeURIComponent(id)}`, history: '/gateway/download/history' },
  lookups: '/gateway/lookups',
  notifications: '/gateway/notifications'
} as const;
