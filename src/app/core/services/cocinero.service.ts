import { CategoriaCocinero } from './../../shared/models/categoriasCocinero';
import { environment } from './../../../environments/environment.prod';
import { Socket } from 'ngx-socket-io';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CocineroService {
  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };
  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}
  obtenerCategoriasCocinero(){
  return this.http.get(environment.API_URL + '/cocinero',this.httpOptions);
  }
  updateCategoriasCocinero(categoriaCocinero:CategoriaCocinero){
  return this.http.patch(environment.API_URL + '/cocinero',categoriaCocinero,this.httpOptions);
  }

}
