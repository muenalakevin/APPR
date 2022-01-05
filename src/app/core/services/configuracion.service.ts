import { environment } from './../../../environments/environment.prod';
import { Socket } from 'ngx-socket-io';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Mesa } from './../../shared/models/mesa';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  mesas = this.socket.fromEvent<Mesa[]>('mesas');

  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };
  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}

    /* configuracionMesero */
    getConfiguracionMesero(){
      return this.http.get(environment.API_URL + '/configuracion/mesero',this.httpOptions);
    }
}
