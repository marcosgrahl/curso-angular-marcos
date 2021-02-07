import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  ret: boolean = false;

  constructor(
     private authService: AuthService,
     private router: Router
     ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean{
    console.log('auth-guard|cancActivate: Entrou no guarda de rotas');
    this.ret = this.verificarAcesso();
    if (this.ret) {
      console.log('auth-guard|cancActivate: vai retornar true');
    } else {
      console.log('auth-guard|cancActivate: vai retornar false');
      this.router.navigate(['/login']);
    }
    return this.ret;
  }

  canLoad(
    route: Route
    ): Observable<boolean>| boolean {
    console.log('auth-guard|canLoad: verificando se usuário pode carregar código do módulo');
    this.ret = this.verificarAcesso();
    if (this.ret) {
      console.log('auth-guard|cancLoad: vai retornar true');
    } else
    {
      console.log('auth-guard|cancLoad: vai retornar false');
    }
    return this.ret;
  }

  private verificarAcesso() {
    return this.authService.usuAutenticado(); 
  }


}