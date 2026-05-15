import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { WorkflowStatus } from '../../../core/models/workflow.models';
@Component({ selector: 'app-status-badge', standalone: true, template: '<span class="badge" [class]="statusClass()">{{ status() }}</span>', styles: ['.badge{border-radius:999px;padding:.25rem .7rem;font-weight:700;font-size:.78rem}.pending{background:#fff7ed;color:#9a3412}.inprogress{background:#dbeafe;color:#1d4ed8}.completed{background:#dcfce7;color:#166534}.failed{background:#fee2e2;color:#991b1b}.cancelled{background:#f1f5f9;color:#475569}'], changeDetection: ChangeDetectionStrategy.OnPush })
export class StatusBadgeComponent { status = input.required<WorkflowStatus>(); statusClass = computed(() => this.status().toLowerCase()); }
