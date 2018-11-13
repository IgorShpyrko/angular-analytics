import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { AnalizeComponent } from './components/pages/analize/analize.component';
import { AddSiteForAnalizeComponent } from './components/pages/add-site-for-analize/add-site-for-analize.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'auth', component: AuthComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]},
  {path: 'analize', component: AnalizeComponent, canActivate: [AuthGuard]},
  {path: 'new', component: AddSiteForAnalizeComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
