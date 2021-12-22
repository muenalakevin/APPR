import { RolService } from '../services/rol.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';


@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanLoad  {
  constructor(private RolService:RolService,
    private router:Router){}
   canLoad(
    route:Route,
    segments:UrlSegment[]): boolean {
     const res=  this.RolService.isRol('admin');
      if (res) {
        return true;
      }
  
      // not logged in so redirect to login page
      this.router.navigate(['/auth/login']);
      return false;
  }
  
}
