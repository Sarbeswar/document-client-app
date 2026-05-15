import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { authGuard, roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent), title: 'Login' },
  {
    path: '',
    component: AdminLayoutComponent,
    canMatch: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent), title: 'Dashboard' },
      { path: 'upload', loadComponent: () => import('./features/document-upload/document-upload.component').then((m) => m.DocumentUploadComponent), title: 'Upload Document' },
      { path: 'tracking', loadComponent: () => import('./features/workflow-tracking/workflow-tracking.component').then((m) => m.WorkflowTrackingComponent), title: 'Workflow Tracking' },
      { path: 'download', loadComponent: () => import('./features/document-download/document-download.component').then((m) => m.DocumentDownloadComponent), title: 'Document Download', canMatch: [roleGuard(['Admin', 'DocumentReader', 'DocumentOwner'])] },
      { path: 'notifications', loadComponent: () => import('./features/notifications/notifications.component').then((m) => m.NotificationsComponent), title: 'Notifications' },
      { path: 'admin', loadComponent: () => import('./features/admin/admin.component').then((m) => m.AdminComponent), title: 'Admin', canMatch: [roleGuard(['Admin'])] }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
