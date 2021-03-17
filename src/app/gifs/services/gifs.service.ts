import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  // tslint:disable-next-line: no-inferrable-types
  private apiKey: string = 'i2SnihqVrwTbbKxYQ0FECYzqGIPwEwcW';
  // tslint:disable-next-line: no-inferrable-types
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';
  // tslint:disable-next-line: variable-name
  private _historical: string[] = [];


  // tslint:disable-next-line: variable-name
  public results: Gif[] = [];

  get historical(): string[] {
    // Perdemos la referencia, es mejor manejarlo así porque tal vez se pueda modificar el original arr
    return [...this._historical];
  }

  // Solo se ejecuta una vez
  constructor( private http: HttpClient ){

    // Hay dos maneras de hacerlo, todo en una línea o con un IF
    // tslint:disable-next-line: no-non-null-assertion
     this._historical = JSON.parse( localStorage.getItem('historical')! ) || [];

     // tslint:disable-next-line: no-non-null-assertion
     this.results = JSON.parse( localStorage.getItem('results')! ) || [];
    // if (localStorage.getItem('historical')){
    //   // tslint:disable-next-line: no-non-null-assertion
    //   this._historical = JSON.parse( localStorage.getItem('historical')! ) ;
    // }

  }

  searchGifs( query: string = '' ): void {
    query = query.trim().toLowerCase();
    if ( !this._historical.includes(query) ){
      this._historical.unshift( query );
      this._historical = this._historical.splice(0, 10);
      localStorage.setItem('historical', JSON.stringify(this._historical));
    }
    const params = new HttpParams()
     .set('api_key', this.apiKey)
     .set('limit', '10')
     .set('q', query);
    this.http.get<SearchGifsResponse>(`${ this.apiUrl }/search`,{ params })
        // tslint:disable-next-line: deprecation
        .subscribe( ( resp ) => {
          this.results = resp.data;
          localStorage.setItem('results', JSON.stringify(this.results));
        });
    
  }

}
