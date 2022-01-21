import { UsuarioService } from './../../../../core/services/usuario.service';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { configuracionMesero } from 'src/app/shared/models/configuracion.mesero';
import { Pedido } from 'src/app/shared/models/pedido';
import { Usuario } from 'src/app/shared/models/usuario';
import { Component, Directive, ViewChild } from "@angular/core";
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { MatDatepicker, MatDateRangePicker } from '@angular/material/datepicker';
import { CajaService } from 'src/app/core/services/caja.service';
import { Caja } from 'src/app/shared/models/caja';
import { C } from '@angular/cdk/keycodes';
import { configuracionEstilo } from 'src/app/shared/models/configuracion.estilo';
import { Egreso } from 'src/app/shared/models/egreso';
import { EgresoService } from 'src/app/core/services/egreso.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-egresosEIngresos',
  templateUrl: './egresosEIngresos.component.html',
  styleUrls: ['./egresosEIngresos.component.css']
})
export class EgresosEIngresosComponent  {
  public unique_key: number;
  tipoSeleccion = 1;
  tipoFiltrado = 1;
  paso = 1
  mesero = "";
  meseros:Usuario[]=[]
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>={
    series: [
      {
        name: "Ingreso",
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: "Egreso",
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],

    chart: {
      height: 350,
      type: "area"
    },
    colors: ["#77B6EA", "#d63384"],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    }
  };




fechaInicio:Date
fechaFin:Date = new Date(Date.now())
pedidos:Pedido[]=[]
egresos:Egreso[] = []
configuracionMesero:configuracionMesero
configuracionEstilo:configuracionEstilo = new configuracionEstilo()
meses:string[] = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
@ViewChild('picker') picker: MatDateRangePicker<Moment>;
arrayConstruidoDeFechas:string[]=[]


chosenYearHandler(normalizedYear: Moment, datepicker: MatDateRangePicker<Moment>) {

  if(this.tipoFiltrado == 3){
    if(this.paso==1){
      this.fechaInicio = new Date(normalizedYear.year(),0)
      this.fechaFin = null
      setTimeout(function(){
        datepicker.open()
      },100);
      this.paso = 2
    }else{
      this.fechaFin = new Date(normalizedYear.year(),0)
      this.paso = 1
      this.orgValueChange()
    }
    datepicker.close();
    }else if(this.tipoFiltrado == 2){
      if(this.paso==1){
        this.fechaInicio = new Date(normalizedYear.year(),0)
        this.fechaFin = null
      }else{
        this.fechaFin = new Date(normalizedYear.year(),0)
      }
    }



  }

chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDateRangePicker<Moment>) {
  if(this.tipoFiltrado > 1){
  if(this.paso==1){
    this.fechaInicio = new Date(this.fechaInicio.getFullYear(),normalizedMonth.month())
    setTimeout(function(){
      datepicker.open()
    },100);
    this.paso = 2
  }else {
    this.fechaFin = new Date(this.fechaFin.getFullYear(),normalizedMonth.month())
    this.paso = 1
    this.orgValueChange()
  }
  datepicker.close();
  }
}


chosenYearHandler2(normalizedYear: Moment,  datepicker: MatDatepicker<Moment>) {

  if(this.tipoFiltrado == 3){
      this.fechaInicio = new Date(normalizedYear.year(),0)
      this.orgValueChange()
    datepicker.close();
    }else if(this.tipoFiltrado == 2){
        this.fechaInicio = new Date(normalizedYear.year(),0)
    }

}

chosenMonthHandler2(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  if(this.tipoFiltrado > 1){
      this.fechaInicio = new Date(this.fechaInicio.getFullYear(),normalizedMonth.month())
      this.orgValueChange()
    datepicker.close();

    }
}
ngOnInit() {

  this.fechaInicio = new Date('2021-11-11T10:20:30Z');
  this.fechaFin = new Date(Date.now());

}

