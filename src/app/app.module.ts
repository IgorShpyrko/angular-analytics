import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { AnalizeComponent } from './components/pages/analize/analize.component';
import { AddSiteForAnalizeComponent } from './components/pages/add-site-for-analize/add-site-for-analize.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { LinkColorDirective } from './directives/linkColorDirective/link-color.directive';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { ForgotPasswordComponent } from './components/pages/auth/forgot-password/forgot-password.component';
import { AuthFormDisplayDirective } from './directives/authFormDisplay/auth-form-display.directive';
import { FormItemDirective } from './directives/formItem/form-item.directive';
import { HttpClientModule } from '@angular/common/http';
import { PassHelpDirective } from './directives/pass-help/pass-help.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    AnalizeComponent,
    AddSiteForAnalizeComponent,
    WelcomeComponent,
    LinkColorDirective,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AuthFormDisplayDirective,
    FormItemDirective,
    PassHelpDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
