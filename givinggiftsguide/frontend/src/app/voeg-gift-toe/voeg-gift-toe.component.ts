import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Gift } from '../gift/gift.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-voeg-gift-toe',
  templateUrl: './voeg-gift-toe.component.html',
  styleUrls: ['./voeg-gift-toe.component.css']
})
export class VoegGiftToeComponent implements OnInit {
  @Output() public nieuweGift = new EventEmitter<Gift>();
  private gift: FormGroup;

  constructor() { }

  ngOnInit() {
    this.gift = new FormGroup({
      naam: new FormControl('Naam van de gift', [Validators.required, Validators.minLength(3)]),
      beschrijving: new FormControl('Beschrijving van de gift', [Validators.required, Validators.minLength(10)]),
      prijs: new FormControl(123, Validators.required)
    })
  }

  onSubmit() {
    this.nieuweGift.emit(new Gift(this.gift.value.naam, this.gift.value.beschrijving, this.gift.value.prijs));
  }

  voegGiftToe(naamNieuweGift: HTMLInputElement, beschrijvingNieuweGift: HTMLInputElement, prijsNieuweGift: HTMLInputElement) : boolean {
    const gift = new Gift(naamNieuweGift.value, beschrijvingNieuweGift.value, Number(prijsNieuweGift.value));
    this.nieuweGift.emit(gift);
    return false;
  }

}
