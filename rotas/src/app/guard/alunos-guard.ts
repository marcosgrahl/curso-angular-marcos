import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AlunosGuard implements CanActivateChild {

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) : Observable<boolean>|Promise<boolean>|boolean {
        console.log('alunos-guard: canActivateChild: guarda de rota filha');
        console.log(route);
        console.log(state);
        if (state.url.includes('editar')) {
          console.log('retornando false, para testar bloqueio de rota filha');
          //alert('TESTE: Usuário sem acesso!');
          //return Observable.of(false); // não funciona o .of
          return true;
        }
        return true;
      }
}