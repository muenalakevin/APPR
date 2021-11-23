import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeseroComponent } from './mesero.component';

const routes: Routes = [{ path: '', component: MeseroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeseroRoutingModule { }
