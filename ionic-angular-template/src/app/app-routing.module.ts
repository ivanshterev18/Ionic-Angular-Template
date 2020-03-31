import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from '../auth/verify-email/verify-email.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoggedInGuard } from '../guards/logged.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module')
    .then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'signin',
    component: SignInComponent,
    pathMatch: 'full',
    canActivate: [LoggedInGuard]
  },
  { 
    path: 'signup',
    component: SignUpComponent,
    pathMatch: 'full',
    canActivate: [LoggedInGuard]
  },
  { 
    path: 'forgotPassword', 
    component: ForgotPasswordComponent, 
    pathMatch: 'full'
  },  
  { 
    path: 'verifyEmail', 
    component: VerifyEmailComponent, 
    pathMatch: 'full'
  },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
