import { FormGroup, Validators, FormControl, FormArray, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionMesero } from 'src/app/shared/models/configuracion.mesero';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  meseroConfig:FormGroup = this.formBuilder.group({
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
    checkColorFueraTiempo: new FormControl(false, [
      Validators.required,
    ]),
    checkColorOcupada: new FormControl(false, [
      Validators.required,
    ]),
    checkColorDisponible: new FormControl(false, [
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
    colorFueraTiempo: new FormControl("", [
      Validators.required,
    ]),
    colorOcupada: new FormControl("", [
      Validators.required,
    ]),
    colorDisponible: new FormControl("", [
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


  addMetodoPago(){

  }
  configuracionCaja = this.formBuilder.group({
    metodosPago : this.formBuilder.array([])
  })

  get metodosPago(){
    return this.configuracionCaja.controls["metodosPago"] as FormArray;
  }
  ngOnInit() {
    this.ConfiguracionService.getConfiguracionMesero().subscribe(res=>{
      this.ConfiguracionService.getConfiguracionMesero().subscribe(res=>{
        let configuracionMesero = res as configuracionMesero
        this.meseroConfig =  this.formBuilder.group({
          satisfaccionAdecuada: new FormControl(configuracionMesero.satisfaccionAdecuada, [
            Validators.required,
          ]),
          satisfaccionMedia: new FormControl(configuracionMesero.satisfaccionMedia, [
            Validators.required,
          ]),
          disatisfaccion: new FormControl(configuracionMesero.disatisfaccion, [
            Validators.required,
          ]),
          checkColorSatisfaccion: new FormControl(configuracionMesero.colorSatisfaccion.check),
          checkColorSatisfaccionMedia: new FormControl(configuracionMesero.colorSatisfaccionMedia.check),
          checkColorDisatisfaccion: new FormControl(configuracionMesero.colorDisatisfaccion.check),
          checkColorFueraTiempo: new FormControl(configuracionMesero.colorFueraTiempo.check),
          checkColorOcupada: new FormControl(configuracionMesero.colorOcupada.check),
          checkColorDisponible: new FormControl(configuracionMesero.colorDisponible.check),
          colorSatisfaccion: new FormControl(configuracionMesero.colorSatisfaccion.color),
          colorSatisfaccionMedia: new FormControl(configuracionMesero.colorSatisfaccionMedia.color),
          colorDisatisfaccion: new FormControl(configuracionMesero.colorDisatisfaccion.color),
          colorFueraTiempo: new FormControl(configuracionMesero.colorFueraTiempo.color),
          colorOcupada: new FormControl(configuracionMesero.colorOcupada.color),
          colorDisponible: new FormControl(configuracionMesero.colorDisponible.color),
          meseroEdit: new FormControl(configuracionMesero.meseroEdit),
      },
      {
          validator: this.mayoresMenores
        })
      })
    this.configuracionCaja = new FormGroup({
      metodosDePago : new FormArray([new FormControl('', Validators.required),new FormControl('', Validators.required)])
    })





    })
  }
 mayoresMenores(meseroConfig: AbstractControl):ValidationErrors | null {3

  let satisfaccionAdecuada = meseroConfig.get('satisfaccionAdecuada').value;
  let satisfaccionMedia = meseroConfig.get('satisfaccionMedia').value;
  let disatisfaccion = meseroConfig.get('disatisfaccion').value;
  meseroConfig.get('satisfaccionAdecuada').setErrors( null)
  meseroConfig.get('satisfaccionMedia').setErrors( null)
  meseroConfig.get('disatisfaccion').setErrors( null)
   if(!(satisfaccionAdecuada<satisfaccionMedia && satisfaccionAdecuada<disatisfaccion)){
    meseroConfig.get('satisfaccionAdecuada').setErrors( {mayoresMenores: true} )
   }
   if(!(satisfaccionMedia>satisfaccionAdecuada && satisfaccionMedia<disatisfaccion)){
    meseroConfig.get('satisfaccionMedia').setErrors( {mayoresMenores: true} )
   }

   if(!(disatisfaccion>satisfaccionAdecuada && disatisfaccion>satisfaccionMedia)){
    meseroConfig.get('disatisfaccion').setErrors( {mayoresMenores: true} )
   }
  return null
  }
  guardarConfiguracionMesero(){
    if(this.meseroConfig.valid){

    let configuracionMesero:configuracionMesero ={
      satisfaccionAdecuada: this.meseroConfig.get('satisfaccionAdecuada').value,
      satisfaccionMedia: this.meseroConfig.get('satisfaccionMedia').value,
      disatisfaccion: this.meseroConfig.get('disatisfaccion').value,
      colorSatisfaccion: {
        check:this.meseroConfig.get('checkColorSatisfaccion').value,
        color:this.meseroConfig.get('colorSatisfaccion').value,
      },
      colorSatisfaccionMedia: {
        check:this.meseroConfig.get('checkColorSatisfaccionMedia').value,
        color:this.meseroConfig.get('colorSatisfaccionMedia').value,
      },
      colorDisatisfaccion: {
        check:this.meseroConfig.get('checkColorDisatisfaccion').value,
        color:this.meseroConfig.get('colorDisatisfaccion').value,
      },
      colorFueraTiempo: {
        check:this.meseroConfig.get('checkColorFueraTiempo').value,
        color:this.meseroConfig.get('colorFueraTiempo').value,
      },
      colorOcupada: {
        check:this.meseroConfig.get('checkColorOcupada').value,
        color:this.meseroConfig.get('colorOcupada').value,
      },
      colorDisponible: {
        check:this.meseroConfig.get('checkColorDisponible').value,
        color:this.meseroConfig.get('colorDisponible').value,
      },
      meseroEdit: this.meseroConfig.get('meseroEdit').value,
    }
    console.log(configuracionMesero)
    this.ConfiguracionService.updateConfiguracionMesero(configuracionMesero).subscribe(res=>{
      console.log(    res)
    })
  }
  }
  checkValue(event: any){
    console.log("ss");
    console.log(event);
 }
}
