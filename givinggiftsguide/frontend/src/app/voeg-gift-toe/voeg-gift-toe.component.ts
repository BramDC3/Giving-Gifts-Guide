import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Gift } from '../gift/gift.model';

@Component({
  selector: 'app-voeg-gift-toe',
  templateUrl: './voeg-gift-toe.component.html',
  styleUrls: ['./voeg-gift-toe.component.css']
})
export class VoegGiftToeComponent {
  @Output() public nieuweGift = new EventEmitter<Gift>();

  constructor() { }

  voegGiftToe(naamNieuweGift: HTMLInputElement, beschrijvingNieuweGift: HTMLInputElement, prijsNieuweGift: HTMLInputElement) : boolean {
    const gift = new Gift(naamNieuweGift.value, beschrijvingNieuweGift.value, Number(prijsNieuweGift.value));
    this.nieuweGift.emit(gift);
    return false;
  }

}
