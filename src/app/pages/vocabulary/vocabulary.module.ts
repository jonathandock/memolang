import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocabularyPageRoutingModule } from './vocabulary-routing.module';

import { VocabularyPage } from './vocabulary.page';
import { ListItemModule } from 'src/app/components/list-item/list-item.module';
import { NewTermButtonModule } from 'src/app/components/new-term-button/new-term-button.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocabularyPageRoutingModule,
    PipesModule,
    ListItemModule,
    NewTermButtonModule,
  ],
  declarations: [VocabularyPage]
})
export class VocabularyPageModule {}
