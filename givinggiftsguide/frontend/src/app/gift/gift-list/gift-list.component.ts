import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { GiftDataService } from '../gift-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {
  public filterGiftName: string;
  public filterGiftCategorie: string;
  public filterGiftSoort: string;
  public filterGiftMinimumprijs: number;
  public filterGiftMaximumprijs: number;

  public filterGift$ = new Subject<string>();
  public filterGiftCategorie$ = new Subject<string>();
  public filterGiftSoort$ = new Subject<string>();
  public filterGiftMinimumprijs$ = new Subject<string>();
  public filterGiftMaximumprijs$ = new Subject<string>();

  public errorMsg: string;
  private _gifts: Gift[];
  private _page: number;

  constructor(private _giftDataService: GiftDataService) {
    this.filterGift$
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        map(val => val.toLowerCase())
      )
      .subscribe(val => this.filterGiftName = val);

    this.filterGiftCategorie$
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        map(val => val.toLowerCase())
      )
      .subscribe(val => this.filterGiftCategorie = val);

    this.filterGiftSoort$
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        map(val => val.toLowerCase())
      )
      .subscribe(val => this.filterGiftSoort = val);

    this.filterGiftMinimumprijs$
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        map(val => Number.parseInt(val))
      )
      .subscribe(val => this.filterGiftMinimumprijs = val);

    this.filterGiftMaximumprijs$
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        map(val => Number.parseInt(val))
      )
      .subscribe(val => this.filterGiftMaximumprijs = val);

    this._page = 0;
  }

  ngOnInit() {
    this._giftDataService.gifts.subscribe(
      items => this._gifts = items);
  }

  get gifts() {
    return this._gifts;
  }

  get giftsGrootte() {
    if (this.gifts != null) {
      if (this.gifts.length % 12 != 0)
        return Math.floor(this._gifts.length / 12) + 1;
      else
        return this.gifts.length / 12;
    }
    else {
      return 0;
    }
  }

  verkleinGiftsGrootte() {
    if (this._page > 0)
      this._page -= 1;
  }

  verhoogGiftsGrootte() {
    if (this._page < this.giftsGrootte - 1)
      this._page += 1;
  }

  get page() {
    return this._page;
  }

  nieuweGiftToegevoegd(gift) {
    this._giftDataService.voegNieuweGiftToe(gift)
      .subscribe(item => this._gifts.push(item));
  }

  giftVerwijderen(gift: Gift) {
    this._giftDataService.verwijderGift(gift)
      .subscribe(item => (this._gifts = this._gifts.filter(val => item.id !== val.id)),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Er is een fout opgetreden tijdens het verwijderen van deze gift.`;
        }
      );
  }
}
