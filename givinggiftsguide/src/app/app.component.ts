import { Component } from '@angular/core';
import { Gift } from './gift/gift.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private _gifts = new Array<Gift>();

  constructor() {
    const gift1 = new Gift("VR-bril", "Virtual Reality", 12.34)
    const gift2 = new Gift("AR-bril", "Augmented Reality", 43.21)

    this._gifts.push(gift1);
    this._gifts.push(gift2);
  }

  nieuweGiftToegevoegd(gift) {
    this._gifts.push(gift);
  }
}
