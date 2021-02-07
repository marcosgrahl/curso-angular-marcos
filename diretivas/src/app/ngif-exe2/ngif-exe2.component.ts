import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngif-exe2',
  templateUrl: './ngif-exe2.component.html',
  styleUrls: ['./ngif-exe2.component.css']
})
export class NgifExe2Component implements OnInit {

  cursos: string[] = ['Angular','Cobol'];

  mostrarTotal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  fMostraTot() {
    this.mostrarTotal = !this.mostrarTotal
  }

}