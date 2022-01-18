import { PlatoPedido } from 'src/app/shared/models/platoPedido';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { Mesa } from 'src/app/shared/models/mesa';
import { Plato } from 'src/app/shared/models/plato';
import { Pedido } from 'src/app/shared/models/pedido';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDrawer } from '@angular/material/sidenav';
import { configuracionMesero } from 'src/app/shared/models/configuracion.mesero';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionCaja } from 'src/app/shared/models/configuracion.caja';
@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
})
export class MesasComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(opcionRapida: string, pedido:PlatoPedido): void {
    this.pedidoTotal.pedidos.map(pedTot=>{
      if(pedTot.plato._id == pedido.plato._id){
        const index = pedTot.opcionesRapidas.indexOf(opcionRapida);
        if (index >= 0) {
          pedTot.opcionesRapidas.splice(index, 1);
        }
      }
    })
    this.PedidoService.editarPedido( this.pedidoTotal).subscribe();
  }

  selected(event: MatAutocompleteSelectedEvent, pedido:PlatoPedido): void {
    this.pedidoTotal.pedidos.map(pedTot=>{
      if(pedTot.plato._id == pedido.plato._id){
        pedTot.opcionesRapidas.push(event.option.viewValue.toString());
      }
    })
    this.PedidoService.editarPedido( this.pedidoTotal).subscribe();
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


  @ViewChild('drawer') drawer: MatDrawer;
  faSquareIcon = faSquare;
  defaultElevation = 2;
  raisedElevation = 8;
  subTotal = 0;
  list: MesaSeleccionada[] = [];
  showFiller = false;
  configuracionMesero:configuracionMesero = new configuracionMesero()
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
  allPlatos: Plato[] = [];
  categorias: CategoriaPlato[] = [];
  dateNow:Date
  pedidoTotal: Pedido = new Pedido()
  pedidoForm: FormGroup = new FormGroup({
    observacion: new FormControl(null),
  });
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(null),
  });
  configuracionCaja:configuracionCaja = new configuracionCaja()

  constructor(
    private MesaService: MesaService,
    private CategoriaService: CategoriaService,
    private PlatoService: PlatoService,
    private renderer2: Renderer2,
    private PedidoService: PedidoService,
    private cdRef:ChangeDetectorRef,
    private AlertService:AlertService,
    private configuracionService:ConfiguracionService,
  ) {

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }
  @ViewChild('select') input:ElementRef;
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
    

    this.configuracionService.getConfiguracionMesero().subscribe(res=>{
      this.configuracionMesero = res as configuracionMesero
    })
    this.configuracionService.getConfiguracionCaja().subscribe(res=>{
      this.configuracionCaja = res as configuracionCaja
    })
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
      this.allPlatos = platos as Plato[];

    });
    this.platosSubscription = this.PlatoService.platos.subscribe((platos) => {
      this.platos = platos as Plato[];
      this.allPlatos = platos as Plato[];
    });
  }
  getNombreMesa(pedido:Pedido){
    return this.mesas.find(mes=>mes._id==pedido.id_mesa).nombre_mesa
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
/*   getStyle(mesa:Mesa){
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
        console.log(this.configuracionMesero.satisfaccionAdecuada)
        if(minutes<=this.configuracionMesero.satisfaccionAdecuada){
          this.color = this.configuracionMesero.colorSatisfaccion.check
          return this.configuracionMesero.colorSatisfaccion.color
       }else if(minutes<=this.configuracionMesero.satisfaccionMedia){
        this.color = this.configuracionMesero.colorSatisfaccionMedia.check
        return this.configuracionMesero.colorSatisfaccionMedia.color
       }else if(minutes<=this.configuracionMesero.disatisfaccion){
        this.color = this.configuracionMesero.colorDisatisfaccion.check
        return this.configuracionMesero.colorDisatisfaccion.color
       }else{
        return "#000"
       }
      }else{
        return "#6c757d"
      }

    }else{
      return "#0d6efd"
    }
  }
 */
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
        if(minutes<=this.configuracionMesero.satisfaccionAdecuada){
          if(this.configuracionMesero.colorSatisfaccion.check){
            return this.configuracionMesero.colorSatisfaccion.color
          }else{
            return "#28a745"
          }

       }else if(minutes<=this.configuracionMesero.satisfaccionMedia){
        if(this.configuracionMesero.colorSatisfaccionMedia.check){
          return this.configuracionMesero.colorSatisfaccionMedia.color
        }else{
          return "#ffc107"
        }
       }else if(minutes<=this.configuracionMesero.disatisfaccion){
        if(this.configuracionMesero.colorDisatisfaccion.check){
          return this.configuracionMesero.colorDisatisfaccion.color
        }else{
          return "#dc3545"
        }
       }else{
        if(this.configuracionMesero.colorFueraTiempo.check){
          return this.configuracionMesero.colorFueraTiempo.color
        }else{
          return "#343a40"
        }

       }
      }else{
        if(this.configuracionMesero.colorOcupada.check){
          return this.configuracionMesero.colorOcupada.color
        }else{
          return "#6c757d"
        }

      }

    }else{
      if(this.configuracionMesero.colorDisponible.check){
        return this.configuracionMesero.colorDisponible.color
      }else{
        return "#0d6efd"
      }

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
    if(plato.estado_plato == 0){
      plato.estado_plato = 1
      this.PlatoService.editarPlato(plato).subscribe();
    }

    if (this.mesaActual.estado >= 0 && this.mesaActual.estado <= 1 ) {

      const pedido: Pedido = {
        _id: "",
        id_mesa: this.mesaActual._id,
        observacion: this.pedidoForm.value.observacion,
        horaDeEnvio:null,
        horaDeEntrega:null,
        estado:1,
        pedidos: [{ plato: plato, cantidad_pedido: 1,cantidad_lista:0,cantidad_servida:0,opcionesRapidas:[] }],
      };

      this.PedidoService.guardarPedido(pedido).subscribe(res=>{
        this.pedidoTotal = (res as Pedido)      }

      );
    } else if (this.mesaActual.estado >= 2) {

      let pedidos = this.pedidoTotal.pedidos;
      console.log(this.pedidoTotal)
      const existPedido = pedidos.find(
        (pedido) => pedido.plato._id == plato._id
      );
      if (existPedido == undefined) {
        pedidos.push({ plato: plato, cantidad_pedido: 1,cantidad_lista:0,cantidad_servida:0,opcionesRapidas:[] });
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
    this.allCategory();
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

    this.PedidoService.eliminarPedido(this.pedidoTotal.id_mesa,this.pedidoTotal._id).subscribe(
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

  allCategory(){
    (document.getElementById('inputGroupSelect01') as HTMLInputElement).value = "all";
    this.platos = this.allPlatos
  }
  filtrarCategoria(event:Event){
    let id = (event.target as HTMLInputElement).value
    console.log(id)
    if(id!="all"){
      this.platos = this.allPlatos.filter(pla=>{
        let paso = false
        pla.categorias_plato.map(cat=>{
          if(cat == id){
            paso=true
          }
        })
        if(paso){
          return pla
        }else{
          return null
        }
      });

    }else{
      this.platos = this.allPlatos
    }


  }
  reducePedido(idPlato: string) {
    const cantidadPedido = this.pedidoTotal.pedidos.find(
      (pedido) => pedido.plato._id == idPlato
    );
    if (cantidadPedido.cantidad_pedido == 1) {
      if(cantidadPedido.cantidad_lista ==0){
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
