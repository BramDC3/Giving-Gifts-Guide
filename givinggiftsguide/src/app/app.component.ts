import { Component } from '@angular/core';
import { Gift } from './gift/gift.model';
import { GiftDataService } from './gift-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GiftDataService]
})

export class AppComponent {
  public filterGiftName: string;
  
  constructor(private _giftDataService : GiftDataService)
  {
  }

  get gifts(): Gift[] {
    return this._giftDataService.gifts;
  }

  nieuweGiftToegevoegd(gift) {
    this._giftDataService.voegNieuweGiftToe(gift);
  }

  applyFilter(filter: string) {
    this.filterGiftName = filter;
  }
}
