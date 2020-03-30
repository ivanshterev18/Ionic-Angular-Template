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
    private readonly formBuilder: FormBuilder,
    // private notificationService: NotificationService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },  { validator: this.checkPasswords }) ;
    this.activateRoute();
  }

  activateRoute() {
    this.activatedRoute.queryParams
    .subscribe(async (params) => {
      this.mode = params.mode;
      this.actionCode = params.oobCode;
  });
  }

  checkPasswords(group: FormGroup) {
  let pass = group.get('newPassword').value;
  let confirmPass = group.get('confirmPassword').value;
  return pass === confirmPass ? null : { notSame: true }     
  }

  get newPassword() { 
    return this.resetPasswordForm.get('newPassword'); 
  }

  get confirmPassword() { 
    return this.resetPasswordForm.get('confirmPassword'); 
  }

  async resetPassword() {
    const newPassword = this.newPassword.value;
    const email = await this.authService.verifyPasswordResetCode(this.actionCode);
    await this.authService.resetPassword(newPassword, this.actionCode, email);
    // this.notificationService.success('Your password was changed !');
    this.router.navigate(['/signin']);
    }
}
