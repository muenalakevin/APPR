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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit,AfterViewInit {
  
  public displayedColumns = ['usuario_usuario', 'nombre_usuario', 'correo_usuario', 'rol_usuario', 'Editar','Eliminar'];
  public displayedColumnsRoles = ['nombre_rol', 'descripcion_rol'];
public dataSource = new MatTableDataSource<Usuario>();
public dataRoles = new MatTableDataSource<Rol>();

private usuariosSubscription: Subscription;

  usuarios: Usuario[]=[];
  roles: Rol[] = []
  constructor(
    private UsuarioService: UsuarioService,
    private RolService:RolService,
    public dialog: MatDialog, 
    public AlertService:AlertService,
    private socket: Socket) { }
    
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: Event) => {
    this.dataSource.filter = (value.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }
  openDialogAgregar() {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    })
  }
  openDialogEditar(usuario:Usuario) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: { usuario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  async ngOnInit() {
    
    this.usuariosSubscription = this.UsuarioService.usuarios.subscribe(
      usuarios => {const Data:Usuario[]=<Usuario[]>usuarios
        const newData = Data.map((usuario)=>{
          usuario.rol_usuario = <string> this.roles.find((rol)=>{return rol._id==usuario.rol_usuario}).nombre_rol
          return usuario;
        })
        this.usuarios = <Usuario[]>newData;
        this.dataSource.data = newData as Usuario[];
      });
/*     this.usuariosSubscription = this.UsuarioService.usuarios.subscribe(usuarios => console.log(usuarios)); */
    
    
    this.RolService.getRols()
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


    
  }
  ngOnDestroy() {
    this.usuariosSubscription.unsubscribe();
  }

  eliminarUsuario(_id:string){
    this.AlertService.showConfirm("¿Está seguro que desea eliminar el usuario?").then((res: boolean) => {
      if (res) {
         this.UsuarioService.eliminarUsuario(_id).subscribe(
           (data) =>  this.AlertService.showSuccess('Usuario eliminado con exito'),
         (error) =>{
           this.AlertService.showErrorServidor()
         });
      } else {
        console.log("Cancelacion")

      }
    });

    
   
  }

}