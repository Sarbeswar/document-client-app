import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({ selector: 'app-admin', standalone: true, imports: [MatCardModule, MatIconModule], template: `<header class="page-header"><h1>Administration</h1><p>Operational controls for enterprise document workflows.</p></header><mat-card><mat-icon>admin_panel_settings</mat-icon><h2>Gateway-integrated administration</h2><p>Extend this area with lookup management, authorization policy controls and audit exports from the existing backend services.</p></mat-card>`, styles: ['.page-header{margin-bottom:1rem}.page-header h1{margin:0}.page-header p{color:#64748b}mat-card{padding:1.5rem}mat-icon{color:#2563eb}'], changeDetection: ChangeDetectionStrategy.OnPush })
export class AdminComponent {}
