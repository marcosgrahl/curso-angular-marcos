import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';


@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JavaScript ...',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23), // indice do mês começa em zero.
    url: 'https://www.amazon.com.br/dp/8575224115/ref=cm_sw_em_r_mt_dp_FGvyFb8FHYVGB'
  }

  livros: string[] = ['Java', 'Angular','phoneGap'];

  filtro: string = '';

  addCurso(valor: string) {
    console.log('AddCurso: ' + valor);
    this.livros.push(valor);

    for (let index = 0; index < this.livros.length; index++) {
      console.log(this.livros[index]);
    }

  }

  obterCursos() {
    
    console.log('entrou no obterCursos')

    if (this.livros.length===0 || this.filtro===undefined || this.filtro.trim()==='') {
      return this.livros;
    }

    return this.livros.filter( (v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });

  }

  // aula #48 pipes async com promise
  valorAsync = new Promise((resolve, reject) => {
    setTimeout( () => resolve('Valor assíncrono'), 3000  )
  });

  // aula #48 pipes async com observable
  // precisa importar o Obervable do 'rxjs/Rx'
  // NÃO FUNCIONOU, pois não tem mais o métido interval.
  //valorAsync2 = Observable.interval(4000)
  //   .map(valor => 'Valor assíncrono2');
    
  constructor() { }

  ngOnInit(): void {
  }

}
