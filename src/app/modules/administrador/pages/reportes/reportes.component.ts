import { CajaService } from './../../../../core/services/caja.service';
import { Caja } from 'src/app/shared/models/caja';
import { MinutosEntregasClientesComponent } from './../../charts/minutosEntregasClientes/minutosEntregasClientes.component';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEgresoComponent } from '../../components/egreso/addEgreso.component';
import { verCajaComponent } from '../../components/verCaja/verCaja.component';

@Component({
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  VCR: ViewContainerRef;
  cuadresCaja:Caja[] = []
  componentsReferences = Array<ComponentRef<MinutosEntregasClientesComponent>>()
  constructor(private CFR: ComponentFactoryResolver,
    public StorageService:StorageService,
    public dialog:MatDialog,
    public CajaService:CajaService,
    ) {
this.CajaService.getCajas().subscribe(cajas=>{
  this.cuadresCaja = cajas as Caja[]
})

  }
  click(){

    document.body.style.display = "initial";
  }
  ngOnInit(): void {
  }
  createComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(MinutosEntregasClientesComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  addEgreso(){
    const dialogRef = this.dialog.open(AddEgresoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if(result.caja!=undefined){

      }else{

      }

    })
  }

  modalVerCierre(caja:Caja){
    const dialogRef = this.dialog.open(verCajaComponent, {
      data: { caja },
    });
  }
}
