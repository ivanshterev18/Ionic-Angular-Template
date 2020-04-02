import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  private infoMessages: any;
  public mode: string;
  public actionCode: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    private translateService: TranslateService,
    ) { 
    this.translateService.stream([
      'info-messages',
    ]).subscribe(translations => {
      this.infoMessages = translations['info-messages']
    });
    this.activatedRoute.queryParams
    .subscribe(async (params) => {
      if (!params) {
        this.router.navigate(['/']);
      }
      this.mode = params.mode;
      this.actionCode = params.oobCode;
      try {
          await this.authService.verifyEmail(this.actionCode);
          this.toastService.success(`${this.infoMessages.emailVerified}`);
          this.router.navigate(['signin']);
        } catch (e) {
          this.toastService.error(e.message);
        }
  });
  }

}
