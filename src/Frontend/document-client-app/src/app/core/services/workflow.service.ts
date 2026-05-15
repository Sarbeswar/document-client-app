import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { WorkflowStatusResponse } from '../models/workflow.models';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class WorkflowService {
  constructor(private readonly api: ApiService) {}
  getStatus(id: string): Observable<WorkflowStatusResponse> { return this.api.get<WorkflowStatusResponse>(API_ENDPOINTS.documents.status(id), { retries: 1 }); }
  pollStatus(id: string): Observable<WorkflowStatusResponse> { return timer(0, environment.workflowPollingMs).pipe(switchMap(() => this.getStatus(id))); }
}
