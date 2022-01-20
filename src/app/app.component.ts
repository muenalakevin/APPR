import { Subscription } from 'rxjs';
import { configuracionEstilo } from './shared/models/configuracion.estilo';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import jwt_decode  from 'jwt-decode';
import { Token } from './shared/models/token';
import { StorageService } from 'src/app/core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { faChartArea,faUser, faHamburger,faUtensils, faCashRegister, faUsers,faSquare,faFish,faCogs,faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usuario
  estiloSuscribe:Subscription 
  state:boolean=false;
  constructor(
    private StorageService:StorageService,
    private configuracionService:ConfiguracionService
  ){
    this.configuracionService.getConfiguracionEstilo().subscribe(configuracionEstilo=>{
      let conf =  configuracionEstilo as configuracionEstilo;
      this.StorageService.setConfiguracionEstilo(conf);
    })
    this.estiloSuscribe = this.configuracionService.configuracionEstilo.subscribe(
      (configuracionEstilo) => {
        console.log(configuracionEstilo);
        let conf =  configuracionEstilo as configuracionEstilo;
        this.StorageService.setConfiguracionEstilo(conf);

      }
    );
    
    this. estiloSuscribe 
    const token:string = this.StorageService.getCurrentSession();
      
    if(token != ''){
      const tokenDecode:Token = jwt_decode(token);
      this.usuario= <Token>tokenDecode;
     }
  }
  chartAreaIcon = faChartArea;
  userIcon=faUser;
  hamburgerIcon =faHamburger
  utensilsIcon=faUtensils
  cogsIcon=faCogs
  userFriendsIcon=faUserFriends
  cashRegisterIcon=faCashRegister
  usersIcon =faUsers;
  fish= faFish
  squareIcon=faSquare
  title = 'APPR';
  desktop = true;
  ngOnInit(): void {
    console.log(window.screen.width);
    if (window.screen.width <= 900) { // 768px portrait
      this.desktop = false;
  }
  this.state = this.StorageService.isAuthenticated()
}
 
public logout(): void{
  this.StorageService.logout();
  this.state = this.StorageService.isAuthenticated()
  /* this.AuthenticationService.logout().subscribe(
      response => {if(response) {this.StorageService.logout();}}
  ); */
}
checked(){
  console.log("sss");
  let child_1 = document.getElementById('child1')
  let child_2 = document.getElementById('child2')
  if(child_1.classList.contains('d-none')){

    child_1.classList.add('d-block')
    child_1.classList.remove('d-none')
    child_2.classList.remove('d-block')
    child_2.classList.add('d-none')
  }else{

    child_1.classList.remove('d-block')
    child_2.classList.remove('d-none')
    child_1.classList.add('d-none')
    child_2.classList.add('d-block')
  }
  
}
 

}
