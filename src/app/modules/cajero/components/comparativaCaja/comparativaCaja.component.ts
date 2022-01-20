import { Caja } from 'src/app/shared/models/caja';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comparativaCaja',
  templateUrl: './comparativaCaja.component.html',
  styleUrls: ['./comparativaCaja.component.css']
})
export class ComparativaCajaComponent implements OnInit {
  caja:Caja
  permiso:number = 0
  constructor(
    public dialogRef: MatDialogRef<ComparativaCajaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { caja:Caja,permiso:number}
  ) {
    this.caja = data.caja
    this.permiso = data.permiso
  }

  aceptar(){
    this.dialogRef.close()
  }
  ngOnInit() {
  }

}
