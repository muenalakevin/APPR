import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { CajaService } from 'src/app/core/services/caja.service';
import { Caja } from 'src/app/shared/models/caja';

@Component({
  selector: 'app-cerrarCaja',
  templateUrl: './cerrarCaja.component.html',
  styleUrls: ['./cerrarCaja.component.css']
})
export class CerrarCajaComponent implements OnInit {
  cajaForm:FormGroup = this.FormBuilder.group({
    cierre_caja: new FormControl(0, [
      Validators.required,
    ])
  })
  caja:Caja
  permiso:number
  constructor(
    public FormBuilder:FormBuilder,
    public CajaService: CajaService,
    public AlertService: AlertService,

    public dialogRef: MatDialogRef<CerrarCajaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { caja:Caja,permiso:number}
  ) {
    this.caja = data.caja
    this.permiso = data.permiso
  }
  guardarCaja(){
    if(this.cajaForm.valid){
      this.caja.cierre_caja = this.cajaForm.get('cierre_caja').value
      this.caja.estado = 2
      this.CajaService.actualizarCaja(this.caja).subscribe(res=>{
        this.caja = res as Caja;
          this.AlertService.showSuccess("Caja cerrada con éxito.")
          this.dialogRef.close({caja:null,caja1: this.caja.caja_chica + this.caja.cantidad_ingreso  - this.caja.cantidad_egreso, caja2:  this.cajaForm.get('cierre_caja').value})
        })
    }

  }
  ngOnInit() {
  }

}
