import { Component } from '@angular/core';
import { Gift } from './gift/gift.model';
import { GiftDataService } from './gift-data.service';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GiftDataService]
})

export class AppComponent {
  public filterGiftName: string;
  public filterGift$ = new Subject<string>();
  public errorMsg: string;
  private _gifts: Gift[];

  constructor(private _giftDataService: GiftDataService) {
    this.filterGift$
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        map(val => val.toLowerCase())
      )
      .subscribe(val => this.filterGiftName = val);
  }

  ngOnInit() {
    this._giftDataService.gifts.subscribe(
      items => this._gifts = items);
  }

  get gifts() {
    return this._gifts;
  }

  nieuweGiftToegevoegd(gift) {
    this._giftDataService.voegNieuweGiftToe(gift)
      .subscribe(item => this._gifts.push(item));
  }

  giftVerwijderen(gift: Gift) {
    this._giftDataService.verwijderGift(gift)
      .subscribe(item => (this._gifts = this._gifts.filter(val => item.id !== val.id)),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while removing gifts for ${
            gift.naam
            }: ${error.error}`;
        }
      );
  }

  applyFilter(filter: string) {
    this.filterGiftName = filter;
  }
}
