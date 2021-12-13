import { MesasComponent } from './pages/mesas/mesas.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeseroComponent } from './mesero.component';

const routes: Routes = [
  { path: '',redirectTo:'mesas',pathMatch:'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'mesas', component: MesasComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes),
   
],
  exports: [RouterModule]
})
export class MeseroRoutingModule { }
