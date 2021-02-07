import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { curso } from '../curso';

//import { CursosService } from '../cursos.service';
//import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // trocando para variável observable
  //cursos: curso[];
  cursos$: Observable<curso[]>; 
  temErro$ = new Subject<boolean>();
  //BsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;

  @ViewChild('delete') deleteModal;

  cursoSelec: curso;

  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    // trocando para variável observable
    //this.service.listar().subscribe(dados => this.cursos = dados);
    this.temErro$.next(false); // emite para variável temErro
    console.log('chamando this.service.listar...')
    this.cursos$ = this.service.listar()
    .pipe(
      catchError(error => {          // tratamento de erro via catError, dentro do pipe, é bom ser a última função.
        //console.error('erro',error);
        this.temErro$.next(true); // emite para variável temErro
        this.trataErro();
        return empty();
      })
    );

    // para tratar erro via subscribe.
    this.service.listar()
    .pipe(take(1))
    .subscribe(
      dados => {
        console.log('dados retornados via subscribe',dados);
      },
      erro => {
        console.log('erro via subscribe',erro);
      },
      () => {
        console.log('Observable completo do subscribe');
      }
    );
    
  }

  trataErro() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    //this.BsModalRef = this.modalService.show(AlertModalComponent)    
    //this.BsModalRef.content.tipo = 'danger';
    //this.BsModalRef.content.mensagem = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(id) {
    this.router.navigate(['cursos/editar',id]);
  }

  onDelete(curso) {
    this.cursoSelec = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    const result$ = this.alertService.showConfirm('Confirmação','Tem certeza que deseja remover o curso?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.excluir(curso.id) : EMPTY)
    )
    .subscribe(
      sucesso => {
        console.log('curso excluído');
        this.alertService.showAlertSuccess('Curso foi excluído');
        this.onRefresh();
      },
      erro => {
        console.log('erro ao tenta rexcluir curso',erro);
        this.alertService.showAlertDanger('Erro ao excluír curso. Tente novamente mais tarde.');
      },
      () => {
        console.log('Observable completo do subscribe excluir');
      }      
    )
  }

  onConfirme() {
    this.service.excluir(this.cursoSelec.id).subscribe(
      sucesso => {
        console.log('curso excluído');
        this.deleteModalRef.hide();
        this.alertService.showAlertSuccess('Curso foi excluído');
        this.onRefresh();
      },
      erro => {
        console.log('erro ao tenta rexcluir curso',erro);
        this.deleteModalRef.hide();
        this.alertService.showAlertDanger('Erro ao excluír curso. Tente novamente mais tarde.');
      },
      () => {
        console.log('Observable completo do subscribe excluir');
      }
    );
  }

  onCancela() {
    this.deleteModalRef.hide();
  }

}