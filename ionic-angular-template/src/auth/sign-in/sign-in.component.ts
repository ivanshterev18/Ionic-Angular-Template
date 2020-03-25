import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
        const alert = await this.alertCtrl
        .create({
          header: 'Info Message',
          message: 'If you want to use all functionalities you have to verify your email first!',
          buttons: ['Okay']
        })
        alert.present();
        }
      this.authService.signIn().subscribe((userData) => {
          console.log(userData);
          // this.notificationService.success('Successfully logged!');
          this.router.navigate(['']);
        }, (e) => {
          this.showAlert(e.error.message)
        });
    } catch(e) {
          this.showAlert(e);
    }
    }

    private async showAlert(message: string) {
      const alert = await this.alertCtrl
        .create({
          header: 'Authentication failed',
          message: message,
          buttons: ['Okay']
        })
        alert.present();
    }
}