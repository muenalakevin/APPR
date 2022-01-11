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
  tipoFiltrado = 2;
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
pedidosSatisfaccion1:Pedido[]=[]
pedidosSatisfaccion2:Pedido[]=[]
pedidosSatisfaccion3:Pedido[]=[]
pedidosSatisfaccion4:Pedido[]=[]
configuracionMesero:configuracionMesero
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

sacarPedidosHoras(fechaInicio:Date,pedidosSatisfaccion:Array<Pedido>){
 
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let diaInicial = fechaInicio.getDate();
  let satisfaccionConstruido:number[] = [];
    for(let i = 0;i<=24;i++){
      let satisfaccion = 0
      pedidosSatisfaccion.map(p=>{
      
        let horaInicialPedido = new Date(p.horaDeEntrega).getHours();
      
                if(horaInicialPedido>=i &&  horaInicialPedido<=i+1){
                  satisfaccion++
                }

      })
      satisfaccionConstruido.push(satisfaccion);
        if(mesInicial<12){
          mesInicial++;
        }else{
          anioInicial++;
          mesInicial = 1;
        }
    }
    return satisfaccionConstruido;
}
sacarPedidosDias(fechaInicio:Date, cantidadDias:number,pedidosSatisfaccion:Array<Pedido>){
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let diaInicial = fechaInicio.getDate();

  let satisfaccionConstruido:number[] = [];
    for(let i =0;i<cantidadDias;i++){
      let satisfaccion = 0
      pedidosSatisfaccion.map(p=>{
        
        let mesInicialPedido = new Date(p.horaDeEntrega).getMonth()+1;
        let anioInicialPedido = new Date(p.horaDeEntrega).getFullYear();
        let diaInicialPedido = new Date(p.horaDeEntrega).getDate();
        if(anioInicialPedido==anioInicial){
          if(mesInicialPedido==mesInicial){
              if(diaInicial+i==diaInicialPedido){
              satisfaccion++
              
            }
          }
        }
      })
      satisfaccionConstruido.push(satisfaccion);

       /*  if(mesInicial<12){
          mesInicial++;
        }else{
          anioInicial++;
          mesInicial = 1;
        } */

        
    }
    return satisfaccionConstruido;
}
sacarPedidosMeses(fechaInicio:Date, cantidadMeses:number,pedidosSatisfaccion:Array<Pedido>){
  let mesInicial = fechaInicio.getMonth()+1;
  let anioInicial = fechaInicio.getFullYear();
  let satisfaccionConstruido:number[] = [];
    for(let i =0;i<=cantidadMeses;i++){
      let satisfaccion = 0
      pedidosSatisfaccion.map(p=>{
        let mesInicialPedido = new Date(p.horaDeEntrega).getMonth()+1;
        let anioInicialPedido = new Date(p.horaDeEntrega).getFullYear();
          if(mesInicialPedido==mesInicial){
            if(anioInicialPedido==anioInicial){
              satisfaccion++
            }
          }
      })
      satisfaccionConstruido.push(satisfaccion);
        if(mesInicial<12){
          mesInicial++;
        }else{
          anioInicial++;
          mesInicial = 1;
        }
    }
    return satisfaccionConstruido;
}
sacarPedidosAnios(fechaInicio:Date, cantidadMeses:number,pedidosSatisfaccion:Array<Pedido>){
  let anioInicial = fechaInicio.getFullYear();
  let satisfaccionConstruido:number[] = [];
    for(let i =0;i<cantidadMeses;i++){
      let satisfaccion = 0
      pedidosSatisfaccion.map(p=>{
        let anioInicialPedido = new Date(p.horaDeEntrega).getFullYear();
            if(anioInicialPedido==anioInicial){
              satisfaccion++
            }
      })
      satisfaccionConstruido.push(satisfaccion);
          anioInicial++;
    }
    return satisfaccionConstruido;
}
constructor(
  private PedidoService:PedidoService,
  private configuracionService:ConfiguracionService,
  private UsuarioService:UsuarioService,

) {
  this.UsuarioService.getUsersMeseros().subscribe(res=>{
    this.meseros = res as Usuario[]
  })
  this.configuracionService.getConfiguracionMesero().subscribe(res=>{
    this.configuracionMesero = res as configuracionMesero
    this.fechaFin = new Date(Date.now());
      let month = this.fechaFin.getMonth()-4
      if(month<=0 ){
        month = 12 + month;
        this.fechaInicio = new Date(this.fechaFin.getFullYear()-1,month,1,0,0,0)
      }else{
        this.fechaInicio = new Date(this.fechaFin.getFullYear(),month,1,0,0,0)
      }
      console.log(this.fechaInicio);
      console.log(this.fechaFin);
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
  this.configuracionService.getConfiguracionMesero().subscribe(res=>{
    this.configuracionMesero = res as configuracionMesero
    let colorSatisfaccion:string
    let colorSatisfaccionMedia:string
    let colorInsatisfaccion:string
    let colorFueraTiempo:string
    if(this.configuracionMesero.colorSatisfaccion.check){
      colorSatisfaccion=  this.configuracionMesero.colorSatisfaccion.color
    }else{
      colorSatisfaccion = "#28a745"
    }
    if(this.configuracionMesero.colorSatisfaccionMedia.check){
      colorSatisfaccionMedia = this.configuracionMesero.colorSatisfaccionMedia.color
    }else{
      colorSatisfaccionMedia = "#ffc107"
    }
    if(this.configuracionMesero.colorDisatisfaccion.check){
      colorInsatisfaccion = this.configuracionMesero.colorDisatisfaccion.color
    }else{
      colorInsatisfaccion = "#dc3545"
    }

    if(this.configuracionMesero.colorFueraTiempo.check){
      colorFueraTiempo = this.configuracionMesero.colorFueraTiempo.color
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
        this.fechaFin = new Date( this.fechaFin.getFullYear(),this.fechaFin.getMonth(),this.fechaFin.getDate(),0,0,0);
        this.fechaInicio = new Date( this.fechaFin.getFullYear(),this.fechaFin.getMonth(),this.fechaFin.getDate(),23,59,59);
      }else if(this.tipoFiltrado==2){
        this.fechaFin = new Date( this.fechaFin.getFullYear(),this.fechaFin.getMonth(),1,0,0,0);
        this.fechaInicio = new Date( this.fechaFin.getFullYear(),this.fechaFin.getMonth(),new Date(this.fechaFin.getFullYear(), this.fechaFin.getMonth() +1, 0).getDate(),23,59,59);
      }else{
        this.fechaFin = new Date( this.fechaFin.getFullYear(),0,1,0,0,0);
        this.fechaInicio = new Date( this.fechaFin.getFullYear(),11,31,23,59,59);
      }
    }
    console.log(this.fechaInicio);
    console.log(this.fechaFin);
  this.PedidoService.getPedidosFecha(this.fechaInicio,this.fechaFin,this.tipoSeleccion,this.tipoFiltrado,this.mesero).subscribe(res=>{

    this.pedidos = res as Pedido[]
    this.pedidosSatisfaccion1 = this.filtrarPorSatisfaccion(this.configuracionMesero.satisfaccionAdecuada,0);
    this.pedidosSatisfaccion2 = this.filtrarPorSatisfaccion(this.configuracionMesero.satisfaccionMedia,this.configuracionMesero.satisfaccionAdecuada );
    this.pedidosSatisfaccion3 = this.filtrarPorSatisfaccion(this.configuracionMesero.disatisfaccion,this.configuracionMesero.satisfaccionMedia);
    this.pedidosSatisfaccion4 = this.filtrarPorSatisfaccion(1000,this.configuracionMesero.disatisfaccion);
    let pedidos1
    let pedidos2
    let pedidos3
    let pedidos4
    

    
    if(this.tipoFiltrado==1){
      if(this.tipoSeleccion == 1){
        let cantidadDeDias=this.creardorDeDias(this.fechaInicio,this.fechaFin);
        this.arrayConstruidoDeFechas= this.sacarArrayDias(this.fechaInicio,cantidadDeDias)
        pedidos1= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion1)
        pedidos2= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion2)
        pedidos3= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion3)
        pedidos4= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion4)
      }else{
        this.arrayConstruidoDeFechas= this.sacarArrayHoras(this.fechaInicio)
        pedidos1= this.sacarPedidosHoras(this.fechaInicio,this.pedidosSatisfaccion1)
        pedidos2= this.sacarPedidosHoras(this.fechaInicio,this.pedidosSatisfaccion2)
        pedidos3= this.sacarPedidosHoras(this.fechaInicio,this.pedidosSatisfaccion3)
        pedidos4= this.sacarPedidosHoras(this.fechaInicio,this.pedidosSatisfaccion4)
      }
     
    }else if(this.tipoFiltrado==2){
      if(this.tipoSeleccion == 1){
      let cantidadDeMeses=this.creardorDeMeses(this.fechaInicio,this.fechaFin);
      this.arrayConstruidoDeFechas= this.sacarArrayMeses(this.fechaInicio,cantidadDeMeses)
      pedidos1= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion1)
      pedidos2= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion2)
      pedidos3= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion3)
      pedidos4= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion4)
    }else{
      let cantidadDeDias=this.creardorDeDias(this.fechaInicio,this.fechaFin);
        this.arrayConstruidoDeFechas= this.sacarArrayDias(this.fechaInicio,cantidadDeDias)
        pedidos1= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion1)
        pedidos2= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion2)
        pedidos3= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion3)
        pedidos4= this.sacarPedidosDias(this.fechaInicio, cantidadDeDias,this.pedidosSatisfaccion4)
    }
    }else if(this.tipoFiltrado==3){
      if(this.tipoSeleccion == 1){
      let cantidadDeanios=this.creardorDeAnios(this.fechaInicio,this.fechaFin);
      this.arrayConstruidoDeFechas= this.sacarArrayAnios(this.fechaInicio,cantidadDeanios)
      pedidos1= this.sacarPedidosAnios(this.fechaInicio, cantidadDeanios,this.pedidosSatisfaccion1)
      pedidos2= this.sacarPedidosAnios(this.fechaInicio, cantidadDeanios,this.pedidosSatisfaccion2)
      pedidos3= this.sacarPedidosAnios(this.fechaInicio, cantidadDeanios,this.pedidosSatisfaccion3)
      pedidos4= this.sacarPedidosAnios(this.fechaInicio, cantidadDeanios,this.pedidosSatisfaccion4)
    }else{
      let cantidadDeMeses=this.creardorDeMeses(this.fechaInicio,this.fechaFin);
      this.arrayConstruidoDeFechas= this.sacarArrayMeses(this.fechaInicio,cantidadDeMeses)
      pedidos1= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion1)
      pedidos2= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion2)
      pedidos3= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion3)
      pedidos4= this.sacarPedidosMeses(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion4)
    }
    }
    
     this.chartOptions = {
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
})
  })
}




}