import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  private infoMessages: any;
  public forgotPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private tranlateService: TranslateService,
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.tranlateService.get('info-messages').subscribe((messages) => {
      this.infoMessages = messages;
    });
   }

   get email() { 
    return this.forgotPasswordForm.get('email'); 
  }

   async sendEmail() {
    try {
      await this.authService.sentResetPasswordEmail(this.email.value);
      this.toastService.success(`${this.infoMessages.emailSent}`);
      this.route.navigate(['']);
    } catch(e) {
      this.toastService.error(e.message);
    }
   }

}
