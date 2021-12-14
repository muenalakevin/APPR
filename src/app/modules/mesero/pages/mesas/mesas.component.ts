import { MesaSeleccionada } from './../../../../shared/models/mesaSeleccionada';
import { PedidoService } from './../../../../core/services/pedido.service';
import { PlatoService } from './../../../../core/services/plato.service';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { CategoriaPlato } from 'src/app/shared/models/categoriaPlato';
import { MesaService } from './../../../../core/services/mesa.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { Mesa } from 'src/app/shared/models/mesa';
import { Plato } from 'src/app/shared/models/plato';
import { Pedido } from 'src/app/shared/models/pedido';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})

export class MesasComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  faSquareIcon=faSquare
  defaultElevation = 2;
  raisedElevation = 8;
  subTotal=0;
  list:MesaSeleccionada[]=[]
  showFiller = false;
  private mesasSubscription: Subscription;
  mesas: MesaSeleccionada[] = [];
  private platosSubscription: Subscription;
  private categoriasubscription: Subscription;
  mesaActual:MesaSeleccionada;
  platos: Plato[] = [];
  categorias: CategoriaPlato[] = [];
  constructor(
    private MesaService:MesaService,
    private CategoriaService:CategoriaService,
    private PlatoService:PlatoService,
    private renderer2: Renderer2,
    private PedidoService:PedidoService, 
    ) { }

  async ngOnInit() {
    
    this.MesaService.getMesas().subscribe((mesas) => {
      this.mesas = <MesaSeleccionada[]>mesas;
    });
    this.mesasSubscription = this.MesaService.mesas.subscribe(
      (mesas) => {
        const Data: MesaSeleccionada[] = <MesaSeleccionada[]>mesas;
        this.mesas = <MesaSeleccionada[]>Data;

        

        if(this.mesaActual!=undefined){
          const estadoMesa = this.mesas.find(mesa=>mesa._id == this.mesaActual._id)
          if(estadoMesa.estado==0){
            this.drawer.toggle()
          }else{
            this.PedidoService.getPedido(this.mesaActual._id).subscribe(res=>   {
              if(res!=null){
                this.pedidoTotal=res as Pedido
              }
              
            })
          }
          
        }
        
      }
    );

    this.CategoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = <CategoriaPlato[]>categorias;
    });
    this.categoriasubscription = this.CategoriaService.categorias.subscribe(
      (categorias) => {
        const Data: CategoriaPlato[] = <CategoriaPlato[]>categorias;
        this.categorias = <CategoriaPlato[]>Data
      
      }
    );

    this.PlatoService.getPlatos().subscribe(platos => {
      this.platos= platos as Plato[];
    });
    this.platosSubscription = this.PlatoService.platos.subscribe(
      (platos) => {
        this.platos= platos as Plato[];
      }
    );
  }
  openMesa(){

  }
  mouseenter (event:Event) {
    this.renderer2.addClass(event.target, 'mat-elevation-z5')
 }
 pedidoTotal:Pedido={
     id_mesa:"",
     pedidos:[]
   }
  removePlato(idPlato:string){
    this.pedidoTotal.pedidos = this.pedidoTotal.pedidos.filter(( pedido )=> {
      return pedido.plato._id !== idPlato;
    });
    this.PedidoService.editarPedido(this.pedidoTotal).subscribe(res=> {/* this.pedidoTotal=res as Pedido */ })
    if(this.pedidoTotal.pedidos.length == 0){
      this.cancelarPedido()
    }
  }
   addPlato(plato:Plato){

     if(this.mesaActual.estado == 0){
      const pedido:Pedido ={
        id_mesa:this.mesaActual._id,
        pedidos:[{plato:plato,cantidad_pedido:1}]
      }
      this.PedidoService.guardarPedido(pedido).subscribe(res=> {this.pedidoTotal=res as Pedido})
      this.mesaActual.estado = 1
     }else if(this.mesaActual.estado==1){
        let pedidos = this.pedidoTotal.pedidos;
        const existPedido = pedidos.find(pedido=> pedido.plato._id == plato._id)
        if(existPedido==undefined){
          pedidos.push({plato:plato,cantidad_pedido:1})
        }else{
          pedidos.map(pedido=>{
            if(pedido.plato._id == plato._id){
              pedido.cantidad_pedido += 1 ;
            }
            return pedido
          })
        }
        this.pedidoTotal.pedidos = pedidos;
        this.PedidoService.editarPedido(this.pedidoTotal).subscribe(res=> {/* this.pedidoTotal=res as Pedido */ })
     }
    
    //this.platosAdd.push(plato)
 }
 seleccionarMesa(mesa:MesaSeleccionada){
   this.mesaActual = mesa
   if(this.mesaActual.estado == 0){
    this.pedidoTotal ={
      id_mesa:"",
      pedidos:[]
    }
   }else if(this.mesaActual.estado == 1){
    this.PedidoService.getPedido(this.mesaActual._id).subscribe(res=>   {
      this.pedidoTotal=res as Pedido
    })
   }
 }
 getSubtotal(){
  this.subTotal=0
   this.pedidoTotal.pedidos.map(pedido=>{
      this.subTotal += pedido.plato.precio_plato*pedido.cantidad_pedido 
   })
   return this.subTotal;
 }
 cancelarPedido(){
   this.PedidoService.eliminarPedido(this.pedidoTotal.id_mesa).subscribe()
 }
 mouseleave (event:Event) {
   this.renderer2.removeClass(event.target, 'mat-elevation-z5')
 }
 clickPlato (event:Event) {
   this.renderer2.removeClass(event.target, 'mat-elevation-z5')
   this.renderer2.addClass(event.target, 'mat-elevation-z5')
 }
 addPedido(idPlato:string){
   this.pedidoTotal.pedidos = this.pedidoTotal.pedidos.map(pedido=>{
    if(idPlato == pedido.plato._id){
      pedido.cantidad_pedido +=1
    }
    return pedido
  })
 
  this.PedidoService.editarPedido(this.pedidoTotal).subscribe(res=> {/* this.pedidoTotal=res as Pedido */ })
 }
 reducePedido(idPlato:string){
 const cantidadPedido = this.pedidoTotal.pedidos.find(( pedido )=> pedido.plato._id == idPlato);  
 if(cantidadPedido.cantidad_pedido==1){
  this.removePlato(idPlato)
 }else{
  this.pedidoTotal.pedidos = this.pedidoTotal.pedidos.map(pedido=>{
    if(idPlato == pedido.plato._id){
      pedido.cantidad_pedido -=1
    }
    return pedido
  })
  this.PedidoService.editarPedido(this.pedidoTotal).subscribe(res=> { })
 }
 
 
 }
}
