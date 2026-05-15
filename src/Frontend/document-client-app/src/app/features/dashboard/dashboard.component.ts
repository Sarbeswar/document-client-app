import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardResponse } from '../../core/models/workflow.models';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({ selector: 'app-dashboard', standalone: true, imports: [DatePipe, MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatProgressBarModule, MatPaginatorModule, LoadingSpinnerComponent, StatusBadgeComponent], templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DashboardComponent {
  readonly loading = signal(true);
  readonly data = signal<DashboardResponse | null>(null);
  readonly displayedColumns = ['requestId', 'fileName', 'status', 'currentStep', 'updatedAt'];
  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);
  readonly pagedRows = computed(() => {
    const rows = this.data()?.recentWorkflows ?? [];
    const start = this.pageIndex() * this.pageSize();
    return rows.slice(start, start + this.pageSize());
  });
  constructor(private readonly dashboard: DashboardService) { this.load(); }
  load(): void { this.loading.set(true); this.dashboard.getDashboard().subscribe({ next: (data) => this.data.set(data), error: () => this.loading.set(false), complete: () => this.loading.set(false) }); }
  page(event: PageEvent): void { this.pageIndex.set(event.pageIndex); this.pageSize.set(event.pageSize); }
}
