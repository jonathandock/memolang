import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTermButtonComponent } from './new-term-button.component';
import { IonicModule } from '@ionic/angular';
import { TermFormComponent } from '../term-form/term-form.component';
import { TermFormModule } from '../term-form/term-form.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TermFormModule
  ],
  declarations: [NewTermButtonComponent],
  exports: [NewTermButtonComponent],
  entryComponents: [TermFormComponent]
})
export class NewTermButtonModule { }
