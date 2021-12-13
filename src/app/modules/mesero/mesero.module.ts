import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MesasComponent } from './pages/mesas/mesas.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import { MeseroRoutingModule } from './mesero-routing.module';
import { MeseroComponent } from './mesero.component';


@NgModule({
  declarations: [
    MeseroComponent,
    MesasComponent
  ],
  imports: [
    CommonModule,
    MeseroRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MeseroModule { }
