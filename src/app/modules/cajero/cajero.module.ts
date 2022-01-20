import { EgresoComponent } from './pages/egreso/egreso.component';
import { CrearClienteComponent } from './components/crearCliente/crearCliente.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { CajaComponent, DialogPagar } from './pages/caja/caja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditarClienteComponent } from './components/editarCliente/editarCliente.component';
import { CerrarCajaComponent } from './components/cerrarCaja/cerrarCaja.component';
import { ComparativaCajaComponent } from './components/comparativaCaja/comparativaCaja.component';

@NgModule({
  declarations: [
    CajeroComponent,
    CajaComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    EgresoComponent,
    CerrarCajaComponent,
    ComparativaCajaComponent,
    DialogPagar
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
    DragDropModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,

  ]
})
export class CajeroModule { }
