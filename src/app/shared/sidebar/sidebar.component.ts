import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historical(): string[]{
    return this.gifService.historical;
  }

  constructor( private gifService: GifsService ) {



   }

   search( term: string): void{
     this.gifService.searchGifs(term);
   }




}
