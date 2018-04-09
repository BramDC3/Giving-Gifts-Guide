import { Pipe, PipeTransform } from '@angular/core';
import { Gift } from './gift/gift.model';

@Pipe({
  name: 'giftFilter'
})
export class GiftFilterPipe implements PipeTransform {

  transform(gifts: Gift[], naam: string): Gift[] {
    if (!naam || naam.length === 0) {
      return gifts;
    }
    return gifts.filter(gift =>
      gift.naam.toLowerCase().includes(naam.toLowerCase())
    );
  }

}
