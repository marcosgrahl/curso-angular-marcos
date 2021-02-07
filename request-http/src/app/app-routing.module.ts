import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: ''       , pathMatch: 'full', redirectTo: 'busca'   },
  { path: 'cursos' , loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule) },
  { path: 'upload' , loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule) },
  { path: 'busca'  , loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
