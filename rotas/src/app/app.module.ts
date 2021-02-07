import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// troca estes 4 por um módulo de funcionalidade.
//import { CursosComponent } from './cursos/cursos.component';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursosService } from './cursos/cursos.service';
//import { CursoInvalidoComponent } from './cursos/curso-invalido/curso-invalido.component';
// trocado para usar as rotas por módulo
// import { routing } from './app.routing';
//import { CursosModule } from './cursos/cursos.module'
//import { AlunosModule } from './alunos/alunos.module';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guard/auth-guard';
import { CursosGuard } from './guard/cursos-guard';
import { AlunosGuard } from './guard/alunos-guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    //CursosComponent,
    //CursoDetalheComponent,
    //CursoInvalidoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //CursosModule,
    //AlunosModule,
    AppRoutingModule,
    FormsModule,
    //routing,
  ],
  //providers: [CursosService],
  providers: [
    AuthService,
    AuthGuard,
    CursosGuard,
    AlunosGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }