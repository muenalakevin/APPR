import { ClienteService } from './../../../../core/services/cliente.service';
import { Cliente } from './../../../../shared/models/cliente';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearCliente',
  templateUrl: './crearCliente.component.html',
  styleUrls: ['./crearCliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  clienteForm: FormGroup 
  constructor(
    private ClienteService:ClienteService,
    public dialogRef: MatDialogRef<CrearClienteComponent>,
  ) { 
    this.clienteForm = new FormGroup({
      nombre_cliente: new FormControl(null, [
        Validators.required,
      ]),
      apellido_cliente: new FormControl(null, [
        Validators.required
      ]),
      cedRuc_cliente: new FormControl(null, [
        Validators.required
      ]),
      correo_cliente: new FormControl(null, [
        Validators.email,
      ]),
      direccion_cliente: new FormControl(null, [
      ]),


    });

  }

  ngOnInit() {
  }
 async submitForm(){
    if(this.clienteForm.valid){
      const cliente:Cliente = {
            _id: "",
            nombre_cliente:  this.clienteForm.value.nombre_cliente,
            apellido_cliente:  this.clienteForm.value.apellido_cliente,
            cedRuc_cliente:  this.clienteForm.value.cedRuc_cliente,
            correo_cliente: this.clienteForm.value.correo_cliente,
            direccion_cliente: this.clienteForm.value.direccion_cliente,
      }
      await this.ClienteService.guardarCliente(cliente).subscribe(res=>{
        this.dialogRef.close({cliente:res})
      })
  
    }
  }
}
