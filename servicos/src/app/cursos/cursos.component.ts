import { Component, OnInit } from '@angular/core';

import {CursosService} from './cursos.services';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CursosService] // incluir quando precisar ter uma instância diferente do app.module
  // ver no o console.log do cusros.services.ts
})

export class CursosComponent implements OnInit {

  cursos: string[] = [];
  //cursosService: CursosService;

  constructor(private cursosService: CursosService) { 
    //this.cursosService = new CursosService()
    //this.cursosService = _cursosService;
  }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
    
    // se increver no evento para que seja avisado quando houver uma mudança (.emit)
    CursosService.criouNovoCurso.subscribe(
        /*function(curso) { console.log(curso) }*/ //pode ser subs. por arrow function
        curso => this.cursos.push(curso)
    )
  }
}
