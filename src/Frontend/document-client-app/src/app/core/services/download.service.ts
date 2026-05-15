import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { DownloadHistoryItem } from '../models/workflow.models';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class DownloadService {
  constructor(private readonly api: ApiService) {}
  download(id: string): Observable<Blob> { return this.api.download(API_ENDPOINTS.download.file(id)); }
  history(): Observable<DownloadHistoryItem[]> { return this.api.get<DownloadHistoryItem[]>(API_ENDPOINTS.download.history, { retries: 1 }); }
}
