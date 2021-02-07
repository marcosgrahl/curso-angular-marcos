import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root' // com esta propriedade, não precisa adicionar o serviço dentro do providers dos módulos
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient
  ) { }

  consultaCEP(cep: string) {
    // trata para cep ficar só com dígitos
    cep = cep.replace(/\D/g,'');

    // se tem dado
    if (cep != '') {
      // expressão regular para validar o cep
      var validacep = /^[0-9]{8}$/; // expressão regular que valida o CEP.

      // valida cep
      if (validacep.test(cep)) {
        //Consulta o webservice viacep.com.br.
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }
    return of({});
  }  


}