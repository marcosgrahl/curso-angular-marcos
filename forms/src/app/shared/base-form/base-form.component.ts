import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }
 
  // usando recursividade para tratar de campos compostos, tipo endereco.cep, endereco.rua, ...
  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo) {
    //console.log(this.formulario.controls.nome1.status);
    return !this.formulario.get(campo).valid 
    && (this.formulario.get(campo).touched 
    || this.formulario.get(campo).dirty);
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail.touched) {
      if (campoEmail.errors) {
        return campoEmail.errors['email'] 
      }  
    }
  }

  aplicaCssErro(campo: string) {
    return {
      //'has-error': this.verificaValidTouched(campo), 
      'has-error': this.verificaValidTouched(campo), 
      'has-feedback': this.verificaValidTouched(campo)
    };
  }  

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }

}
