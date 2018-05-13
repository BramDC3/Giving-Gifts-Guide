import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginationPipe'
})
export class PaginationPipePipe implements PipeTransform {

  transform(aantalGifts: number): number {

    if (!aantalGifts || aantalGifts === 0)
      return 1;

    if (aantalGifts % 10 != 0)
      return Math.floor(aantalGifts / 10) + 1;
    else
      return aantalGifts / 10;
      
  }
}
