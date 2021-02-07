import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private autService: AuthService) { }

  ngOnInit(): void {
    this.autService.fazerLogoff();
  }

  fazerLogin() {
    console.log(this.usuario);
    this.autService.fazerLogin(this.usuario);
  }

}
