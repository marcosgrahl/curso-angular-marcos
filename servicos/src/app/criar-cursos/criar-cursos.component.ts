import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/cursos.services';

@Component({
  selector: 'app-criar-cursos',
  templateUrl: './criar-cursos.component.html',
  styleUrls: ['./criar-cursos.component.css'],
  providers: [CursosService] // incluir quando precisar ter uma instância diferente do app.module
  // ver no o console.log do cusros.services.ts
})
export class CriarCursosComponent implements OnInit {

  cursos: string[] = [];

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
  }

  onAddCurso(curso: string){
    this.cursosService.addCurso(curso)
  }

}
