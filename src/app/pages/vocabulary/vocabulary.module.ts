import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocabularyPageRoutingModule } from './vocabulary-routing.module';

import { VocabularyPage } from './vocabulary.page';
import { NewTermButtonModule } from 'src/app/components/new-term-button/new-term-button.module';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocabularyPageRoutingModule,
    NewTermButtonModule,
    PipesModule
  ],
  declarations: [VocabularyPage, ListItemComponent]
})
export class VocabularyPageModule {}
