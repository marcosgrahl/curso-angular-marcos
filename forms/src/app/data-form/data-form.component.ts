import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';

import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from "../shared/services/models/EstadoBr";
import { FormValidacao } from '../shared/form-validacao';
import { VerificaEmailService } from './services/verifica-email.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/services/models/cidades';

/*
  método data drive, precisa do
    ForGroup, (FormControl ou FormBuilder) no componente,
    ReactiveFormsModule no app.module ou no modulo de funcionalidade
*/

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  

  // metodo do formulario sem herança
  //formulario: FormGroup;

  // método 1, via subscribe, que deveria também implementar um método para desinscreve  
  estados: EstadoBr[];
  cidades: Cidade[];

  // método 2, via pipe aSinc no html, que faz a inscrição e desinscrição automaticamente
  //estados: Observable <EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsLetter: any[];
  frameworks = ['Angular','React','Vue','Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdown: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService : VerificaEmailService
  ) { 
    super(); // chama o construtor da classe mãe
  }

  ngOnInit(): void {
    //método 1, usando FormControl
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormGroup(null),
      endereco: new FormGroup({
        cep: new FormControl(null),
        numero: new FormControl(null)
      })
    })
    */

    //>> método 1, usando subscribe
    this.dropdown.getEstadosBr()
      .subscribe( dados => {this.estados = dados;});

    //>> método 2, usando o pipe aSync, que faz a incrição e desinscriçáo automaticamente.
    //this.estados = this.dropdown.getEstadosBr();

    this.cargos = this.dropdown.getCargos();

    this.tecnologias = this.dropdown.getTecnologias();

    this.newsLetter = this.dropdown.getNewsLetter();

    //this.verificaEmailService.verificarEmail('email1@mail.com').subscribe();

    //método 2, usando o FormBuilder, injetado no constructor
    this.formulario = this.formBuilder.group({
      nome1:      [null, [Validators.minLength(3), Validators.maxLength(20)]],
      nome:      [null, [Validators.minLength(3), Validators.maxLength(20)]],
      email:     [null, [Validators.required, Validators.minLength(4), Validators.email        ], this.validarEmail.bind(this)],   // 3o. parâmetro é validação
      confEmail: [null, [FormValidacao.IgualCampo('email')]],
      endereco: this.formBuilder.group({     
        cep:         [null, [Validators.required,FormValidacao.CepValidador]], 
        numero:      [null, Validators.required],
        complemento: [null                     ],
        rua:         [null, Validators.required],
        bairro:      [null, Validators.required],
        cidade:      [null, Validators.required],
        estado:      [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ["s"],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    //this.formulario.get('endereco.cep').valueChanges.subscribe(
    //  valor => console.log('Valor do CEP:',valor)
    //);

    //this.formulario.get('endereco.cep').statusChanges.subscribe(
    //  valor => console.log('Status A do CEP:',valor)
    //);

    //this.formulario.get('endereco.cep').statusChanges
    //  .pipe(
    //    distinctUntilChanged(),
    //    tap(valor =>  console.log('status B do CEP:',valor))
    //  )
    //  .subscribe(status => {
    //    if (status === 'VALID') {
    //      console.log('Disparando consulta CEP');
    //      this.cepService.consultaCEP(this.formulario.get('endereco.cep').value).subscribe(dados => {this.popularDados(dados);});
    //    }
    //  });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(valor =>  console.log('status B do CEP:',valor)),
        switchMap(status => status === 'VALID' 
        ? this.cepService.consultaCEP(this.formulario.get('endereco.cep').value) 
        : empty())
      )
      .subscribe(dados => dados ? this.popularDados(dados) : {} );

    this.formulario.get('endereco.estado').valueChanges
        .pipe(
          tap(estado => console.log(estado)),
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
          switchMap((estadoId: number) => this.dropdown.getCidades(estadoId)),
          tap(console.log)
        )
        .subscribe(cidades => this.cidades = cidades);

    /* para testar
    this.dropdown.getCidades(8).subscribe(console.log);
    */
     
    //var prop: string;
    //var meuCarro = new Object();
    //prop = '010102'
    //meuCarro[prop] = "ARAUCARIA 1";
    //prop = '010103'
    //meuCarro[prop] = "ARAUCARIA 2";
    //prop = '010121'
    //meuCarro[prop] = "ESTEIO";
    //console.log(meuCarro);
    //console.log(meuCarro[prop]);

  }

  buildFrameworks() {
    const values = this.frameworks.map( v => new FormControl(false));
    return this.formBuilder.array(
      values, FormValidacao.reqMinCheckBox(2));
  }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({},this.formulario.value);
    
    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks
      .map( (valor, indice) => valor ? this.frameworks[indice] : null )
      .filter(v => v !== null) 
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit)).toPromise().then(dados => {
      console.log(dados);
      //reseta dados do formulário
      //this.formulario.reset();
      //ou
      //this.resetar();
    }, 
    (erro: any) => {
      alert('Erro');
      console.log(erro);
    });        
  }

  // migrado para base-form com herança
  /*
  onSubmit() {
    let valueSubmit = Object.assign({},this.formulario.value);
    
    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks
      .map( (valor, indice) => valor ? this.frameworks[indice] : null )
      .filter(v => v !== null) 
    });

    console.log(valueSubmit);

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit)).toPromise().then(dados => {
        console.log(dados);
        //reseta dados do formulário
        //this.formulario.reset();
        //ou
        //this.resetar();
      }, 
      (erro: any) => {
        alert('Erro');
        console.log(erro);
      });
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }
  */
  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep).subscribe(dados => {this.popularDados(dados);});
    }
  }  

  popularDados(dados) {
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    this.formulario.get('nome').setValue('Marcos Grahl');
  }

  limpaEnde() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setaCargo() {
    const cargo = {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'};
    this.formulario.get('cargo').setValue(cargo);

  }

  setaTecnologias() {
    this.formulario.get('tecnologias').setValue(['java','php'])
  }

  compararCargos(obj1, obj2) {
    if (obj1 && obj2) {
      console.log('1:',obj1.desc);
      console.log('2:',obj2.desc);
    }
    return obj1 && obj2 ? (obj1.desc === obj2.desc) : obj1 === obj2;
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
    .pipe(
      map(emailExiste => emailExiste ? {emailInvalido: true} : null )
    )
  }

}