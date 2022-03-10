import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { OpcionRapidaService } from 'src/app/core/services/opcion-rapida.service';
import { OpcionRapida } from 'src/app/shared/models/opcionRapida';

@Component({
  selector: 'app-AgregarOpcionRapida',
  templateUrl: './AgregarOpcionRapida.component.html',
  styleUrls: ['./AgregarOpcionRapida.component.css']
})
export class AgregarOpcionRapidaComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;
  opcionRapidaForm: FormGroup;

  constructor(
    private AlertService:AlertService,
    private opcionRapidaService:OpcionRapidaService,
    public dialogRef: MatDialogRef<AgregarOpcionRapidaComponent>) {
    this.opcionRapidaForm = new FormGroup({
      frase_opcionRapida: new FormControl(null, [
        Validators.required,
      ]),
      descripcion_opcionRapida: new FormControl(null),
    });
  }

  ngOnInit() {


  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.opcionRapidaForm.get('frase_opcionRapida')?.errors?.['required']){
      mensajeWarnign += "Falta frase de categoría. <br>"
    }




    if(mensajeWarnign == ''){

      const opcionRapida:OpcionRapida = {
        _id:"",
        frase_opcionRapida: this.opcionRapidaForm.value.frase_opcionRapida
      }
      this.dialogRef.close()
      this.opcionRapidaService.guardarOpcionRapida(opcionRapida).subscribe(
        (data) =>  this.AlertService.showSuccess('Frase Guardado con éxito'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );

    }else{
      this.AlertService.showWarning(mensajeWarnign)
    }


  }
}
