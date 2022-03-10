import { AlertService } from 'src/app/core/services/alert.service';
import { CalificacionService } from '../../../../core/services/calificacion.service';
import { Subscription } from 'rxjs';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: any,
    public StorageService:StorageService,
    public CalificacionService:CalificacionService,
    public configuracionService:ConfiguracionService,
    public AlertService:AlertService,
  ) { }
  elem:any;
  valor:boolean = true
  img:any;
  enableCalificacion:boolean = false
  private calificacionSub: Subscription|undefined;
  ngOnInit() {
    this.calificacionSub = this.CalificacionService.calificacion.subscribe(
      () => {
        this.enableCalificacion = true
      }
    );
    this.elem = document.documentElement;
    this.configuracionService.getLogo().subscribe(res=>{
      this.img=res as string;
    })
  }
  getLogo(){

    return 'data:image/jpeg;base64,'+this.img
  
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.valor = false;
  }
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.valor = true;
  }
  calificar(calificaion:Number){
   
    this.CalificacionService.guardarCalificacion(calificaion).subscribe(()=>{
      this.enableCalificacion = false;
      this.AlertService.showSuccess("Calificacion registrada con éxito.");
    })
  }
}
