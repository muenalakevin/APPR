import { Token } from '../../shared/models/token';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Rol } from 'src/app/shared/models/rol';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private HttpClient: HttpClient,
    private StorageService:StorageService,private http: HttpClient) {}

    headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+this.StorageService.getCurrentSession()
    });

    httpOptions = {
      headers: this.headers_object
    };
    getRols(): Observable<Rol[]> {
      return this.http.get<Rol[]>(environment.API_URL + '/rol',this.httpOptions);
    }

  isRol(codigo_rol:string): boolean{
    const token:string = this.StorageService.getCurrentSession();
    let exist:boolean=false;
    if(token != ''){
      const tokenDecode:Token = jwt_decode(token);
      if(tokenDecode.rol.codigo_rol == codigo_rol){
        return true;
      }else{
        return false;
      }
    }
    return exist
  }
}
