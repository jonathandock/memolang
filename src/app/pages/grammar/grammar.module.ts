import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrammarPageRoutingModule } from './grammar-routing.module';

import { GrammarPage } from './grammar.page';
import { NewTermButtonModule } from 'src/app/components/new-term-button/new-term-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrammarPageRoutingModule,
    NewTermButtonModule
  ],
  declarations: [GrammarPage]
})
export class GrammarPageModule {}
