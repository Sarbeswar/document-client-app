import { HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentUploadService } from '../../core/services/document-upload.service';
import { NotificationService } from '../../core/services/notification.service';
import { DropZoneDirective } from '../../shared/directives/drop-zone.directive';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';

@Component({ selector: 'app-document-upload', standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressBarModule, DropZoneDirective, FileSizePipe], templateUrl: './document-upload.component.html', styleUrl: './document-upload.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DocumentUploadComponent {
  readonly file = signal<File | null>(null);
  readonly progress = signal(0);
  readonly uploading = signal(false);
  readonly canSubmit = computed(() => !!this.file() && this.form.valid && !this.uploading());
  readonly form = this.fb.nonNullable.group({ documentType: ['', Validators.required], businessUnit: ['', Validators.required], classification: ['Internal', Validators.required], retentionCode: [''], description: ['', [Validators.maxLength(500)]] });
  constructor(private readonly fb: FormBuilder, private readonly uploadService: DocumentUploadService, private readonly notifications: NotificationService) {}
  setFile(file: File): void { if (file.size > 2 * 1024 * 1024 * 1024) { this.notifications.error('Files larger than 2GB require batch transfer.'); return; } this.file.set(file); }
  fileSelected(event: Event): void { const file = (event.target as HTMLInputElement).files?.item(0); if (file) this.setFile(file); }
  submit(): void {
    const file = this.file();
    if (!file || this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.uploading.set(true); this.progress.set(0);
    this.uploadService.upload(file, this.form.getRawValue()).subscribe({ next: (event) => { if (event.type === HttpEventType.UploadProgress && event.total) this.progress.set(Math.round((event.loaded / event.total) * 100)); if (event.type === HttpEventType.Response) this.notifications.success(`Request ${event.body?.requestId} submitted to Kafka workflow`, event.body?.correlationId); }, error: () => this.uploading.set(false), complete: () => { this.uploading.set(false); this.form.reset({ classification: 'Internal', documentType: '', businessUnit: '', retentionCode: '', description: '' }); this.file.set(null); } });
  }
}
