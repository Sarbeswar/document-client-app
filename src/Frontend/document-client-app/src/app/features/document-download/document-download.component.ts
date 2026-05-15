import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DownloadService } from '../../core/services/download.service';
import { DownloadHistoryItem } from '../../core/models/workflow.models';
import { NotificationService } from '../../core/services/notification.service';

@Component({ selector: 'app-document-download', standalone: true, imports: [DatePipe, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule], templateUrl: './document-download.component.html', styleUrl: './document-download.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DocumentDownloadComponent {
  readonly history = signal<DownloadHistoryItem[]>([]);
  readonly columns = ['documentId', 'fileName', 'requestedBy', 'downloadedAt'];
  readonly form = this.fb.nonNullable.group({ documentId: ['', Validators.required] });
  constructor(private readonly fb: FormBuilder, private readonly downloads: DownloadService, private readonly notifications: NotificationService) { this.loadHistory(); }
  loadHistory(): void { this.downloads.history().subscribe((items) => this.history.set(items)); }
  download(): void {
    if (this.form.invalid) return;
    const id = this.form.controls.documentId.value;
    this.downloads.download(id).subscribe((blob) => { const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${id}.bin`; anchor.click(); URL.revokeObjectURL(url); this.notifications.success('Secure download started'); this.loadHistory(); });
  }
}
