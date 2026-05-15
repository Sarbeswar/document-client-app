import { Directive, HostBinding, HostListener, output } from '@angular/core';
@Directive({ selector: '[appDropZone]', standalone: true })
export class DropZoneDirective {
  fileDropped = output<File>();
  @HostBinding('class.drag-over') isDragOver = false;
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent): void { event.preventDefault(); this.isDragOver = true; }
  @HostListener('dragleave') onDragLeave(): void { this.isDragOver = false; }
  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void { event.preventDefault(); this.isDragOver = false; const file = event.dataTransfer?.files?.item(0); if (file) this.fileDropped.emit(file); }
}
