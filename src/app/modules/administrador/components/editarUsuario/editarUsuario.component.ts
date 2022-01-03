import { Usuario } from 'src/app/shared/models/usuario';
import { UsuarioEnviar } from './../../../../shared/models/usuarioEnviar';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { AlertService } from './../../../../core/services/alert.service';
import { RolService } from './../../../../core/services/rol.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from './../../../../shared/models/rol';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editarUsuario',
  templateUrl: './editarUsuario.component.html',
  styleUrls: ['./editarUsuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;
  roles:Rol[]=[]
  usuarioForm: FormGroup= new FormGroup({
    _id: new FormControl(null),
    nombre_usuario: new FormControl(null),
    usuario_usuario: new FormControl(null),
    correo_usuario: new FormControl(null),
    contrasenia_usuario: new FormControl(null),
    rol_usuario: new FormControl(null),
  });
  rolSelect:string = ""

  constructor(
    private RolService:RolService,
    private AlertService:AlertService,
    private UsuarioService:UsuarioService,
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA ) public data: {usuario: Usuario}) {

      console.log(data.usuario)
      this.RolService.getRols()
    .subscribe( data => {
      console.log(data)
      this.roles = <Rol[]>data;
      this.rolSelect = <string>this.roles.find((rol:Rol)=> rol.nombre_rol==this.data.usuario.rol_usuario)._id
      console.log(this.rolSelect)
      this.usuarioForm = new FormGroup({

        _id: new FormControl(this.data.usuario._id, [
          Validators.required,
        ]),
        nombre_usuario: new FormControl(this.data.usuario.nombre_usuario, [
          Validators.required,
        ]),
        usuario_usuario: new FormControl(this.data.usuario.usuario_usuario, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]+$")
        ]),
        correo_usuario: new FormControl(this.data.usuario.correo_usuario, [
          Validators.required,
          Validators.email,
        ]),
        contrasenia_usuario: new FormControl(null, [
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

        ]),
        rol_usuario: new FormControl(this.rolSelect, [
          Validators.required,
        ]),
      });
    })

  }

  ngOnInit() {


  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.usuarioForm.get('nombre_usuario').errors?.['required']){
      mensajeWarnign += "Falta nombre de usuario. <br>"
    }
    if(this.usuarioForm.get('correo_usuario').errors?.['required']){
      mensajeWarnign += "Falta correo de usuario. <br/>"
    }else if(this.usuarioForm.get('correo_usuario').errors?.['email']){
      mensajeWarnign += "El correo no cuenta con un formato correcto. <br/>"
    }
    if(this.usuarioForm.get('usuario_usuario').errors?.['required']){
      mensajeWarnign += "Falta usuario. <br/>"
    }else  if(this.usuarioForm.get('usuario_usuario').errors?.['pattern']){
      mensajeWarnign += "Usuario solo puede contener letras.<br/>"
    }
    if(this.usuarioForm.value.contrasenia_usuario!=""){
      if(this.usuarioForm.get('contrasenia_usuario').errors?.['pattern']){
        mensajeWarnign += "Contraseña debe contener 8 caracteres, por lo menos una minuscula, una mayuscula, un numero y un caracter especial.<br/>"
      }

    }

    if(this.usuarioForm.get('rol_usuario').errors?.['required']){
      mensajeWarnign += "Falta rol de usuario. <br/>"
    }
    if(mensajeWarnign == ''){

      const usuario:Usuario = {
        _id : this.usuarioForm.value._id,
        nombre_usuario: this.usuarioForm.value.nombre_usuario,
            usuario_usuario:  this.usuarioForm.value.usuario_usuario,
            correo_usuario:  this.usuarioForm.value.correo_usuario,
           contrasenia_usuario:  this.usuarioForm.value.contrasenia_usuario,
           rol_usuario: this.usuarioForm.value.rol_usuario,
           estado_usuario: this.data.usuario.estado_usuario
      }
      console.log(usuario)
      this.dialogRef.close()
      this.UsuarioService.editarUsuario(usuario).subscribe(
        (data) =>  this.AlertService.showSuccess('Usuario editado con exito'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );

    }else{
      this.AlertService.showWarning(mensajeWarnign)
    }


  }
}
