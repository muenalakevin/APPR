import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { CajaComponent } from './pages/caja/caja.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajeroComponent } from './cajero.component';

const routes: Routes = [
  { path: '', redirectTo:'caja',pathMatch:'full' },
  {path:'caja',component:CajaComponent},
  {path:'calificacion',component:CalificacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajeroRoutingModule { }
