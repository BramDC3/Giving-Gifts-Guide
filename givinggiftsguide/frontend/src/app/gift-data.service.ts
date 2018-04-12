import { Injectable } from '@angular/core';
import { Gift } from './gift/gift.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Categorie } from './categorie/categorie.model';

@Injectable()
export class GiftDataService {
  private readonly _appUrl = '/API/';

  constructor(private http: HttpClient) {}

  get gifts(): Observable<Gift[]> {
    return this.http
      .get(`${this._appUrl}/gifts/`)
      .pipe(map((list: any[]): Gift[] => list.map(Gift.fromJSON)));
  }

  voegNieuweGiftToe(gift): Observable<Gift> {
    return this.http
    .post(`${this._appUrl}/gifts/`, gift)
    .pipe(map(Gift.fromJSON));
  }

  verwijderGift(gift) {
    return this.http
      .delete(`${this._appUrl}/gift/${gift.id}`)
      .pipe(map(Gift.fromJSON));
  }

  voegCategorieToeAanGift (cat: Categorie, gift: Gift): Observable<Categorie> {
    const theUrl = `${this._appUrl}/gift/${gift.id}/categorieen`;
    return this.http.post(theUrl, cat).pipe(map(Categorie.fromJSON));
  }

}
