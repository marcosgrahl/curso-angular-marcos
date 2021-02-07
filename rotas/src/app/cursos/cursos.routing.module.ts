import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CursosComponent } from './cursos.component'
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoInvalidoComponent } from './curso-invalido/curso-invalido.component';
import { AuthGuard } from '../guard/auth-guard';
import { CursosGuard } from '../guard/cursos-guard';

//canActivate: [AuthGuard]

const cursosRoutes: Routes = [
    // lazy loading - 2o. passo: deixar em branco a rota cursos:
    //{ path: 'cursos',        component: CursosComponent },  
    { path: '',              component: CursosComponent, 
        children:
        [
            { path: 'cursoInvalido', component: CursoInvalidoComponent},
            { path: ':id',           component: CursoDetalheComponent }
        ]
    },  
];

@NgModule({
    imports: [RouterModule.forChild(cursosRoutes)],
    exports: [RouterModule]
})

export class CursosRoutingModule {}