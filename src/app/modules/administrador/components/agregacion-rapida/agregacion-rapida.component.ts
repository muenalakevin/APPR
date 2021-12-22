import { Mesa } from './../../../../shared/models/mesa';
import { MesaService } from './../../../../core/services/mesa.service';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { UsuarioEnviar } from './../../../../shared/models/usuarioEnviar';
import { AlertService } from './../../../../core/services/alert.service';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from './../../../../shared/models/rol';

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/models/usuario';
import { CategoriaPlato } from 'src/app/shared/models/categoriaPlato';
import {faSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-agregacion-rapida',
  templateUrl: './agregacion-rapida.component.html',
  styleUrls: ['./agregacion-rapida.component.css']
})
export class AgregacionRapidaComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AgregacionRapidaComponent>,
    @Inject(MAT_DIALOG_DATA ) public data: {cantidadMesas: number}) {
    this.mesaForm = new FormGroup({
      numero_Mesa: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.mesaForm.get('numero_Mesa').errors?.['required']){
      mensajeWarnign += "Falta nombre de categoría. <br>"
    }
    
    


    if(mensajeWarnign == ''){

for (let i = 1; i <= this.mesaForm.value.numero_Mesa; i++) {

  const mesa:Mesa = {
    _id:"",
    nombre_mesa: "Mesa "+(this.data.cantidadMesas+i),
        descripcion_mesa:  " "
  }
  this.MesaService.guardarMesa(mesa).subscribe(
    (data) =>  this.AlertService.showSuccess('Mesa Guardada con exito'),
    (error) =>{
      this.AlertService.showErrorServidor()
    }
  );


 /*  const element = array[i]; */
  
}
      
this.AlertService.showSuccess('Mesas guardadas con exito')
      this.dialogRef.close()
      
    
}
  }
}
