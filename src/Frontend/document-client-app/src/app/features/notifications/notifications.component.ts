import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../core/services/notification.service';

@Component({ selector: 'app-notifications', standalone: true, imports: [DatePipe, MatButtonModule, MatCardModule, MatIconModule], templateUrl: './notifications.component.html', styleUrl: './notifications.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class NotificationsComponent { constructor(readonly notifications: NotificationService) {} }
