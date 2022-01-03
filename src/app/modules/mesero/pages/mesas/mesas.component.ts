
import { CambioEstatico } from './../../../../shared/models/cambiosEstatios';
import { AlertService } from './../../../../core/services/alert.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MesaSeleccionada } from './../../../../shared/models/mesaSeleccionada';
import { PedidoService } from './../../../../core/services/pedido.service';
import { PlatoService } from './../../../../core/services/plato.service';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { CategoriaPlato } from 'src/app/shared/models/categoriaPlato';
import { MesaService } from './../../../../core/services/mesa.service';
import { Subscription, Observable, interval } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { Mesa } from 'src/app/shared/models/mesa';
import { Plato } from 'src/app/shared/models/plato';
import { Pedido } from 'src/app/shared/models/pedido';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
})
export class MesasComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;
  faSquareIcon = faSquare;
  defaultElevation = 2;
  raisedElevation = 8;
  subTotal = 0;
  list: MesaSeleccionada[] = [];
  showFiller = false;
  panelOpenState:boolean
  private mesasSubscription: Subscription;
  mesas: MesaSeleccionada[] = [];
  pedidos: Pedido[] = [];
  cambiosEstaticos:CambioEstatico[] = []
  private pedidosSubscription: Subscription;
  private platosSubscription: Subscription;
  private categoriasubscription: Subscription;
  mesaActual: MesaSeleccionada;
  platos: Plato[] = [];
  categorias: CategoriaPlato[] = [];
  dateNow:Date
  pedidoTotal: Pedido = new Pedido()
  pedidoForm: FormGroup = new FormGroup({
    observacion: new FormControl(null),
  });
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(null),
  });

  constructor(
    private MesaService: MesaService,
    private CategoriaService: CategoriaService,
    private PlatoService: PlatoService,
    private renderer2: Renderer2,
    private PedidoService: PedidoService,
    private cdRef:ChangeDetectorRef,
    private AlertService:AlertService,
  ) {}
  ngAfterViewChecked()
{
  this.dateNow = new Date(Date.now())
  this.cdRef.detectChanges();
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
  async ngOnInit() {
    interval(1000).subscribe(() => {
      this.pedidos=this.pedidos
    })

    this.pedidoForm = new FormGroup({
      observacion: new FormControl(''),
    });

    this.MesaService.getMesas().subscribe((mesas) => {
      this.mesas = <MesaSeleccionada[]>mesas;
    });

    this.mesasSubscription = this.MesaService.mesas.subscribe((mesas) => {
      this.mesas = <MesaSeleccionada[]>mesas;

      if (this.mesaActual != undefined) {

        this.mesaActual = this.mesas.find(
          (mesa) => this.mesaActual._id == mesa._id
        );
        if (this.mesaActual.estado >=0 && this.mesaActual.estado <= 1) {
          this.clean();
          this.drawer.toggle();
          
        } else {
          this.PedidoService.getPedido(this.mesaActual._id).subscribe((res) => {
         
            if (res != null) {
              this.pedidoTotal = res as Pedido;

            }
          });
        }
      }
    });

    this.CategoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = <CategoriaPlato[]>categorias;
    });
    this.categoriasubscription = this.CategoriaService.categorias.subscribe(
      (categorias) => {
        const Data: CategoriaPlato[] = <CategoriaPlato[]>categorias;
        this.categorias = <CategoriaPlato[]>Data;
      }
    );
    this.PedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = <Pedido[]>pedidos;
      this.actualizarCambiosEstaticos()
    });

    this.pedidosSubscription = this.PedidoService.pedidos.subscribe(
      (pedidos) => {
        this.pedidos = <Pedido[]>pedidos;
       
        this.actualizarCambiosEstaticos()
      }
    );
    
    this.PlatoService.getPlatos().subscribe((platos) => {
      this.platos = platos as Plato[];
    });
    this.platosSubscription = this.PlatoService.platos.subscribe((platos) => {
      this.platos = platos as Plato[];
    });
  }
  openMesa() {}
  actualizarCambiosEstaticos(){

    this.pedidos.map(ped=>{
      let cambioEstatico = this.cambiosEstaticos.find(cE => cE._id==ped.id_mesa)
      if(cambioEstatico!=null){
        this.cambiosEstaticos.map(cE=>{
          cE.pedidos.map(pedEs=>{
             let plato=cambioEstatico.pedidos.find(cEP=>cEP.plato._id==pedEs.plato._id && cE._id==cambioEstatico._id)
             let plato2=ped.pedidos.find(cEP=>cEP.plato._id==pedEs.plato._id&& cE._id==cambioEstatico._id)
            if(plato!=undefined && plato2!=undefined){
              console.log(plato.cantidad_lista,plato2.cantidad_lista);
              if(plato.cantidad_lista!=plato2.cantidad_lista){
                cE.cambio=true;
            }
            }
            
          })
        })
      }else{
        
        this.cambiosEstaticos.push({_id:ped.id_mesa,pedidos:ped.pedidos,cambio:false})
      }
    })
  }
  mouseenter(event: Event) {
    this.renderer2.addClass(event.target, 'mat-elevation-z5');
  }
  sendPedido() {
    this.pedidoTotal.observacion = this.pedidoForm.value.observacion
    console.log(this.pedidoTotal);
    this.PedidoService.enviarPedido(this.pedidoTotal).subscribe((res) => {
      this.drawer.toggle()
    });
 
  }
  getColor(mesa:Mesa){
    const pedido = this.pedidos.find(ped=>ped.id_mesa==mesa._id)
    if(pedido!=undefined ){
      const tiempo = pedido.horaDeEnvio
      const tiempoActual = new Date(this.dateNow )
      let timeDiff =new Date( tiempoActual).getTime() - new Date(tiempo).getTime();
      timeDiff /= 1000;
      timeDiff = Math.floor(timeDiff / 60);
      const minutes = Math.round(timeDiff % 60);
      const mesa = this.mesas.find(mes=>mes._id==pedido.id_mesa)
      if(mesa.estado!=4){
        if(minutes<=5){
          return "text-success"
       }else if(minutes<=10){
        return "text-warning"
       }else if(minutes<=15){
        return "text-danger"
       }else{
        return "text-dark"
       }
      }else{
        return "text-secondary"
      }
      
    }else{
      return "text-primary"
    }
    
    

  }
  enviado(){
    if(this.mesaActual!= undefined){
      if( this.mesaActual.estado < 3){
        return true
      }else{
        return false
      }
    }else{
      return true
    }

  }

  removePlato(idPlato: string) {
    let plato = this.pedidoTotal.pedidos.find(ped=> ped.plato._id==idPlato)
    if(plato.cantidad_lista==0){
      this.pedidoTotal.pedidos = this.pedidoTotal.pedidos.filter((pedido) => {
        return pedido.plato._id !== idPlato;
      });
      if (this.pedidoTotal.pedidos.length == 0) {
        this.cancelarPedido();
      } else {
        this.PedidoService.editarPedido(this.pedidoTotal).subscribe((res) => {});
      }
    }else{
      this.AlertService.showWarning('No se puede eliminar una mesa que tenga platos listos')
    }
   
  }

  addPlato(plato: Plato) {
   
    if (this.mesaActual.estado >= 0 && this.mesaActual.estado <= 1 ) {

      const pedido: Pedido = {
        id_mesa: this.mesaActual._id,
        observacion: this.pedidoForm.value.observacion,
        horaDeEnvio:null,
        horaDeEntrega:null,
        estado:1,
        pedidos: [{ plato: plato, cantidad_pedido: 1,cantidad_lista:0,cantidad_servida:0 }],
      };

      this.PedidoService.guardarPedido(pedido).subscribe(res=>{
        this.pedidoTotal = (res as Pedido)      }
        
      );
    } else if (this.mesaActual.estado >= 2) {

      let pedidos = this.pedidoTotal.pedidos;
      const existPedido = pedidos.find(
        (pedido) => pedido.plato._id == plato._id
      );
      if (existPedido == undefined) {
        pedidos.push({ plato: plato, cantidad_pedido: 1,cantidad_lista:0,cantidad_servida:0 });
      } else {
        pedidos.map((pedido) => {
          if (pedido.plato._id == plato._id) {
            pedido.cantidad_pedido += 1;
          }
          return pedido;
        });
      }
      this.pedidoTotal.pedidos = pedidos;
      this.pedidoTotal.observacion = this.pedidoForm.value.observacion;
      this.PedidoService.editarPedido(this.pedidoTotal).subscribe();
    }

    //this.platosAdd.push(plato)
  }
  seleccionarMesa(mesa: MesaSeleccionada) {

    this.mesaActual = mesa;
    if (this.mesaActual != undefined) {
      console.log(this.mesaActual)
      if (this.mesaActual.estado >= 2) {
        this.PedidoService.getPedido2(this.mesaActual._id).subscribe((res) => {
          if(res!=undefined){
            
            this.pedidoTotal = res as Pedido;
        
          }

        });
      }else{
        this.pedidoTotal = new Pedido()
        this.pedidoForm.reset();
        console.log("e",this.pedidoTotal);
      }
    }
  }

  getSubtotal() {
    this.subTotal = 0;
    this.pedidoTotal.pedidos.map((pedido) => {
      this.subTotal += pedido.plato.precio_plato * pedido.cantidad_pedido;
    });
    return this.subTotal;
  }

  cancelarPedido() {

    this.PedidoService.eliminarPedido(this.pedidoTotal.id_mesa).subscribe(
      (res) => {
        this.clean();
      }
    );
  }

  mouseleave(event: Event) {
    this.renderer2.removeClass(event.target, 'mat-elevation-z5');
  }
  clickPlato(event: Event) {
    this.renderer2.removeClass(event.target, 'mat-elevation-z5');
    this.renderer2.addClass(event.target, 'mat-elevation-z5');
  }

  addPedido(idPlato: string) {
    this.pedidoTotal.pedidos = this.pedidoTotal.pedidos.map((pedido) => {
      if (idPlato == pedido.plato._id) {
        pedido.cantidad_pedido += 1;
      }
      return pedido;
    });

    this.PedidoService.editarPedido(this.pedidoTotal).subscribe((res) => {
      /* this.pedidoTotal=res as Pedido */
    });
  }
  reducePedido(idPlato: string) {
    const cantidadPedido = this.pedidoTotal.pedidos.find(
      (pedido) => pedido.plato._id == idPlato
    );
    if (cantidadPedido.cantidad_pedido == 1) {
      if(cantidadPedido.cantidad_lista !=0){
        this.removePlato(idPlato);
      }
      
    } else {
      this.pedidoTotal.pedidos = this.pedidoTotal.pedidos.map((pedido) => {
        if (idPlato == pedido.plato._id) {
          if(pedido.cantidad_pedido>pedido.cantidad_lista){
            pedido.cantidad_pedido -= 1;
          }
          
        }
        return pedido;
      });
      this.PedidoService.editarPedido(this.pedidoTotal).subscribe((res) => {});
    }
  }

  clean() {
    this.pedidoTotal = new Pedido()
    this.pedidoForm.reset();
    this.mesaActual = undefined;
  }

  getColorPedido(pedido:Pedido){
    let cambio = this.cambiosEstaticos.find(cE=>cE._id==pedido.id_mesa) 

    if(cambio.cambio){
      return "bg-info"
    }else{
      return ""
    }
   
  }
  cambiarValorCambio
  (pedido:Pedido){
    console.log(pedido);
    let newCambiosEstaticos = this.cambiosEstaticos.map(cE=>{
      if(cE._id==pedido.id_mesa){
        cE.cambio = false;
      }
      return cE;
    }) 
    this.cambiosEstaticos = newCambiosEstaticos;
  }
  applyFilterPlatos(event:Event){

  }
  listo(pedido:Pedido){
    let servidos = 0
    let pedidos = 0
    pedido.pedidos.map(ped=>{
      servidos += ped.cantidad_lista
      pedidos += ped.cantidad_pedido
    })
    if(servidos==pedidos){
      return true
    }else{
      return false
    }
  }
}
