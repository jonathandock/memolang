import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermDetailsPageRoutingModule } from './term-details-routing.module';

import { TermDetailsPage } from './term-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermDetailsPageRoutingModule
  ],
  declarations: [TermDetailsPage]
})
export class TermDetailsPageModule {}
