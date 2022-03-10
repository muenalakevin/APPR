import { environment } from './../../../environments/environment.prod';
import { Socket } from 'ngx-socket-io';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Mesa } from './../../shared/models/mesa';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

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

  getMesas(){
    return this.http.get(environment.API_URL + '/mesa',this.httpOptions);
  }

  getMesa(idMesa:string|undefined){
    return this.http.get(environment.API_URL + '/mesa/'+idMesa,this.httpOptions);
  }

  guardarMesa(mesa:Mesa){
    return this.http.post(environment.API_URL + '/mesa',{mesa},this.httpOptions);
  }

  eliminarMesa(_id:string){

    return this.http.delete(environment.API_URL + '/mesa/'+_id,this.httpOptions);
  }

  editarMesa(mesa:Mesa){
    return this.http.patch(environment.API_URL + '/mesa',{mesa},this.httpOptions);
  }

}
