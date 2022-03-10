import { ViewResetPasswordComponent } from './../../../administrador/components/viewResetPassword/viewResetPassword.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from './../../../../core/services/alert.service';
import { Token } from './../../../../shared/models/token';
import { Session } from 'src/app/shared/models/session';
import { UsuarioAuth } from './../../../../shared/models/usuarioAuth';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  /* public error: {code: number, message: string} = null; */
  public error:any;
  constructor(
    private router:Router,
    private AuthenticationService: AuthenticationService,
    public StorageService: StorageService,
    private AlertService:AlertService,
    private configuracionService:ConfiguracionService,
    private dialog:MatDialog,
  ) {}
  mensaje='';
  mensaje2='';
  mensaje3='';
  enviar=false;
  img:string='';
  banner:string='';
  hide=true;
  loginForm = new FormGroup({
    usuario_usuario: new FormControl('', Validators.required),
    contrasenia_usuario: new FormControl('', [Validators.required]),
  });


ngOnInit(){
  this.configuracionService.getBanner().subscribe(res=>{
    this.banner=res as string;
  })
  this.configuracionService.getLogo().subscribe(res=>{
    this.img=res as string;
  })
  this.loginForm = new FormGroup({
    usuario_usuario: new FormControl('', Validators.required),
    contrasenia_usuario: new FormControl('', [Validators.required,  Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
  });
  this.onValueChanges();

}

getLogo(){

  return 'data:image/jpeg;base64,'+this.img

}
getBanner(){

  return 'data:image/jpeg;base64,'+this.banner

}

onValueChanges(): void {

  this.loginForm.valueChanges.subscribe((val:UsuarioAuth)=>{
    if(val['usuario_usuario']!=''){
      this.mensaje2=''
    }

    if(val['contrasenia_usuario']!=''){
      this.mensaje3=''
    }
  })
}
  login() {
    if(this.loginForm.controls['usuario_usuario'].errors){
      this.mensaje2='Requiere ingresar usuario'
    }else{
      this.mensaje2=''
    }
    if(this.loginForm.controls['contrasenia_usuario'].errors){
      this.mensaje3='Requiere ingresar contraseña'
    }else{
      this.mensaje3=''
    }
  if(this.mensaje2=='' && this.mensaje3==''){
    const usuario: UsuarioAuth = {
      usuario_usuario: this.loginForm.value.usuario_usuario.trim(),
      contrasenia_usuario: this.loginForm.value.contrasenia_usuario,
    };
    this.AuthenticationService.login(usuario).subscribe(
      (data) => this.correctLogin(<Session>data),
      (error) =>{

        if(error.status == 403){
        this.AlertService.showWarning('Usuario o/y contraseña incorrecto')
        }else if(error.status == 409){
          this.AlertService.showWarning('Usuario se encuentra deshabilitado, si cree que esto es un error, comuníquese con el  administrador.')
        }else{
          this.AlertService.showErrorServidor()
        }

      }
    );
  }

  }
  reset(){
   let dialogref = this.dialog.open(ViewResetPasswordComponent)
   dialogref.afterClosed().subscribe(res=>{
     console.log(res);
   })
  }
  private correctLogin(token: Session) {

    this.StorageService.setCurrentSession(token.token);
    window.location.reload();
  }
}
