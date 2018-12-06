import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MzToastModule } from 'ngx-materialize';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from 'src/app/common/core.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { AnalizeComponent } from './components/pages/analize/analize.component';
import { AddSiteForAnalizeComponent } from './components/pages/add-site-for-analize/add-site-for-analize.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { ForgotPasswordComponent } from './components/pages/auth/forgot-password/forgot-password.component';
import { ActionPartComponent } from './components/pages/analize/table/action-part/action-part.component';
import { TableComponent } from './components/pages/analize/table/table/table.component';

import { AuthInterceptor } from 'src/app/common/interceptors/auth.interceptor';
import { ErrorInterceptor } from 'src/app/common/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    AnalizeComponent,
    AddSiteForAnalizeComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    TableComponent,
    ActionPartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MzToastModule,
    CoreModule,
  ],
  exports: [
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
