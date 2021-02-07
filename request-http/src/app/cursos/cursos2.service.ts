import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { curso } from './curso';
import { CrudService } from '../shared/crud-service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<curso> {

  constructor(
    protected http: HttpClient
  ) {
    super(http,`${environment.API}cursos`);
  }

  // se repetir o nome de um método do CrudService, vc troca o método genêrico por um específico.
  // Exemplo
  lerPorID(id) {
    return null;
  }

}