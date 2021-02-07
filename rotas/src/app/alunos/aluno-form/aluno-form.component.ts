import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from '../../guard/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  aluno: any;
  inscricao: Subscription;

  formMudou: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunosService
  ) { }

  ngOnInit(): void {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id']
        console.log('AlunoFormComponent:'+id)
        this.aluno = this.alunoService.getAluno(id);
        if (this.aluno === null){
          this.aluno = {};
        }
      }
    );
    
  }
  
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onInput() {
    this.formMudou = true;
    console.log('aluno-form|onInput: alterou valor do input')
  }

  podeMudarRota() {
    if (this.formMudou) {
      return confirm('Certeza que quer sair?');
    }
    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }

}