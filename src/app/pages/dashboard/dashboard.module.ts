import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ListItemModule } from 'src/app/components/list-item/list-item.module';
import { NewTermButtonModule } from 'src/app/components/new-term-button/new-term-button.module';
import { QuickTranslateModule } from 'src/app/components/quick-translate/quick-translate.module';
import { QuizzModule } from 'src/app/components/quizz/quizz.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ListItemModule,
    NewTermButtonModule,
    QuickTranslateModule,
    QuizzModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
