import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocineroRoutingModule } from './cocinero-routing.module';
import { CocineroComponent } from './cocinero.component';
import { CocinaComponent } from './pages/cocina/cocina.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    CocineroComponent,
    CocinaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    CocineroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    MatIconModule,

  ]
})
export class CocineroModule { }
