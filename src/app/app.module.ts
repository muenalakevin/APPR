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
/* const config: SocketIoConfig = { url: "http://localhost:3000" , options: {
  query: {
    token: localStorage.getItem("token")+""
  }
}}; */

const config: SocketIoConfig = { url: "http://localhost:3000" , options: {
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    SocketIoModule.forRoot(config),
    NgxBootstrapConfirmModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
