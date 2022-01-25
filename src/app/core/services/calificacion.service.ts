import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService{
  calificacion = this.socket.fromEvent('calificacion');
  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}
    
  getCalificacion(){
    return this.http.get(environment.API_URL + '/calificacion',this.httpOptions);
  }

  guardarCalificacion(calificacion:Number){
    return this.http.post(environment.API_URL + '/calificacion',{calificacion},this.httpOptions);
  }


}
