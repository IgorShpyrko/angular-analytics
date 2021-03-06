import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MzToastModule } from 'ngx-materialize';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './featured/header/header.component';
import { FooterComponent } from './featured/footer/footer.component';
import { AuthComponent } from './featured/pages/auth/auth.component';
import { CheckStatisticComponent } from './featured/pages/check-statistic/check-statistic.component';
import { AddSiteForAnalizeComponent } from './featured/pages/add-site-for-analize/add-site-for-analize.component';
import { WelcomeComponent } from './featured/pages/welcome/welcome.component';
import { LoginComponent } from './featured/pages/auth/login/login.component';
import { RegisterComponent } from './featured/pages/auth/register/register.component';
import { ForgotPasswordComponent } from './featured/pages/auth/forgot-password/forgot-password.component';
import { TableComponent } from './featured/pages/check-statistic/table/table.component';

import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { ErrorInterceptor } from 'src/app/core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,  
    AuthComponent,
    CheckStatisticComponent,
    AddSiteForAnalizeComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    TableComponent,
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
