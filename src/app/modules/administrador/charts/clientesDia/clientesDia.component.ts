import { Component, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { ClienteService } from "src/app/core/services/cliente.service";
import { Cliente } from "src/app/shared/models/cliente";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-clientesDia',
  templateUrl: './clientesDia.component.html',
  styleUrls: ['./clientesDia.component.css']
})
export class ClientesDiaComponent {
  fechaInicio:Date = new Date('2021-04-11T10:20:30Z');
  top:number;
  fechaFin:Date = new Date(Date.now());
  clientes: Cliente[]=[];
  usuariosSubscription
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> ={
    series: [
      {
        name: "clientes",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    title: {
      text: "Clientes por dia",
      align: "left"
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: []
    }
  };;

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
   sacarClientes(fechaInicio:Date, cantidadMeses:number,pedidosSatisfaccion:Array<Cliente>){
     let mesInicial = fechaInicio.getMonth()+1;
     let anioInicial = fechaInicio.getFullYear();
     let satisfaccionConstruido:number[] = [];
       for(let i =0;i<=cantidadMeses;i++){
         let satisfaccion = 0

         pedidosSatisfaccion.map(p=>{
           let mesInicialPedido = new Date(p.createdAt).getMonth()+1;
           let anioInicialPedido = new Date(p.createdAt).getFullYear();

             if(mesInicialPedido==mesInicial){
               if(anioInicialPedido==anioInicial){
                 satisfaccion++
               }
             }


         })
         if(satisfaccion>this.top){
          this.top = satisfaccion
         }
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

   orgValueChange(){

    let cantidadDeMeses=this.creardorDeMeses(this.fechaInicio,this.fechaFin);
    this.arrayConstruidoDeFechas= this.sacarArrayMeses(this.fechaInicio,cantidadDeMeses)
    let clientes= this.sacarClientes(this.fechaInicio, cantidadDeMeses,this.clientes)
    this.chartOptions = {
      series: [
        {
          name: "clientes",
          data: clientes
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        },
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Clientes por dia",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.arrayConstruidoDeFechas
      }
    };
   }
  constructor(
    private ClienteService: ClienteService,

  ) {
    this.fechaInicio = new Date('2021-08-11T10:20:30Z');
    this.fechaFin = new Date(Date.now());
    this.usuariosSubscription = this.ClienteService.getClientes().subscribe(
      clientes => {
        this.clientes =<Cliente[]>clientes
        this.orgValueChange()


      });



  }
}
