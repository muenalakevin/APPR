import { CalificacionService } from './../../../../core/services/calificacion.service';
import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-calificacionTotal',
  templateUrl: './calificacionTotal.component.html',
  styleUrls: ['./calificacionTotal.component.css']
})
export class CalificacionTotalComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private CalificacionService:CalificacionService
  ) {
    this.CalificacionService.getCalificacion().subscribe((calificaciones)=>{
    let calificacionesTotal = ( calificaciones as Array<any>)
    let calificaciones1 = calificacionesTotal.filter(cal => cal.calificacion==1);
    let calificaciones2 = calificacionesTotal.filter(cal => cal.calificacion==2);
    let calificaciones3 = calificacionesTotal.filter(cal => cal.calificacion==3);
    let calificaciones4 = calificacionesTotal.filter(cal => cal.calificacion==4);
    let calificaciones5 = calificacionesTotal.filter(cal => cal.calificacion==5);
  
    
    this.chartOptions = {
      series: [
        calificaciones1.length, 
        calificaciones2.length, 
        calificaciones3.length, 
        calificaciones4.length, 
        calificaciones5.length],
      chart: {
        type: "pie"
      },
      labels: ["Calificación de 1", "Calificación de 2", "Calificación de 3", "Calificación de 4", "Calificación de 5"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  })
  }
}
