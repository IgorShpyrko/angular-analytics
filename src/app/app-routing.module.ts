import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './featured/pages/welcome/welcome.component';
import { AuthComponent } from './featured/pages/auth/auth.component';
import { CheckStatisticComponent } from './featured/pages/check-statistic/check-statistic.component';
import { AddSiteForAnalizeComponent } from './featured/pages/add-site-for-analize/add-site-for-analize.component';
import { LoginComponent } from './featured/pages/auth/login/login.component';
import { RegisterComponent } from './featured/pages/auth/register/register.component';
import { ForgotPasswordComponent } from './featured/pages/auth/forgot-password/forgot-password.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full'},
  { path: 'auth', component: AuthComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
  ]},
  { path: 'analize', component: CheckStatisticComponent, canActivate: [AuthGuard]},
  { path: 'new', component: AddSiteForAnalizeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
