import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { UsuarioAuth } from 'src/app/shared/models/usuarioAuth';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; // This is where I import map operator
import { Session } from 'src/app/shared/models/session';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  token: String = '';

  /* private currentUserSubject: BehaviorSubject<UsuarioAuth>;
    public currentUser: Observable<UsuarioAuth>; */
  constructor(private http: HttpClient) {}

  active(): boolean {
    return true;
  }

  login(loginObj: UsuarioAuth) {
    
    return this.http.post(environment.API_URL + '/auth', loginObj);
  }
  /* logout(): Observable<Boolean> {
    return this.http.post(environment.API_URL+ '/auth', {}).map(this.extractData);
  } */

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
