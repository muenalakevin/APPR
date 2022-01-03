import { Comprobante } from './../../shared/models/comprobante';
import { StorageService } from './storage.service';
import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
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
guardarCliente(comprobante:Comprobante){
  return this.http.post(environment.API_URL + '/comprobante',{comprobante},this.httpOptions);
}
getClientes(){
  return this.http.get(environment.API_URL + '/comprobante',this.httpOptions);
}
}