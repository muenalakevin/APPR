import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Cliente } from './../../shared/models/cliente';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };
constructor(
  private http:HttpClient,
  private StorageService:StorageService,
) { }
      guardarCliente(cliente:Cliente){
        return this.http.post(environment.API_URL + '/cliente',{cliente},this.httpOptions);
      }
      getClientes(){
        return this.http.get(environment.API_URL + '/cliente',this.httpOptions);
      }
}
