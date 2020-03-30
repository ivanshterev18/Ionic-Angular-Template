import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Validator } from '../../validators/validator';

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
    private validator: Validator
    // private notificationService: NotificationService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), this.validator.matchValues('newPassword')]]
    }) ;
    this.getActivatedRoute();
  }
  
  getActivatedRoute() {
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
    const email = await this.authService.verifyPasswordResetCode(this.actionCode);
    await this.authService.resetPassword(newPassword, this.actionCode, email);
    // this.notificationService.success('Your password was changed !');
    this.router.navigate(['/signin']);
    }
}
