import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  
  public mode: string;
  public actionCode: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private notificationService: NotificationService,
    private authService: AuthService,
  ) { 
    this.activatedRoute.queryParams
    .subscribe(async (params) => {
      if (!params) {
        this.router.navigate(['/']);
      }
      this.mode = params.mode;
      this.actionCode = params.oobCode;
      try {
          await this.authService.verifyEmail(this.actionCode);
          // this.notificationService.success('Your email was verified !');
          this.router.navigate(['signin']);
        } catch (e) {
          // this.notificationService.error(e);
        }
  });
  }

}
