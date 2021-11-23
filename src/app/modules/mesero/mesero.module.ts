import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeseroRoutingModule } from './mesero-routing.module';
import { MeseroComponent } from './mesero.component';


@NgModule({
  declarations: [
    MeseroComponent
  ],
  imports: [
    CommonModule,
    MeseroRoutingModule
  ]
})
export class MeseroModule { }
