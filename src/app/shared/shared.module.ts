import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/common/core.module';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent
  ]
})
export class SharedModule { }
