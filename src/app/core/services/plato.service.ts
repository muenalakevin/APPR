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
    return this.http.get(environment.API_URL + '/plato',this.httpOptions);
  }

  guardarPlato(plato:Plato){
    return this.http.post(environment.API_URL + '/plato',{plato},this.httpOptions);
  }

  eliminarPlato(_id:string){
    console.log(_id);
    return this.http.delete(environment.API_URL + '/plato/'+_id,this.httpOptions);
  }

  
  editarPlato(plato:Plato){
    return this.http.patch(environment.API_URL + '/plato',{plato},this.httpOptions);
  }
  subirFoto(foto:File){
    const fd=new FormData();
    fd.append('image',foto)
    console.log(foto);
    return this.http.post(environment.API_URL + '/plato/subirFoto',{fd},this.httpOptions);
  }
}
