import { Injectable } from '@angular/core';
import { Gift } from './gift/gift.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class GiftDataService {
  //private _gifts = new Array<Gift>();
  private readonly _appUrl = '/API/gifts';

  constructor(private http: HttpClient) {

  }

  get gifts(): Observable<Gift[]> {
    return this.http
      .get(this._appUrl)
      .pipe(
        map((list: any[]): Gift[] =>
          list.map(item =>
            new Gift(item.naam, item.beschrijving, item.prijs)
          )
        )
      );
  }

  voegNieuweGiftToe(gift): Observable<Gift> {
    return this.http
    .post(this._appUrl, gift)
    .pipe(
      map(
        (item: any): Gift =>
          new Gift(item.naam, item.beschrijving, item.prijs)
      )
    );
  }

}
