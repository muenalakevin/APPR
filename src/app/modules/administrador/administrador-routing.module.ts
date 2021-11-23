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

const routes: Routes = [{ path: '', component: AdministradorComponent },
{ path: 'usuarios', component: UsuariosComponent,canActivate:[AuthGuard] },
{path: 'reportes', component: ReportesComponent,canActivate:[AuthGuard] },
{ path: 'platos', component: PlatosComponent },
{ path: 'mesas', component: MesasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
