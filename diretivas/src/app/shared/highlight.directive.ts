import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[Highlight]'
})
export class HighlightDirective {
  
  @HostListener('mouseenter') fMouseEnter() {
    this.vCorFundo = this.corRealce;
    this.vCor = 'darkred';
  }
  
  @HostListener('mouseleave') fMouseLeave() {
    this.vCorFundo  = this.corPadrao;
    this.vCor= 'black';
  }
  
  @HostBinding('style.backgroundColor') vCorFundo : string;
  
  @HostBinding('style.color') vCor: string;

  @Input('Highlight') corRealce: string = 'yellow';   // pode-se usar um nome específico no imput, e se usar o memsmo no seletor o ng 
                                           // entende que pode ser ao mesmo tempo um diretiva e nome de imput property.
  @Input() corPadrao: string = 'white';


  ngOnInit() {
    this.vCorFundo = this.corPadrao;
  }



  constructor() { }
}