filtrarPorSatisfaccion(nivelDeSatisfaccion1:number,nivelDeSatisfaccion2:number){
 return  this.pedidos.filter(p=>{
    const tiempoInicial = new Date(p.horaDeEnvio)
    const tiempoFinal = new Date(p.horaDeEntrega)
    let timeDiff =new Date( tiempoFinal).getTime()  -  new Date(tiempoInicial).getTime();
    timeDiff /= 1000;
    timeDiff = Math.floor(timeDiff / 60);
    const minutes = Math.round(timeDiff % 60);

    if(minutes>= nivelDeSatisfaccion2 && minutes<= nivelDeSatisfaccion1){
      return true
    }else{
      return false
    }
  })
}
creardorDeDias(fechaInicio:Date, fechaFin:Date){

  let diferencia = moment(fechaInicio).toDate().getTime()-fechaFin.getTime()
  var contdias = Math.abs(Math.round(diferencia/(1000*60*60*24)));

  return contdias;
}
creardorDeMeses(fechaInicio:Date, fechaFin:Date){
  let past_date = new Date(fechaInicio);
  let current_date = new Date(fechaFin);
  return (current_date.getFullYear()*12 + current_date.getMonth()) - (past_date.getFullYear()*12 + past_date.getMonth());
}
creardorDeAnios(fechaInicio:Date, fechaFin:Date){
  var past_date = new Date(fechaInicio);
  var current_date = new Date(fechaFin);
  return (current_date.getFullYear()  - past_date.getFullYear())+1;
}

sacarArrayHoras(fechaInicio:Date){

  let stringConstruido:string[] = [];
    for(let i =0;i<=24;i++){
      let constructorString = ""
      let day = i+":00"
      if(i<=9){
        day = 0+day
      }
      constructorString = day /*+" "+  moment(fechaInicio.getDay()).format('dddd'); */
      stringConstruido.push(constructorString)
    }
    return stringConstruido;
}
sacarArrayDias(fechaInicio:Date, cantidadDias:number){
  let diaInicial = fechaInicio.getDate();

  let mesInicial = fechaInicio.getMonth();
  let anioInicial = fechaInicio.getFullYear();


  let stringConstruido:string[] = [];
    for(let i =0;i<cantidadDias;i++){
      let constructorString = ""


      let dia = diaInicial.toString()
      let mes = (mesInicial+1).toString()
      if(diaInicial<=9){
          dia = "0"+dia
      }
      if(mesInicial<=9){
          mes = "0"+mes
      }
      let testDate = dia+"/"+mes+"/"+ anioInicial;
      let isValidDate = moment(testDate, 'DD/MM/YYYY',true).isValid();

      if (isValidDate) {

        constructorString = diaInicial +" "+ this.meses[mesInicial]+" "+anioInicial;
        diaInicial++
        stringConstruido.push(constructorString)
      }
      else{
        i--

        if(mesInicial<12){
          mesInicial++;
          diaInicial=1
        }else{
          anioInicial++;
          mesInicial = 1;
          diaInicial=1
        }
      }



    }
    return stringConstruido;
}
sacarArrayMeses(fechaInicio:Date, cantidadMeses:number){
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let stringConstruido:string[] = [];
    for(let i =0;i<=cantidadMeses;i++){
      let constructorString = ""
      constructorString = this.meses[mesInicial-1]+" "+anioInicial;
        if(mesInicial<12){
          mesInicial++;
        }else{
          anioInicial++;
          mesInicial = 1;
        }
        stringConstruido.push(constructorString)
    }
    return stringConstruido;
}

sacarArrayAnios(fechaInicio:Date, cantidadAnios:number){
  let anioInicial = fechaInicio.getFullYear();
  let stringConstruido:string[] = [];
    for(let i =0;i<cantidadAnios;i++){
      let constructorString = ""
      constructorString = anioInicial.toString();
          anioInicial++;
        stringConstruido.push(constructorString)
    }
    return stringConstruido;
}

