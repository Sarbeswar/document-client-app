export function createCorrelationId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `corr-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
