import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CenteredContentDirective } from 'src/app/core/directives/centered-content/centered-content.directive';
import { AuthFormDisplayDirective } from 'src/app/core/directives/authFormDisplay/auth-form-display.directive';
import { LinkColorDirective } from 'src/app/core/directives/linkColorDirective/link-color.directive';
import { FormItemDirective } from 'src/app/core/directives/formItem/form-item.directive';
import { PassHelpDirective } from 'src/app/core/directives/pass-help/pass-help.directive';
import { BtnDirective } from 'src/app/core/directives/btn-directive/btn-directive.directive';

@NgModule({
  declarations: [
    CenteredContentDirective,
    LinkColorDirective,
    AuthFormDisplayDirective,
    FormItemDirective,
    PassHelpDirective,
    BtnDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CenteredContentDirective,
    LinkColorDirective,
    AuthFormDisplayDirective,
    FormItemDirective,
    PassHelpDirective,
    BtnDirective,
  ]
})
export class CoreModule { }
