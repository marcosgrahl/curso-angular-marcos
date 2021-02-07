import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import { FiltroArrayPipe } from './filtro-array.pipe';
import { FiltroArrayImpuroPipe } from './filtro-array-impuro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FiltroArrayPipe,
    ExemplosPipesComponent,
    CamelCasePipe,
    FiltroArrayImpuroPipe
    ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
// Locate de Pipe também não funcionou
//    {
//      provide: LOCALE_ID,
//      useValue: 'pt-BR'
//    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
