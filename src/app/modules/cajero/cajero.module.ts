import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajeroRoutingModule } from './cajero-routing.module';
import { CajeroComponent } from './cajero.component';
import { CajaComponent } from './pages/caja/caja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    CajeroComponent,
    CajaComponent
  ],
  imports: [
    CommonModule,
    CajeroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    FontAwesomeModule,
    MatIconModule,
    DragDropModule
  ]
})
export class CajeroModule { }
