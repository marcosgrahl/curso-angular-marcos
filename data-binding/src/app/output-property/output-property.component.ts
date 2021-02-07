import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
})
export class OutputPropertyComponent implements OnInit {

  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter();

  @ViewChild('campoInput') campoValorInput : ElementRef;

  incrementa() {
    //this.valor ++;
    //this.mudouValor.emit({novoValor: this.valor})
    this.campoValorInput.nativeElement.value ++;
    console.log(this.campoValorInput.nativeElement.value);
  }
  
  decrementa() {
    //this.valor --;
    //this.mudouValor.emit({novoValor: this.valor})
    this.campoValorInput.nativeElement.value --;
    console.log(this.campoValorInput.nativeElement.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
