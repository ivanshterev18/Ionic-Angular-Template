import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
        this.showInfoAlert();
        this.router.navigate(['']);
    } catch(e) {
      this.showErrorAlert(e.message);
    }
  }

  private async showErrorAlert(message: string) {
    const alert = await this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      alert.present();
  }

  private async showInfoAlert() {
    const alert = await this.alertCtrl
      .create({
        header: 'Info Message',
        message: 'If you want to use all functionalities you have to verify your email first!',
        buttons: ['Okay']
      })
      alert.present();
  }
}
