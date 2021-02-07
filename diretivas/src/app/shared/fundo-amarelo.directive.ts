import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[FundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(
    private _elementRef: ElementRef,
    private _redender: Renderer2
    ){
      // console.log(this._elementRef);
      // o metodo 1 abaixo não é indicado por problemas de segurança
      // this._elementRef.nativeElement.style.backgroundColor = 'yellow';
      // combinar o código com Renderer2, traz mais segurança: metodo 2
      this._redender.setStyle(
        this._elementRef.nativeElement,
        'background-color',
        'yellow');  
    }

}
