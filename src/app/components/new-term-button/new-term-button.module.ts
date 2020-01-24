import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTermButtonComponent } from './new-term-button.component';
import { IonicModule } from '@ionic/angular';
import { TermFormComponent } from '../term-form/term-form.component';
import { TermFormModule } from '../term-form/term-form.module';



@NgModule({
  declarations: [
    NewTermButtonComponent
  ],
  exports: [
    NewTermButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TermFormModule
  ],
  entryComponents: [
    TermFormComponent
  ]
})
export class NewTermButtonModule { }
