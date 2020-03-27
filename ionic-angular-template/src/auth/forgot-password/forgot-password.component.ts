import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public forgotPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    // private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
   }

   get email() { 
    return this.forgotPasswordForm.get('email'); 
  }

   async sendEmail() {
    await this.authService.sentResetPasswordEmail(this.email.value);
    //  this.notificationService.success('Email was sent!');
    //  this.route.navigate(['/signin']);
     this.route.navigate(['']);
   }

}
