import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermDetailsPageRoutingModule } from './term-details-routing.module';

import { TermDetailsPage } from './term-details.page';
import { TermFormComponent } from 'src/app/components/term-form/term-form.component';
import { TermFormModule } from 'src/app/components/term-form/term-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermDetailsPageRoutingModule,
    TermFormModule,
  ],
  declarations: [TermDetailsPage],
  entryComponents: [TermFormComponent]
})
export class TermDetailsPageModule {}
