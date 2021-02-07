import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AuthGuard } from '../guard/auth-guard';
import { AlunosCanDeactivateGuard } from '../guard/alunos-deactivate-guard';
import { AlunoDetalheResolver } from '../alunos/guards/aluno-detalhe.resolve';

/*
const alunoscursosRoutes: Routes = [
    { path: 'alunos',            component: AlunosComponent },        // caminho 
    { path: 'alunos/novo',       component: AlunoFormComponent },     // caminho 
    { path: 'alunos/:id',        component: AlunoDetalheComponent },  // caminho 
    { path: 'alunos/:id/editar', component: AlunoFormComponent }      // caminho 
];
TRANSFORMANDO EM ROTAS FILHAS:
*/
const alunoscursosRoutes: Routes = [
    // Alunos fica como componente pai e precisa ajustar o html para trazer os filhos
    // com o router-outlet.
    //{ path: 'alunos', component: AlunosComponent , canActivate: [AuthGuard], children:        
    { path: '', component: AlunosComponent, 
        children:        
            [   
            { path: 'novo',       component: AlunoFormComponent, 
                //canActivate: [AuthGuard]  
            }, 
            { path: ':id',        component: AlunoDetalheComponent, 
                //canActivate: [AuthGuard], 
                resolve:     {aluno : AlunoDetalheResolver},
                canLoad:     [AuthGuard]
            },
            { path: ':id/editar', component: AlunoFormComponent, 
                //canActivate: [AuthGuard], 
                canDeactivate: [AlunosCanDeactivateGuard] 
            }   
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(alunoscursosRoutes)],
    exports: [RouterModule]
})

export class AlunosRoutingModule {}