import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum TiposAlertas {
    DANGER = 'danger',
    SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(msg: string, tipo: TiposAlertas, timeOut?: number ) {
    const bsModalRef: BsModalRef  = this.modalService.show(AlertModalComponent);    
    bsModalRef.content.tipo = tipo;
    bsModalRef.content.mensagem = msg;
    if (timeOut) {
      setTimeout( () => bsModalRef.hide(), timeOut);
    }
  }

  showAlertDanger(msg: string) {
    this.showAlert(msg, TiposAlertas.DANGER, 10000);
  }
  
  showAlertSuccess(msg: string) {
    this.showAlert(msg, TiposAlertas.SUCCESS, 2000);
  }

  showConfirm(titulo: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef  = this.modalService.show(ConfirmModalComponent);
    
    bsModalRef.content.titulo = titulo;
    bsModalRef.content.msg = msg;

    if (okTxt)     { bsModalRef.content.okTxt = okTxt; }
    if (cancelTxt) { bsModalRef.content.cancelTxt = okTxt; }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult

  }
}
