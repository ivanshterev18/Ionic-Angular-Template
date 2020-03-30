import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  public mode: string;
  public actionCode: string;
  public resetPasswordForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private readonly fb: FormBuilder,
    // private notificationService: NotificationService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.activatedRoute.queryParams
    .subscribe(async (params) => {
      this.mode = params.mode;
      this.actionCode = params.oobCode;
  });
  }

  get newPassword() { 
    return this.resetPasswordForm.get('newPassword'); 
  }

  get confirmPassword() { 
    return this.resetPasswordForm.get('confirmPassword'); 
  }

  async resetPassword() {
    const newPassword = this.newPassword.value;
    const confirmPassword = this.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      // this.notificationService.error('New Password and Confirm Password do not match');
      alert('New Password and Confirm Password do not match');
      return;
    }
    const email = await this.authService.verifyPasswordResetCode(this.actionCode);
    await this.authService.resetPassword(newPassword, this.actionCode, email);
    // this.notificationService.success('Your password was changed !');
    this.router.navigate(['/signin']);
    }
}
