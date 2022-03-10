import { AlertService } from '../../../../core/services/alert.service';
import { EgresoService } from '../../../../core/services/egreso.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Egreso } from 'src/app/shared/models/egreso';
import { Caja } from 'src/app/shared/models/caja';
import { CajaService } from 'src/app/core/services/caja.service';

@Component({
  selector: 'app-addEgreso',
  templateUrl: './addEgreso.component.html',
  styleUrls: ['./addEgreso.component.css']
})
export class AddEgresoComponent implements OnInit  {
  egresoForm: FormGroup
  caja:Caja|undefined
  constructor(
    private EgresoService:EgresoService,
    private formBuilder:FormBuilder,
    private AlertService:AlertService,
    private cajaService:CajaService,
    public dialogRef: MatDialogRef<AddEgresoComponent>) {

    this.egresoForm = this.formBuilder.group({
      nombre_egreso: new FormControl(null, [
        Validators.required,
      ]),
      detalle_egreso: new FormControl(null, [

      ]),
      observacion_egreso: new FormControl("", [

      ]),
      cantidad_egreso: new FormControl(null, [
        Validators.required
      ]),



    });

  }

  ngOnInit() {
  }
 async submitForm(){
    if(this.egresoForm.valid){
      const egreso:Egreso = {
            _id: "",
            caja: "none",
            nombre_egreso:  this.egresoForm.value.nombre_egreso,
            id_cajero: "",
            detalle_egreso:  this.egresoForm.value.detalle_egreso,
            observacion_egreso:  this.egresoForm.value.observacion_egreso,
            cantidad_egreso: this.egresoForm.value.cantidad_egreso,
            estado: 0,
            createdAt: new Date()
      }
      await this.EgresoService.guardarEgreso(egreso).subscribe(res=>{

        this.AlertService.showSuccess("Egreso guardado con éxito.")
        this.dialogRef.close({caja:this.caja})
      })

    }
  }


}
