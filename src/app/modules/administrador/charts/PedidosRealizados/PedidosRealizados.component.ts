import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { PedidoService } from "src/app/core/services/pedido.service";
import { PlatoService } from "src/app/core/services/plato.service";
import { Pedido } from "src/app/shared/models/pedido";
import { Plato } from "src/app/shared/models/plato";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-PedidosRealizados',
  templateUrl: './PedidosRealizados.component.html',
  styleUrls: ['./PedidosRealizados.component.css']
})
export class PedidosRealizadosComponent {
  @ViewChild("chart") chart: ChartComponent = {} as ChartComponent;
  public chartOptions: Partial<ChartOptions>= {
    series: [
      {
        name: "basic",
        data: [1580,400, 430, 448, 470, 540, 580, 690, 1100, 1200]
      }
    ],
    chart: {
      type: "bar",
      height: 0
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany"
      ]
    }
  };;

  constructor(
    private pedidoService:PedidoService,
    private PlatoService:PlatoService,

  ) {
    this.orgValueChange();
  }
  orgValueChange(){



    this.pedidoService.getAllPedidos().subscribe(res=>{
      let pedidos= res as Pedido[]
      this.PlatoService.getPlatos().subscribe(res=>{
      let platos= res as Plato[]
      let cantidadesConstructor:any[] = []
      let platosConstructor:any[] = []
      pedidos.map(ped=>{
        ped.pedidos.map(pedPlato=>{
          let index = platosConstructor.indexOf(pedPlato.plato.nombre_plato);
         let cantidad = pedPlato.cantidad_pedido;
          if(index==-1){
            platosConstructor.push(pedPlato.plato.nombre_plato)
            cantidadesConstructor.push(cantidad)
          }else{
            cantidadesConstructor[index] =  cantidadesConstructor[index] + cantidad;
          }
        })
      });
      let datosConstructor:any[]=[]
      for (let i = 0; i < cantidadesConstructor.length; i++) {
        datosConstructor.push({
          n:platosConstructor[i],
          valor:cantidadesConstructor[i]
        })
      }

      datosConstructor.sort(function(a, b) {
        return Number(b.valor) - a.valor ;
    });
    platosConstructor=[]
    cantidadesConstructor=[]

    for (let i = 0; i < datosConstructor.length; i++) {
      platosConstructor.push(datosConstructor[i].n)
      cantidadesConstructor.push(datosConstructor[i].valor)
    }


      this.chartOptions =  {
        series: [
          {
            name: "Cantidad de pedidos",
            data: cantidadesConstructor
          }
        ],

        chart: {
          type: "bar",
          height:(cantidadesConstructor.length * 55)
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true
        },
        title: {
          text: 'Cantidad de pedidos por plato',
        },
        xaxis: {
          categories: platosConstructor
        }
      };;
      })
    })



          //ingresos= this.sacarDatosHoras()





  }


}
