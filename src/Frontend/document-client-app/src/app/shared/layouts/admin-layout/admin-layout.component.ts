import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { SessionTimeoutService } from '../../../core/auth/session-timeout.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatBadgeModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {
  readonly darkMode = signal(false);
  readonly unreadCount = computed(() => this.notifications.messages().filter((m) => !m.read).length);
  readonly nav = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/upload', icon: 'cloud_upload', label: 'Upload' },
    { path: '/tracking', icon: 'timeline', label: 'Tracking' },
    { path: '/download', icon: 'download', label: 'Download' },
    { path: '/notifications', icon: 'notifications', label: 'Alerts' },
    { path: '/admin', icon: 'admin_panel_settings', label: 'Admin' }
  ];
  constructor(readonly auth: AuthService, readonly notifications: NotificationService, sessionTimeout: SessionTimeoutService) { this.notifications.startPolling(); sessionTimeout.start(); }
  toggleTheme(): void { this.darkMode.update((value) => !value); }
  logout(): void { this.auth.logout(); }
}
