import { ValidatorFn, FormArray, FormControl, FormGroup } from "@angular/forms";

export class FormValidacao {
   static reqMinCheckBox(min = 1) {
      const validator: ValidatorFn = (formArray: FormArray) => {
        const totalSelected = formArray.controls
          // get a list of checkbox values (boolean)
          .map(control => control.value)
          // total up the number of checked checkboxes
          .reduce((prev, next) => next ? prev + next : prev, 0);
    
        // if the total is not greater than the minimum, return the error message
        return totalSelected >= min ? null : { required: true };
      };    
      return validator;
    }

  static CepValidador (control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      //const expValCep = /^[0-9]{8}$/;
      const expValCep = 	/^\d{5}-\d{3}$/;
      return expValCep.test(cep) ? null : {cepInvalido: true}
    }
    return null; // este retorno do nulo é quando o campo está válido
  }

  static IgualCampo(OtherField: string) {
    const validator = (formControl: FormControl) => {
      if (OtherField == null) {
        throw new Error('É necessário informar um campo.')
      }

      // verifica se já foi renderizado do formulário para iniciar a validação e evitar erro
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(OtherField);

      if (!field) {
        throw new Error('É necessário informar um campo que exista');
      }

      if (field.value !== formControl.value) {
        return {IguailCampo: OtherField};
      }
      return null;
    }
    return validator;
  }


  static getErrosMsg(fieldName: string, validatorNome: string, validatorValue?: any) {
    const config = {
      'required': `Met.3: ${fieldName} é obrigatório.`,
      'minlength': `Met.3: ${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `Met.3: ${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': 'Met.3: CEP inválido.',
    }
    return config[validatorNome];
  }

}



/*
Email	^[-a-zA-Z0-9][-.a-zA-Z0-9]*@[-.a-zA-Z0-9]+(\.[-.a-zA-Z0-9]+)*\.(com|edu|info|gov|int|mil|net|org|biz|name|museum|coop|aero|pro|tv|[a-zA-Z]{2})$
IP	^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$
Cep	^\d{5}-\d{3}$
Telefone	^[0-9]{2}-[0-9]{4}-[0-9]{4}$
Data (dd/mm/yyyy)	^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/\d{4}$ ou ^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$
URL	^((http)|(https)|(ftp)):\/\/([\- \w]+\.)+\w{2,3}(\/ [%\-\w]+(\.\w{2,})?)*$
CPF	^(\d{3}.\d{3}.\d{3}-\d{2})|(\d{11})$ ou ^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$
CNPJ	^\d{3}.?\d{3}.?\d{3}/?\d{3}-?\d{2}$ ou ^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$
Somente números	^[0-9]*$
*/