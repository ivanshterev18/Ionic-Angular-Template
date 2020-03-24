import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.signIn(email, password);
  }


  async signIn(email: string, password: string) {
    const checkEmailVerified = await this.authService.checkUserEmailVerified(email, password);
    if (checkEmailVerified === false) {
        // this.modalService.open(this.emailModal);
      }
    this.authService.signIn().subscribe((d) => {
        console.log(d);
        // this.notificationService.success('Successfully logged!');
        this.router.navigate(['']);
      }, (e) => {
        this.showAlert(e.error.message)
      });
    }

    private showAlert(message: string) {
      this.alertCtrl
        .create({
          header: 'Authentication failed',
          message: message,
          buttons: ['Okay']
        })
        .then(alertEl => alertEl.present());
    }
}