sacarDatosHoras(fechaInicio:Date,cajas:Array<any>,sacar:string){

  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let diaInicial = fechaInicio.getDate();
  let valoresConnstruido:number[] = [];
    for(let i = 0;i<=24;i++){
      let valor = 0
      cajas.map(c=>{

        let horaInicialPedido = new Date(c.createdAt).getHours();

                if(horaInicialPedido==i ){

                  if(sacar == "ingreso"){
                    console.log( c)
                    valor += c.cantidad_ingreso
                  }else{
                    valor += c.cantidad_egreso
                  }
                }

      })
      valoresConnstruido.push(Number((Math.round(valor * 100) / 100).toFixed(2)));
        if(mesInicial<12){
          mesInicial++;
        }else{
          anioInicial++;
          mesInicial = 1;
        }
    }
    return valoresConnstruido;
}
sacarDatosPorDias(fechaInicio:Date, cantidadDias:number,caja:Array<any>,sacar:string){
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let diaInicial = fechaInicio.getDate();

  let valoresConnstruido:number[] = [];
    for(let i =0;i<cantidadDias;i++){
      let valor = 0
      caja.map(c=>{

        let mesInicialPedido = new Date(c.createdAt).getMonth()+1;
        let anioInicialPedido = new Date(c.createdAt).getFullYear();
        let diaInicialPedido = new Date(c.createdAt).getDate();
        if(anioInicialPedido==anioInicial){
          if(mesInicialPedido==mesInicial){
              if(diaInicial+i==diaInicialPedido){
                if(sacar == "ingreso"){
                  valor += c.cantidad_ingreso

                }else{
                  valor += c.cantidad_egreso
                }

            }
          }
        }
      })
      valoresConnstruido.push(Number((Math.round(valor * 100) / 100).toFixed(2)));
    }
    return valoresConnstruido;
}
sacarEgresosPorDias(fechaInicio:Date, cantidadDias:number,egresos:Array<Egreso>){
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let diaInicial = fechaInicio.getDate();

  let valoresConnstruido:number[] = [];
    for(let i =0;i<cantidadDias;i++){
      let valor = 0
      egresos.map(c=>{

        let mesInicialPedido = new Date(c.createdAt).getMonth()+1;
        let anioInicialPedido = new Date(c.createdAt).getFullYear();
        let diaInicialPedido = new Date(c.createdAt).getDate();
        if(anioInicialPedido==anioInicial){
          if(mesInicialPedido==mesInicial){
              if(diaInicial+i==diaInicialPedido){
                valor += c.cantidad_egreso

            }
          }
        }
      })
      valoresConnstruido.push(Number((Math.round(valor * 100) / 100).toFixed(2)));
    }
    return valoresConnstruido;
}
sacarDatosMeses(fechaInicio:Date, cantidadMeses:number,cajas:Array<any>,sacar:string){
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let valoresConnstruido:number[] = [];
    for(let i =0;i<=cantidadMeses;i++){
      let valor = 0
      cajas.map(c=>{
        let mesInicialPedido = new Date(c.createdAt).getMonth()+1;
        let anioInicialPedido = new Date(c.createdAt).getFullYear();

          if(mesInicialPedido==mesInicial){

            if(anioInicialPedido==anioInicial){

              if(sacar=="ingreso"){

                valor+= c.cantidad_ingreso
              }else{
                valor+= c.cantidad_egreso
              }

            }
          }
      })
      valoresConnstruido.push(Number((Math.round(valor * 100) / 100).toFixed(2)));
        if(mesInicial<12){
          mesInicial++;
        }else{
          anioInicial++;
          mesInicial = 1;
        }
    }

    return valoresConnstruido;
}
sacarEgresosMeses(fechaInicio:Date, cantidadMeses:number,cajas:Array<Egreso>){
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let valoresConnstruido:number[] = [];
    for(let i =0;i<=cantidadMeses;i++){
      let valor = 0
      cajas.map(c=>{
        let mesInicialPedido = new Date(c.createdAt).getMonth()+1;
        let anioInicialPedido = new Date(c.createdAt).getFullYear();

          if(mesInicialPedido==mesInicial){

            if(anioInicialPedido==anioInicial){

              valor+= c.cantidad_egreso

            }
          }
      })
      valoresConnstruido.push(Number((Math.round(valor * 100) / 100).toFixed(2)));
        if(mesInicial<12){
          mesInicial++;
        }else{
          anioInicial++;
          mesInicial = 1;
        }
    }

    return valoresConnstruido;
}
sacarDatosAnios(fechaInicio:Date, cantidadMeses:number,cajas:Array<any>,sacar:string){
  let anioInicial = fechaInicio.getFullYear();
  let valoresConnstruido:number[] = [];
    for(let i =0;i<cantidadMeses;i++){
      let valor = 0
      cajas.map(c=>{
        let anioInicialPedido = new Date(c.createdAt).getFullYear();
            if(anioInicialPedido==anioInicial){
              if(sacar=="ingreso"){
                valor+= c.cantidad_ingreso
              }else{
                valor+= c.cantidad_egreso
              }

            }
      })
      valoresConnstruido.push(Number((Math.round(valor * 100) / 100).toFixed(2)));
          anioInicial++;
    }
    return valoresConnstruido;
}
sacarEgresosAnios(fechaInicio:Date, cantidadMeses:number,cajas:Array<Egreso>){
  let anioInicial = fechaInicio.getFullYear();
  let valoresConnstruido:number[] = [];
    for(let i =0;i<cantidadMeses;i++){
      let valor = 0
      cajas.map(c=>{
        let anioInicialPedido = new Date(c.createdAt).getFullYear();
            if(anioInicialPedido==anioInicial){
              valor+= c.cantidad_egreso

            }
      })
      valoresConnstruido.push(Number((Math.round(valor * 100) / 100).toFixed(2)));
          anioInicial++;
    }
    return valoresConnstruido;
}
constructor(
  private PedidoService:PedidoService,
  private configuracionService:ConfiguracionService,
  private UsuarioService:UsuarioService,
  private cajaService:CajaService,
  private EgresoService:EgresoService,

) {
  this.UsuarioService.getUsersMeseros().subscribe(res=>{
    this.meseros = res as Usuario[]
  })
  this.configuracionService.getConfiguracionMesero().subscribe(res=>{
    this.configuracionMesero = res as configuracionMesero
    this.fechaFin = new Date(Date.now());
      this.fechaInicio = new Date(this.fechaFin.getFullYear(), this.fechaFin.getMonth(),1,0,0,0)
    this.orgValueChange()
  })


}
cambiarTipos(){

  if(this.tipoSeleccion == 1){
    if(this.tipoFiltrado==1){
      this.fechaFin = new Date(Date.now());
      this.fechaInicio = new Date(this.fechaFin.getFullYear(), this.fechaFin.getMonth(),1,0,0,0)
    }else if(this.tipoFiltrado==2){
      this.fechaFin = new Date(Date.now());
      let month = this.fechaFin.getMonth()-4
      if(month<=0 ){
        month = 12 + month;
        this.fechaInicio = new Date(this.fechaFin.getFullYear()-1,month,1,0,0,0)
      }else{
        this.fechaInicio = new Date(this.fechaFin.getFullYear(),month,1,0,0,0)
      }
    }else{
      this.fechaFin = new Date(Date.now());
      this.fechaFin = new Date( this.fechaFin.getFullYear(),11,31,23,59,59);
      this.fechaInicio = new Date(this.fechaFin.getFullYear()-1,0,0,0,0,0);

    }
  }else{
    if(this.tipoFiltrado==1){
      this.fechaInicio = new Date(Date.now());
      this.fechaInicio = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),this.fechaInicio.getDate(),0,0,0);
      this.fechaFin = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),this.fechaInicio.getDate(),23,59,59);
    }else if(this.tipoFiltrado==2){
      this.fechaInicio = new Date(Date.now());
      this.fechaInicio = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),1,0,0,0);
      this.fechaFin = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth() +1, 0).getDate(),23,59,59);
    }else{
      this.fechaInicio = new Date(Date.now());
      this.fechaInicio = new Date( this.fechaInicio.getFullYear(),0,1,0,0,0);
      this.fechaFin = new Date( this.fechaInicio.getFullYear(),11,31,23,59,59);
    }
  }



  this.orgValueChange()
}


