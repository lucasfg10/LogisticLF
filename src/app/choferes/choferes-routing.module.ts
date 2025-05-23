import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChofersPage } from './choferes.page';

const routes: Routes = [
  {
    path: '',
    component: ChofersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoferesPageRoutingModule {}
