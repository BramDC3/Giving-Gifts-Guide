import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from './gift.model'
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  @Input() public gift: Gift;
  @Output() public verwijderGift = new EventEmitter<Gift>();

  constructor(private authService: AuthenticationService) { }

  ngOnInit() { }

  giftVerwijderen() {
    this.verwijderGift.emit(this.gift);
  }

  giftLiken() {
    this.gift.likes = this.gift.likes + 1;
  }

  get currentUser() {
    if (this.authService.user$.getValue() != null)
      return this.authService.user$.getValue().toLowerCase();
    else
      return null;
  }
}
