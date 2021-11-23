import { Token } from './../../shared/models/token';
import  jwt_decode  from 'jwt-decode';

import { RolService } from '../services/rol.service';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private storageService: StorageService,private RolService:RolService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.storageService.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/auth/login']);
    return false;
  }
  async canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Promise<boolean> {

    if (this.storageService.isAuthenticated()) {
     const token = this.storageService.getCurrentToken();
     if(token!=''){
      const tokenDecode:Token = jwt_decode(token);
      const rol = tokenDecode.rol.nombre_rol;
      this.router.navigate([`/${rol}`]);
      return false;
     }    
     return false;
    } else {
      return true;
    }
  }
}
