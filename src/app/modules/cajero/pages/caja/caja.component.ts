import { MesaService } from './../../../../core/services/mesa.service';
import { MesaSeleccionada } from './../../../../shared/models/mesaSeleccionada';
import { PedidoService } from './../../../../core/services/pedido.service';
import { Pedido } from './../../../../shared/models/pedido';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatoPedido } from 'src/app/shared/models/platoPedido';
import { Mesa } from 'src/app/shared/models/mesa';
import { MatDrawer } from '@angular/material/sidenav';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  faSquareIcon=faSquare
  @ViewChild('drawer') drawer: MatDrawer;
  pedidos: Pedido[] = [];
  private pedidosSubscription: Subscription;
  private mesasSubscription: Subscription;
  pedidoSeleccionado:Pedido = new Pedido()
  platosPedidos:PlatoPedido[] = []
  panelOpenState:boolean
  mesaActual:MesaSeleccionada
  pedidoTotal:Pedido  = new Pedido()
  mesas: MesaSeleccionada[] = [];
  constructor(
    private PedidoService:PedidoService,
    private MesaService:MesaService,
  ) { }

  ngOnInit(): void {
    this.MesaService.getMesas().subscribe((mesas) => {
      this.mesas = <MesaSeleccionada[]>mesas;
    });

    this.mesasSubscription = this.MesaService.mesas.subscribe((mesas) => {
      this.mesas = <MesaSeleccionada[]>mesas;

      if (this.mesaActual != undefined) {

        this.mesaActual = this.mesas.find(
          (mesa) => this.mesaActual._id == mesa._id
        );
        if (this.mesaActual.estado != 0) {
          this.PedidoService.getPedido(this.mesaActual._id).subscribe((res) => {
            if (res != null) {
              this.pedidoTotal = res as Pedido;
            }
          });
        } else {
          this.clean();
          this.drawer.toggle();
        }
      }
    });
    this.PedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = <Pedido[]>pedidos;
    });
    this.pedidosSubscription = this.PedidoService.pedidos.subscribe(
      (pedidos) => {
        this.pedidos = <Pedido[]>pedidos;
        /* this.actualizarFiltroCategorias() */
        const pedidoFind = this.pedidos.find(ped=> ped.id_mesa == this.pedidoSeleccionado.id_mesa)
        
        if(pedidoFind!=null){
          this.platosPedidos = pedidoFind.pedidos;
        }
      })

      
  }

  canDrag(pedido:PlatoPedido) {
    return pedido.cantidad_lista < 1;
  }

  seleccionarMesa(mesa: MesaSeleccionada) {
    this.mesaActual = mesa;
    if (this.mesaActual != undefined) {
   
      if (this.mesaActual.estado >= 1) {
        
        this.PedidoService.getPedido2(this.mesaActual._id).subscribe((res) => {
          console.log(res)
          if(res!=undefined){
            this.pedidoTotal = res as Pedido;
            console.log(this.pedidoTotal)
          }

        });
      }else{
        this.pedidoTotal = new Pedido()
      }
    }
  }

  mostrarPlatos(pedido:Pedido){

  }
  clean() {
    this.pedidoTotal = new Pedido()
    this.mesaActual = undefined;
  }
  drop(event: CdkDragDrop<PlatoPedido[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
