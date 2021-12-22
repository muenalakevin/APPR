import { Mesa } from './../../../../shared/models/mesa';
import { MesaService } from './../../../../core/services/mesa.service';

import { Usuario } from 'src/app/shared/models/usuario';
import { UsuarioEnviar } from './../../../../shared/models/usuarioEnviar';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { AlertService } from './../../../../core/services/alert.service';
import { RolService } from './../../../../core/services/rol.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from './../../../../shared/models/rol';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {faSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-editar-mesa',
  templateUrl: './editar-mesa.component.html',
  styleUrls: ['./editar-mesa.component.css']
})
export class EditarMesaComponent implements OnInit {
  faSquare=faSquare
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;
  roles:Rol[]=[]
  mesaForm: FormGroup= new FormGroup({
    nombre_mesa: new FormControl(null),
    descripcion_mesa: new FormControl(null),
  });
  rolSelect:string = ""

  constructor(
    private RolService:RolService,
    private AlertService:AlertService,
    private UsuarioService:UsuarioService,
    public dialogRef: MatDialogRef<EditarMesaComponent>,
    public MesaService:MesaService,
    @Inject(MAT_DIALOG_DATA ) public data: {mesa: Mesa}) {

      this.mesaForm = new FormGroup({
        _id: new FormControl(this.data.mesa._id),
        nombre_mesa: new FormControl(this.data.mesa.nombre_mesa, [
          Validators.required,
        ]),
        descripcion_mesa: new FormControl(this.data.mesa.descripcion_mesa, [
          Validators.required,
        ]),

      });

    
  }

  ngOnInit() {
    

  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.mesaForm.get('nombre_mesa').errors?.['required']){
      mensajeWarnign += "Falta nombre de categoría. <br>"
    }
    if(this.mesaForm.get('descripcion_mesa').errors?.['required']){
      mensajeWarnign += "Falta descripcion de categoría. <br/>"
    }
    

    if(mensajeWarnign == ''){

      const mesa:Mesa = {
        _id:this.mesaForm.value._id,
        nombre_mesa: this.mesaForm.value.nombre_mesa,
            descripcion_mesa:  this.mesaForm.value.descripcion_mesa,
      }

      this.dialogRef.close()
      this.MesaService.editarMesa(mesa).subscribe(
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
