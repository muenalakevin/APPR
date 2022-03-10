import { UsuarioService } from './../../../../core/services/usuario.service';
import { UsuarioEnviar } from './../../../../shared/models/usuarioEnviar';
import { AlertService } from './../../../../core/services/alert.service';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from './../../../../shared/models/rol';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/models/usuario';


@Component({
  selector: 'app-agregarUsuario',
  templateUrl: './agregarUsuario.component.html',
  styleUrls: ['./agregarUsuario.component.css'],

})
export class AgregarUsuarioComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;
  roles:Rol[]=[]
  usuarioForm: FormGroup;

  timeOutUsername:any
  existUser=false;
  async ifExistUser() {
    clearTimeout(this.timeOutUsername);
    this.timeOutUsername = setTimeout(()=>{this.UsuarioService.searchUser( this.usuarioForm.value.usuario_usuario).subscribe(resp=>{
      this.existUser= true
    },
      err=> this.existUser=false
    )}, 1000);
  }
  existEmail=false;
  timeOutEmaul:any
  async ifExistEmail() {
    //console.log("si");
    clearTimeout(this.timeOutEmaul);
    this.timeOutEmaul = setTimeout(()=>{this.UsuarioService.searchEmail( this.usuarioForm.value.correo_usuario).subscribe(resp=>{
      this.existEmail= true

    },
      err=> this.existEmail=false
    )}, 1000);
  }

  constructor(
    private RolService:RolService,
    private AlertService:AlertService,
    private UsuarioService:UsuarioService,
    public dialogRef: MatDialogRef<AgregarUsuarioComponent>) {
    this.usuarioForm = new FormGroup({
      nombre_usuario: new FormControl(null, [
        Validators.required,
      ]),
      usuario_usuario: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+$")
      ]),
      correo_usuario: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      contrasenia_usuario: new FormControl(null, [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),


      ]),
      rol_usuario: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
    this.RolService.getRols()
    .subscribe( data => {
      this.roles = <Rol[]>data;
    })

  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.usuarioForm.get('nombre_usuario')?.errors?.['required']){
      mensajeWarnign += "Falta nombre de usuario. <br>"
    }
    if(this.usuarioForm.get('correo_usuario')?.errors?.['required']){
      mensajeWarnign += "Falta correo de usuario. <br/>"
    }else if(this.usuarioForm.get('correo_usuario')?.errors?.['email']){
      mensajeWarnign += "El correo no cuenta con un formato correcto. <br/>"
    }
    if(this.usuarioForm.get('usuario_usuario')?.errors?.['required']){
      mensajeWarnign += "Falta usuario. <br/>"
    }else  if(this.usuarioForm.get('usuario_usuario')?.errors?.['pattern']){
      mensajeWarnign += "Usuario solo puede contener letras.<br/>"
    }

    if(this.usuarioForm.get('contrasenia_usuario')?.errors?.['required']){
      mensajeWarnign += "Falta contraseña de usuario. <br/>"
    }else if(this.usuarioForm.get('contrasenia_usuario')?.errors?.['pattern']){
      mensajeWarnign += "Contraseña debe contener 8 caracteres, por lo menos una minuscula, una mayuscula, un numero y un caracter especial.<br/>"
    }

    if(this.usuarioForm.get('rol_usuario')?.errors?.['required']){
      mensajeWarnign += "Falta rol de usuario. <br/>"
    }
    if(this.existUser){
      mensajeWarnign += "Usuario ya existe. <br/>"
    }
    if(this.existEmail){
      mensajeWarnign += "Correo ya esta registrado a un usuario. <br/>"
    }
    if(mensajeWarnign == ''){

      const usuario:UsuarioEnviar = {

        nombre_usuario: this.usuarioForm.value.nombre_usuario,
            usuario_usuario:  this.usuarioForm.value.usuario_usuario,
            correo_usuario:  this.usuarioForm.value.correo_usuario,
           contrasenia_usuario:  this.usuarioForm.value.contrasenia_usuario,
           rol_usuario: this.usuarioForm.value.rol_usuario,
           estado_usuario:0
      }
      this.dialogRef.close()
      this.UsuarioService.guardarUsuario(usuario).subscribe(
        (data) =>  this.AlertService.showSuccess('Usuario Guardado con exito'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );

    }else{
      this.AlertService.showWarning(mensajeWarnign)
    }


  }

}
