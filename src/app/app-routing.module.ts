import { CocineroGuard } from './core/guard/cocinero.guard';
import { MeseroGuard } from './core/guard/mesero.guard';
import { CajeroGuard } from './core/guard/cajero.guard';

import { AdministradorGuard } from './core/guard/administrador.guard';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { LoginComponent } from './modules/auth/pages/login/login.component';

import { PageNotFoundComponent } from './core/helper/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
const routes: Routes = [
  {path:'',redirectTo:'/auth/login',pathMatch:'full'},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),canLoad:[AuthGuard]  },
  { path: 'administrador',
   loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule),canLoad:[AdministradorGuard]  },
  { path: 'cajero', loadChildren: () => import('./modules/cajero/cajero.module').then(m => m.CajeroModule),canLoad:[CajeroGuard]  },
  { path: 'mesero', loadChildren: () => import('./modules/mesero/mesero.module').then(m => m.MeseroModule) ,canLoad:[MeseroGuard] },
  { path: 'cocinero', loadChildren: () => import('./modules/cocinero/cocinero.module').then(m => m.CocineroModule),canLoad:[CocineroGuard]  },
  { path: 'perfil', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
