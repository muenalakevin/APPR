import { UsuarioEnviar } from './../../shared/models/usuarioEnviar';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from 'src/app/shared/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuarios = this.socket.fromEvent<Usuario[]>('usuarios');

  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}
  getUsers(){
    return this.http.get(environment.API_URL + '/usuario',this.httpOptions);
  }
  
  getUsersMeseros(){
    return this.http.get(environment.API_URL + '/usuario/mesero',this.httpOptions);
  }

  guardarUsuario(usuario:UsuarioEnviar){
    return this.http.post(environment.API_URL + '/usuario',{usuario},this.httpOptions);
  }

  eliminarUsuario(_id:string){
    console.log(_id);
    return this.http.delete(environment.API_URL + '/usuario/'+_id,this.httpOptions);
  }

  searchUser(usuario_usuario:string){
    return this.http.post(environment.API_URL + '/usuario/searchUsername',{usuario_usuario},this.httpOptions);
  }
  searchEmail(correo_usuario:string){
    return this.http.post(environment.API_URL + '/usuario/searchEmail',{correo_usuario},this.httpOptions);
  }
  editarUsuario(usuario:Usuario){
    return this.http.patch(environment.API_URL + '/usuario',{usuario},this.httpOptions);
  }
  
  
  
/* 
  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  } */
}
