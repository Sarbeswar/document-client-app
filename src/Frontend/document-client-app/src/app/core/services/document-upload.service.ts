import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { UploadMetadata, UploadResponse } from '../models/workflow.models';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class DocumentUploadService {
  constructor(private readonly api: ApiService) {}
  upload(file: File, metadata: UploadMetadata): Observable<HttpEvent<UploadResponse>> {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    return this.api.upload<UploadResponse>(API_ENDPOINTS.documents.upload, form);
  }
}
