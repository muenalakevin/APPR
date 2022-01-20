import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionCaja } from 'src/app/shared/models/configuracion.caja';
import { Egreso } from 'src/app/shared/models/egreso';
import { EgresoService } from './../../../../core/services/egreso.service';
import { ComprobanteService } from './../../../../core/services/comprobante.service';
import { Comprobante } from './../../../../shared/models/comprobante';
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
  comprobantes:Comprobante[] = []
  configuracionCaja:configuracionCaja = new configuracionCaja()
  egresos:Egreso[] = []
  caja:Caja
  permiso:number
  constructor(
    public FormBuilder:FormBuilder,
    public CajaService: CajaService,
    public AlertService: AlertService,
    public ConfiguracionService: ConfiguracionService,
    public ComprobanteService: ComprobanteService,
    public EgresoService: EgresoService,

    public dialogRef: MatDialogRef<CerrarCajaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { caja:Caja,permiso:number}
  ) {

    this.caja = data.caja
    this.permiso = data.permiso
    this.ComprobanteService.geComprobantesCaja(this.caja._id).subscribe((comprobantes)=>{
      this.comprobantes = comprobantes as Comprobante[]
    })
    this.EgresoService.getEgresosCaja(this.caja._id).subscribe((egresos)=>{
      this.egresos = egresos as Egreso[]
    })
    this.ConfiguracionService.getConfiguracionCaja().subscribe((configuracionCaja)=>{
      this.configuracionCaja = configuracionCaja as configuracionCaja
    })
  }
  guardarCaja(){
    if(this.cajaForm.valid){
      this.caja.cierre_caja = this.cajaForm.get('cierre_caja').value
      this.caja.estado = 2
      this.CajaService.actualizarCaja(this.caja).subscribe(res=>{
        this.caja = res as Caja;
          this.AlertService.showSuccess("Caja cerrada con éxito.")
          this.dialogRef.close({caja:res as Caja})
        })

    }

  }
  ngOnInit() {
  }

}
