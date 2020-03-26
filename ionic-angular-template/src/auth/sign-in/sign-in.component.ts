import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  private infoMessages: any;
  public signInForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private tranlate: TranslateService
  ) { }

  ngOnInit() {
    this.tranlate.get('Info-messages').subscribe((messages) => {
      this.infoMessages = messages;
    });
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get email() { 
    return this.signInForm.get('email'); 
  }

  get password() { 
    return this.signInForm.get('password'); 
  }

  async signIn() {
    const email = this.email.value;
    const password = this.password.value;
    try {
      const checkEmailVerified = await this.authService.checkUserEmailVerified(email, password);
      if (!checkEmailVerified) {
        this.showInfoAlert();
        }
      this.authService.signIn().subscribe((userData) => {
          console.log(userData);
          // this.notificationService.success('Successfully logged!');
          this.router.navigate(['']);
        }, (e) => {
          this.showErrorAlert(e.error.message)
        });
    } catch(e) {
          this.showErrorAlert(e);
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