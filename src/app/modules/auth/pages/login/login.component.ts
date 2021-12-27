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
    private StorageService: StorageService,
    private AlertService:AlertService
  ) {}
  mensaje='';
  mensaje2='';
  mensaje3='';
  enviar=false;
  hide=true;
  loginForm = new FormGroup({
    usuario_usuario: new FormControl('', Validators.required),
    contrasenia_usuario: new FormControl('', [Validators.required]),
  });
  

ngOnInit(){
  this.loginForm = new FormGroup({
    usuario_usuario: new FormControl('', Validators.required),
    contrasenia_usuario: new FormControl('', [Validators.required,  Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
  });
  this.onValueChanges();
  
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
        }else{
          this.AlertService.showErrorServidor()
        }
        
      }
    );
  }
    
  }
  private correctLogin(token: Session) {
    
    this.StorageService.setCurrentSession(token.token);
    window.location.reload();
  }
}
