import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  getCursos() {
    return [
      {id: 1, nome: 'Angular'},
      {id: 2, nome: 'Java'},
      {id: 3, nome: 'JavaScript'}
    ]
  }

  getCurso(id: number) {
    let cursos = this.getCursos();
    for (let i = 0; i < cursos.length; i++) {
      const cur = cursos[i];
      if (cur.id == id) {
        return cur;
      }
    }
    return null;
  }

  constructor() { }
}