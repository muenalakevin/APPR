import { CategoriaPlato } from './../../shared/models/categoriaPlato';
import { Plato } from './../../shared/models/plato';
import { UsuarioEnviar } from './../../shared/models/usuarioEnviar';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from 'src/app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  platos = this.socket.fromEvent<Plato[]>('platos');
  categorias = this.socket.fromEvent<CategoriaPlato[]>('categorias');
  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}
  getPlatos(){
    return this.http.get(environment.API_URL + '/usuario',this.httpOptions);
  }

  guardarUsuario(usuario:UsuarioEnviar){
    return this.http.post(environment.API_URL + '/usuario',{usuario},this.httpOptions);
  }

  eliminarUsuario(_id:string){
    console.log(_id);
    return this.http.delete(environment.API_URL + '/usuario/'+_id,this.httpOptions);
  }

  editarUsuario(usuario:Usuario){
    return this.http.patch(environment.API_URL + '/usuario',{usuario},this.httpOptions);
  }

}
