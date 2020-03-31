import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private loggedUserSubscription: Subscription;
  public loggedUser: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    // private notificationService: NotificationService
     ) {}

  ngOnInit(): void {
    this.loggedUserSubscription = this.authService.loggedUserData$.subscribe(async (data) => this.loggedUser = await data);
  }
  ngOnDestroy(): void {
    if (this.loggedUserSubscription) {
      this.loggedUserSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    // this.notificationService.success('Successfully logout');
    this.router.navigate(['/signin']);
  }
}
