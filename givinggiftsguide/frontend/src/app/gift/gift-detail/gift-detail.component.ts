import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { ActivatedRoute } from '@angular/router';
import { GiftDataService } from '../gift-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent implements OnInit {
  private gift: Gift;
  private giftFG: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private giftDataService: GiftDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => this.gift = item['gift']);

    this.giftFG = this.fb.group({
      naam: [this.gift.naam],
      beschrijving: [this.gift.beschrijving],
      prijs: ['€ ' + this.gift.prijs]
    });
  }

}
