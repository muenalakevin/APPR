import { Component, ViewChild } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart
} from "ng-apexcharts";
import { PedidoService } from "src/app/core/services/pedido.service";
import { Pedido } from "src/app/shared/models/pedido";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'app-platosDia',
  templateUrl: './platosDia.component.html',
  styleUrls: ['./platosDia.component.css']
})
export class PlatosDiaComponent {
  @ViewChild("chart") chart: PlatosDiaComponent;
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: "Metric1",
        data: []
      },
    ],
    chart: {
      height: 350,
      type: "heatmap"
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#008FFB"],
    title: {
      text: "Mapa de calor de pedidos"
    }
  };;


constructor(
  private pedidoService:PedidoService
){
this.orgValueChange();
}
sacarArrayHoras(){

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

 fechaComoCadena = new Date(Date.now()); // día lunes
 dias = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];


sacarDatosHoras(pedidos:Pedido[],dia:number){

  let series:object[] = [];
    for(let i = 0;i<=24;i++){
      let constructorString = ""
      let day = i+":00"
      if(i<=9){
        day = 0+day
      }
      constructorString = day

      let valor = 0

      pedidos.map(p=>{
        let numeroDia = new Date(p.createdAt).getDay();
        if(numeroDia==dia ){
          let horaInicialPedido = new Date(p.createdAt).getHours();

          if(horaInicialPedido==i){
            p.pedidos.map(pe=>{
              valor += pe.cantidad_pedido;
            })

          }
        }

      })
      series.push({
        x: constructorString,
        y: valor
      });

    }
    return series;

}
orgValueChange(){



  this.pedidoService.getAllPedidos().subscribe(res=>{

    let pedidos= res as Pedido[]
    let Domingo:any =this.sacarDatosHoras(pedidos, 0)
    let Lunes = this.sacarDatosHoras(pedidos, 1)
    let Martes = this.sacarDatosHoras(pedidos, 2)
    let Miercoles = this.sacarDatosHoras(pedidos, 3)
    let Jueves = this.sacarDatosHoras(pedidos, 4)
    let Viernes = this.sacarDatosHoras(pedidos, 5)
    let Sabado = this.sacarDatosHoras(pedidos, 6)




    let arrayConstruidoDeFechas= this.sacarArrayHoras()
        //ingresos= this.sacarDatosHoras()


    this.chartOptions = {
      series: [
        {
          name: "Domingo",
          data: Domingo
        },
        {
          name: "Lunes",
          data: Lunes
        },
        {
          name: "Martes",
          data: Martes
        },
        {
          name: "Miércoles",
          data: Miercoles
        },
        {
          name: "Jueves",
          data: Jueves
        },
        {
          name: "Viernes",
          data: Viernes
        },
        {
          name: "Sábado",
          data: Sabado
        },
      ],
      chart: {
        height: 350,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: "Mapa de calor de pedidos"
      }
    };
})

}







  public generateData(count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
}
