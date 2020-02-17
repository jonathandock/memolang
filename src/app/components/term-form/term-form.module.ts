import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermFormComponent } from './term-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TermFormComponent],
  exports: [TermFormComponent]
})
export class TermFormModule { }
