import { Egreso } from './../../shared/models/egreso';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {


  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}


  getPedidos(){
    return this.http.get(environment.API_URL + '/pedido',this.httpOptions);
  }


  getPedidosFecha(fechaInicio:Date,fechaFin:Date,tipoSeleccion:number,tipoFiltrado:number,mesero:string){
    return this.http.post(environment.API_URL + '/pedido/fecha',{fechaInicio,fechaFin,tipoSeleccion,tipoFiltrado,mesero},this.httpOptions);
  }

  getrEgreso(idMesa:string){
    return this.http.get(environment.API_URL + '/pedido/'+idMesa,this.httpOptions);
  }

  getEgresosCaja(id:string){
    return this.http.get(environment.API_URL + '/egreso/caja/'+id,this.httpOptions);
  }
  guardarEgreso(egreso:Egreso){
    return this.http.post(environment.API_URL + '/egreso',{egreso},this.httpOptions);
  }
  getEgresosFecha(fechaInicio:Date,fechaFin:Date){
    return this.http.post(environment.API_URL + '/egreso/fecha',{fechaInicio,fechaFin},this.httpOptions);
  }
}
