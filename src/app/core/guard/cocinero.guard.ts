import { RolService } from '../services/rol.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocineroGuard implements CanLoad {
  constructor(private router: Router, private storageService: StorageService,private RolService:RolService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      const res=  this.RolService.isRol('cociero');
      if (res) {
        return true;
      }

      // not logged in so redirect to login page
      this.router.navigate(['/auth/login']);
      return false;
  }
}
