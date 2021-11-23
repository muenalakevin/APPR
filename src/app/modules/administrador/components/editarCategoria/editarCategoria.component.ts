import { CategoriaPlato } from './../../../../shared/models/categoriaPlato';
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
  selector: 'app-editarCategoria',
  templateUrl: './editarCategoria.component.html',
  styleUrls: ['./editarCategoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;
  roles:Rol[]=[]
  categoriaForm: FormGroup= new FormGroup({
    nombre_categoria: new FormControl(null),
    descripcion_categoria: new FormControl(null),
  });
  rolSelect:string = ""

  constructor(
    private RolService:RolService,
    private AlertService:AlertService,
    private UsuarioService:UsuarioService,
    public dialogRef: MatDialogRef<EditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA ) public data: {categoria: CategoriaPlato}) {

console.log(this.data.categoria);
      this.categoriaForm = new FormGroup({
        _id: new FormControl(this.data.categoria._id),
        nombre_categoria: new FormControl(this.data.categoria.nombre_categoria, [
          Validators.required,
        ]),
        descripcion_categoria: new FormControl(this.data.categoria.descripcion_categoria, [
          Validators.required,
        ]),

      });

    
  }

  ngOnInit() {
    

  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.categoriaForm.get('nombre_usuario').errors?.['required']){
      mensajeWarnign += "Falta nombre de usuario. <br>"
    }
    if(this.categoriaForm.get('correo_usuario').errors?.['required']){
      mensajeWarnign += "Falta correo de usuario. <br/>"
    }else if(this.categoriaForm.get('correo_usuario').errors?.['email']){
      mensajeWarnign += "El correo no cuenta con un formato correcto. <br/>"
    }
    if(this.categoriaForm.get('usuario_usuario').errors?.['required']){
      mensajeWarnign += "Falta usuario. <br/>"
    }else  if(this.categoriaForm.get('usuario_usuario').errors?.['pattern']){
      mensajeWarnign += "Usuario solo puede contener letras.<br/>"
    }
    if(this.categoriaForm.value.contrasenia_usuario!=""){
      if(this.categoriaForm.get('contrasenia_usuario').errors?.['pattern']){
        mensajeWarnign += "Contraseña debe contener 8 caracteres, por lo menos una minuscula, una mayuscula, un numero y un caracter especial.<br/>"
      }
  
    }
    
    if(this.categoriaForm.get('rol_usuario').errors?.['required']){
      mensajeWarnign += "Falta rol de usuario. <br/>"
    }
    if(mensajeWarnign == ''){

      const usuario:Usuario = {
        _id : this.categoriaForm.value._id,
        nombre_usuario: this.categoriaForm.value.nombre_usuario,
            usuario_usuario:  this.categoriaForm.value.usuario_usuario,
            correo_usuario:  this.categoriaForm.value.correo_usuario,
           contrasenia_usuario:  this.categoriaForm.value.contrasenia_usuario,
           rol_usuario: this.categoriaForm.value.rol_usuario
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
