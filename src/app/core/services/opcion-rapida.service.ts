import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { OpcionRapida } from 'src/app/shared/models/opcionRapida';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionRapidaService {
  opcionesRapidas = this.socket.fromEvent<OpcionRapida[]>('opcionesRapidas');
  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}

  getOpcionesRapidas(){
    return this.http.get(environment.API_URL + '/opcionRapida',this.httpOptions);
  }

  guardarOpcionRapida(opcionRapida:OpcionRapida){
    return this.http.post(environment.API_URL + '/opcionRapida',{opcionRapida},this.httpOptions);
  }

  eliminarOpcionRapida(_id:string){
    console.log(_id);
    return this.http.delete(environment.API_URL + '/opcionRapida/'+_id,this.httpOptions);
  }

  editarOpcionRapida(opcionRapida:OpcionRapida){
    return this.http.patch(environment.API_URL + '/opcionRapida',{opcionRapida},this.httpOptions);
  }

}
