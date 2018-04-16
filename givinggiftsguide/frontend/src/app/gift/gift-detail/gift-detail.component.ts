import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { ActivatedRoute } from '@angular/router';
import { GiftDataService } from '../gift-data.service';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent implements OnInit {
private gift: Gift;

  constructor(private route: ActivatedRoute, private giftDataService: GiftDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => this.gift = item['gift']);
  }

}
