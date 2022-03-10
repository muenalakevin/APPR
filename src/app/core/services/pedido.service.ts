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

  pedidos = this.socket.fromEvent<Pedido[]>('pedidos');

  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}

    getAllPedidos(){
      return this.http.get(environment.API_URL + '/pedido/all',this.httpOptions);
    }
  getPedidos(){
    return this.http.get(environment.API_URL + '/pedido',this.httpOptions);
  }


  getPedidosFecha(fechaInicio:Date,fechaFin:Date,tipoSeleccion:number,tipoFiltrado:number,mesero:string){
    return this.http.post(environment.API_URL + '/pedido/fecha',{fechaInicio,fechaFin,tipoSeleccion,tipoFiltrado,mesero},this.httpOptions);
  }

  getPedido(idMesa:string|undefined){
    return this.http.get(environment.API_URL + '/pedido/'+idMesa,this.httpOptions);
  }
  getPedido2(idMesa:string){
    return this.http.get(environment.API_URL + '/pedido/2/'+idMesa,this.httpOptions);
  }

  guardarPedido(pedido:Pedido){
    return this.http.post(environment.API_URL + '/pedido',{pedido},this.httpOptions);
  }

  eliminarPedido(id_mesa:string|undefined,id_pedido:string|undefined){

    return this.http.post(environment.API_URL + '/pedido/delete',{id_pedido,id_mesa},this.httpOptions);
  }


  editarPedido(pedido:Pedido|undefined){
    return this.http.patch(environment.API_URL + '/pedido',{pedido},this.httpOptions);
  }

  enviarPedido(pedido:Pedido){
    return this.http.post(environment.API_URL + '/pedido/enviar',{pedido},this.httpOptions);
  }

}
