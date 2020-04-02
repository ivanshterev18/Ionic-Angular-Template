import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    this.initializeApp();
      this.activatedRoute.queryParams.subscribe((params) => {
        if (!params) {
          this.router.navigate(['']);
        }
        const mode = params.mode;
        const actionCode = params.oobCode;
        if (mode === 'verifyEmail') {
          this.router.navigate(['verifyEmail'], { queryParams: { oobCode: actionCode } });
          return;
        }
        if (mode === 'resetPassword') {
          this.router.navigate(['resetPassword'], { queryParams: { oobCode: actionCode } });
          return;
        }
      });
   }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
