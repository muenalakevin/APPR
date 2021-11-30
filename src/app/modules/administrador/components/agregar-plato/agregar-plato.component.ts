import { Plato } from './../../../../shared/models/plato';
import { PlatoService } from './../../../../core/services/plato.service';
import { FormBuilder } from '@angular/forms';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { UsuarioEnviar } from './../../../../shared/models/usuarioEnviar';
import { AlertService } from './../../../../core/services/alert.service';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from './../../../../shared/models/rol';

import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  NgZone
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/models/usuario';
import { CategoriaPlato } from 'src/app/shared/models/categoriaPlato';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChip, MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-agregar-plato',
  templateUrl: './agregar-plato.component.html',
  styleUrls: ['./agregar-plato.component.css'],
})
export class AgregarPlatoComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide = true;
  roles: Rol[] = [];
  platoForm: FormGroup;
  categorias: CategoriaPlato[] = [];
  categoriasSeleccionadas: CategoriaPlato[] = [];


  constructor(
    private RolService: RolService,
    private AlertService: AlertService,
    private PlatoService: PlatoService,
    public dialogRef: MatDialogRef<AgregarPlatoComponent>,
    private FormBuilder:FormBuilder,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: { categorias: CategoriaPlato[] }
  ) {
    this.categorias = data.categorias;


    this.platoForm = new FormGroup({
      nombre_plato: new FormControl('', [Validators.required]),
      descripcion_plato: new FormControl('', [Validators.required]),
      receta_plato: new FormControl('', [Validators.required]),
      precio_plato: new FormControl('', [Validators.required]),
      categorias_plato:  new FormControl([], Validators.minLength(1)) 

    });

  
  }



  ngOnInit() {}
  submitForm() {
    let mensajeWarnign: string = '';
    if (this.platoForm.get('nombre_plato').errors?.['required']) {
      mensajeWarnign += 'Falta nombre de plato. <br>';
    }
    if (this.platoForm.get('descripcion_plato').errors?.['required']) {
      mensajeWarnign += 'Falta descripción de plato. <br/>';
    } 
    if (this.platoForm.get('receta_plato').errors?.['required']) {
      mensajeWarnign += 'Falta receta de plato. <br/>';
    } 


    if (this.validatoMinLength()) {
      mensajeWarnign += 'Falta categorias de plato. <br/>';
    }

    if (mensajeWarnign == '') {
      const plato: Plato = {
        
        _id: '',
        nombre_plato: this.platoForm.value.nombre_plato,
        descripcion_plato: this.platoForm.value.descripcion_plato,
        receta_plato: this.platoForm.value.receta_plato,
        precio_plato: this.platoForm.value.precio_plato,
        categorias_plato: this.platoForm.value.categorias_plato.map((categoria:CategoriaPlato)=>{
          return categoria._id;
        })
      };
      this.dialogRef.close();
      this.PlatoService.guardarPlato(plato).subscribe(
        (data) => this.AlertService.showSuccess('Usuario Guardado con exito'),
        (error) => {
          this.AlertService.showErrorServidor();
        }
      );
    } else {
      this.AlertService.showWarning(mensajeWarnign);
    }
  }



  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
    if(chip.selected){
      this.platoForm.value.categorias_plato.push(
        chip.value
      );
    }else{
      const index = this.platoForm.value.categorias_plato.indexOf(chip.value);
      if (index >= 0) {
        this.platoForm.value.categorias_plato.splice(index, 1);
      }
    }
    console.log(this.platoForm.value.categorias_plato);
  }

  validatoMinLength(){
    return this.platoForm.get('categorias_plato').value.length==0
  }

  isSelected(categoria:CategoriaPlato){
    console.log("soo");
     this.platoForm.value.categorias_plato.find((categoriaForm:CategoriaPlato)=>{
       if(categoriaForm._id==categoria._id){
         return true;
       }
       return true
     })
     return true
  }
}
