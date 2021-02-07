import { HttpClient } from "@angular/common/http";
import { take, delay, tap } from "rxjs/operators";

export class CrudService<GERAL> {

   constructor(
      protected http: HttpClient,
      private API_URL
    ) { }

    listar() {
      return this.http.get<GERAL[]>(this.API_URL)
      .pipe(
         delay(200),
         tap(console.log)
      );
    }
  
    lerPorID(id) {
      return this.http.get<GERAL>(`${this.API_URL}/${id}`).pipe(take(1));
    }
  
    private criar(objeto) {
      return this.http.post(this.API_URL, objeto).pipe(take(1));
    }
  
    private alterar(objeto) {
      return this.http.put(`${this.API_URL}/${objeto.id}`,objeto).pipe(take(1));
    }
  
    salvar(objeto: GERAL) {
      console.log('curso',objeto)
      //if (objeto.id) {
      if (objeto['id']) {
        console.log('vai tentar alterar curso');
        return this.alterar(objeto);
      } else {
        console.log('vai tentar criar curso');
        return this.criar(objeto);
      }
    }
  
    excluir(id) {
      return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
    }
      
}