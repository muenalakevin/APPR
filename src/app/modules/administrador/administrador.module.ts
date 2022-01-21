import { EgresosEIngresosComponent } from './charts/egresosEIngresos/egresosEIngresos.component';
import { AgregarClienteComponent } from './components/agregarCliente/agregarCliente.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditarPlatoComponent } from './components/editarPlato/editarPlato.component';
import { EditarCategoriaComponent } from './components/editarCategoria/editarCategoria.component';
import { AgregarCategoriaComponent } from './components/agregarCategoria/agregarCategoria.component';
import { MesasComponent } from './pages/mesas/mesas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';

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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AgregarMesaComponent } from './components/agregar-mesa/agregar-mesa.component';
import { EditarMesaComponent } from './components/editar-mesa/editar-mesa.component';
import { AgregacionRapidaComponent } from './components/agregacion-rapida/agregacion-rapida.component';
import { MatCheckboxDefaultOptions, MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { SwiperModule } from "swiper/angular";
import { NgApexchartsModule } from "ng-apexcharts";
import { ClientesDiaComponent } from './charts/clientesDia/clientesDia.component';
import { MinutosEntregasClientesComponent, CustomDateFormat2, CustomDateFormat1, CustomDateFormat3 } from './charts/minutosEntregasClientes/minutosEntregasClientes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PlatosDiaComponent } from './charts/platosDia/platosDia.component';
import { AgregarOpcionRapidaComponent } from './components/AgregarOpcionRapida/AgregarOpcionRapida.component';
import { EditarOpcionRapidaComponent } from './components/editarOpcionRapida/editarOpcionRapida.component';
import { AddEgresoComponent } from './components/egreso/addEgreso.component';
import { PedidosRealizadosComponent } from './charts/PedidosRealizados/PedidosRealizados.component';


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
    AgregarPlatoComponent,
    EditarPlatoComponent,
    AgregarMesaComponent,
    EditarMesaComponent,
    AgregacionRapidaComponent,
    ConfiguracionComponent,
    ClientesComponent,
    AgregarClienteComponent,
    ClientesDiaComponent,
    MinutosEntregasClientesComponent,
    EgresosEIngresosComponent,
    CustomDateFormat2,
    CustomDateFormat1,
    CustomDateFormat3,
    PlatosDiaComponent,
    AgregarOpcionRapidaComponent,
    EditarOpcionRapidaComponent,
    AddEgresoComponent,
    PedidosRealizadosComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    MatChipsModule,MatAutocompleteModule,
    MatCheckboxModule,
    FormsModule,
    FontAwesomeModule,
    SwiperModule,
    HttpClientModule,
    NgApexchartsModule,
    MatMomentDateModule,
  ],
  exports:[MatTableModule,MatSortModule,MatFormFieldModule,
    MatInputModule,MatPaginatorModule,MatIconModule,MatButtonModule,MatTabsModule,MatDatepickerModule,MatRadioModule,
    MatSidenavModule,MatSelectModule,MatCheckboxModule,
    ClientesDiaComponent,
    MinutosEntregasClientesComponent,PedidosRealizadosComponent,

  ],
  providers: [ MatDatepickerModule,  AdministradorGuard,{provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}]
})
export class AdministradorModule { }
