import { CommonModule } from '@angular/common'; // usado para módulo de funcionalidade
import { NgModule } from '@angular/core';
import { CursosService } from '../cursos/cursos.services';
import { CursosComponent } from './cursos.component';

@NgModule({
  declarations: [
    CursosComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [CursosComponent],
  providers: [CursosService]
})
export class CursosModule { }
