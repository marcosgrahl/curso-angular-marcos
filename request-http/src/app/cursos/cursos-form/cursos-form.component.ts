import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from '../../shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router'
//import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';
//import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  sobmetido: boolean = false;

  constructor(
    private fb: FormBuilder,
    //private cursosService: CursosService,
    private cursosService: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    // metodo 1:
    //this.route.params.subscribe(
    //  (params: any) => {
    //    const id = params['id'];
    //    console.log('chamando lerporid',id);
    //    const curso$ = this.cursosService.lerPorID(id);
    //    curso$.subscribe (curso => this.atualizaForm(curso))
    //  }
    //);
  
    // metodo 2:
    // refaturando o código para observables aninhados
    // >> neste caso, nao precisa se desinscrever, pois o angular controla pela desativação da rota
    /*
    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap( id => this.cursosService.lerPorID(id))
    )
    .subscribe( curso => this.atualizaForm(curso));
    */

    /* método 2
    this.form = this.fb.group({
      id: [null],
      nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]]
    });
    */

   const curso = this.route.snapshot.data['curso'];
   
   this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome,[Validators.required,Validators.minLength(3),Validators.maxLength(250)]]
    });



  }

  onSubmit() {
    this.sobmetido = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('formulário Valido.');
      let msgok = 'Curso criado com sucesso';
      let msgerro = 'Erro ao criar curso. Tente mais tarde.'
      if (this.form.value.id) {
        msgok = 'Curso alterado com sucesso';
        msgerro = 'Erro ao alterar curso. Tente mais tarde.'  
      }
      this.cursosService.salvar(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgok);
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger(msgerro)
        },
        () => console.log('request finalizada.')
      );
      
      /*
      if (this.form.value.id) {
        // update
        this.cursosService.alterar(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso alterado com sucesso.');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao alterar curso. Tenta mais tarde.'),
          () => console.log('request alterar finalizada.')
        );
      } else {
        // create
        this.cursosService.criar(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso Criado com sucesso.');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao criar curso. Tenta mais tarde.'),
          () => console.log('request criar finalizada.')
        );
      }
      */

    }
  }

  onCancel() {
    this.sobmetido = false;
    this.form.reset();
    console.log('formulário cancelado.');
  }

  temErro(field: string) {
    return this.form.get(field).errors;
  }

  /* método 2
  atualizaForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome 
    })
  }
  */
  
}
