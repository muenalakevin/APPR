import { EditarPlatoComponent } from './../../components/editarPlato/editarPlato.component';
import { Plato } from './../../../../shared/models/plato';
import { PlatoService } from './../../../../core/services/plato.service';
import { AgregarPlatoComponent } from './../../components/agregar-plato/agregar-plato.component';

import { CategoriaPlato } from './../../../../shared/models/categoriaPlato';
import { EditarCategoriaComponent } from './../../components/editarCategoria/editarCategoria.component';
import { AgregarCategoriaComponent } from './../../components/agregarCategoria/agregarCategoria.component';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { AlertService } from './../../../../core/services/alert.service';
import { AgregarUsuarioComponent } from './../../components/agregarUsuario/agregarUsuario.component';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from './../../../../shared/models/rol';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Injectable,
  NgZone,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { EditarUsuarioComponent } from '../../components/editarUsuario/editarUsuario.component';
import Swiper from 'swiper';
import 'swiper/css';
import SwiperCore, { SwiperOptions } from 'swiper';
import { AgregarOpcionRapidaComponent } from '../../components/AgregarOpcionRapida/AgregarOpcionRapida.component';
import { OpcionRapida } from 'src/app/shared/models/opcionRapida';
import { OpcionRapidaService } from 'src/app/core/services/opcion-rapida.service';
import { EditarOpcionRapidaComponent } from '../../components/editarOpcionRapida/editarOpcionRapida.component';
@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css'],
})
export class PlatosComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'nombre_plato',
    'descripcion_plato',
    'receta_plato',
    'precio_plato',
    'categorias_plato',
    'Editar',
    'Eliminar',
  ];
  public displayedColumnsCategorias = [
    'nombre_categoria',
    'descripcion_categiria',
    'Editar',
    'Eliminar',
  ];
  public displayedColumnsOpcionesRapidas = [
    'frase_opcionRapida',
    'Editar',
    'Eliminar',
  ];
  public dataSource = new MatTableDataSource<Plato>();
  public dataCategorias = new MatTableDataSource<CategoriaPlato>();
  public dataOpcionesRapidas = new MatTableDataSource<OpcionRapida>();

  private platosSubscription: Subscription;
  private categoriasubscription: Subscription;
  private opcionesRapidasSubscription: Subscription;

  platos: Plato[] = [];
  categorias: CategoriaPlato[] = [];
  opcionesRapidas: OpcionRapida[] = [];
  filtrar: boolean =false
  constructor(
    private UsuarioService: UsuarioService,
    private RolService: RolService,
    public dialog: MatDialog,
    public AlertService: AlertService,
    private socket: Socket,
    private CategoriaService: CategoriaService,
    private opcionRapidaService: OpcionRapidaService,
    private PlatoService: PlatoService,
    private ngZone: NgZone,
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sortCategoria', {
    read: MatSort
 }) sortCategoria: MatSort;
  @ViewChild('sortOpcionRapida', {
    read: MatSort
 }) sortOpcionRapida: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('paginatorCategoria', {
    read: MatPaginator
 }) paginatorCategoria: MatPaginator;
  @ViewChild('paginatorOpcionRapida', {
    read: MatPaginator
 }) paginatorOpcionRapida: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataCategorias.sort = this.sortCategoria;
    this.dataCategorias.paginator = this.paginatorCategoria;
    this.dataOpcionesRapidas.sort = this.sortOpcionRapida;
    this.dataOpcionesRapidas.paginator = this.paginatorOpcionRapida;

  }

  public doFilter = (value: Event) => {
    this.dataSource.filter = (value.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
  };
  public doFilterCategorais = (value: Event) => {
    this.dataSource.filter = (value.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
  };
  public doFilterOpcionesRapidas = (value: Event) => {
    this.dataSource.filter = (value.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
  };

  openDialogAgregar() {
    const dialogRef = this.dialog.open(AgregarPlatoComponent, {
      data: { categorias: this.categorias },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogAgregarCategoria() {
    const dialogRef = this.dialog.open(AgregarCategoriaComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAgregarOpcionRapida() {
    const dialogRef = this.dialog.open(AgregarOpcionRapidaComponent, {
      data: { opcionesRapidas: this.opcionesRapidas },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogEditar(plato: Plato) {
    const dialogRef = this.dialog.open(EditarPlatoComponent, {
      data: { plato, categorias: this.categorias},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEditarCategoria(categoria: CategoriaPlato) {
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      data: { categoria },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogEditarOpcionRapida(opcionRapida: OpcionRapida) {
    const dialogRef = this.dialog.open(EditarOpcionRapidaComponent, {
      data: { opcionRapida },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCategoria(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataCategorias.filter = filterValue.trim().toLowerCase();
  }
  applyFilterOpcionRapida(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataOpcionesRapidas.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
    this.CategoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = <CategoriaPlato[]>categorias;

      this.dataCategorias.data = categorias as CategoriaPlato[];
    });
    this.categoriasubscription = this.CategoriaService.categorias.subscribe(
      (categorias) => {
        const Data: CategoriaPlato[] = <CategoriaPlato[]>categorias;
        this.categorias = <CategoriaPlato[]>Data;

        this.dataCategorias.data = Data as CategoriaPlato[];

      }
    );
    
    this.opcionRapidaService.getOpcionesRapidas().subscribe((opcionesRapidas) => {
      this.opcionesRapidas = <OpcionRapida[]>opcionesRapidas;

      this.dataOpcionesRapidas.data = opcionesRapidas as OpcionRapida[];
    });

    this.opcionesRapidasSubscription = this.opcionRapidaService.opcionesRapidas.subscribe(
      (opcionesRapidas) => {
        const Data: OpcionRapida[] = <OpcionRapida[]>opcionesRapidas;
        this.opcionesRapidas = <OpcionRapida[]>Data;

        this.dataOpcionesRapidas.data = Data as OpcionRapida[];

      }
    );

    this.PlatoService.getPlatos().subscribe(platos => {
      this.platos= platos as Plato[];
      this.dataSource.data =  platos as Plato[] ;

    });
    this.platosSubscription = this.PlatoService.platos.subscribe(
      (platos) => {
        this.platos= platos as Plato[];
        this.dataSource.data = platos as Plato[];
        if(this.filtrar){
          this.dataSource.data =  this.platos.filter((plato)=>plato.categorias_plato.length==0)
        }
       if( this.platos.filter((plato)=>plato.categorias_plato.length==0).length ==0 ){

        this.filtrar=false
       }


      }
    );


  }
  ngOnDestroy() {
    this.platosSubscription.unsubscribe();
    this.categoriasubscription.unsubscribe();
    this.opcionesRapidasSubscription.unsubscribe();
  }

  eliminarPlato(_id: string) {
    this.AlertService.showConfirm(
      '¿Está seguro que desea eliminar el plato?'
    ).then((res: boolean) => {
      if (res) {
        this.PlatoService.eliminarPlato(_id).subscribe(
          (data) =>
            this.AlertService.showSuccess('Plato eliminado con éxito.'),
          (error) => {
            this.AlertService.showErrorServidor();
          }
        );
      } else {
        console.log('Cancelacion');
      }
    });
  }
  eliminarCategoria(_id: string) {
    const existeCategoria = this.platos.find(plato=>plato.categorias_plato.find(cat=>cat == _id))
    console.log(existeCategoria);
    if(existeCategoria == null){
      this.AlertService.showConfirm(
        '¿Está seguro que desea eliminar el categoria?'
      ).then((res: boolean) => {
        if (res) {
          this.CategoriaService.eliminarCategoria(_id).subscribe(
            (data) =>
              this.AlertService.showSuccess('Categoria eliminado con éxito.'),
            (error) => {
              this.AlertService.showErrorServidor();
            }
          );
        } else {
          console.log('Cancelacion');
        }
      });
    }else{
      this.AlertService.showWarning('Categoría no se puede ser eliminada, existen platos con esta categoría.')
    }

  }
  eliminarOpcionRapida(_id: string) {
    this.AlertService.showConfirm(
      '¿Está seguro que desea eliminar la opción rápida?'
    ).then((res: boolean) => {
      if (res) {
        this.opcionRapidaService.eliminarOpcionRapida(_id).subscribe(
          (data) =>
            this.AlertService.showSuccess('Opción rápida eliminado con éxito.'),
          (error) => {
            this.AlertService.showErrorServidor();
          }
        );
      } else {
        console.log('Cancelación');
      }
    });
  }
  cambioIdForName(id:string){

    return this.categorias.find(categoria=> categoria._id ==id ).nombre_categoria
  }

  existAllCategory(){

    const categoriaFind = this.dataSource.data.find((plato)=>plato.categorias_plato.length==0)
   return categoriaFind!=undefined
  }
  filtrarNoCategory() {

    this.filtrar=!this.filtrar
  if(this.filtrar){
    this.dataSource.data =  this.platos.filter((plato)=>plato.categorias_plato.length==0)
  }else{
    this.dataSource.data =  this.platos
  }


  }
  slidesEx = ['first', 'second'];
  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

}
