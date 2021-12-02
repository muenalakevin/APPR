import { CategoriaService } from './../../../../core/services/categoria.service';
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
    public CategoriaService:CategoriaService,
    @Inject(MAT_DIALOG_DATA ) public data: {categoria: CategoriaPlato}) {

      this.categoriaForm = new FormGroup({
        _id: new FormControl(this.data.categoria._id),
        nombre_categoria: new FormControl(this.data.categoria.nombre_categoria, [
          Validators.required,
        ]),
        descripcion_categoria: new FormControl(this.data.categoria.descripcion_categoria),

      });

    
  }

  ngOnInit() {
    

  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.categoriaForm.get('nombre_categoria').errors?.['required']){
      mensajeWarnign += "Falta nombre de categoría. <br>"
    }
    if(this.categoriaForm.get('descripcion_categoria').errors?.['required']){
      mensajeWarnign += "Falta descripcion de categoría. <br/>"
    }
    

    if(mensajeWarnign == ''){

      const categoria:CategoriaPlato = {
        _id:this.categoriaForm.value._id,
        nombre_categoria: this.categoriaForm.value.nombre_categoria,
            descripcion_categoria:  this.categoriaForm.value.descripcion_categoria,
      }

      this.dialogRef.close()
      this.CategoriaService.editarCategoria(categoria).subscribe(
        (data) =>  this.AlertService.showSuccess('Categoría editado con exito'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );
     
    }else{
      this.AlertService.showWarning(mensajeWarnign)
    }
    
    
  }
}
