import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IFormCanDeactivate } from "./iform-candeactivate";

@Injectable()
export class AlunosCanDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

    canDeactivate(
        component: IFormCanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        console.log('alunos-deactive: canDeactivate: Entrou no guarda de desativação');
        return (component.podeDesativar())
    }
}