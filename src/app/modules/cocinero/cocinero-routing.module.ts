import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocineroComponent } from './cocinero.component';

const routes: Routes = [{ path: '', component: CocineroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocineroRoutingModule { }
