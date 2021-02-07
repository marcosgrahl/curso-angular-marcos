import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() msg: string;
  @Input() cancelTxt: string = 'Cancelar';
  @Input() okTxt: string = 'Confirmar';

  confirmResult: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    // instanciar o confirmResult
    this.confirmResult = new Subject();
  }

  onConfirm() {
    // emitir valor atraves do next
    this.confirmResult.next(true);
    this.bsModalRef.hide();
  }

  onClose() {
    this.confirmResult.next(false);
    this.bsModalRef.hide();
  };

}
