import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({ selector: 'app-login', standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule], templateUrl: './login.component.html', styleUrl: './login.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class LoginComponent {
  readonly loading = signal(false);
  readonly form = this.fb.nonNullable.group({ username: ['', Validators.required], password: ['', Validators.required] });
  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router, private readonly notifications: NotificationService) {}
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.auth.login(this.form.getRawValue()).subscribe({ next: () => void this.router.navigate(['/dashboard']), error: () => this.loading.set(false), complete: () => { this.loading.set(false); this.notifications.success('Signed in successfully'); } });
  }
}
