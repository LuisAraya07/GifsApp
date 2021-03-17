import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent{

  // Non-Null Assertion Operator Operador para asegurarse que el operador no es nulo
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;


  constructor( private gifsService: GifsService){

  }
  // tslint:disable-next-line: typedef
  search(){
    const value = this.txtSearch.nativeElement.value;
    if ( value.trim().length === 0 ) { return; }
    this.gifsService.searchGifs( value );
    this.txtSearch.nativeElement.value = '';
  }
}
