import { UsuarioService } from './../../../../core/services/usuario.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  formReset = new FormGroup({
    password: new FormControl('', [Validators.required,  Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    confirmPassword: new FormControl('', [Validators.required,  Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])
  });

  img:string = ''
  code:string = ''
  view:number = 0
  constructor(
    private configuracionService:ConfiguracionService,
    public StorageService:StorageService,
    public AlertService:AlertService,
    public UsuarioService:UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.route.queryParams
    .subscribe((params:any) => {
      this.code = params.k;
      console.log(this.code);
    });
 
    this.configuracionService.getLogo().subscribe(res=>{
      this.img=res as string;
    })
  }
  getLogo(){

    return 'data:image/jpeg;base64,'+this.img
  
  }
  redirectIniciaSesion(){
    this.router.navigate(['/auth/login']);
  }
  resetPassword(){
    if(this.formReset.valid){
      if(this.formReset.get('password')?.value==this.formReset.get('confirmPassword')?.value){
        this.UsuarioService.restarPassword(this.code,this.formReset.get('password')?.value,this.formReset.get('confirmPassword')?.value).subscribe(()=>{
          this.AlertService.showSuccess('Usuario restablecido contraseña con éxito.')
          this.view = 1
        },err=>{
          this.AlertService.showWarning('Código posiblemente expirado.')
        })
      }else{
        this.AlertService.showWarning('Contraseña no coincide')
      }
    }else{
      this.AlertService.showWarning('Llene todos los campos')
    }
  }
  ngOnInit(): void {
  }

}
