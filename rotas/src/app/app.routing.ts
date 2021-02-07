import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { CursosComponent } from './cursos/cursos.component'
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component'
import { CursoInvalidoComponent } from './cursos/curso-invalido/curso-invalido.component';

const APP_ROUTES: Routes = [
    { path: 'login' ,        component: LoginComponent  },        // caminho /login
    { path: ''      ,        component: HomeComponent   }         // caminho em branco
    { path: 'cursos',        component: CursosComponent },        // caminho /cursos
    { path: 'cursoInvalido', component: CursoInvalidoComponent }, // caminho /cursos
    { path: 'curso/:id',     component: CursoDetalheComponent },  // caminho /cursos
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);