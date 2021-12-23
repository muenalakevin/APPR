import { MesaSeleccionada } from './../../../../shared/models/mesaSeleccionada';
import { PlatoPedido } from './../../../../shared/models/platoPedido';
import { Plato } from './../../../../shared/models/plato';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Pedido } from 'src/app/shared/models/pedido';
import { PedidoService } from './../../../../core/services/pedido.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {
  panelOpenState:boolean= true
  pedidos: Pedido[] = [];
  private pedidosSubscription: Subscription;
  dateNow:Date
  pedidoSeleccionado:Pedido
  platosPedidos:PlatoPedido[]=[]
  constructor(
    private PedidoService:PedidoService,
    private cdRef:ChangeDetectorRef
  ) { }
  ngAfterViewChecked()
{
  this.dateNow = new Date(Date.now())
  this.cdRef.detectChanges();
}




  ngOnInit(): void {
    console.log(this.pedidos);
    this.PedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = <Pedido[]>pedidos;
      console.log(this.pedidos);
    });

    this.pedidosSubscription = this.PedidoService.pedidos.subscribe(
      (pedidos) => {
        console.log(this.pedidos);
        this.pedidos = <Pedido[]>pedidos;
        const pedidoFind = this.pedidos.find(ped=> ped.id_mesa == this.pedidoSeleccionado.id_mesa)

        if(pedidoFind!=null){
          this.platosPedidos = pedidoFind.pedidos;
        }
      }
    );
    interval  (1000).subscribe(() => {
      this.pedidos=this.pedidos
    })
  }
  timer(pedido:Pedido){
    const tiempo = pedido.horaDeEnvio
    const tiempoActual = new Date(this.dateNow )

    let timeDiff =new Date( tiempoActual).getTime()  -  new Date(tiempo).getTime();
    timeDiff /= 1000;
    let seconds:string = (Math.round(timeDiff % 60)).toString();
    timeDiff = Math.floor(timeDiff / 60);
    const minutes = Math.round(timeDiff % 60);
    if(seconds.length == 1){
      seconds = <string>" 0"+seconds.toString()
    }
    return minutes+":"+seconds
  }

  mostrarPlatos(pedido:Pedido){
    this.pedidoSeleccionado = pedido
    this.platosPedidos = pedido.pedidos;
  }
}
