import { PlatoService } from './../../../../core/services/plato.service';
import { Plato } from './../../../../shared/models/plato';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuarioEnviar } from './../../../../shared/models/usuarioEnviar';
import { UsuarioService } from './../../../../core/services/usuario.service';
import { AlertService } from './../../../../core/services/alert.service';
import { CategoriaService } from './../../../../core/services/categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaPlato } from './../../../../shared/models/categoriaPlato';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChip } from '@angular/material/chips';
import Swiper from 'swiper';
import 'swiper/css';
import SwiperCore, { SwiperOptions,Pagination } from 'swiper';


// install Swiper modules
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-editarPlato',
  templateUrl: './editarPlato.component.html',
  styleUrls: ['./editarPlato.component.css'],
})
export class EditarPlatoComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide = true;
  categorias: CategoriaPlato[] = [];

  platoForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    nombre_plato: new FormControl(null),
    descripcion_plato: new FormControl(null),
    receta_plato: new FormControl(null),
    precio_plato: new FormControl(null),
    categorias_plato: new FormControl([]),
  });

  categoriaSelect: string[] = [];

  constructor(
    private CategoriaService: CategoriaService,
    private AlertService: AlertService,
    private PlatoService: PlatoService,
    public dialogRef: MatDialogRef<EditarPlatoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { plato: Plato; categorias: CategoriaPlato[] }
  ) {
    this.categorias = this.data.categorias;

    /*  <string[]>this.categorias.filter(
        (categoria:CategoriaPlato)=> {
         return this.data.plato.categorias_plato.find(
            categoriaSeleccionada=>{
              if(categoriaSeleccionada ==  categoria._id){
                  return catego
              }
            }
          )
      }) */
      const newCategoriSelected = this.data.categorias.filter(
        categoria=> this.data.plato.categorias_plato.find(categoriaId=>categoriaId==categoria._id)
      )

    this.platoForm = new FormGroup({
      _id: new FormControl(this.data.plato._id, [Validators.required]),
      nombre_plato: new FormControl(this.data.plato.nombre_plato, [
        Validators.required,
      ]),
      descripcion_plato: new FormControl(this.data.plato.descripcion_plato, [
        Validators.required,
      ]),
      receta_plato: new FormControl(this.data.plato.receta_plato, [
        Validators.required,
      ]),
      precio_plato: new FormControl(this.data.plato.precio_plato, [
        Validators.required,
      ]),
      categorias_plato: new FormControl(newCategoriSelected, [Validators.required]),
      /* categorias_plato: new FormControl(this.data.plato.categorias_plato, [
          Validators.required,
        ]), */
    });
  }

  ngOnInit() {}
  submitForm() {
    let mensajeWarnign: string = '';
    if (this.platoForm.get('nombre_plato')?.errors?.['required']) {
      mensajeWarnign += 'Falta nombre de plato. <br>';
    }
    if (this.platoForm.get('descripcion_plato')?.errors?.['required']) {
      mensajeWarnign += 'Falta descripción de plato. <br/>';
    }
    if (this.platoForm.get('receta_plato')?.errors?.['required']) {
      mensajeWarnign += 'Falta receta de plato. <br/>';
    }


   /*  if (this.validatoMinLength()) {
      mensajeWarnign += 'Falta categorias de plato. <br/>';
    } */


    if (mensajeWarnign == '') {
      const plato: Plato = {
        _id: this.platoForm.value._id,
        nombre_plato: this.platoForm.value.nombre_plato,
        descripcion_plato: this.platoForm.value.descripcion_plato,
        receta_plato: this.platoForm.value.receta_plato,
        precio_plato: this.platoForm.value.precio_plato,
        categorias_plato: this.platoForm.value.categorias_plato.map(
          (categoria: CategoriaPlato) => {
            if(categoria.estado_categoria== 0){
              categoria.estado_categoria = 1
              this.CategoriaService.editarCategoria(categoria).subscribe();
            }
            return categoria._id;
          }
        ),
        estado_plato:this.data.plato.estado_plato
      };

      this.dialogRef.close();
       this.PlatoService.editarPlato(plato).subscribe(
        (data) =>  this.AlertService.showSuccess('Plato editado con exito'),
        (error) =>{
          this.AlertService.showErrorServidor()
        }
      );
    } else {
      this.AlertService.showWarning(mensajeWarnign);
    }
  }

  toggleSelection(chip: MatChip) {

    chip.toggleSelected();
    if (chip.selected) {
      this.platoForm.value.categorias_plato.push(chip.value);
    } else {
      const index = this.platoForm.value.categorias_plato.indexOf(chip.value);
      if (index >= 0) {
        this.platoForm.value.categorias_plato.splice(index, 1);
      }
    }
  }

  validatoMinLength() {
    return this.platoForm.get('categorias_plato')?.value.length == 0;
  }
  isSelected(categoria: CategoriaPlato) {
    const categoriaFind = this.platoForm.value.categorias_plato.find((categoriaId:CategoriaPlato)=>categoriaId._id==categoria._id)


    if (categoriaFind != null) {
      if (categoriaFind._id == categoria._id) {
        return true;
      } else {

        return false;
      }
    } else {

      return false;
    }
  }
  onSwiper(swiper: any) {

  }
  onSlideChange() {

  }
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  captureFile(event:Event):any{
    let file = (event.target as HTMLInputElement)
    if(file!=null){
      const archivoCapturado = file.files![0]
      this.PlatoService.subirFoto(archivoCapturado).subscribe()
    }
   

  }
}
