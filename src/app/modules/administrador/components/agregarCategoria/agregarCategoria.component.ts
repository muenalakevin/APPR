import { CategoriaService } from './../../../../core/services/categoria.service';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { UsuarioEnviar } from './../../../../shared/models/usuarioEnviar';
import { AlertService } from './../../../../core/services/alert.service';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from './../../../../shared/models/rol';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/models/usuario';
import { CategoriaPlato } from 'src/app/shared/models/categoriaPlato';



@Component({
  selector: 'app-agregarCategoria',
  templateUrl: './agregarCategoria.component.html',
  styleUrls: ['./agregarCategoria.component.css']
})
export class AgregarCategoriaComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;
  roles:Rol[]=[]
  usuarioForm: FormGroup;

  constructor(
    private RolService:RolService,
    private AlertService:AlertService,
    private CategoriaService:CategoriaService,
    public dialogRef: MatDialogRef<AgregarCategoriaComponent>) {
    this.usuarioForm = new FormGroup({
      nombre_categoria: new FormControl(null, [
        Validators.required,
      ]),
      descripcion_categoria: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {


  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.usuarioForm.get('nombre_categoria').errors?.['required']){
      mensajeWarnign += "Falta nombre de categoria. <br>"
    }
    if(this.usuarioForm.get('descripcion_categoria').errors?.['required']){
      mensajeWarnign += "Falta descripcion de usuario. <br/>"
    }
    


    if(mensajeWarnign == ''){

      const categoria:CategoriaPlato = {
        _id:"",
        nombre_categoria: this.usuarioForm.value.nombre_categoria,
            descripcion_categoria:  this.usuarioForm.value.descripcion_categoria,
      }
      this.dialogRef.close()
      this.CategoriaService.guardarCategoria(categoria).subscribe(
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
