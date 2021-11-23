import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocineroRoutingModule } from './cocinero-routing.module';
import { CocineroComponent } from './cocinero.component';


@NgModule({
  declarations: [
    CocineroComponent
  ],
  imports: [
    CommonModule,
    CocineroRoutingModule
  ]
})
export class CocineroModule { }
