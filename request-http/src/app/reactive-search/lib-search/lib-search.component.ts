import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms' 
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  //https://api.cdnjs.com/libraries?search=angular&fields=name,homepage,version

  queryField = new FormControl();
  SEARCH_URL = "https://api.cdnjs.com/libraries";
  results$: Observable<any>;
  total: number;
  readonly CAMPOS = 'name,homepage,version';

  constructor(
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    // valueChanges é um observable que escuta as mudanças em campos de formula´rios
    /*
    this.results$ = this.queryField.valueChanges
    .pipe(
      tap(value => console.log(value))
    )
    */ 

    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL,{
        params: {
          search: value,
          fields: this.CAMPOS
        }
      })),
      tap( (res: any) => this.total = res.total),
      map( (res: any) => res.results)
    );

  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {

      // método 1: tudo na url
      /*
      const url = this.SEARCH_URL + '?search='+value + '&fields='+THIS.CAMPOS;
      this.results$ = this.http.get(url)
      .pipe(
        tap((res: any) => this.total = res.total),
        map((res:any) => res.results)
      );
      */

      // método2: melhorando o código, usando params
      // uso direto
      const params_ = {
        search: value,
        fields: this.CAMPOS
      }
      // ou usando HttpParams
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.CAMPOS);

      this.results$ = this.http.get(this.SEARCH_URL,{params})
      .pipe(
        tap((res: any) => this.total = res.total),
        map((res:any) => res.results)
      );

    }
  }

}
