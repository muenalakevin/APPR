import { AgregarClienteComponent } from './../../components/agregarCliente/agregarCliente.component';
import { EditarClienteComponent } from './../../../cajero/components/editarCliente/editarCliente.component';
import { ClienteService } from './../../../../core/services/cliente.service';
import { Cliente } from './../../../../shared/models/cliente';
import { AlertService } from './../../../../core/services/alert.service';
import { AgregarUsuarioComponent } from './../../components/agregarUsuario/agregarUsuario.component';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from './../../../../shared/models/rol';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { AfterViewInit, Component, OnInit, ViewChild,Injectable } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { EditarUsuarioComponent } from '../../components/editarUsuario/editarUsuario.component';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit,AfterViewInit {

  public displayedColumns = ['nombre_cliente', 'apellido_cliente', 'cedRuc_cliente', 'correo_cliente', 'direccion_cliente','telefono_cliente',  'Editar'];
public dataSource = new MatTableDataSource<Cliente>();


private usuariosSubscription: Subscription;

  clientes: Cliente[]=[];

  constructor(
    private ClienteService: ClienteService,
    public dialog: MatDialog,
    public AlertService:AlertService,
    private socket: Socket) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('paginatorRol', {
    read: MatPaginator
 }) paginatorRol: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: Event) => {
    this.dataSource.filter = (value.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }
  openDialogAgregar() {
    const dialogRef = this.dialog.open(AgregarClienteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    })
  }
  openDialogEditar(cliente:Cliente) {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      data: { cliente },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async ngOnInit() {

    this.usuariosSubscription = this.ClienteService.getClientes().subscribe(
      clientes => {
        this.clientes =<Cliente[]>clientes
        this.dataSource.data = clientes as Cliente[];
      });
/*     this.usuariosSubscription = this.UsuarioService.usuarios.subscribe(usuarios => //console.log(usuarios)); */

  }
  ngOnDestroy() {
    this.usuariosSubscription.unsubscribe();
  }

 /*  eliminarUsuario(_id:string){
    this.AlertService.showConfirm("¿Está seguro que desea eliminar el usuario?").then((res: boolean) => {
      if (res) {
         this.UsuarioService.eliminarUsuario(_id).subscribe(
           (data) =>  this.AlertService.showSuccess('Usuario eliminado con exito'),
         (error) =>{
           this.AlertService.showErrorServidor()
         });
      } else {
        //console.log("Cancelacion")

      }
    });



  } */

}
