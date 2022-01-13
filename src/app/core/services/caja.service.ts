import { Caja } from './../../shared/models/caja';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaService {


  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService) {}


  getCajasFecha(fechaInicio:Date,fechaFin:Date,tipoSeleccion:number,tipoFiltrado:number,cajero:string){
    return this.http.post(environment.API_URL + '/caja/fecha',{fechaInicio,fechaFin,tipoSeleccion,tipoFiltrado,cajero},this.httpOptions);
  }


  getCaja(){
    return this.http.get(environment.API_URL + '/caja',this.httpOptions);
  }

  guardarCaja(caja:Caja){
    return this.http.post(environment.API_URL + '/caja',{caja},this.httpOptions);

  }
  actualizarCaja(caja:Caja){
    return this.http.patch(environment.API_URL + '/caja',{caja},this.httpOptions);
  }

}
