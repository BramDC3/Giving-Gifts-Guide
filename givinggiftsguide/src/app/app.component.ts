import { Component } from '@angular/core';
import { Gift } from './gift/gift.model';
import { GiftDataService } from './gift-data.service';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GiftDataService]
})

export class AppComponent {
  public filterGiftName: string;
  public filterGift$ = new Subject<string>();
  
  constructor(private _giftDataService : GiftDataService) {
    this.filterGift$
    .pipe(
      distinctUntilChanged(),
      debounceTime(250),
      map(val => val.toLowerCase())
    )
    .subscribe(val => this.filterGiftName = val);
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
