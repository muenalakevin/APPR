import { ComprobanteService } from './../../../../core/services/comprobante.service';
import { Comprobante } from './../../../../shared/models/comprobante';
import { ClienteService } from './../../../../core/services/cliente.service';
import { CrearClienteComponent } from './../../components/crearCliente/crearCliente.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from './../../../../shared/models/cliente';
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
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EditarClienteComponent } from '../../components/editarCliente/editarCliente.component';

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
  clientes:Cliente[] = []
  total = 0
  stateCtrl = new FormControl();
 clienteSelected:Cliente = new Cliente();
   search:FormControl = new FormControl(null)
  platosPedidos:PlatoPedido[] = []
  panelOpenState:boolean
  mesaActual:MesaSeleccionada
  pedidoTotal:Pedido  = new Pedido()
  pedidoTotalPagar:Pedido  = new Pedido()
  pedidoTotalAux:Pedido = new Pedido()
  mesas: MesaSeleccionada[] = [];

  pagoSelect = new FormControl("Efectivo");


  constructor(
    private PedidoService:PedidoService,
    private MesaService:MesaService,
    public dialog: MatDialog,
    public ClienteService: ClienteService,
    public ComprobanteService: ComprobanteService,
  ) { }
  applyFilterPlatos(event:Event){

  }
  ngOnInit(): void {
    this.ClienteService.getClientes().subscribe(res=>{
       this.clientes = res as Cliente[]
    })
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
      console.log(this.mesaActual.estado);
      if (this.mesaActual.estado >= 2) {

        this.PedidoService.getPedido2(this.mesaActual._id).subscribe((res) => {
          console.log(res)
          if(res!=undefined){
            this.pedidoTotal = res as Pedido;
            this.pedidoTotal.pedidos =  this.pedidoTotal.pedidos.filter(ped=>ped.cantidad_servida!=0)
            this.pedidoTotalPagar =  JSON.parse(JSON.stringify(this.pedidoTotal))
            this.pedidoSeleccionado = JSON.parse(JSON.stringify(this.pedidoTotal))

          }
          this.drawer.toggle()
        });

      }else{
        this.pedidoTotal = new Pedido()
        this.pedidoSeleccionado = JSON.parse(JSON.stringify(this.pedidoTotal))
      }

    }
  }

  mostrarPlatos(pedido:Pedido){

  }
  clean() {
    this.pedidoTotal = new Pedido()
    this.mesaActual = undefined;
    this.clear()
    this.drawer.toggle()
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
        this.pedidoTotalPagar.pedidos.map(ped=>{
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

        if(pedido.cantidad_servida==1){
          this.pedidoTotalAux.pedidos=this.pedidoTotalAux.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
        }
        pedido.cantidad_servida=1
        this.pedidoTotal.pedidos.push(pedido)
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida += 1
          }
        })
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
        console.log(1,this.pedidoTotal.pedidos.find(ped=>ped.plato._id==pedido.plato._id).cantidad_servida);
        if( this.pedidoTotal.pedidos.find(ped=>ped.plato._id==pedido.plato._id).cantidad_servida>1){
        this.pedidoTotal.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }else{
        this.pedidoTotal.pedidos=this.pedidoTotal.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }
      }else{
        pedido.cantidad_servida=1

        if(pedido.cantidad_servida==1){
          this.pedidoTotal.pedidos=this.pedidoTotal.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
        }
        this.pedidoTotalAux.pedidos.push(pedido)

        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
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
  dateNow(){
    let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

if(month < 10){
  if(day < 10){
    return `0${day}-0${month}-${year}`
  }else{
    return `${day}-0${month}-${year}`
  }

  }else{
    if(day < 10){
      return `0${day}-${month}-${year}`
    }else{
      return `${day}-${month}-${year}`
    }
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
  openDialogCrear() {
    const dialogRef = this.dialog.open(CrearClienteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.clienteSelected = result.cliente
    })
  }
  openDialogEditar() {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      data: { cliente:this.clienteSelected },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.clienteSelected = result.cliente
    })
  }
  seleccionarCliente(cliente:Cliente){
    this.clienteSelected = cliente
  }
  movePedidoPago(pedidoPre:PlatoPedido){

    let pedido = JSON.parse(JSON.stringify(pedidoPre));
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
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }else{
        this.pedidoTotal.pedidos=this.pedidoTotal.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }
      }else{
        if(pedido.cantidad_servida==1){
          this.pedidoTotal.pedidos=this.pedidoTotal.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
        }
        pedido.cantidad_servida=1

        this.pedidoTotalAux.pedidos.push(pedido)

        this.pedidoTotal.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }
      this.refreshPecios()
  }

  movePedidoTotal(pedidoPre:PlatoPedido){

    let pedido = JSON.parse(JSON.stringify(pedidoPre));

      if(this.pedidoTotal.pedidos.find(pTA=>pTA.plato._id==pedido.plato._id)!= undefined){

        this.pedidoTotal.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida += 1
          }
        })
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida += 1
          }
        })
        console.log(1,this.pedidoTotal.pedidos.find(ped=>ped.plato._id==pedido.plato._id).cantidad_servida);
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
        if(pedido.cantidad_servida==1){
          this.pedidoTotalAux.pedidos=this.pedidoTotalAux.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
        }
        this.pedidoTotal.pedidos.push(pedido)
        this.pedidoTotalPagar.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida += 1
          }
        })
        this.pedidoTotalAux.pedidos.map(ped=>{
          if(ped.plato._id==pedido.plato._id){
              ped.cantidad_servida -= 1
          }
        })
      }
      this.refreshPecios()
  }
  canPay(){
    if(this.pedidoTotalAux.pedidos.length != 0 && this.clienteSelected.nombre_cliente!=""){
          return true;
    }
    return false
  }

  refreshPecios(){
    this.total = 0
    this.pedidoTotalAux.pedidos.map(ped=>{
      this.total+= ped.plato.precio_plato* ped.cantidad_servida
    })
  }
  pagar(){

    let comprobante:Comprobante = new Comprobante();
    comprobante.cliente_comprobante=this.clienteSelected
    comprobante.detalle_comprobante = this.pedidoTotalAux.pedidos
    comprobante.iva_comprobante = 0.12
    comprobante.pedido_comprobante = this.pedidoSeleccionado
    comprobante.total_comprobante = this.total
    comprobante.pago_comprobante = this.pagoSelect.value
    this.ComprobanteService.guardarCliente(comprobante).subscribe()
    let servido =0
    this.pedidoTotalPagar.pedidos.map(ped=>{
      servido+=ped.cantidad_servida
    })
    console.log(this.pedidoTotalPagar);
    if(servido==0){
      this.pedidoTotalPagar.estado = 3
      this.mesaActual.estado = 1

      this.MesaService.editarMesa(this.mesaActual).subscribe(res=>{
       console.log( this.pedidoTotalPagar);
        this.PedidoService.editarPedido(this.pedidoTotalPagar).subscribe()
        this.clean()
        this.clear()
      }
      )
    }else{
      this.PedidoService.editarPedido(this.pedidoTotalPagar).subscribe()
      this.clear()
    }


  }
  clear(){
    this.clienteSelected = new Cliente()
    this.pedidoTotalAux.pedidos  = []
    this.refreshPecios()
  }
}
