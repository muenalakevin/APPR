import { Mesa } from './../../../../shared/models/mesa';
import { MesaService } from './../../../../core/services/mesa.service';
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
import {faSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-agregar-mesa',
  templateUrl: './agregar-mesa.component.html',
  styleUrls: ['./agregar-mesa.component.css']
})
export class AgregarMesaComponent implements OnInit {
  faSquare=faSquare
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;

  mesaForm: FormGroup;

  constructor(
    private RolService:RolService,
    private AlertService:AlertService,
    private MesaService:MesaService,
    public dialogRef: MatDialogRef<AgregarMesaComponent>) {
    this.mesaForm = new FormGroup({
      nombre_mesa: new FormControl(null, [
        Validators.required,
      ]),
      descripcion_mesa: new FormControl(""),
    });
  }

  ngOnInit() {


  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.mesaForm.get('nombre_mesa').errors?.['required']){
      mensajeWarnign += "Falta nombre de categoría. <br>"
    }



    if(mensajeWarnign == ''){

      const mesa:Mesa = {
        _id:"",
        nombre_mesa: this.mesaForm.value.nombre_mesa,
            descripcion_mesa:  this.mesaForm.value.descripcion_mesa,
      }

      this.dialogRef.close()
      this.MesaService.guardarMesa(mesa).subscribe(
        (data) =>  this.AlertService.showSuccess('Mesa Guardada con exito'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );

    }else{
      this.AlertService.showWarning(mensajeWarnign)
    }


  }
}
