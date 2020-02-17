import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ListItemModule } from 'src/app/components/list-item/list-item.module';
import { NewTermButtonModule } from 'src/app/components/new-term-button/new-term-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ListItemModule,
    NewTermButtonModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
