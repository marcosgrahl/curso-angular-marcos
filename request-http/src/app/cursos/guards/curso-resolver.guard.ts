import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { curso } from '../curso'
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<curso> {

  constructor(
    private service: CursosService 
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<curso> {
    if (route.params && route.params['id']) {
      return this.service.lerPorID(route.params['id']);
    }
    return of( {id: null, nome: null} );   // operador of, retorna um observable a partir de um objeta, para manter a coerência do retorno.
  }

}