import { EditarCategoriaComponent } from './components/editarCategoria/editarCategoria.component';
import { AgregarCategoriaComponent } from './components/agregarCategoria/agregarCategoria.component';
import { MesasComponent } from './pages/mesas/mesas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { AgregarUsuarioComponent } from './components/agregarUsuario/agregarUsuario.component';
import { PlatosComponent } from './pages/platos/platos.component';
import { RolTransformPipe } from './../../shared/pipes/rolTransform.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { AdministradorGuard } from './../../core/guard/administrador.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {MatDialogModule} from '@angular/material/dialog';
import { EditarUsuarioComponent } from './components/editarUsuario/editarUsuario.component';
import { AgregarPlatoComponent } from './components/agregar-plato/agregar-plato.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    ReportesComponent,
    UsuariosComponent,
    RolTransformPipe,
    PlatosComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    MesasComponent,
    AgregarCategoriaComponent,
    EditarCategoriaComponent,

  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule, 
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatRadioModule,MatSidenavModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule
    
  ],
  exports:[MatTableModule,MatSortModule,MatFormFieldModule,
    MatInputModule,MatPaginatorModule,MatIconModule,MatButtonModule,MatTabsModule,MatDatepickerModule,MatRadioModule,
    MatSidenavModule,MatSelectModule],
  providers: [AdministradorGuard]
})
export class AdministradorModule { }
