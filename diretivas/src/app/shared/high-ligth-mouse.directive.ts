import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';


@Directive({
  selector: '[HighLigthMouse]'
})
export class HighLigthMouseDirective {

  // metódo com maninupalção extra código, usando getter ou setter
  @HostBinding('style.color') get setColor() {
    // aqui vai o código extra
    // ...
    return this.vCor;
  } 
  private vCor: string;
  
  // Metódo sem manipulação extra
  @HostBinding('style.backgroundColor') vCorFundo : string;
  
  @HostListener('mouseenter') fMouseEnter() {
    console.log('fMouseEnter');
  /*  
    this._rendered.setStyle(
      this._element.nativeElement,
      'backgroud-color', 'yellow'
    );
    // o método acima é mais seguro, mas não funcionou comigo!
  */
    // usando método menos seguro
    //this._element.nativeElement.style.backgroundColor = 'yellow';
    // usando 3 método, por HostBinding e HostLister (funciona)
    this.vCorFundo = 'pink'
    this.vCor = 'darkred'
  }

  @HostListener('mouseleave') fMouseLeave() {
    console.log('fMouseLeave');
    // usando método 2 menos seguro
    //this._element.nativeElement.style.backgroundColor = 'white';
    // usando 3 método, por HostBinding e HostLister (funciona)
    this.vCorFundo  = 'white';
    this.vCor= 'black'
  }


  constructor(
   // private _element: ElementRef,
   // private _rendered: Renderer2
    ) { }
}