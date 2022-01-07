
import { Socket } from 'ngx-socket-io';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, ViewChild, Component } from '@angular/core';
import { EditarPlatoComponent } from './../../components/editarPlato/editarPlato.component';
import { Plato } from './../../../../shared/models/plato';
import { PlatoService } from './../../../../core/services/plato.service';
import { AgregarPlatoComponent } from './../../components/agregar-plato/agregar-plato.component';

import { Mesa } from './../../../../shared/models/mesa';
import { EditarMesaComponent } from './../../components/editar-mesa/editar-mesa.component';
import { AgregarMesaComponent } from './../../components/agregar-mesa/agregar-mesa.component';
import { MesaService } from './../../../../core/services/mesa.service';
import { AlertService } from './../../../../core/services/alert.service';
import { AgregarUsuarioComponent } from './../../components/agregarUsuario/agregarUsuario.component';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from './../../../../shared/models/rol';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { MatDialog } from '@angular/material/dialog';
import { AgregacionRapidaComponent } from '../../components/agregacion-rapida/agregacion-rapida.component';
import {faSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  faSquare=faSquare
  public displayedColumns = [
    'mesa',
    'nombre_mesa',
    'descripción_mesa',
    'Editar',
    'Eliminar',
  ];

  public dataSource = new MatTableDataSource<Mesa>();

  private mesasSubscription: Subscription;


  mesas: Mesa[] = [];

  constructor(
    private UsuarioService: UsuarioService,
    private RolService: RolService,
    public dialog: MatDialog,
    public AlertService: AlertService,
    private socket: Socket,
    private MesaService: MesaService,
    private PlatoService: PlatoService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(AgregarMesaComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogAgregarRapida() {
    const dialogRef = this.dialog.open(AgregacionRapidaComponent, {
      autoFocus: true,
      data: { cantidadMesas:this.mesas.length },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialogEditar(mesa: Mesa) {
    const dialogRef = this.dialog.open(EditarMesaComponent, {
      data: { mesa },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async ngOnInit() {
    this.MesaService.getMesas().subscribe((mesas) => {
      this.mesas = <Mesa[]>mesas;
      this.dataSource.data = mesas as Mesa[];
    });



    this.mesasSubscription = this.MesaService.mesas.subscribe(
      (mesas) => {
        const Data: Mesa[] = <Mesa[]>mesas;
        this.mesas = <Mesa[]>Data;
        console.log(Data);
        this.dataSource.data = Data as Mesa[];
      }
    );
  }
  ngOnDestroy() {
    this.mesasSubscription.unsubscribe();
  }

  eliminar(_id: string) {
    this.AlertService.showConfirm(
      '¿Está seguro que desea eliminar el plato?'
    ).then((res: boolean) => {
      if (res) {
        this.MesaService.eliminarMesa(_id).subscribe(
          (data) =>
            this.AlertService.showSuccess('Plato eliminado con éxito'),
          (error) => {
            this.AlertService.showErrorServidor();
          }
        );
      } else {
        console.log('Cancelación');
      }
    });
  }

}
