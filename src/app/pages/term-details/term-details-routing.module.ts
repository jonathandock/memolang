import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermDetailsPage } from './term-details.page';

const routes: Routes = [
  {
    path: '',
    component: TermDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermDetailsPageRoutingModule {}
