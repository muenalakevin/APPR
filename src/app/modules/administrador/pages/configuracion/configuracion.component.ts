import { configuracionEstilo } from './../../../../shared/models/configuracion.estilo';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionMesero } from 'src/app/shared/models/configuracion.mesero';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { configuracionCaja } from 'src/app/shared/models/configuracion.caja';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  faSquareIcon=faSquare
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
    meseroEdit: new FormControl(""),

})
  estiloConfig:FormGroup = this.formBuilder.group({
    checkColorAplicacion: new FormControl(false, [
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
    colorAplicacion: new FormControl(""),
    colorSatisfaccion: new FormControl(""),
    colorSatisfaccionMedia: new FormControl(""),
    colorDisatisfaccion: new FormControl(""),
    colorFueraTiempo: new FormControl(""),
    colorOcupada: new FormControl(""),
    colorDisponible: new FormControl(""),

})
configuracionCaja = this.formBuilder.group({
  iva: new FormControl(""),
  checkIVA: new FormControl(false),
  metodosPago : this.formBuilder.array([

  ]),
  descuentosIntereses : this.formBuilder.array([

  ]),

  colorFlechas: new FormControl(1),
  checkColorFlechas: new FormControl(1),
  cierreCaja: new FormControl(""),
})
  constructor(
    private AlertService:AlertService,
    private formBuilder: FormBuilder,
    private ConfiguracionService: ConfiguracionService,
    ) { }





  get metodosPago(){
    return this.configuracionCaja.controls["metodosPago"] as FormArray;
  }
  get descuentosIntereses(){
    return this.configuracionCaja.controls["descuentosIntereses"] as FormArray;
  }
  addMetodoPago(){
    let metodoPago = this.formBuilder.group({
      nombre: new FormControl("", [
        Validators.required,
      ]),
      porcentaje: new FormControl(0),
      descuentoIncremento: new FormControl(false),
      valor: new FormControl(0),
      estado: new FormControl(1),
    })
      this.metodosPago.push(metodoPago);
  }
  addDescuentoInteres(){
    let descuentoInteres = this.formBuilder.group({
      nombre: new FormControl("", [
        Validators.required,
      ]),
      porcentaje: new FormControl(0),
      descuentoIncremento: new FormControl(false),
      valor: new FormControl(0),
      estado: new FormControl(1),
    })
      this.descuentosIntereses.push(descuentoInteres);
  }
  ngOnInit() {

    this.ConfiguracionService.getConfiguracionCaja().subscribe(res=>{
      let configuracionCaja = res as configuracionCaja
      this.configuracionCaja = this.formBuilder.group({
        iva: new FormControl(configuracionCaja.iva, [
          Validators.required,
        ]),
        checkIVA: new FormControl(configuracionCaja.checkIVA, [
          Validators.required,
        ]),
        metodosPago:  new FormArray([]),
        descuentosIntereses:  new FormArray([]),
        cierreCaja: new FormControl(configuracionCaja.cierreCaja, [
          Validators.required,
        ]),
      })

      for (let i = 0; i < configuracionCaja.metodosPago.length; i++) {
        let metodoPago = this.formBuilder.group({
          nombre: new FormControl(configuracionCaja.metodosPago[i].nombre, [
            Validators.required,
          ]),
          porcentaje: new FormControl(configuracionCaja.metodosPago[i].porcentaje),
          valor: new FormControl(configuracionCaja.metodosPago[i].valor),
          descuentoIncremento: new FormControl(configuracionCaja.metodosPago[i].descuentoIncremento),
          estado: new FormControl(configuracionCaja.metodosPago[i].estado),
        })
          this.metodosPago.push(metodoPago);

      }
      for (let i = 0; i < configuracionCaja.descuentosIntereses.length; i++) {
        let descuentoInteres = this.formBuilder.group({
          nombre: new FormControl(configuracionCaja.descuentosIntereses[i].nombre, [
            Validators.required,
          ]),
          porcentaje: new FormControl(configuracionCaja.descuentosIntereses[i].porcentaje),
          valor: new FormControl(configuracionCaja.descuentosIntereses[i].valor),
          descuentoIncremento: new FormControl(configuracionCaja.descuentosIntereses[i].descuentoIncremento),
          estado: new FormControl(configuracionCaja.descuentosIntereses[i].estado),
        })
          this.descuentosIntereses.push(descuentoInteres);

      }
    });

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

          meseroEdit: new FormControl(configuracionMesero.meseroEdit),
      },
      {
          validator: this.mayoresMenores
        })
      })
      this.ConfiguracionService.getConfiguracionEstilo().subscribe(res=>{
        let configuracionEstilo = res as configuracionEstilo
        this.estiloConfig =  this.formBuilder.group({

          checkColorAplicacion: new FormControl(configuracionEstilo.colorAplicacion.check),
          checkColorSatisfaccion: new FormControl(configuracionEstilo.colorSatisfaccion.check),
          checkColorSatisfaccionMedia: new FormControl(configuracionEstilo.colorSatisfaccionMedia.check),
          checkColorDisatisfaccion: new FormControl(configuracionEstilo.colorDisatisfaccion.check),
          checkColorFueraTiempo: new FormControl(configuracionEstilo.colorFueraTiempo.check),
          checkColorOcupada: new FormControl(configuracionEstilo.colorOcupada.check),
          checkColorDisponible: new FormControl(configuracionEstilo.colorDisponible.check),
          colorAplicacion: new FormControl(configuracionEstilo.colorAplicacion.color),
          colorSatisfaccion: new FormControl(configuracionEstilo.colorSatisfaccion.color),
          colorSatisfaccionMedia: new FormControl(configuracionEstilo.colorSatisfaccionMedia.color),
          colorDisatisfaccion: new FormControl(configuracionEstilo.colorDisatisfaccion.color),
          colorFueraTiempo: new FormControl(configuracionEstilo.colorFueraTiempo.color),
          colorOcupada: new FormControl(configuracionEstilo.colorOcupada.color),
          colorDisponible: new FormControl(configuracionEstilo.colorDisponible.color),
      })
      })
