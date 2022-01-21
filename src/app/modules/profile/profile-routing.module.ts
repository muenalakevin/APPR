import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './editUser/editUser.component';


const routes: Routes = [
  { path: '',redirectTo:'perfil',pathMatch:'full' },
  { path: 'perfil', component: EditUserComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes),

],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
