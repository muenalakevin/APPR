import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/shared/models/cliente';

@Component({
  selector: 'app-editarCliente',
  templateUrl: './editarCliente.component.html',
  styleUrls: ['./editarCliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  clienteForm: FormGroup
  constructor(
    private ClienteService:ClienteService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<EditarClienteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { cliente:Cliente}
  ) {
    this.clienteForm = this.formBuilder.group({
      nombre_cliente: new FormControl(this.data.cliente.nombre_cliente, [
        Validators.required,
      ]),
      apellido_cliente: new FormControl(this.data.cliente.apellido_cliente, [
        Validators.required
      ]),
      cedRuc_cliente: new FormControl(this.data.cliente.cedRuc_cliente, [
        Validators.required
      ]),
      correo_cliente: new FormControl(this.data.cliente.correo_cliente, [
        Validators.email,
        Validators.required
      ]),
      direccion_cliente: new FormControl(this.data.cliente.direccion_cliente, [
        Validators.required
      ]),
      telefono_cliente: new FormControl(this.data.cliente.telefono_cliente, [
        Validators.required
      ]),


    },
		{
      	validator: this.MatchCedula
    	});

  }
  MatchCedula(clienteForm: AbstractControl):ValidationErrors | null {
    let cedula = clienteForm.get('cedRuc_cliente').value; // to get value in input tag
    if(cedula.length==13){
      cedula = cedula.substring(0,10)
    }



    if(cedula.length == 10){

      //Obtenemos el digito de la region que sonlos dos primeros digitos
      let digito_region = Number(cedula.substring(0,2));

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if( digito_region >= 1 && digito_region <=24 ){

        // Extraigo el ultimo digito
        var ultimo_digito   = Number(cedula.substring(9,10));

        //Agrupo todos los pares y los sumo
        var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero1 =Number( cedula.substring(0,1));
        var numero1 = (numero1 * 2);
        if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

        var numero3 = Number(cedula.substring(2,3));
        var numero3 = (numero3 * 2);
        if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

        var numero5 = Number( cedula.substring(4,5));
        var numero5 = (numero5 * 2);
        if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

        var numero7 = Number(cedula.substring(6,7));
        var numero7 = (numero7 * 2);
        if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

        var numero9 = Number(cedula.substring(8,9));
        var numero9 = (numero9 * 2);
        if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        var suma_total = (pares + impares);

        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0,1);

        //Obtenemos la decena inmediata
        var decena = Number((parseInt(primer_digito_suma) + 1)  * 10);

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = Number(decena - suma_total);

        //Si el digito validador es = a 10 toma el valor de 0
        if(digito_validador == 10)
          var digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if(digito_validador == ultimo_digito){
          return null
        }else{
          /* console.log('la cedula:' + cedula + ' es incorrecta'); */
          clienteForm.get('cedRuc_cliente').setErrors( {MatchCedula: true} )
        }

      }else{
        // imprimimos en consola si la region no pertenece
       /*  console.log('Esta cedula no pertenece a ninguna region'); */
       clienteForm.get('cedRuc_cliente').setErrors( {MatchCedula: true} )
      }
   }else{
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      /* console.log('Esta cedula tiene menos de 10 Digitos'); */
      clienteForm.get('cedRuc_cliente').setErrors( {MatchCedula: true} )
   }



   return null




    /* if(this.validarCedula(cedula)) {
      clienteForm.get('cedRuc_cliente').setErrors( {MatchCedula: true} )
    } else {

    }
    return null */
}
  ngOnInit() {
  }
 async submitForm(){
    if(this.clienteForm.valid){
      const cliente:Cliente = {
            _id: this.data.cliente._id,
            nombre_cliente:  this.clienteForm.value.nombre_cliente,
            apellido_cliente:  this.clienteForm.value.apellido_cliente,
            cedRuc_cliente:  this.clienteForm.value.cedRuc_cliente,
            correo_cliente: this.clienteForm.value.correo_cliente,
            direccion_cliente: this.clienteForm.value.direccion_cliente,
            telefono_cliente: this.clienteForm.value.telefono_cliente,
      }
      await this.ClienteService.editarCliente(cliente).subscribe(res=>{

        this.dialogRef.close({cliente:cliente})
      })

    }
  }
  validarCedula(cedula:string):boolean{
    if(cedula.length == 10){

      //Obtenemos el digito de la region que sonlos dos primeros digitos
      let digito_region = Number(cedula.substring(0,2));

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if( digito_region >= 1 && digito_region <=24 ){

        // Extraigo el ultimo digito
        var ultimo_digito   = Number(cedula.substring(9,10));

        //Agrupo todos los pares y los sumo
        var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero1 =Number( cedula.substring(0,1));
        var numero1 = (numero1 * 2);
        if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

        var numero3 = Number(cedula.substring(2,3));
        var numero3 = (numero3 * 2);
        if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

        var numero5 = Number( cedula.substring(4,5));
        var numero5 = (numero5 * 2);
        if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

        var numero7 = Number(cedula.substring(6,7));
        var numero7 = (numero7 * 2);
        if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

        var numero9 = Number(cedula.substring(8,9));
        var numero9 = (numero9 * 2);
        if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        var suma_total = (pares + impares);

        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0,1);

        //Obtenemos la decena inmediata
        var decena = Number((parseInt(primer_digito_suma) + 1)  * 10);

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = Number(decena - suma_total);

        //Si el digito validador es = a 10 toma el valor de 0
        if(digito_validador == 10)
          var digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if(digito_validador == ultimo_digito){
         return true;
        }else{
          /* console.log('la cedula:' + cedula + ' es incorrecta'); */
          return false;
        }

      }else{
        // imprimimos en consola si la region no pertenece
       /*  console.log('Esta cedula no pertenece a ninguna region'); */
       return false;
      }
   }else{
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      /* console.log('Esta cedula tiene menos de 10 Digitos'); */
      return false;
   }
  }
}
