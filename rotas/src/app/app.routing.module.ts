import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './guard/auth-guard';
import { CursosGuard } from './guard/cursos-guard';
import { AlunosGuard } from './guard/alunos-guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { CursosComponent } from './cursos/cursos.component'
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoInvalidoComponent } from './cursos/curso-invalido/curso-invalido.component';

const appRoutes: Routes = [
    //lazy loading- passo 1: usar o loadChildren
    { path: 'cursos', 
        loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule), 
        canActivate: [AuthGuard],
        canActivateChild: [CursosGuard] // pode criar um Guard para cada módulo do projeto
    },
    { path: 'alunos', 
        loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule), 
        canActivate: [AuthGuard],
        canActivateChild: [AlunosGuard] // pode criar um Guard para cada módulo do projeto
    },
    { path: 'login' ,        
        component: LoginComponent  
    },        
    { path: 'home' ,
        component: HomeComponent, 
        canActivate: [AuthGuard], 
        canLoad: [AuthGuard]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**',
        component: PaginaNaoEncontradaComponent
    }
];


//src\app\cursos\cursos.module.ts

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash:false})],  // por padrão, Hash é falsa
    exports: [RouterModule]
})

export class AppRoutingModule {}