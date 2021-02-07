import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngstyle',
  templateUrl: './diretiva-ngstyle.component.html',
  styleUrls: ['./diretiva-ngstyle.component.css']
})
export class DiretivaNgstyleComponent implements OnInit {

  ativo: boolean = false;
  tamFonte: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

  fClick() {
    this.ativo = ! this.ativo
  }

}