orgValueChange(){

  this.fechaInicio = moment(this.fechaInicio).toDate()
  this.fechaFin = moment(this.fechaFin).toDate()

  this.configuracionService.getConfiguracionEstilo().subscribe(res=>{

    this.configuracionEstilo = res as configuracionEstilo
    let colorSatisfaccion:string
    let colorSatisfaccionMedia:string
    let colorInsatisfaccion:string
    let colorFueraTiempo:string
    if(this.configuracionEstilo.colorSatisfaccion.check){
      colorSatisfaccion=  this.configuracionEstilo.colorSatisfaccion.color
    }else{
      colorSatisfaccion = "#28a745"
    }
    if(this.configuracionEstilo.colorSatisfaccionMedia.check){
      colorSatisfaccionMedia = this.configuracionEstilo.colorSatisfaccionMedia.color
    }else{
      colorSatisfaccionMedia = "#ffc107"
    }
    if(this.configuracionEstilo.colorDisatisfaccion.check){
      colorInsatisfaccion = this.configuracionEstilo.colorDisatisfaccion.color
    }else{
      colorInsatisfaccion = "#dc3545"
    }

    if(this.configuracionEstilo.colorFueraTiempo.check){
      colorFueraTiempo = this.configuracionEstilo.colorFueraTiempo.color
    }else{
      colorFueraTiempo = "#343a40"
    }

    if(this.tipoSeleccion == 1){
      if(this.tipoFiltrado==1){
        this.fechaInicio = new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth(),this.fechaInicio.getDate(),0,0,0)
        this.fechaFin = new Date(this.fechaFin.getFullYear(), this.fechaFin.getMonth(),this.fechaFin.getDate(),23,59,59)
      }else if(this.tipoFiltrado==2){
        this.fechaInicio = new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth(),1,0,0,0)
        this.fechaFin = new Date(this.fechaFin.getFullYear(), this.fechaFin.getMonth(),new Date(this.fechaFin.getFullYear(), this.fechaFin.getMonth() +1, 0).getDate(),23,59,59)
      }else{
        this.fechaInicio = new Date(this.fechaInicio.getFullYear(), 0,1,0,0,0)
        this.fechaFin = new Date(this.fechaFin.getFullYear(), 11,31,23,59,59)
      }
    }else{
      if(this.tipoFiltrado==1){
        this.fechaInicio = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),this.fechaInicio.getDate(),0,0,0);
        this.fechaFin = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),this.fechaInicio.getDate(),23,59,59);
      }else if(this.tipoFiltrado==2){
        this.fechaInicio = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),1,0,0,0);
        this.fechaFin = new Date( this.fechaInicio.getFullYear(),this.fechaInicio.getMonth(),new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth() +1, 0).getDate(),23,59,59);
      }else{
        this.fechaInicio = new Date( this.fechaInicio.getFullYear(),0,1,0,0,0);
        this.fechaFin = new Date( this.fechaInicio.getFullYear(),11,31,23,59,59);
      }
    }


  this.cajaService.getCajasFecha(this.fechaInicio,this.fechaFin,this.tipoSeleccion,this.tipoFiltrado,this.mesero).subscribe(res=>{
    this.EgresoService.getEgresosFecha(this.fechaInicio,this.fechaFin).subscribe((egresosRes)=>{
      let egresosArr=egresosRes as Egreso[]

    let cajas= res as Caja[]

    let ingresos
    let egresos


    if(this.tipoFiltrado==1){
      if(this.tipoSeleccion == 1){
        let cantidadDeDias=this.creardorDeDias(this.fechaInicio,this.fechaFin);
        this.arrayConstruidoDeFechas= this.sacarArrayDias(this.fechaInicio,cantidadDeDias)
        ingresos= this.sacarDatosPorDias(this.fechaInicio, cantidadDeDias,cajas,"ingreso")
        egresos= this.sacarDatosPorDias(this.fechaInicio, cantidadDeDias, egresosArr,"egreso")

      }else{
        this.arrayConstruidoDeFechas= this.sacarArrayHoras(this.fechaInicio)
        ingresos= this.sacarDatosHoras(this.fechaInicio,cajas,"ingreso")
        egresos= this.sacarDatosHoras(this.fechaInicio,egresosArr,"egreso")
      }

    }else if(this.tipoFiltrado==2){
      if(this.tipoSeleccion == 1){
      let cantidadDeMeses=this.creardorDeMeses(this.fechaInicio,this.fechaFin);
      this.arrayConstruidoDeFechas= this.sacarArrayMeses(this.fechaInicio,cantidadDeMeses)
      ingresos= this.sacarDatosMeses(this.fechaInicio, cantidadDeMeses,cajas,"ingreso")
      egresos= this.sacarDatosMeses(this.fechaInicio, cantidadDeMeses,egresosArr,"egreso")
    }else{
      let cantidadDeDias=this.creardorDeDias(this.fechaInicio,this.fechaFin);
        this.arrayConstruidoDeFechas= this.sacarArrayDias(this.fechaInicio,cantidadDeDias)
        ingresos= this.sacarDatosPorDias(this.fechaInicio, cantidadDeDias,cajas,"ingreso")
        egresos= this.sacarDatosPorDias(this.fechaInicio, cantidadDeDias,egresosArr,"egreso")


    }
    }else if(this.tipoFiltrado==3){
      if(this.tipoSeleccion == 1){
      let cantidadDeanios=this.creardorDeAnios(this.fechaInicio,this.fechaFin);
      this.arrayConstruidoDeFechas= this.sacarArrayAnios(this.fechaInicio,cantidadDeanios)
      ingresos= this.sacarDatosAnios(this.fechaInicio, cantidadDeanios,cajas,"ingreso")
      egresos= this.sacarDatosAnios(this.fechaInicio, cantidadDeanios,egresosArr,"egreso")
    }else{
      let cantidadDeMeses=this.creardorDeMeses(this.fechaInicio,this.fechaFin);
      this.arrayConstruidoDeFechas= this.sacarArrayMeses(this.fechaInicio,cantidadDeMeses)
      ingresos= this.sacarDatosMeses(this.fechaInicio, cantidadDeMeses,cajas,"ingreso")
      egresos= this.sacarDatosMeses(this.fechaInicio, cantidadDeMeses,egresosArr,"egreso")
    }
    }

     this.chartOptions = {
      series: [
        {
          name: "Ingreso",
          data: ingresos
        },
        {
          name: "Egreso",
          data: egresos
        }
      ],

      chart: {
        height: 350,
        type: "area"
      },
      colors: ["#77B6EA", "#d63384"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {

        categories: this.arrayConstruidoDeFechas
      },

    };
})
    })
  })
}




}
