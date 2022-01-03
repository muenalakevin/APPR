import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  meseroConfig:FormGroup
  constructor(private formBuilder: FormBuilder) { }
  configuracionCaja:FormGroup = this.formBuilder.group({
    metodosDePago : new FormArray([new FormControl('', Validators.required)])
  })

  skills:FormArray = new FormArray([new FormControl('', Validators.required),new FormControl('', Validators.required)]);
  ngOnInit() {
    this.configuracionCaja = new FormGroup({
      metodosDePago : new FormArray([new FormControl('', Validators.required),new FormControl('', Validators.required)])
    })

    this.meseroConfig = new FormGroup({
      nombre_cliente: new FormControl(true, [
        Validators.required,
      ]),



    })
  }

}
