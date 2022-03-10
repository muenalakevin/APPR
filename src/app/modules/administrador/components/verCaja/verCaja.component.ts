import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionCaja } from 'src/app/shared/models/configuracion.caja';
import { Egreso } from 'src/app/shared/models/egreso';
import { EgresoService } from '../../../../core/services/egreso.service';
import { ComprobanteService } from '../../../../core/services/comprobante.service';
import { Comprobante } from '../../../../shared/models/comprobante';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { CajaService } from 'src/app/core/services/caja.service';
import { Caja } from 'src/app/shared/models/caja';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-verCaja',
  templateUrl: './verCaja.component.html',
  styleUrls: ['./verCaja.component.css']
})
export class verCajaComponent implements OnInit {
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
    public StorageService: StorageService,

    public dialogRef: MatDialogRef<verCajaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { caja:Caja}
  ) {

    this.caja = data.caja
    this.permiso = 1
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
  contetn:string = ''
  cerrarModal(){
    this.dialogRef.close({})

  }
  descargar(){

  }
  ngOnInit() {
  }

}
