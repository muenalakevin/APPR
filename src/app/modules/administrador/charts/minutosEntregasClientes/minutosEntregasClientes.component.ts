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
  public chartOptions: Partial<ChartOptions>;
  fechaInicio:Date = new Date('2011-04-11T10:20:30Z');
  fechaFin:Date = new Date(Date.now());
  pedidos:Pedido[]=[]
  pedidos1:Pedido[]=[]
  pedidos2:Pedido[]=[]
  pedidos3:Pedido[]=[]
  pedidos4:Pedido[]=[]
  configuracionMesero:configuracionMesero
  ngOnInit() {
    this.fechaInicio = new Date('2011-04-11T10:20:30Z');
    this.fechaFin = new Date(Date.now());
    this.orgValueChange()
  }
  orgValueChange(){
    this.configuracionService.getConfiguracionMesero().subscribe(res=>{
      this.configuracionMesero = res as configuracionMesero
    })
    this.PedidoService.getPedidosFecha(this.fechaInicio,this.fechaFin).subscribe(res=>{



      this.pedidos = res as Pedido[]

      this.pedidos1 = this.pedidos.filter(p=>{
        const tiempoInicial = new Date(p.horaDeEnvio)
        const tiempoFinal = new Date(p.horaDeEntrega)
        console.log(tiempoFinal)
        let timeDiff =new Date( tiempoFinal).getTime()  -  new Date(tiempoInicial).getTime();
        timeDiff /= 1000;
        timeDiff = Math.floor(timeDiff / 60);
        const minutes = Math.round(timeDiff % 60);

        if(minutes<= this.configuracionMesero.satisfaccionAdecuada){
          return true
        }else{
          return false
        }
      })
      this.pedidos2 = this.pedidos.filter(p=>{
        const tiempoInicial = p.horaDeEnvio
        const tiempoFinal = p.horaDeEntrega

        let timeDiff =new Date( tiempoFinal).getTime()  -  new Date(tiempoInicial).getTime();
        timeDiff /= 1000;
        timeDiff = Math.floor(timeDiff / 60);
        const minutes = Math.round(timeDiff % 60);
        if(minutes>= this.configuracionMesero.satisfaccionAdecuada && minutes<= this.configuracionMesero.satisfaccionMedia){
          return true
        }else{
          return false
        }
      })
      this.pedidos3 = this.pedidos.filter(p=>{
        const tiempoInicial = p.horaDeEnvio
        const tiempoFinal = p.horaDeEntrega

        let timeDiff =new Date( tiempoFinal).getTime()  -  new Date(tiempoInicial).getTime();
        timeDiff /= 1000;
        timeDiff = Math.floor(timeDiff / 60);
        const minutes = Math.round(timeDiff % 60);
        if(minutes>= this.configuracionMesero.satisfaccionMedia && minutes<= this.configuracionMesero.disatisfaccion){
          return true
        }else{
          return false
        }
      })
      this.pedidos4 = this.pedidos.filter(p=>{
        const tiempoInicial = p.horaDeEnvio
        const tiempoFinal = p.horaDeEntrega

        let timeDiff =new Date( tiempoFinal).getTime()  -  new Date(tiempoInicial).getTime();
        timeDiff /= 1000;
        timeDiff = Math.floor(timeDiff / 60);
        const minutes = Math.round(timeDiff % 60);
        if(minutes>= this.configuracionMesero.disatisfaccion ){
          return true
        }else{
          return false
        }
      })
      console.log(this.pedidos4)
    })
  }
  constructor(
    private PedidoService:PedidoService,
    private configuracionService:ConfiguracionService,

  ) {
    this.chartOptions = {
      series: [
        {
          name: "High - 2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Low - 2013",
          data: [1, 11, 14, 18, 17, 13, 13]
        }
        ,
        {
          name: "Low - 2013",
          data: [2, 10, 18, 8, 11, 23, 4]
        }
        ,
        {
          name: "Low - 2013",
          data: [3, 15, 1, 1, 7, 3, 3]
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
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
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
  }
}
