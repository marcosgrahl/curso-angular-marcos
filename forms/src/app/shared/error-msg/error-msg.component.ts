import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms'
import { FormValidacao } from '../form-validacao';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  //@Input() mostrarErro: boolean;

  //@Input() msgErro: string;

  @Input() control: FormControl;

  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.status == 'INVALID') {
        const msgErro = FormValidacao.getErrosMsg(this.label, propertyName, this.control.errors[propertyName]) 
        console.log('error', msgErro);
          return msgErro;
      }
    }
    return null;
  }

}
