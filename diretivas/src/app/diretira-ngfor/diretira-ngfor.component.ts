import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretira-ngfor',
  templateUrl: './diretira-ngfor.component.html',
  styleUrls: ['./diretira-ngfor.component.css']
})
export class DiretiraNgforComponent implements OnInit {

  aCursos: string[] = ['Angular','JavaScript','HTML5 e CSS 3','Phonegap']

  constructor() { }

  ngOnInit(): void {
  }

}
