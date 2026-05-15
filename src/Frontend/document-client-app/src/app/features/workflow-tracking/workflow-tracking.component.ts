import { ChangeDetectionStrategy, Component, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { WorkflowService } from '../../core/services/workflow.service';
import { WorkflowStatusResponse } from '../../core/models/workflow.models';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { WorkflowTimelineComponent } from '../../shared/components/workflow-timeline/workflow-timeline.component';

@Component({ selector: 'app-workflow-tracking', standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, LoadingSpinnerComponent, StatusBadgeComponent, WorkflowTimelineComponent], templateUrl: './workflow-tracking.component.html', styleUrl: './workflow-tracking.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class WorkflowTrackingComponent {
  readonly loading = signal(false);
  readonly status = signal<WorkflowStatusResponse | null>(null);
  readonly form = this.fb.nonNullable.group({ requestId: ['', Validators.required] });
  constructor(private readonly fb: FormBuilder, private readonly workflow: WorkflowService, private readonly destroyRef: DestroyRef) {}
  track(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.workflow.pollStatus(this.form.controls.requestId.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({ next: (status) => { this.status.set(status); this.loading.set(false); }, error: () => this.loading.set(false) });
  }
}
