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
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { EditarUsuarioComponent } from '../../components/editarUsuario/editarUsuario.component';

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
    'categorias',
    'Editar',
    'Eliminar',
  ];
  public displayedColumnsCategorias = [
    'nombre_categiria',
    'descripcion_categiria',
    'Editar',
    'Eliminar',
  ];
  public dataSource = new MatTableDataSource<Usuario>();
  public dataCategorias = new MatTableDataSource<CategoriaPlato>();

  private usuariosSubscription: Subscription;
  private categoriasubscription: Subscription;

  usuarios: Usuario[] = [];
  categorias: CategoriaPlato[] = [];
  constructor(
    private UsuarioService: UsuarioService,
    private RolService: RolService,
    public dialog: MatDialog,
    public AlertService: AlertService,
    private socket: Socket,
    private CategoriaService: CategoriaService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataCategorias.sort = this.sort;
    this.dataCategorias.paginator = this.paginator;
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
  openDialogAgregar() {
    const dialogRef = this.dialog.open(AgregarPlatoComponent);

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
  openDialogEditar(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: { usuario },
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
  async ngOnInit() {
    this.CategoriaService.getCategorias().subscribe((categorias) => {
      this.categorias = <CategoriaPlato[]>categorias;
      console.log(categorias);
      this.dataCategorias.data = categorias as CategoriaPlato[];
    });
    this.categoriasubscription = this.CategoriaService.categorias.subscribe(
      (categorias) => {
        const Data: CategoriaPlato[] = <CategoriaPlato[]>categorias;
        this.categorias = <CategoriaPlato[]>Data;
        console.log(Data);
        this.dataCategorias.data = Data as CategoriaPlato[];
      }
    );
    /*     this.usuariosSubscription = this.UsuarioService.usuarios.subscribe(usuarios => console.log(usuarios)); */

    /*    this.RolService.getRols()
    .subscribe( data => {
      this.roles = <Rol[]>data;
      this.UsuarioService.getUsers()
      .subscribe( data => {
        const Data:Usuario[]=<Usuario[]>data

        const newData = Data.map((usuario)=>{
            usuario.rol_usuario = <string> this.roles.find((rol)=>{return rol._id==usuario.rol_usuario}).nombre_rol
            return usuario;
          })
        this.usuarios = <Usuario[]>newData;
        this.dataSource.data = newData as Usuario[];
        
      },(error) => this.AlertService.showErrorServidor());
    },(error) => this.AlertService.showErrorServidor())

 */
  }
  ngOnDestroy() {
    this.usuariosSubscription.unsubscribe();
  }

  eliminarUsuario(_id: string) {
    this.AlertService.showConfirm(
      '¿Está seguro que desea eliminar el usuario?'
    ).then((res: boolean) => {
      if (res) {
        this.UsuarioService.eliminarUsuario(_id).subscribe(
          (data) =>
            this.AlertService.showSuccess('Usuario eliminado con exito'),
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
    this.AlertService.showConfirm(
      '¿Está seguro que desea eliminar el categoria?'
    ).then((res: boolean) => {
      if (res) {
        this.CategoriaService.eliminarCategoria(_id).subscribe(
          (data) =>
            this.AlertService.showSuccess('Categoria eliminado con exito'),
          (error) => {
            this.AlertService.showErrorServidor();
          }
        );
      } else {
        console.log('Cancelacion');
      }
    });
  }
}
