import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { SmtpService } from './../../../../core/services/smtp.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewResetPassword',
  templateUrl: './viewResetPassword.component.html',
  styleUrls: ['./viewResetPassword.component.css']
})
export class ViewResetPasswordComponent implements OnInit {
  correoForm:FormGroup =  this.FormBuilder.group({
    correo: new FormControl("",[Validators.required,Validators.email])
  })
  view:number = 0
  constructor(
    public StorageService: StorageService,
    private FormBuilder:FormBuilder,
    private SmtpService:SmtpService,
    private AlertService:AlertService,
    public dialogRef: MatDialogRef<ViewResetPasswordComponent>,
  ) { }
  enviarReset(){
    let email = this.correoForm.get('correo')?.value
    
    this.SmtpService.resetPassword( email).subscribe(res=>{
      this.AlertService.showSuccess('Correo enviado con éxito, revisa tu corre.')
      this.view = 1
    },err=>{
      if(err.status == 404){
        this.AlertService.showWarning('Correo no esta vinculado a ningun usuario, verifica tu correo.')
      }else if(err.status == 403){
        this.AlertService.showError('Error del sistema.')
      }
    })
  }
  ngOnInit() {
  }
  cerrar(){
    this.dialogRef.close()
  }
}
