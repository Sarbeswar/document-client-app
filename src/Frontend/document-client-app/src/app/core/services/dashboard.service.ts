import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { DashboardResponse } from '../models/workflow.models';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class DashboardService { constructor(private readonly api: ApiService) {} getDashboard(): Observable<DashboardResponse> { return this.api.get<DashboardResponse>(API_ENDPOINTS.dashboard, { retries: 2 }); } }
