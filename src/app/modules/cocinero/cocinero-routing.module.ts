import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocineroComponent } from './cocinero.component';
import { CocinaComponent } from './pages/cocina/cocina.component';

const routes: Routes = [
  { path: '',redirectTo:'cocina',pathMatch:'full' },
  { path: 'cocina', component: CocinaComponent }];

@NgModule({


  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocineroRoutingModule { }
