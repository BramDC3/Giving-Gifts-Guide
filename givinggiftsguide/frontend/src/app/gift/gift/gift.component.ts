import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from './gift.model'
import { AuthenticationService } from '../../user/authentication.service';
import { GiftDataService } from '../gift-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  @Input() public gift: Gift;
  @Output() public verwijderGift = new EventEmitter<Gift>();
  errorMsg: string;

  constructor(private _giftDataService: GiftDataService, private authService: AuthenticationService) { }

  ngOnInit() { }

  giftVerwijderen() {
    this.verwijderGift.emit(this.gift);
  }

  giftLiken() {
    this.gift.likeGift(this.currentUser);
    this._giftDataService.pasGiftAan(this.gift).subscribe(
      item => { },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het aanpassen van de gift ${this.gift.naam}`;
      }
    );
  }

  giftUnliken() {
    this.gift.unlikeGift(this.currentUser);
    this._giftDataService.pasGiftAan(this.gift).subscribe(
      item => { },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het aanpassen van de gift ${this.gift.naam}`;
      }
    );
  }

  get lietLikeAchter(): boolean {
    return this.gift.lietLikeAchter(this.currentUser);
  }

  get currentUser() {
    if (this.authService.user$.getValue() != null)
      return this.authService.user$.getValue().toLowerCase();
    else
      return null;
  }
}
