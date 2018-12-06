import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CenteredContentDirective } from 'src/app/common/directives/centered-content/centered-content.directive';
import { AuthFormDisplayDirective } from 'src/app/common/directives/authFormDisplay/auth-form-display.directive';
import { LinkColorDirective } from 'src/app/common/directives/linkColorDirective/link-color.directive';
import { FormItemDirective } from 'src/app/common/directives/formItem/form-item.directive';
import { PassHelpDirective } from 'src/app/common/directives/pass-help/pass-help.directive';
import { BtnDirective } from 'src/app/common/directives/btn-directive/btn-directive.directive';

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
