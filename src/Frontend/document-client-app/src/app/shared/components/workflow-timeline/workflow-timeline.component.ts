import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WorkflowEvent } from '../../../core/models/workflow.models';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
@Component({
  selector: 'app-workflow-timeline',
  standalone: true,
  imports: [DatePipe, MatIconModule, StatusBadgeComponent],
  template: `
    <div class="timeline">
      @for (event of events(); track event.name + event.timestamp) {
        <article class="event">
          <mat-icon>radio_button_checked</mat-icon>
          <div><div class="event-header"><strong>{{ event.name }}</strong><app-status-badge [status]="event.status" /></div><p>{{ event.details || 'Saga event processed' }}</p><small>{{ event.timestamp | date:'medium' }} @if (event.kafkaTopic) { • {{ event.kafkaTopic }} } @if (event.correlationId) { • {{ event.correlationId }} }</small></div>
        </article>
      } @empty { <p class="empty">No workflow events are available yet.</p> }
    </div>`,
  styles: ['.timeline{display:grid;gap:1rem}.event{display:grid;grid-template-columns:auto 1fr;gap:1rem;position:relative}.event mat-icon{color:#2563eb}.event-header{display:flex;gap:.75rem;align-items:center;justify-content:space-between}.event p{margin:.25rem 0;color:#475569}.event small,.empty{color:#64748b}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowTimelineComponent { events = input<WorkflowEvent[]>([]); }
