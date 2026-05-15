import { HttpClient, HttpContext, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiGatewayUrl.replace(/\/$/, '');
  constructor(private readonly http: HttpClient) {}
  get<T>(path: string, options: { params?: HttpParams | Record<string, string | number | boolean>; retries?: number; context?: HttpContext } = {}): Observable<T> {
    return this.http.get<T>(this.url(path), { params: options.params, context: options.context }).pipe(retry({ count: options.retries ?? 1, delay: 500 }));
  }
  post<T>(path: string, body: unknown, options: { retries?: number; context?: HttpContext } = {}): Observable<T> {
    return this.http.post<T>(this.url(path), body, { context: options.context }).pipe(retry({ count: options.retries ?? 0, delay: 500 }));
  }
  upload<T>(path: string, body: FormData): Observable<HttpEvent<T>> { return this.http.post<T>(this.url(path), body, { observe: 'events', reportProgress: true }); }
  download(path: string): Observable<Blob> { return this.http.get(this.url(path), { responseType: 'blob' }); }
  private url(path: string): string { return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`; }
}
