import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comparativaCaja',
  templateUrl: './comparativaCaja.component.html',
  styleUrls: ['./comparativaCaja.component.css']
})
export class ComparativaCajaComponent implements OnInit {
  caja1:number
  caja2:number
  constructor(
    public dialogRef: MatDialogRef<ComparativaCajaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { caja1:number,caja2:number}
  ) {
    this.caja1 = data.caja1
    this.caja2 = data.caja2
  }

  aceptar(){
    this.dialogRef.close()
  }
  ngOnInit() {
  }

}
