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
    colorSatisfaccion: new FormControl(""),
    colorSatisfaccionMedia: new FormControl(""),
    colorDisatisfaccion: new FormControl(""),
    colorFueraTiempo: new FormControl(""),
    colorOcupada: new FormControl(""),
    colorDisponible: new FormControl(""),
    meseroEdit: new FormControl(""),

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
  colorAgregarCliente: new FormControl(""),
  checkColorAgregarCliente: new FormControl(""),
  colorEditarCliente: new FormControl(""),
  checkColorEditarCliente: new FormControl(""),
  colorFueraTiempo: new FormControl(""),
  checkColorFueraTiempo: new FormControl(""),
  colorPagar: new FormControl(""),
  checkColorPagar: new FormControl(""),
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
      estado: new FormControl(0),
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
      estado: new FormControl(0),
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
        checkColorAgregarCliente: new FormControl(configuracionCaja.colorAgregarCliente.check),
        checkColorEditarCliente: new FormControl(configuracionCaja.colorEditarCliente.check),
        checkColorFlechas: new FormControl(configuracionCaja.colorFlechas.check),
        checkColorPagar: new FormControl(configuracionCaja.colorPagar.check),
        colorAgregarCliente: new FormControl(configuracionCaja.colorAgregarCliente.color),
        colorEditarCliente: new FormControl(configuracionCaja.colorEditarCliente.color),
        colorFlechas: new FormControl(configuracionCaja.colorFlechas.color),
        colorPagar: new FormControl(configuracionCaja.colorPagar.color),
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
      this.AlertService.showSuccess('Configuración de mesero guardado con éxito.')
    })
  }else{
    this.AlertService.showWarning('Ingrese todos los datos.')
  }
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
      colorAgregarCliente: {
        check:this.configuracionCaja.get('checkColorAgregarCliente').value,
        color:this.configuracionCaja.get('colorAgregarCliente').value,
      },
      colorEditarCliente: {
        check:this.configuracionCaja.get('checkColorEditarCliente').value,
        color:this.configuracionCaja.get('colorEditarCliente').value,
      },
      colorFlechas: {
        check:this.configuracionCaja.get('checkColorFlechas').value,
        color:this.configuracionCaja.get('colorFlechas').value,
      },
      colorPagar: {
        check:this.configuracionCaja.get('checkColorPagar').value,
        color:this.configuracionCaja.get('colorPagar').value,
      },
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
