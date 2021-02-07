import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-binding';
  valor: number = 5;

  deletarCiclo: boolean = true;

  mudarValor() {
    this.valor ++;
  }

  criar() {
    this.deletarCiclo = false;
  }

  destruir() {
    this.deletarCiclo = true;
  }

}
