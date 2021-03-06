import { environment } from './../../../environments/environment';
import { Socket } from 'ngx-socket-io';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

 // platos = this.socket.fromEvent<Pedido[]>('platos');

  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}

  /* getPedidos(){
    return this.http.get(environment.API_URL + '/pedido',this.httpOptions);
  } */
  getPedido(idMesa:string){
    return this.http.get(environment.API_URL + '/pedido/'+idMesa,this.httpOptions);
  }

  guardarPedido(pedido:Pedido){
    return this.http.post(environment.API_URL + '/pedido',{pedido},this.httpOptions);
  }

  eliminarPedido(idMesa:string){

    return this.http.delete(environment.API_URL + '/pedido/'+idMesa,this.httpOptions);
  }

  
  editarPedido(pedido:Pedido){
    return this.http.patch(environment.API_URL + '/pedido',{pedido},this.httpOptions);
  }

}
