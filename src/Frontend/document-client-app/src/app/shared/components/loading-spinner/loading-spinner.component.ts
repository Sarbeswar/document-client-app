import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({ selector: 'app-loading-spinner', standalone: true, imports: [MatProgressSpinnerModule], template: '<div class="spinner"><mat-spinner [diameter]="diameter()" /></div>', styles: ['.spinner{display:grid;place-items:center;padding:2rem}'], changeDetection: ChangeDetectionStrategy.OnPush })
export class LoadingSpinnerComponent { diameter = input(48); }
