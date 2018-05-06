import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from './gift.model'

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  @Input() public gift: Gift;
  @Output() public verwijderGift = new EventEmitter<Gift>();

  constructor() { }

  ngOnInit() { }

  giftVerwijderen() {
    this.verwijderGift.emit(this.gift);
  }

  giftLiken() {
    this.gift.likes = this.gift.likes + 1;
  }
}
