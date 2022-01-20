import { MaterialElevationDirective } from './material-elevation.directive';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { environment } from './../environments/environment';

import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { RouterModule } from '@angular/router';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import { ServiceWorkerModule } from '@angular/service-worker';

/* const config: SocketIoConfig = { url: "http://localhost:3000" , options: {
  query: {
    token: localStorage.getItem("token")+""
  }
}}; */


const config: SocketIoConfig = { url: "http://192.168.1.201:3000" , options: {
  transportOptions: {
    polling: {
      extraHeaders: {
        'authorization':localStorage.getItem("token")
      }

    }

  }
}};
@NgModule({
  declarations: [
    AppComponent,
    MaterialElevationDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    SocketIoModule.forRoot(config),
    NgxBootstrapConfirmModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })


  ],
  providers: [ { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
