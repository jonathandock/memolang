import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuickTranslateComponent } from './quick-translate.component';
import { TermFormComponent } from '../term-form/term-form.component';
import { TermFormModule } from '../term-form/term-form.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TermFormModule
  ],
  declarations: [QuickTranslateComponent],
  exports: [QuickTranslateComponent],
  entryComponents: [TermFormComponent]
})
export class QuickTranslateModule { }
