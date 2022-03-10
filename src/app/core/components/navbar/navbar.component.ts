import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionEstilo } from './../../../shared/models/configuracion.estilo';
import { Usuario } from 'src/app/shared/models/usuario';
import jwt_decode  from 'jwt-decode';
import { Token } from './../../../shared/models/token';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Route, Router } from "@angular/router";
  import { faChartArea,faUser, faHamburger,faUtensils, faCashRegister, faDesktop,faUsers,faSquare,faFish,faCogs,faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {   } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import {  } from '@fortawesome/free-regular-svg-icons';
import {  } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  chartAreaIcon = faChartArea;
  userIcon=faUser;
  hamburgerIcon =faHamburger
  utensilsIcon=faUtensils
  cogsIcon=faCogs
  desktopIcon=faDesktop
  userFriendsIcon=faUserFriends
  cashRegisterIcon=faCashRegister
  usersIcon =faUsers;
  fish= faFish
  squareIcon=faSquare
  usuario:Token = new Token()
configuracionEstilo:configuracionEstilo = new configuracionEstilo();

  constructor(private AuthenticationService:AuthenticationService,
    private StorageService:StorageService,
    private route:Router,
    private configuracionService:ConfiguracionService) {

      this.configuracionService.getConfiguracionEstilo().subscribe((configuracionEstilo:any)=>{
        this.configuracionEstilo = configuracionEstilo
      });
      const token:string = this.StorageService.getCurrentSession();

    if(token != ''){
      const tokenDecode:Token = jwt_decode(token);
      this.usuario= <Token>tokenDecode;
     }
    }
  state:boolean=false;
  ngOnInit(): void {

    this.state = this.StorageService.isAuthenticated()
    if(window.location.href.split("/")[4]=="calificacion"){
      this.state = false;
    }
  }

  public logout(): void{
    this.StorageService.logout();
    this.state = this.StorageService.isAuthenticated()
    /* this.AuthenticationService.logout().subscribe(
        response => {if(response) {this.StorageService.logout();}}
    ); */
  }

}
