import { Pipe, PipeTransform } from '@angular/core';

import { FiltroArrayPipe } from './filtro-array.pipe';

@Pipe({
  name: 'filtroArrayImpuro',
  pure: false // aqui diz que o pipe não é puro.
})
export class FiltroArrayImpuroPipe extends FiltroArrayPipe {
  // extends esta fazendo o nova classe herdar as características de outra classe

}
