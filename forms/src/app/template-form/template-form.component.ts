import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: '',
    email: ''
  }

  onSubmit(formulario) {
    console.log(formulario);
    console.log(this.usuario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value)).toPromise().then(dados => {
      console.log(dados);
      formulario.form.reset();
    });

  }

  verificaVAlidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaVAlidTouched(campo), 
      'has-feedback': this.verificaVAlidTouched(campo)         
    };
  }  

  consultaCEP(cep,formulario) {
    cep = cep.replace(/\D/g,'');

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep).subscribe(dados => {this.popularDados(dados,formulario);});     
    }
    
  }

  popularDados(dados,formulario) {
    console.log(dados);
    console.log(formulario);
    /* o setValue, precisa informar todos os campos do formulátio.
    formulario.setValue({
      nome: formulario.value.nome, 
      email: formulario.value.email,
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        numero: formulario.value.endereco.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    */
   // já o patchValue, pode-se informar partes dos campos que estão no formGroup
    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }

    })
  }

  limpaEnde(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  constructor(private http: HttpClient,
    private cepService: ConsultaCepService) { }

  ngOnInit(): void {}

}