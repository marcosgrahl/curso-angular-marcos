import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'http://lorempixel.com/200/100/nature/';
  valorAtual: string = '';
  valorSalvo: string = '';
  isMouseOver: boolean = false;

  nomeDoCurso: string = 'Angular';
  valorInicial: number = 15;
 
  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }

  getCurtirCurso(){
    return false;
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
    console.log();
  } 

  salvarValor(valor){
    this.valorSalvo = valor;
  }

  botaoClicado() {
    alert('O botão foi clicado!')
  }

  onMudouValor(evento) {
    console.log(evento);
  }

  constructor() { }

  ngOnInit(): void {
  }

  getValor() {
    return 2;
  }

}
