import { configuracionEstilo } from './../../shared/models/configuracion.estilo';
import { Token } from '../../shared/models/token';
import { Session } from '../../shared/models/session';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageService;
  private currentSession : string;
  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }
  setCurrentSession(token: string): void {
    this.currentSession = token;
    this.localStorageService.setItem('token', JSON.stringify(token));
  }
  setConfiguracionEstilo(estilo: configuracionEstilo): void {
    this.localStorageService.setItem('estilo', JSON.stringify(estilo));
  }
  getConfiguracionEstilo(): configuracionEstilo {
    let estilo = this.localStorageService.getItem('estilo');
   return <configuracionEstilo> JSON.parse((estilo!=null)?estilo:'');
  }

  loadSessionData(): string{
    var sessionStr = this.localStorageService.getItem('token');
    return (sessionStr) ? <string> JSON.parse(sessionStr) : <string>'' ;
  }

  getCurrentSession(): string {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('token');
    this.currentSession = <string>'';
  }


  isAuthenticated(): boolean {
    const token=this.getCurrentSession();
    return (token != '') ? true : false;
  };

  getCurrentToken(): string {
    var token = this.getCurrentSession();
    return (token) ? token : '';
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/auth/login']);

  }

}
