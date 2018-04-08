import { Injectable } from '@angular/core';
import { Gift } from './gift/gift.model';

@Injectable()
export class GiftDataService {
  private _gifts = new Array<Gift>();

  constructor() {
    let gift1 = new Gift("VR-bril", "Virtual Reality", 12.34)
    let gift2 = new Gift("AR-bril", "Augmented Reality", 43.21)

    this._gifts.push(gift1);
    this._gifts.push(gift2);
  }

  get gifts(): Gift[] {
    return this._gifts;
  }

  voegNieuweGiftToe(gift: Gift) {
    this._gifts = [...this._gifts, gift];
  }
}
