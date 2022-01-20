import { Caja } from './../../../../shared/models/caja';
import { CajaService } from './../../../../core/services/caja.service';
import { AlertService } from './../../../../core/services/alert.service';
import { EgresoComponent } from './../egreso/egreso.component';
import { ComprobanteService } from './../../../../core/services/comprobante.service';
import { Comprobante } from './../../../../shared/models/comprobante';
import { ClienteService } from './../../../../core/services/cliente.service';
import { CrearClienteComponent } from './../../components/crearCliente/crearCliente.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from './../../../../shared/models/cliente';
import { Plato } from './../../../../shared/models/plato';
import { MesaService } from './../../../../core/services/mesa.service';
import { MesaSeleccionada } from './../../../../shared/models/mesaSeleccionada';
import { PedidoService } from './../../../../core/services/pedido.service';
import { Pedido } from './../../../../shared/models/pedido';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PlatoPedido } from 'src/app/shared/models/platoPedido';
import { Mesa } from 'src/app/shared/models/mesa';
import { MatDrawer } from '@angular/material/sidenav';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, CdkDragExit, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EditarClienteComponent } from '../../components/editarCliente/editarCliente.component';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionCaja } from 'src/app/shared/models/configuracion.caja';
import { metodoPago } from 'src/app/shared/models/metodoPago';
import { CerrarCajaComponent } from '../../components/cerrarCaja/cerrarCaja.component';
import { ComparativaCajaComponent } from '../../components/comparativaCaja/comparativaCaja.component';
import { StorageService } from 'src/app/core/services/storage.service';

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
  subTotal = 0
  iva = 0
  descuento = 0
  valor = 0
  interes = 0
  subTotalIva = 0
  total = 0
  subTotalConDescunto = 0
  metodoSelected:metodoPago = new metodoPago()
  descuentoInteresSelected:metodoPago = new metodoPago()
  configuracionCaja:configuracionCaja = new configuracionCaja()
  stateCtrl = new FormControl();
 clienteSelected:Cliente = new Cliente();
   search:FormControl = new FormControl(null)
  platosPedidos:PlatoPedido[] = []
  panelOpenState:boolean
  mesaActual:MesaSeleccionada
  puedePagar:boolean = false
  pedidoReal:Pedido  = new Pedido()
  pedidoTotal:Pedido  = new Pedido()
  pedidoTotalPagar:Pedido  = new Pedido()
  pedidoTotalAux:Pedido = new Pedido()
  mesas: MesaSeleccionada[] = [];
  caja:Caja = null
  pagoSelect = new FormControl(0);
  descuentoInteresSelect = new FormControl(0);
  descuetoInteresSelect = new FormControl(0);
  cajaForm:FormGroup = this.FormBuilder.group({
    caja_chica: new FormControl(0, [
      Validators.required,
    ])
  })

  constructor(
    private PedidoService:PedidoService,
    private FormBuilder:FormBuilder,
    private MesaService:MesaService,
    public dialog: MatDialog,
    public ClienteService: ClienteService,
    public ComprobanteService: ComprobanteService,
    public AlertService: AlertService,
    public CajaService: CajaService,
    public ConfiguracionService: ConfiguracionService,
    public StorageService: StorageService,
  ) { }
  applyFilterPlatos(event:Event){

  }

  changeMetodoSelected(metodo:number){
    this.metodoSelected = this.configuracionCaja.metodosPago[metodo]
    this.refreshPecios()
  }
  changeDescuetoInteresSelected(descuento:number){
    this.descuentoInteresSelected = this.configuracionCaja.descuentosIntereses[descuento]
    this.refreshPecios()
  }
  async guardarCaja(){
    if(this.cajaForm.valid){
      this.caja = new Caja()
      this.caja.caja_chica = this.cajaForm.get('caja_chica').value,
    await  this.CajaService.guardarCaja(this.caja).subscribe(res=>{
      this.caja = res as Caja;
        this.AlertService.showSuccess("Caja abierta con éxito.")

      })

    }else{
      this.AlertService.showWarning("No se pudo abrir la caja, ingrese una cantidad.")
    }
  }
  modalGasto(){
    const dialogRef = this.dialog.open(EgresoComponent,{data:{caja:this.caja}});

    dialogRef.afterClosed().subscribe((result) => {
      if(result.caja!=undefined){
        this.caja = result.caja
      }else{

      }

    })

  }
  modalCierre(){

    if(this.pedidos.length>0){
      let respuesta = this.AlertService.showConfirm("Aún se encuentran pedidos por atender, ¿desea cerrar la caja?").then((res: boolean) => {
        if (res) {
          const dialogRef = this.dialog.open(CerrarCajaComponent, {
            data: { caja:this.caja, permiso: this.configuracionCaja.cierreCaja },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.caja = result.caja

            const dialogRef = this.dialog.open(ComparativaCajaComponent,{
              data: { caja:result.caja, permiso:this.configuracionCaja.cierreCaja},
            })
            dialogRef.afterClosed().subscribe((result) => {
              this.caja = null;
            });
          })
        } else {

        }
      });
    }else{
      const dialogRef = this.dialog.open(CerrarCajaComponent,{
        data: { caja:this.caja, permiso: this.configuracionCaja.cierreCaja },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.caja = result.caja

           const dialogRef = this.dialog.open(ComparativaCajaComponent,{
            data: { caja:result.caja, permiso:this.configuracionCaja.cierreCaja},
          })
          dialogRef.afterClosed().subscribe((result) => {
            this.caja = null;
          });
      })
    }




  }

  ngOnInit(): void {

    this.ConfiguracionService.getConfiguracionCaja().subscribe(res=>{
      this.configuracionCaja = res as configuracionCaja
      this.metodoSelected = this.configuracionCaja.metodosPago[0]
      this.descuentoInteresSelected = this.configuracionCaja.descuentosIntereses[0]
    });
    this.CajaService.getCaja().subscribe(res=>{
      this.caja=res as Caja;
    })
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
              this.pedidoReal = JSON.parse(JSON.stringify(this.pedidoTotal))
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
          console.log(this.pedidoTotal.pedidos)
          this.pedidoReal = JSON.parse(JSON.stringify(this.pedidoTotal))
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
          if(res!=undefined){

            this.pedidoTotal = res as Pedido;
            this.pedidoReal = JSON.parse(JSON.stringify(this.pedidoTotal))
            this.pedidoTotal.pedidos =  this.pedidoTotal.pedidos.filter(ped=>ped.cantidad_servida!=0)
            this.pedidoTotalPagar =  JSON.parse(JSON.stringify(this.pedidoTotal))
            this.pedidoSeleccionado = JSON.parse(JSON.stringify(this.pedidoTotal))
          }
          this.drawer.toggle()
        });
      }else{
        this.pedidoReal = new Pedido()
        this.pedidoTotal = new Pedido()
        this.pedidoSeleccionado = JSON.parse(JSON.stringify(this.pedidoTotal))
      }
    }
  }

  mostrarPlatos(pedido:Pedido){

  }
  clean() {
    this.pedidoReal = new Pedido()
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
    if (event.previousContainer === event.container) {
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
        if(pedido.cantidad_servida==1){
          this.pedidoTotal.pedidos=this.pedidoTotal.pedidos.filter(ped=>ped.plato._id!=pedido.plato._id)
        }
        pedido.cantidad_servida=1


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
      this.refreshPecios()
  }
  canPay(){
    if(this.pedidoTotalAux.pedidos.length != 0 && this.clienteSelected.nombre_cliente!=""){
          return false;
    }
    return true
  }

  async refreshPecios(){
    this.subTotal = 0
    this.subTotalConDescunto = 0
    this.subTotalIva = 0
    this.descuento = 0
    this.interes = 0
    this.total = 0
    await this.pedidoTotalAux.pedidos.map(ped=>{
      this.subTotal+= (ped.plato.precio_plato* ped.cantidad_servida)

    })
    if(this.configuracionCaja.checkIVA){
      this.subTotal = Number((this.subTotal/1.12).toFixed(2))
    }
    this.valor = this.metodoSelected.valor
    if(this.descuentoInteresSelected.descuentoIncremento){
      this.interes += Math.abs(this.subTotal * (this.descuentoInteresSelected.porcentaje/100)) + this.descuentoInteresSelected.valor
    }else{
      this.descuento += Math.abs(this.subTotal * (this.descuentoInteresSelected.porcentaje/100)) + this.descuentoInteresSelected.valor
    }


    if(this.metodoSelected.descuentoIncremento){
      this.interes += Math.abs(this.subTotal * (this.metodoSelected.porcentaje/100)) + this.metodoSelected.valor
    }else{
      this.descuento += Math.abs(this.subTotal * (this.metodoSelected.porcentaje/100)) + this.metodoSelected.valor
    }

    this.total = Number( Math.abs(this.subTotal - this.descuento).toFixed(2));
    this.subTotalIva = Math.abs(this.total* (this.configuracionCaja.iva/100))
    this.total = Math.abs(this.total  + this.subTotalIva )
    this.total = Number(Math.abs(this.total + this.interes).toFixed(2));
/*     if(this.metodoSelected.descuentoIncremento){
      this.total = Math.abs(this.subTotal - this.descuento)
      this.subTotalIva = Math.abs(this.subTotal* (this.configuracionCaja.iva/100))
      this.total = Math.abs(this.subTotal  + this.subTotalIva )
      this.total = Math.abs(this.total + this.interes)

    }else{

      this.subTotalConDescunto = this.total
      this.subTotalIva = Math.abs(this.total* (this.configuracionCaja.iva/100))
      this.total = Math.abs(this.total + this.subTotalIva)
      this.total = Math.abs(this.total + this.interes)
    }
 */


  }
  pagar(){

    let comprobante:Comprobante = new Comprobante();
    comprobante.cliente_comprobante=this.clienteSelected._id
    comprobante.caja_comprobante=this.caja._id
    comprobante.detalle_comprobante = this.pedidoTotalAux.pedidos
    comprobante.subTotal_comprobante = this.subTotal
    comprobante.subTotalConDescunto_comprobante = this.subTotalConDescunto
    comprobante.subTotalIva_comprobante = this.subTotalIva
    comprobante.descuento_comprobante = this.descuento
    comprobante.interes_comprobante = this.interes
    comprobante.total_comprobante = this.total
    comprobante.descuentoInteres_comprobante = this.descuentoInteresSelected
    comprobante.iva_comprobante = this.configuracionCaja.iva
    comprobante.pedido_comprobante = this.pedidoSeleccionado._id
    comprobante.total_comprobante = this.total
    comprobante.metodoPago_comprobante = this.metodoSelected


    const dialogRef = this.dialog.open(DialogPagar, {

      data: {total: this.total},
    });

    dialogRef.afterClosed().subscribe(data => {

      if(data.transferencia!=undefined){
        let transferencia = data.transferencia
        let efectivo = data.efectivo
        let vuelto = data.vuelto
        this.caja.cantidad_descuentos = this.caja.cantidad_descuentos + this.descuento
      this.caja.cantidad_intereses = this.caja.cantidad_intereses + this.interes
      this.caja.cantidad_impuestos = this.caja.cantidad_impuestos + this.subTotalIva
      this.caja.cantidad_ingreso = this.caja.cantidad_ingreso + this.total
      this.caja.cantidad_efectivo = this.caja.cantidad_efectivo + (efectivo - vuelto)
      this.caja.cantidad_transferencia = this.caja.cantidad_transferencia + transferencia



          this.ComprobanteService.guardarComprobante(comprobante).subscribe(res=>{
        this.CajaService.actualizarCaja(this.caja).subscribe(res=>{

          this.AlertService.showSuccess("Comprobante guardado con éxito.")
        })
      })
      let servido = 0

      let pedido = 0
      let listo = 0


    this.pedidoReal.pedidos.map(
      pR=>{

        let pedidoFind = this.pedidoTotal.pedidos.find(p=>p.plato._id==pR.plato._id)

        if(pedidoFind!= undefined){
          pR.cantidad_servida =  pedidoFind.cantidad_servida
        }else{
          pR.cantidad_servida = 0
        }
        servido += pR.cantidad_servida
        pedido += pR.cantidad_pedido
        listo += pR.cantidad_lista
      }
    )


      if(servido==0 && pedido == listo){

        this.pedidoReal.estado = 3
        this.pedidoReal.horaDeEntrega = new Date(Date.now())
        this.mesaActual.estado = 1
        this.MesaService.editarMesa(this.mesaActual).subscribe(res=>{
          this.PedidoService.editarPedido(this.pedidoReal).subscribe(res=>{
            this.AlertService.showSuccess("Todos los platos fueron pagados.")
          }

          )
          this.clean()
          this.clear()
        }
        )
      }else{
        this.PedidoService.editarPedido(this.pedidoReal).subscribe(()=>{})

        this.clear()
      }
      }


    });



  }
  clear(){
    this.clienteSelected = new Cliente()
    this.pedidoTotalAux.pedidos  = []
    this.refreshPecios()
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'pagar.html',
  styleUrls: ['pagar.css'],
})
export class DialogPagar {
  constructor(
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<DialogPagar>,
    public AlertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: {total: number},
  ) {
    this.total = data.total;

  }
  PagarForm: FormGroup = this.formBuilder.group({
    efectivo: new FormControl(0, [
      Validators.required,
    ]),
    transferencia: new FormControl(0, [
      Validators.required
    ]),
  })
  total:number
  submitForm(){

    let efectivo = this.PagarForm.value.efectivo
    let transferencia = this.PagarForm.value.transferencia
    if(Number(efectivo)>=0 && Number(transferencia)>=0){

    let vuelto = (Number(efectivo)+Number(transferencia)) - this.total;

    if(efectivo+transferencia >= this.total ){

      if(vuelto != 0){
        this.AlertService.showConfirm('Debe devolverse '+((vuelto ).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })) ).then((respuesta)=>{
          if(respuesta){
            this.dialogRef.close({efectivo,transferencia,vuelto});
          }
        }).catch(()=>{
        })
      }else{
         this.dialogRef.close({efectivo,transferencia,vuelto});
      }
    }else{
      this.AlertService.showWarning('La cantidad debe ser de '+(this.total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }))+" y el total ingresado fue de "+( Number(efectivo) + Number(transferencia)).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }) )
    }

  }else{
    this.AlertService.showWarning('No puede ingresar cantidades negativas.' )
  }

}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
