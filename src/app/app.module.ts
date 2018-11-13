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
import { BtnColorDirective } from './directives/btn-color.directive';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    AnalizeComponent,
    AddSiteForAnalizeComponent,
    WelcomeComponent,
    BtnColorDirective,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
