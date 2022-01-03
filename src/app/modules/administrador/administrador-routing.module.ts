import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { MesasComponent } from './pages/mesas/mesas.component';
import { PlatosComponent } from './pages/platos/platos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { AdministradorGuard } from './../../core/guard/administrador.guard';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', redirectTo:"reportes" },
{ path: 'usuarios', component: UsuariosComponent},
{path: 'reportes', component: ReportesComponent },
{ path: 'platos', component: PlatosComponent },
{ path: 'mesas', component: MesasComponent },
{ path: 'clientes', component: ClientesComponent },
{ path: 'configuracion', component: ConfiguracionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
