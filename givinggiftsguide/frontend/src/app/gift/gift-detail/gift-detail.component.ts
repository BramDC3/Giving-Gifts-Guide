import { Component, OnInit, Output } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { ActivatedRoute } from '@angular/router';
import { GiftDataService } from '../gift-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../user/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent implements OnInit {
  errorMsg: string;

  private _gift: Gift;
  public giftFG: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private _giftDataService: GiftDataService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.data.subscribe(item => this._gift = item['gift']);

    this.giftFG = this.fb.group({
      naam: [this.gift.naam],
      beschrijving: [this.gift.beschrijving],
      prijs: ['€ ' + this.gift.prijs]
    });
  }

  get gift() {
    return this._gift;
  }

  get maakLink() {
    return this.gift.naam.split(' ').join('+');
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
