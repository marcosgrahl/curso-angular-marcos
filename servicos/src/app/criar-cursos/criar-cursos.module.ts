import { CommonModule } from '@angular/common'; // usado para módulo de funcionalidade
import { NgModule } from '@angular/core';

import { CursosService } from '../cursos/cursos.services';
import { CriarCursosComponent } from './criar-cursos.component';

import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

@NgModule({
  declarations: [
    CriarCursosComponent,
    ReceberCursoCriadoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CriarCursosComponent],
  //providers: [CursosService]
})
export class CriarCursosModule { }
