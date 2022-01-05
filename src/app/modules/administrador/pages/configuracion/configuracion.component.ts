import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionMesero } from 'src/app/shared/models/configuracion.mesero';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  meseroConfig = new FormGroup({
    satisfaccionAdecuada: new FormControl(0, [
      Validators.required,
    ]),
    satisfaccionMedia: new FormControl(0, [
      Validators.required,
    ]),
    disatisfaccion: new FormControl(0, [
      Validators.required,
    ]),
    checkColorSatisfaccion: new FormControl(false, [
      Validators.required,
    ]),
    checkColorSatisfaccionMedia: new FormControl(false, [
      Validators.required,
    ]),
    checkColorDisatisfaccion: new FormControl(false, [
      Validators.required,
    ]),
    colorSatisfaccion: new FormControl("", [
      Validators.required,
    ]),
    colorSatisfaccionMedia: new FormControl("", [
      Validators.required,
    ]),
    colorDisatisfaccion: new FormControl("", [
      Validators.required,
    ]),
    meseroEdit: new FormControl("", [
      Validators.required,
    ]),

})
  constructor(
    private formBuilder: FormBuilder,
    private ConfiguracionService: ConfiguracionService,
    ) { }
  configuracionCaja:FormGroup = this.formBuilder.group({
    metodosDePago : new FormArray([new FormControl('', Validators.required)])
  })

  skills:FormArray = new FormArray([new FormControl('', Validators.required),new FormControl('', Validators.required)]);
  ngOnInit() {
    this.ConfiguracionService.getConfiguracionMesero().subscribe(res=>{
      console.log(res)
      this.ConfiguracionService.getConfiguracionMesero().subscribe(res=>{
        let configuracionMesero = res as configuracionMesero
        this.meseroConfig = new FormGroup({
          satisfaccionAdecuada: new FormControl(configuracionMesero.satisfaccionAdecuada, [
            Validators.required,
          ]),
          satisfaccionMedia: new FormControl(configuracionMesero.satisfaccionMedia, [
            Validators.required,
          ]),
          disatisfaccion: new FormControl(configuracionMesero.disatisfaccion, [
            Validators.required,
          ]),
          checkColorSatisfaccion: new FormControl(configuracionMesero.colorSatisfaccion.check, [
            Validators.required,
          ]),
          checkColorSatisfaccionMedia: new FormControl(configuracionMesero.colorSatisfaccionMedia.check, []),
          checkColorDisatisfaccion: new FormControl(configuracionMesero.colorDisatisfaccion.check, [
            Validators.required,
          ]),
          colorSatisfaccion: new FormControl(configuracionMesero.colorSatisfaccion.color, [
            Validators.required,
          ]),
          colorSatisfaccionMedia: new FormControl(configuracionMesero.colorSatisfaccionMedia.color, [
            Validators.required,
          ]),
          colorDisatisfaccion: new FormControl(configuracionMesero.colorDisatisfaccion.color, [
            Validators.required,
          ]),
          meseroEdit: new FormControl(configuracionMesero.colorDisatisfaccion.color, [
            Validators.required,
          ]),
      })





      })
    this.configuracionCaja = new FormGroup({
      metodosDePago : new FormArray([new FormControl('', Validators.required),new FormControl('', Validators.required)])
    })





    })
  }
  guardarConfiguracionMesero(){
    let configuracionMesero:configuracionMesero ={
      satisfaccionAdecuada: this.meseroConfig.get('satisfaccionAdecuada').value,
      satisfaccionMedia: this.meseroConfig.get('satisfaccionMedia').value,
      disatisfaccion: this.meseroConfig.get('disatisfaccion').value,
      colorSatisfaccion: {
        check:this.meseroConfig.get('checkColorSatisfaccion').value,
        color:this.meseroConfig.get('satisfaccionAdecuada').value,
      },
      colorSatisfaccionMedia: {
        check:this.meseroConfig.get('checkColorSatisfaccionMedia').value,
        color:this.meseroConfig.get('colorSatisfaccionMedia').value,
      },
      colorDisatisfaccion: {
        check:this.meseroConfig.get('checkColorDisatisfaccion').value,
        color:this.meseroConfig.get('colorDisatisfaccion').value,
      },
      meseroEdit: this.meseroConfig.get('meseroEdit').value,
    }
    console.log(configuracionMesero)
  }
  checkValue(event: any){
    console.log(event);
 }
}
