import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecureStorageService {
  private readonly prefix = 'doc-client:';
  set(key: string, value: string): void { sessionStorage.setItem(this.prefix + key, value); }
  get(key: string): string | null { return sessionStorage.getItem(this.prefix + key); }
  remove(key: string): void { sessionStorage.removeItem(this.prefix + key); }
  clear(): void { Object.keys(sessionStorage).filter((k) => k.startsWith(this.prefix)).forEach((k) => sessionStorage.removeItem(k)); }
}
