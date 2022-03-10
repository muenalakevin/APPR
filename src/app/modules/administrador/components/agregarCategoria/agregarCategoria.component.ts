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
  categoriaForm: FormGroup;

  constructor(
    private RolService:RolService,
    private AlertService:AlertService,
    private CategoriaService:CategoriaService,
    public dialogRef: MatDialogRef<AgregarCategoriaComponent>) {
    this.categoriaForm = new FormGroup({
      nombre_categoria: new FormControl(null, [
        Validators.required,
      ]),
      descripcion_categoria: new FormControl(null),
    });
  }

  ngOnInit() {


  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.categoriaForm.get('nombre_categoria')?.errors?.['required']){
      mensajeWarnign += "Falta nombre de categoría. <br>"
    }
    if(this.categoriaForm.get('descripcion_categoria')?.errors?.['required']){
      mensajeWarnign += "Falta descripcion de categoría. <br/>"
    }



    if(mensajeWarnign == ''){

      const categoria:CategoriaPlato = {
        _id:"",
        nombre_categoria: this.categoriaForm.value.nombre_categoria,
            descripcion_categoria:  this.categoriaForm.value.descripcion_categoria,
            estado_categoria:0
      }
      this.dialogRef.close()
      this.CategoriaService.guardarCategoria(categoria).subscribe(
        (data) =>  this.AlertService.showSuccess('Categoría Guardado con exito'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );

    }else{
      this.AlertService.showWarning(mensajeWarnign)
    }


  }
}
