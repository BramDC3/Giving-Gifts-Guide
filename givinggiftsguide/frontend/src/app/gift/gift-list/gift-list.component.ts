import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { GiftDataService } from '../gift-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PaginationPipePipe } from '../pagination-pipe.pipe';
import { GiftFilterPipe } from '../gift-filter.pipe';

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
  private mobile: boolean;

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

    if (window.screen.width === 360) {
      this.mobile = true;
    }
  }

  get gifts() {
    return this._gifts;
  }

  get giftsGrootte() {
    if (this.gifts && this.gifts.length != 0) {
      let gefilterdeGifts = new GiftFilterPipe().transform(
        this.gifts, this.filterGiftName, this.filterGiftCategorie,
        this.filterGiftSoort, this.filterGiftMinimumprijs, this.filterGiftMaximumprijs);
      return new PaginationPipePipe().transform(gefilterdeGifts.length);
    }
    else {
      return 1;
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

  applyFilterGiftSoort(value: string) {
    this.filterGiftSoort$.next(value);
    this._page = 0;
  }

  applyFilterGiftCategorie(value: string) {
    this.filterGiftCategorie$.next(value);
    this._page = 0;
  }

  applyFilterGiftNaam(value: string) {
    this.filterGift$.next(value);
    this._page = 0;
  }

  applyFilterGiftMinimumprijs(value: string) {
    this.filterGiftMinimumprijs$.next(value);
    this._page = 0;
  }

  applyFilterGiftMaximumprijs(value: string) {
    this.filterGiftMaximumprijs$.next(value);
    this._page = 0;
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
    this._page = 0;
  }
}
