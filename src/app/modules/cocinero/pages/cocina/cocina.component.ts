import { MesaService } from './../../../../core/services/mesa.service';
import { CategoriaCocinero } from './../../../../shared/models/categoriasCocinero';
import { CocineroService } from './../../../../core/services/cocinero.service';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { CategoriaPlato } from './../../../../shared/models/categoriaPlato';
import { Pedido } from './../../../../shared/models/pedido';
import { MesaSeleccionada } from './../../../../shared/models/mesaSeleccionada';
import { PlatoPedido } from './../../../../shared/models/platoPedido';
import { Plato } from './../../../../shared/models/plato';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { PedidoService } from './../../../../core/services/pedido.service';
import { Mesa } from 'src/app/shared/models/mesa';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { configuracionCaja } from 'src/app/shared/models/configuracion.caja';
import { AlertService } from 'src/app/core/services/alert.service';
import { StorageService } from 'src/app/core/services/storage.service';

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
  pedidoSeleccionadoReal:Pedido
  categoriasSeleccionadas:CategoriaCocinero = new CategoriaCocinero()
  platosPedidos:PlatoPedido[]=[]
  pedidosFiltrados:Pedido[]
  botonListo:boolean = false
  mesas: MesaSeleccionada[] = [];
  constructor(
    private PedidoService:PedidoService,
    private cdRef:ChangeDetectorRef,
    private CategoriaService:CategoriaService,
    private CocineroService:CocineroService,
    private MesaService:MesaService,
    private AlertService:AlertService,
    public StorageService:StorageService,
  ) { }
  ngAfterViewChecked()
{
  this.dateNow = new Date(Date.now())
  this.cdRef.detectChanges();
}
ifExistCategoriaSeleccioanda(categoriaId:string){
  let categoriaSel = this.categoriasSeleccionadas.categorias_seleccionadas.find(catSel=> catSel == categoriaId)
  if(categoriaSel!=undefined){
    return true;
  }else{
    return false;
  }
}
getNombreMesa(pedido:Pedido){
  return this.mesas.find(mes=>mes._id==pedido.id_mesa).nombre_mesa
}
checkCategoria(categoriaId:string){
  let ExistCategoria = this.categoriasSeleccionadas.categorias_seleccionadas.find(cat=>{return cat == categoriaId})

  if(ExistCategoria!=null){
    this.categoriasSeleccionadas.categorias_seleccionadas = this.categoriasSeleccionadas.categorias_seleccionadas.filter((cat) => {
      return cat !== categoriaId;
    });

  }else{

    this.categoriasSeleccionadas.categorias_seleccionadas.push(categoriaId)
  }

  this.CocineroService.updateCategoriasCocinero(this.categoriasSeleccionadas).subscribe(res=>{


   })

   this.actualizarFiltroCategorias()
}
private categoriasubscription: Subscription;
categorias: CategoriaPlato[] = [];

actualizarFiltroCategorias(){
  this.pedidosFiltrados = JSON.parse(JSON.stringify(this.pedidos));

  this.pedidosFiltrados = this.pedidosFiltrados.filter(ped=>{

    ped.pedidos = ped.pedidos.filter(ped2=>{
      let retorna2 = false

        this.categoriasSeleccionadas.categorias_seleccionadas.map(catSel=>{
         let pedFind = ped2.plato.categorias_plato.find(catPla=>catPla == catSel)
          if(pedFind!=undefined){
            retorna2 = true
          }

        })

       return retorna2
    })

    return ped.pedidos.length!=0

  })

  if( this.pedidoSeleccionado!=undefined){
    this.pedidoSeleccionado = this.pedidosFiltrados.find(pedFil=>this.pedidoSeleccionado.id_mesa==pedFil.id_mesa)
    if(this.pedidoSeleccionado!=undefined){
      this.platosPedidos =  this.pedidoSeleccionado.pedidos
    }else{
      this.platosPedidos = []
    }

  }

}

  ngOnInit(): void {

    this.MesaService.getMesas().subscribe((mesas) => {
      this.mesas = <MesaSeleccionada[]>mesas;
    });
    this.CocineroService.obtenerCategoriasCocinero().subscribe(res=>{

      this.categoriasSeleccionadas = (res as CategoriaCocinero)
      this.PedidoService.getPedidos().subscribe((pedidos) => {
        this.pedidos = <Pedido[]>pedidos;

        this.actualizarFiltroCategorias()
      });
    })

    this.CategoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = <CategoriaPlato[]>categorias;
    });
    this.categoriasubscription = this.CategoriaService.categorias.subscribe(
      (categorias) => {
        const Data: CategoriaPlato[] = <CategoriaPlato[]>categorias;
        this.categorias = <CategoriaPlato[]>Data;
      }
    );



    this.pedidosSubscription = this.PedidoService.pedidos.subscribe(
      (pedidos) => {
        this.pedidos = <Pedido[]>pedidos;
        this.actualizarFiltroCategorias()
        const pedidoFind = this.pedidosFiltrados.find(ped=> ped.id_mesa == this.pedidoSeleccionado.id_mesa)

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
    if(this.pedidoSeleccionado.observacion!= undefined){
      this.observacion = this.pedidoSeleccionado.observacion
    }
  }
  modificarPedido(pedido:PlatoPedido){
    this.botonListo = true;
    let pedidos = 0
    let listos = 0


    this.pedidoSeleccionadoReal = this.pedidos.find(ped=>ped._id == this.pedidoSeleccionado._id);

    this.pedidoSeleccionadoReal.pedidos=this.pedidoSeleccionadoReal.pedidos.map(ped=>{
      if(ped.plato._id==pedido.plato._id){
        ped.cantidad_lista+=1
        ped.cantidad_servida+=1
      }
      pedidos += ped.cantidad_pedido
      listos +=ped.cantidad_lista
      return ped
    })
  if(pedidos >= listos){

    if(pedidos == listos){

      let mesa:MesaSeleccionada
      this.MesaService.getMesa(this.pedidoSeleccionadoReal.id_mesa).subscribe(res=>{
        mesa=(res as MesaSeleccionada)
        if(mesa.estado!=4){
          mesa.estado = 4
          this.MesaService.editarMesa(mesa).subscribe()
          this.pedidoSeleccionadoReal.horaDeEntrega = new Date(Date.now());
          this.PedidoService.editarPedido(this.pedidoSeleccionadoReal).subscribe(()=>{
            this.AlertService.showSuccess('Solicitud de plato listo enviado a mesero con éxito')
            this.botonListo = false;
          })
        }else{
          this.PedidoService.editarPedido(this.pedidoSeleccionadoReal).subscribe(()=>{
            this.AlertService.showSuccess('Solicitud de plato listo enviado a mesero con éxito')
            this.botonListo = false;

          })
        }

      })

    }else{
      
      this.PedidoService.editarPedido(this.pedidoSeleccionadoReal).subscribe(()=>{
        this.AlertService.showSuccess('Solicitud de plato listo enviado a mesero con éxito')
        this.botonListo = false;
      })
    }


  }

  }
  expanded = false;
  observacion:string
  showCheckboxes() {
    if (!this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }
  setColor(pedido:Pedido){
    let completo = true;
    pedido.pedidos.map(ped=>{
        if(ped.cantidad_pedido!=ped.cantidad_lista){
          completo= false
        }
    })
    if (completo) {

      return this.StorageService.getConfiguracionEstilo().colorAplicacion.check
      ?  this.StorageService.getConfiguracionEstilo().colorAplicacion.color+64
      : '#ffb13c'+64
    }else{
      return ''
    }
  }

}
