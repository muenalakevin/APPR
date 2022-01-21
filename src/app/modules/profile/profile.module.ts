import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { PerfilRoutingModule } from './profile-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AdministradorRoutingModule } from '../administrador/administrador-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { EditUserComponent } from './editUser/editUser.component';

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MatNativeDateModule,
    AdministradorRoutingModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    FormsModule,
    FontAwesomeModule,
    SwiperModule,
    HttpClientModule,
    NgApexchartsModule,
    MatMomentDateModule,
  ],
  declarations: [
    ProfileComponent,
    EditUserComponent
  ],
  exports:[
    EditUserComponent
  ]
})
export class ProfileModule { }
