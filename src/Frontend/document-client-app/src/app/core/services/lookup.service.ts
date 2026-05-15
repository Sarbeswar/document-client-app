import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { LookupItem } from '../models/api.models';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class LookupService { constructor(private readonly api: ApiService) {} getLookups(): Observable<Record<string, LookupItem[]>> { return this.api.get<Record<string, LookupItem[]>>(API_ENDPOINTS.lookups, { retries: 2 }); } }
