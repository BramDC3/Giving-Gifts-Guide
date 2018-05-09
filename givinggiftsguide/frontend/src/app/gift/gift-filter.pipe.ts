import { Pipe, PipeTransform, Type } from '@angular/core';
import { Gift } from './gift/gift.model';

@Pipe({
  name: 'giftFilter'
})
export class GiftFilterPipe implements PipeTransform {

  transform(gifts: Gift[], naam: string, categorie: string, soort: string, minimumprijs: number, maximumprijs:number): Gift[] {
    
    if (naam && naam.length !== 0) {
      gifts = gifts.filter(gift =>
        gift.naam.toLowerCase().includes(naam.toLowerCase())
      );
    }

    if (categorie && categorie.length !== 0 && categorie !== "giftcategorie") {
      gifts = gifts.filter(gift =>
        gift.categorieen.map(cat => cat.naam.toLowerCase()).includes(categorie)
      );
    }

    if (soort && soort.length !== 0 && soort !== "giftsoort") {
      gifts = gifts.filter(gift =>
        gift.categorieen.map(cat => cat.soort.toString().toLowerCase()).includes(soort)
      );
    }

    if (minimumprijs && minimumprijs >= 1 && minimumprijs <= 9999) {
      gifts = gifts.filter(gift => 
        gift.prijs >= minimumprijs
      );
    }

    if (maximumprijs && maximumprijs >= 1 && maximumprijs <= 9999) {
      gifts = gifts.filter(gift => 
        gift.prijs <= maximumprijs
      );
    }

    return gifts;
  }

}
