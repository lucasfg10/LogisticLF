import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoferesPageRoutingModule } from './choferes-routing.module';

import { ChofersPage } from './choferes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChoferesPageRoutingModule
  ],
  declarations: [ChofersPage]
})
export class ChoferesPageModule {}
