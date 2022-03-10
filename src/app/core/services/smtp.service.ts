import { SMTP } from './../../shared/models/smtp';
import { Socket } from 'ngx-socket-io';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmtpService {


  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.StorageService.getCurrentSession()
  });

  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient,private StorageService:StorageService,
    private socket:Socket) {}
  getSMTP(){
    return this.http.get(environment.API_URL + '/smtp',this.httpOptions);
  }
  editaSMTP(smtp:SMTP){
    return this.http.patch(environment.API_URL + '/smtp',{smtp},this.httpOptions);
  }
  testSMTP(smtp:SMTP){
    return this.http.post(environment.API_URL + '/smtp/test',{smtp},this.httpOptions);
  }
  resetPassword(email:string){
    return this.http.post(environment.API_URL + '/smtp/resetPassword',{email},this.httpOptions);
  }



}
