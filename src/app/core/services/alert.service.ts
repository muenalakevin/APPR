import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public toastr: ToastrService,public ngxBootstrapConfirmService:NgxBootstrapConfirmService) { }
  async showSuccess(message:string) {
    await this.toastr.success( message,'¡Proceso Exitoso!', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }
  async showWarning(message:string) {
    await this.toastr.warning( message,'¡Advertencia!', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }
  async showError(message:string) {
    await this.toastr.error( message,'¡Error!', { closeButton: true, timeOut: 60000, progressBar: true, enableHtml: true });
  }
  async showErrorServidor() {
    await this.toastr.error( "Al parecer existe un problema con el servidor, comunniquese al 0979676927",'¡Error!', { closeButton: true, timeOut: 60000, progressBar: true, enableHtml: true });
  }

  
   async showConfirm(title:string) {
    let options ={
      title,
      confirmLabel: 'Confirmar',
      declineLabel: 'Cancelar'
    }
    return this.ngxBootstrapConfirmService.confirm(options)
  }

  
  
 
}
