import { Component, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { ConfiguracionService } from "src/app/core/services/configuracion.service";
import { PedidoService } from "src/app/core/services/pedido.service";
import { configuracionMesero } from "src/app/shared/models/configuracion.mesero";
import { Pedido } from "src/app/shared/models/pedido";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-minutosEntregasClientes',
  templateUrl: './minutosEntregasClientes.component.html',
  styleUrls: ['./minutosEntregasClientes.component.css']
})
export class MinutosEntregasClientesComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>={
    series: [
      {
        name: "High - 2013",
        data: []
      },
      {
        name: "Low - 2013",
        data: []
      }
      ,
      {
        name: "Low - 2013",
        data: []
      }
      ,
      {
        name: "Low - 2013",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ["#77B6EA", "#545454",'#acc','#1cb'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: "smooth"
    },
    title: {
      text: "Average High & Low Temperature",
      align: "left"
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: [],
      /* categories: this.arrayConstruidoDeFechas, */
      title: {
        text: "Month"
      }
    },
    yaxis: {
      title: {
        text: "Temperature"
      },
      min: 0,
      max: 40
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };
  fechaInicio:Date = new Date('2021-04-11T10:20:30Z');
  fechaFin:Date = new Date(Date.now());
  pedidos:Pedido[]=[]
  pedidosSatisfaccion1:Pedido[]=[]
  pedidosSatisfaccion2:Pedido[]=[]
  pedidosSatisfaccion3:Pedido[]=[]
  pedidosSatisfaccion4:Pedido[]=[]
  configuracionMesero:configuracionMesero
  ngOnInit() {
    this.fechaInicio = new Date('2021-08-11T10:20:30Z');
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
  creardorDeMeses(fechaInicio:Date, fechaFin:Date){
    var past_date = new Date(fechaInicio);
    var current_date = new Date(fechaFin);
    return (current_date.getFullYear()*12 + current_date.getMonth()) - (past_date.getFullYear()*12 + past_date.getMonth());
  }
  meses:string[] = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  arrayConstruidoDeFechas:string[]=[]
  sacarArrayMeses(fechaInicio:Date, cantidadMeses:number){
    let mesInicial = fechaInicio.getMonth()+1;
    let anioInicial = fechaInicio.getFullYear();
    console.log()
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
  sacarPedidos(fechaInicio:Date, cantidadMeses:number,pedidosSatisfaccion:Array<Pedido>){
    let mesInicial = fechaInicio.getMonth()+1;
    let anioInicial = fechaInicio.getFullYear();
    let satisfaccionConstruido:number[] = [];

console.log(cantidadMeses,mesInicial)
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
        let constructorString = ""
        constructorString = this.meses[mesInicial-1]+" "+anioInicial;

          if(mesInicial<12){
            mesInicial++;
          }else{
            anioInicial++;
            mesInicial = 1;

          }

      }
      return satisfaccionConstruido;
  }
  constructor(
    private PedidoService:PedidoService,
    private configuracionService:ConfiguracionService,

  ) {
    this.configuracionService.getConfiguracionMesero().subscribe(res=>{
      this.configuracionMesero = res as configuracionMesero
      this.orgValueChange()
    })


  }


  orgValueChange(){
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
      console.log(colorSatisfaccion)



    this.PedidoService.getPedidosFecha(this.fechaInicio,this.fechaFin).subscribe(res=>{
      this.pedidos = res as Pedido[]

      this.pedidosSatisfaccion1 = this.filtrarPorSatisfaccion(this.configuracionMesero.satisfaccionAdecuada,0);
      this.pedidosSatisfaccion2 = this.filtrarPorSatisfaccion(this.configuracionMesero.satisfaccionMedia,this.configuracionMesero.satisfaccionAdecuada );
      this.pedidosSatisfaccion3 = this.filtrarPorSatisfaccion(this.configuracionMesero.disatisfaccion,this.configuracionMesero.satisfaccionMedia);
      this.pedidosSatisfaccion4 = this.filtrarPorSatisfaccion(1000,this.configuracionMesero.disatisfaccion);
      let cantidadDeMeses=this.creardorDeMeses(this.fechaInicio,this.fechaFin);
      this.arrayConstruidoDeFechas= this.sacarArrayMeses(this.fechaInicio,cantidadDeMeses)
      let pedidos1= this.sacarPedidos(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion1)
      let pedidos2= this.sacarPedidos(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion2)
      let pedidos3= this.sacarPedidos(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion3)
      let pedidos4= this.sacarPedidos(this.fechaInicio, cantidadDeMeses,this.pedidosSatisfaccion4)
       this.chartOptions = {
      series: [
        {
          name: "Satisfacción adecuada",
          data: pedidos1
        },
        {
          name: "Satisfacción media",
          data: pedidos2
        }
        ,
        {
          name: "Insatisfacción",
          data: pedidos3
        }
        ,
        {
          name: "Fuera de tiempo",
          data: pedidos4
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: true
          }

        }
      },
      colors: [colorSatisfaccion, colorSatisfaccionMedia,colorInsatisfaccion,colorFueraTiempo],
      dataLabels: {
        enabled: true
      },

      title: {
        text: "Satisfacción del usuario",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        /* categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], */
        categories: this.arrayConstruidoDeFechas,
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Cantidad de entregas por mes"
        },
        min: 0,

      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  })
    })
  }






}