console.log(this.estiloConfig);
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
  guardarConfiguracionEstilo(){
    if(this.estiloConfig.valid){

    let configuracionEstilo:configuracionEstilo ={
      colorAplicacion: {
        check:this.estiloConfig.get('checkColorAplicacion').value,
        color:this.estiloConfig.get('colorAplicacion').value,
      },
      colorSatisfaccion: {
        check:this.estiloConfig.get('checkColorSatisfaccion').value,
        color:this.estiloConfig.get('colorSatisfaccion').value,
      },
      colorSatisfaccionMedia: {
        check:this.estiloConfig.get('checkColorSatisfaccionMedia').value,
        color:this.estiloConfig.get('colorSatisfaccionMedia').value,
      },
      colorDisatisfaccion: {
        check:this.estiloConfig.get('checkColorDisatisfaccion').value,
        color:this.estiloConfig.get('colorDisatisfaccion').value,
      },
      colorFueraTiempo: {
        check:this.estiloConfig.get('checkColorFueraTiempo').value,
        color:this.estiloConfig.get('colorFueraTiempo').value,
      },
      colorOcupada: {
        check:this.estiloConfig.get('checkColorOcupada').value,
        color:this.estiloConfig.get('colorOcupada').value,
      },
      colorDisponible: {
        check:this.estiloConfig.get('checkColorDisponible').value,
        color:this.estiloConfig.get('colorDisponible').value,
      },
      }

    this.ConfiguracionService.updateConfiguracionEstilo(configuracionEstilo).subscribe(res=>{
      this.AlertService.showSuccess('Configuración de estilo guardado con éxito.')
    })
  }else{
    this.AlertService.showWarning('Ingrese todos los datos.')
  }
  }
  guardarConfiguracionMesero(){
    if(this.meseroConfig.valid){

    let configuracionMesero:configuracionMesero ={
      satisfaccionAdecuada: this.meseroConfig.get('satisfaccionAdecuada').value,
      satisfaccionMedia: this.meseroConfig.get('satisfaccionMedia').value,
      disatisfaccion: this.meseroConfig.get('disatisfaccion').value,
      meseroEdit: this.meseroConfig.get('meseroEdit').value,
    }
    console.log(configuracionMesero)
    this.ConfiguracionService.updateConfiguracionMesero(configuracionMesero).subscribe(res=>{
      this.AlertService.showSuccess('Configuración de mesero guardado con éxito.')
    })
  }else{
    this.AlertService.showWarning('Ingrese todos los datos.')
  }
  }
  EliminarDescuentoIncremento(position:number){
console.log('delete '+position)
  }
  EliminarMetodoPago(position:number){
console.log('delete '+position)
  }
  guardarConfiguracioCaja(){
    console.log(this.configuracionCaja.value)
    if(this.configuracionCaja.valid){

    let configuracionCaja:configuracionCaja ={
      iva: this.configuracionCaja.get('iva').value,
      checkIVA: this.configuracionCaja.get('checkIVA').value,
      metodosPago: this.configuracionCaja.get('metodosPago').value,
      descuentosIntereses: this.configuracionCaja.get('descuentosIntereses').value,
      cierreCaja: this.configuracionCaja.get('cierreCaja').value,

    }
    this.ConfiguracionService.updateConfiguracionCaja(configuracionCaja).subscribe(res=>{
      this.AlertService.showSuccess('Configuración de cajero guardado con éxito.')
    })
  }else{
    this.AlertService.showWarning('Ingrese todos los datos.')
  }
  }
  checkValue(event: any){
    console.log("ss");
    console.log(event);
 }
}
