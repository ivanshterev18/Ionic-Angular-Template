import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  private infoMessages: any;
  public signUpForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.translateService.stream([
      'info-messages',
    ]).subscribe(translations => {
      this.infoMessages = translations['info-messages']
    });
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get email() { 
    return this.signUpForm.get('email'); 
  }

  get password() { 
    return this.signUpForm.get('password'); 
  }

  async signUp() {
    const email = this.email.value;
    const password = this.password.value;
    try {
        await this.authService.signUp(email, password);
        await this.showInfoAlert();
        this.router.navigate(['']);
    } catch(e) {
      this.showErrorAlert(e.message);
    }
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertCtrl
      .create({
        header: `${this.infoMessages.authFailed}`,
        message: message,
        buttons: ['Okay']
      })
      alert.present();
  }

  private async showInfoAlert() {
    const alert = await this.alertCtrl
      .create({
        header: `${this.infoMessages.infoMessage}`,
        message: `${this.infoMessages.message}`,
        buttons: [`${this.infoMessages.button}`]
      })
      alert.present();
  }
}
