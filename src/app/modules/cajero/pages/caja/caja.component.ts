import { Plato } from './../../../../shared/models/plato';
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
import {CdkDragDrop, CdkDragExit, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';

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
  clientes:Array<any>=[]
  stateCtrl = new FormControl();
 

  platosPedidos:PlatoPedido[] = []
  panelOpenState:boolean
  mesaActual:MesaSeleccionada
  pedidoTotal:Pedido  = new Pedido()
  pedidoTotalAux:Pedido = new Pedido()
  mesas: MesaSeleccionada[] = [];
  constructor(
    private PedidoService:PedidoService,
    private MesaService:MesaService,
  ) { }
  applyFilterPlatos(event:Event){

  }
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
              this.pedidoTotal.pedidos =  this.pedidoTotal.pedidos.filter(ped=>ped.cantidad_servida!=0)
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
     
        const pedidoFind = this.pedidos.find(ped=> ped.id_mesa == this.pedidoTotal.id_mesa)
        
        if(pedidoFind!=null){
          this.pedidoTotal = pedidoFind;
          this.pedidoTotal.pedidos =  this.pedidoTotal.pedidos.filter(ped=>ped.cantidad_servida!=0)
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
            this.pedidoTotal.pedidos =  this.pedidoTotal.pedidos.filter(ped=>ped.cantidad_servida!=0)
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
  exited(event: CdkDragExit<string[]>) {
    console.log('Exited', event.item.data);
  }
  drop(event: CdkDragDrop<PlatoPedido[]>) {
    let pedido = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
    console.log(event.previousContainer.data[event.previousIndex].cantidad_lista)
    if (event.previousContainer === event.container) {
      console.log("entra");
     // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(this.pedidoTotal.pedidos.find(pTA=>pTA.plato._id==pedido.plato._id)!= undefined){
        
        this.pedidoTotal.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida += 1
          }
        })
        if( this.pedidoTotalAux.pedidos.find(ped=>ped.plato._id==pedido.plato._id).cantidad_servida>1){
        this.pedidoTotalAux.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }else{
        this.pedidoTotalAux.pedidos=this.pedidoTotalAux.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
      }
      }else{
        pedido.cantidad_servida=1
        this.pedidoTotal.pedidos.push(pedido)
        this.pedidoTotalAux.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }
      
    }
  }
  dropAux(event: CdkDragDrop<PlatoPedido[]>) {
    let pedido = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
    console.log(event.previousContainer.data[event.previousIndex].cantidad_lista)
    if (event.previousContainer === event.container) {
      console.log("entra");
     // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(this.pedidoTotalAux.pedidos.find(pTA=>pTA.plato._id==pedido.plato._id)!= undefined){
        
        this.pedidoTotalAux.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida += 1
          }
        })
        if( this.pedidoTotal.pedidos.find(ped=>ped.plato._id==pedido.plato._id).cantidad_servida>1){
        this.pedidoTotal.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }else{
        this.pedidoTotal.pedidos=this.pedidoTotal.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
      }
      }else{
        pedido.cantidad_servida=1
        this.pedidoTotalAux.pedidos.push(pedido)
        this.pedidoTotal.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }
      
    }
  }

  getColor(mesa:Mesa){
    const pedido = this.pedidos.find(ped=>ped.id_mesa==mesa._id)
    if(pedido!=undefined ){
        return "text-secondary"
    }else{
        return "text-primary"
    }
    
    

  }
  cantidadPedido(pedido:PlatoPedido){
    let encontrado = this.pedidoTotalAux.pedidos.find(ped=>ped.plato._id == pedido.plato._id)
    if(encontrado!=undefined){
      return pedido.cantidad_servida - encontrado.cantidad_servida
    }else{
     return  pedido.cantidad_servida
    }
  }
  cantidadPedidoAux(pedido:PlatoPedido){

  }
}
