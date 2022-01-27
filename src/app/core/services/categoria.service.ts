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
export class CategoriaService {
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

  getCategorias(){
    return this.http.get(environment.API_URL + '/categoria',this.httpOptions);
  }

  guardarCategoria(categoria:CategoriaPlato){
    return this.http.post(environment.API_URL + '/categoria',{categoria},this.httpOptions);
  }

  eliminarCategoria(_id:string){

    return this.http.delete(environment.API_URL + '/categoria/'+_id,this.httpOptions);
  }

  editarCategoria(categoria:CategoriaPlato){
    return this.http.patch(environment.API_URL + '/categoria',{categoria},this.httpOptions);
  }

}
