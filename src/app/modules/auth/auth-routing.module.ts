import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
const routes: Routes = [
  { path: '', component: LoginComponent,pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetPasswordComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
