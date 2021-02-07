import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {

  nome: string = 'ABC';
  pessoa: any = {
    nome: "Marcos Grahl",
    idade: 29
  }

 
  constructor() { }

  ngOnInit(): void {
  }

}
