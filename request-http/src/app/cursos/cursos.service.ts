import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { curso } from './curso';
import { tap, delay, take } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  //private readonly API = 'http://localhost:3000/cursos';
  private readonly API = `${environment.API}cursos`

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    //return this.http.get<curso[]>(this.API);
    // para debugar, usar o pipe e tap
    return this.http.get<curso[]>(this.API).pipe(delay(2000),tap(/*console.log*/));
  }

  lerPorID(id) {
    return this.http.get<curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private criar(curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private alterar(curso) {
    return this.http.put(`${this.API}/${curso.id}`,curso).pipe(take(1));
  }

  salvar(curso) {
    console.log('curso',curso)
    if (curso.id) {
      console.log('vai tentar alterar curso');
      return this.alterar(curso);
    } else {
      console.log('vai tentar criar curso');
      return this.criar(curso);
    }
  }

  excluir(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}