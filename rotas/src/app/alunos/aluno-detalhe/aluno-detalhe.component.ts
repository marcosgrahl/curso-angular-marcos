import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  aluno: Aluno;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunosService
  ) { }

  ngOnInit(): void {
    // substituido pelo resolve
    /*
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.aluno = this.alunoService.getAluno(id);
        if (this.aluno === null){
          this.aluno = {};
        }        
      }
    );
    */
    console.log('ngOnInit: AlunoDetalheComponent');
    this.inscricao = this.route.data.subscribe(
      (info: {aluno: Aluno}) => {
        console.log('recebendo objeto aluno do resolver');
        this.aluno = info.aluno;
        console.log('segue objeto recebido:');
        console.log(this.aluno);
      }
    ); 

  }

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}