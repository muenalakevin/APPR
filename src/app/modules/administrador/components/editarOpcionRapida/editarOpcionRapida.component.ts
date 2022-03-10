import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { OpcionRapidaService } from 'src/app/core/services/opcion-rapida.service';
import { OpcionRapida } from 'src/app/shared/models/opcionRapida';

@Component({
  selector: 'app-editarOpcionRapida',
  templateUrl: './editarOpcionRapida.component.html',
  styleUrls: ['./editarOpcionRapida.component.css']
})
export class EditarOpcionRapidaComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide=true;
  opcionRapidaForm: FormGroup= new FormGroup({
    frase_opcionRapida: new FormControl(null),
  });
  rolSelect:string = ""

  constructor(

    private AlertService:AlertService,
    public dialogRef: MatDialogRef<EditarOpcionRapidaComponent>,
    public opcionRapidaService:OpcionRapidaService,
    @Inject(MAT_DIALOG_DATA ) public data: {opcionRapida: OpcionRapida}) {


      this.opcionRapidaForm = new FormGroup({
        _id: new FormControl(this.data.opcionRapida._id),
        frase_opcionRapida: new FormControl(this.data.opcionRapida.frase_opcionRapida, [
          Validators.required,
        ]),
      });


  }

  ngOnInit() {


  }
  submitForm(){
    let mensajeWarnign:string = ''
    if(this.opcionRapidaForm.get('frase_opcionRapida')?.errors?.['required']){
      mensajeWarnign += "Falta frase de opcion rápida. <br>"
    }


    if(mensajeWarnign == ''){

      const opcionRapida:OpcionRapida = {
        _id:this.opcionRapidaForm.value._id,
        frase_opcionRapida: this.opcionRapidaForm.value.frase_opcionRapida,
      }

      this.dialogRef.close()
      this.opcionRapidaService.editarOpcionRapida(opcionRapida).subscribe(
        (data) =>  this.AlertService.showSuccess('Opcion rápida editado con éxito.'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );

    }else{
      this.AlertService.showWarning(mensajeWarnign)
    }


  }
}
