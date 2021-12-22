import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconNavbarComponent } from './../shared/components/iconNavbar/iconNavbar.component';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@NgModule({
  declarations: [
    NavbarComponent,
    IconNavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    
  ],
  exports:[
    NavbarComponent,
    IconNavbarComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
